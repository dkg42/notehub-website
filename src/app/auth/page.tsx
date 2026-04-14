'use client';

import { useEffect } from 'react';
import {
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  type AuthProvider,
  type UserCredential,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

// Stored at module level so it persists across sign-in/sign-out within the same iframe session
let googleAccessToken: string | null = null;

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

function getProvider(name: string): AuthProvider {
  switch (name) {
    case 'facebook':
      return new FacebookAuthProvider();
    case 'github':
      return new GithubAuthProvider();
    case 'google':
    default: {
      const provider = new GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/drive.file');
      provider.addScope('https://www.googleapis.com/auth/drive.appdata');
      return provider;
    }
  }
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

    function onMessage({ data }: MessageEvent) {
      if (!data?.initAuth) return;

      const provider = getProvider(data.provider ?? 'google');
      signInWithPopup(auth, provider)
        .then(result => {
          if (data.provider === 'google' || !data.provider) {
            googleAccessToken = GoogleAuthProvider.credentialFromResult(result)?.accessToken ?? null;
          }
          sendResponse(result, 'notehub:auth-response');
        })
        .catch(result => sendResponse(result, 'notehub:auth-response'));
      globalThis.removeEventListener('message', onMessage);
      console.log('[auth] signIn listener removed');
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

}
