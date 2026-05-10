'use client';

import { useEffect } from 'react';
import {
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  type AuthProvider,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

type SubscriptionStatus = 'active' | 'cancelled' | 'expired' | 'on_hold' | 'none';

interface SubscriptionClaims {
  subscriptionStatus: SubscriptionStatus;
  subscriptionPlan: string | null;
  subscriptionId: string | null;
  customerId: string | null;
  currentPeriodEnd: string | null;
}

const STORE_TOKEN_URL = process.env.NEXT_PUBLIC_CLOUD_FUNCTIONS_BASE_URL + '/storeGoogleToken';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

function getBaseProvider(name: string): AuthProvider {
  switch (name) {
    case 'facebook':
      return new FacebookAuthProvider();
    case 'github':
      return new GithubAuthProvider();
    case 'google':
    default:
      return new GoogleAuthProvider();
  }
}

function getDriveProvider(): GoogleAuthProvider {
  const provider = new GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/drive.file');
  provider.addScope('https://www.googleapis.com/auth/drive.appdata');
  return provider;
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
        const isGoogle = data.provider === 'google' || !data.provider;
        const provider = isGoogle ? getDriveProvider() : getBaseProvider(data.provider);
        const result = await signInWithPopup(auth, provider);

        let driveAccessToken: string | null = null;
        if (isGoogle) {
          const idTokenResult = await result.user.getIdTokenResult();
          const { subscriptionStatus } = idTokenResult.claims as unknown as SubscriptionClaims;
          if (subscriptionStatus === 'active') {
            driveAccessToken = GoogleAuthProvider.credentialFromResult(result)?.accessToken ?? null;

            // Store the Google OAuth refresh token server-side so the extension never holds
            // the token that requires client_secret to use. The extension will call the
            // refreshGoogleToken Cloud Function (authenticated with a Firebase ID token)
            // whenever it needs a new Drive access token.
            const tokenResponse = (result as unknown as Record<string, unknown>)._tokenResponse as Record<string, unknown> | undefined;
            const googleRefreshToken = tokenResponse?.refreshToken as string | undefined;
            if (googleRefreshToken) {
              const firebaseIdToken = await result.user.getIdToken();
              try {
                await fetch(STORE_TOKEN_URL, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${firebaseIdToken}`,
                  },
                  body: JSON.stringify({
                    refreshToken: googleRefreshToken,
                    scope: 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.appdata',
                  }),
                });
              } catch (err) {
                console.error('[auth] Failed to store token server-side', err);
                // Non-fatal: the extension will get the access token for this session
                // but refresh will fail until the user signs in again.
              }
            }
          }
        }

        const tokenResponse = (result as unknown as Record<string, unknown>)._tokenResponse as Record<string, unknown> | undefined;
        sendResponse({
          user: {
            uid: result.user.uid,
            email: result.user.email,
            displayName: result.user.displayName,
            photoURL: result.user.photoURL,
            stsTokenManager: (result.user as unknown as Record<string, unknown>).stsTokenManager,
          },
          _tokenResponse: {
            oauthAccessToken: driveAccessToken, // gated: null unless subscription is active
            oauthExpireIn: tokenResponse?.oauthExpireIn ?? null,
            // refreshToken intentionally omitted — stored server-side via storeGoogleToken CF
            rawUserInfo: tokenResponse?.rawUserInfo ?? null,
            idToken: tokenResponse?.idToken ?? null,
          },
          driveAccessToken,
        }, 'notehub:auth-response');
      } catch (err) {
        sendResponse(err, 'notehub:auth-response');
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

    // Notify parent that listeners are active — resolves the race where offscreen
    // postMessages before useEffect has registered the handlers.
    console.log('[auth] posting iframe-ready to parent');
    globalThis.parent.postMessage({ type: 'notehub:iframe-ready' }, PARENT_FRAME);
  }, []);

  return null;
}
