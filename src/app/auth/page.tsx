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

// Stored at module level so it persists across sign-in/sign-out within the same iframe session
let googleAccessToken: string | null = null;

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

    function sendResponse(result: any, type: string) {
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
            googleAccessToken = driveAccessToken;
          }
        }

        const tokenResponse = (result as any)._tokenResponse as Record<string, unknown> | undefined;
        sendResponse({
          user: {
            uid: result.user.uid,
            email: result.user.email,
            displayName: result.user.displayName,
            photoURL: result.user.photoURL,
          },
          _tokenResponse: {
            oauthAccessToken: driveAccessToken, // gated: null unless subscription is active
            oauthExpireIn: tokenResponse?.oauthExpireIn ?? null,
            refreshToken: tokenResponse?.refreshToken ?? null,
            rawUserInfo: tokenResponse?.rawUserInfo ?? null,
            idToken: tokenResponse?.idToken ?? null,
          },
          driveAccessToken,
        }, 'notehub:auth-response');
      } catch (err) {
        sendResponse(err, 'notehub:auth-response');
      }
    }

    // TODO token revocation wont work unless its the same iframe session. However usage in chrome extension is across different iframe sessions. Need to fix
    async function onSignOutMessage({ data }: MessageEvent) {
      if (!data?.signOut) return;
      globalThis.removeEventListener('message', onSignOutMessage);
      console.log('[auth] signOut listener removed');

      if (googleAccessToken) {
        try {
          await fetch('https://oauth2.googleapis.com/revoke', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `token=${googleAccessToken}`,
          });
        } catch {
          // Revocation failure is non-fatal — proceed with Firebase sign-out
        }
        googleAccessToken = null;
      }

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
