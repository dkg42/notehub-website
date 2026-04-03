'use client';

import { useEffect } from 'react';
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  type AuthProvider,
  type UserCredential,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

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

    function sendResponse(result: any) {
      globalThis.parent.self.postMessage(
        JSON.stringify({ type: 'notehub:auth-response', payload: result }),
        PARENT_FRAME,
      );
    }

    function onMessage({ data }: MessageEvent) {
      if (!data?.initAuth) return;

      const provider = getProvider(data.provider ?? 'google');
      signInWithPopup(auth, provider)
        .then(sendResponse)
        .catch(sendResponse);
      globalThis.removeEventListener('message', onMessage);
    }

    globalThis.addEventListener('message', onMessage);
  }, []);

}
