'use client';

import { useEffect } from 'react';
import { signInWithCustomToken, signOut } from 'firebase/auth';
import { httpsCallable } from 'firebase/functions';
import { auth, functions } from '@/lib/firebase';

type SubscriptionStatus = 'active' | 'cancelled' | 'expired' | 'on_hold' | 'none';

interface SubscriptionClaims {
  subscriptionStatus: SubscriptionStatus;
  subscriptionPlan: string | null;
  subscriptionId: string | null;
  customerId: string | null;
  currentPeriodEnd: string | null;
}

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? '';
const GIS_SRC = 'https://accounts.google.com/gsi/client';
const DRIVE_SCOPES = [
  'openid',
  'email',
  'profile',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.appdata',
].join(' ');

// ---------------------------------------------------------------------------
// GIS types (minimal — we only use initCodeClient / requestCode)
// ---------------------------------------------------------------------------

interface GisCodeResponse {
  code?: string;
  scope?: string;
  error?: string;
  error_description?: string;
}

interface GisCodeClient {
  requestCode(): void;
}

interface GisCodeClientConfig {
  client_id: string;
  scope: string;
  ux_mode: 'popup' | 'redirect';
  prompt?: string;
  callback: (response: GisCodeResponse) => void;
  error_callback?: (err: { type: string; message?: string }) => void;
}

interface GoogleGis {
  accounts: {
    oauth2: {
      initCodeClient(config: GisCodeClientConfig): GisCodeClient;
    };
  };
}

declare global {
  interface Window {
    google?: GoogleGis;
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function loadGisScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.reject(new Error('No window'));
  if (window.google?.accounts?.oauth2) return Promise.resolve();
  const existing = document.querySelector(`script[src="${GIS_SRC}"]`) as HTMLScriptElement | null;
  if (existing) {
    return new Promise((resolve, reject) => {
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error('GIS load failed')), { once: true });
    });
  }
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = GIS_SRC;
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('GIS load failed'));
    document.head.appendChild(s);
  });
}

/**
 * Runs the Google authorization code flow via GIS in a popup, then exchanges
 * the code for tokens server-side via `storeGoogleToken`, then signs into
 * Firebase with the returned custom token.
 *
 * Returns the Drive access token along with the signed-in user credential.
 */
async function signInWithGoogleCodeFlow(): Promise<{ customToken: string; accessToken: string; expiresIn: number; scope: string }> {
  await loadGisScript();
  if (!GOOGLE_CLIENT_ID) {
    throw new Error('NEXT_PUBLIC_GOOGLE_CLIENT_ID is not set');
  }
  if (!window.google?.accounts?.oauth2) {
    throw new Error('GIS client not available');
  }

  const code = await new Promise<string>((resolve, reject) => {
    const client = window.google!.accounts.oauth2.initCodeClient({
      client_id: GOOGLE_CLIENT_ID,
      scope: DRIVE_SCOPES,
      ux_mode: 'popup',
      prompt: 'consent', // force consent so Google always returns a refresh_token
      callback: (resp) => {
        if (resp.error || !resp.code) {
          reject(new Error(resp.error_description || resp.error || 'No auth code returned'));
          return;
        }
        resolve(resp.code);
      },
      error_callback: (err) => {
        // GIS returns { type: 'popup_closed' } when the user closes the popup.
        // Normalize to Firebase's canonical code so the rest of the chain can
        // treat it as a quiet cancellation rather than a real error.
        const isCancelled = err.type === 'popup_closed' || err.type === 'popup_closed_by_user';
        const message = isCancelled
          ? 'auth/popup-closed-by-user'
          : (err.message || err.type || 'GIS popup error');
        reject(new Error(message));
      },
    });
    client.requestCode();
  });

  // Exchange the code server-side via the callable CF. The SDK wraps the payload
  // as `{ data }`, unwraps the `{ result }` response, and throws a FirebaseError
  // (code `functions/*`) on failure — no manual status handling needed.
  const storeGoogleToken = httpsCallable<
    { code: string; redirectUri: string },
    { customToken: string; accessToken: string; expiresIn: number; scope: string }
  >(functions, 'storeGoogleToken');
  const { data } = await storeGoogleToken({ code, redirectUri: 'postmessage' });
  const { customToken, accessToken, expiresIn, scope } = data;

  await signInWithCustomToken(auth, customToken);
  return { customToken, accessToken, expiresIn, scope };
}

