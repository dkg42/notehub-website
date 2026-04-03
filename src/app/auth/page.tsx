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
import {type} from "node:os";

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
    default:
      return new GoogleAuthProvider();
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
        .then(result => sendResponse(result, 'notehub:auth-response'))
        .catch(result => sendResponse(result, 'notehub:auth-response'));
      globalThis.removeEventListener('message', onMessage);
      console.log('[auth] signIn listener removed');
    }

    function onSignOutMessage({ data }: MessageEvent) {
      if (!data?.signOut) return;

      signOut(auth)
        .then(() => sendResponse({ signedOut: true }, 'notehub:sign-out-response'))
        .catch(result => sendResponse(result, 'notehub:sign-out-response'));
      globalThis.removeEventListener('message', onSignOutMessage);
      console.log('[auth] signOut listener removed');
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
