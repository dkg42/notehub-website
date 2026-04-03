import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBs4Y8ApZmuYIPpEet1U6VDh-AeDsi7uWM",
  authDomain: "notehublm-a2490.firebaseapp.com",
  projectId: "notehublm-a2490",
  storageBucket: "notehublm-a2490.firebasestorage.app",
  messagingSenderId: "253967226446",
  appId: "1:253967226446:web:edf95c30fbab2bbd61551f",
  measurementId: "G-4816KMKTQS"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);