// ---------------------------------------------------------------------------
// Iframe mode — headless, message-driven
// ---------------------------------------------------------------------------

export default function AuthPage() {
  useEffect(() => {
    const PARENT_FRAME = document.location.ancestorOrigins[0];

    function sendResponse(result: unknown, type: string) {
      globalThis.parent.self.postMessage(
        JSON.stringify({ type: type, payload: result }),
        PARENT_FRAME,
      );
    }

    async function onMessage({ data }: MessageEvent) {
      if (!data?.initAuth) return;
      globalThis.removeEventListener('message', onMessage);
      console.log('[auth] signIn listener removed');

      try {
        // Google is the only supported identity provider.
        if (data.provider && data.provider !== 'google') {
          throw new Error(`Unsupported auth provider: ${data.provider}`);
        }

        // GIS code flow → server-side exchange → Firebase custom token sign-in.
        const result = await signInWithGoogleCodeFlow();
        const expiresIn = result.expiresIn;
        const grantedScopes = result.scope ?? '';
        const customToken = result.customToken;
        const user = auth.currentUser;
        if (!user) throw new Error('Firebase sign-in did not produce a current user');

        let driveAccessToken: string | null = null;
        const idTokenResult = await user.getIdTokenResult();
        const { subscriptionStatus } = idTokenResult.claims as unknown as SubscriptionClaims;
        if (subscriptionStatus === 'active') {
          driveAccessToken = result.accessToken;
        }

        sendResponse({
          user: {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            stsTokenManager: (user as unknown as Record<string, unknown>).stsTokenManager,
          },
          _tokenResponse: {
            oauthAccessToken: driveAccessToken, // gated: null unless subscription is active
            oauthExpireIn: expiresIn,
            // refreshToken intentionally omitted — stored server-side via storeGoogleToken CF
            // rawUserInfo: encoded so auth-storage-service can parse granted_scopes
            // on the first sign-in (otherwise hasDriveScope stays false until refresh).
            rawUserInfo: JSON.stringify({ granted_scopes: grantedScopes }),
            idToken: await user.getIdToken(),
          },
          driveAccessToken,
          // Firebase custom token — lets the extension establish its own SDK
          // session via signInWithCustomToken.
          customToken,
        }, 'notehub:auth-response');
      } catch (err) {
        // Use the `error` field shape so the extension's offscreen handler
        // (offscreen.ts:200) routes this through the failure branch instead of
        // forwarding it as a credential and crashing on `.user.uid`.
        // Prefer the FirebaseError `code` over `message` so 'auth/popup-closed-by-user'
        // is preserved through the chain instead of being flattened to a localized string.
        const code = (err as { code?: string })?.code;
        const errorMessage = code
          ?? (err instanceof Error ? err.message : (typeof err === 'string' ? err : JSON.stringify(err)));
        if (errorMessage === 'auth/popup-closed-by-user') {
          console.info('[auth] sign-in cancelled by user');
        } else {
          console.error('[auth] sign-in failed', err);
        }
        sendResponse({ error: errorMessage }, 'notehub:auth-response');
      }
    }

    async function onSignOutMessage({ data }: MessageEvent) {
      if (!data?.signOut) return;
      globalThis.removeEventListener('message', onSignOutMessage);
      console.log('[auth] signOut listener removed');

      // Google OAuth token revocation is handled server-side by the revokeGoogleToken
      // Cloud Function, which the extension calls before triggering this sign-out.
      // Here we only need to clear the Firebase session.
      signOut(auth)
        .then(() => sendResponse({ signedOut: true }, 'notehub:sign-out-response'))
        .catch(result => sendResponse(result, 'notehub:sign-out-response'));
    }

    globalThis.addEventListener('message', onMessage);
    console.log('[auth] signIn listener added');
    globalThis.addEventListener('message', onSignOutMessage);
    console.log('[auth] signOut listener added');

    // Pre-load GIS so the first sign-in click doesn't pay for the script fetch.
    loadGisScript().catch((err) => console.warn('[auth] GIS preload failed', err));

    // Notify parent that listeners are active — resolves the race where offscreen
    // postMessages before useEffect has registered the handlers.
    console.log('[auth] posting iframe-ready to parent');
    globalThis.parent.postMessage({ type: 'notehub:iframe-ready' }, PARENT_FRAME);
  }, []);

  return null;
}
