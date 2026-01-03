import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDI8w5sv5NUEVry2Zn7kOAM7eNDC4SMemo',
  authDomain: 'kuota-f0e3d.firebaseapp.com',
  projectId: 'kuota-f0e3d',
  storageBucket: 'kuota-f0e3d.firebasestorage.app',
  messagingSenderId: '99983666038',
  appId: '1:99983666038:android:30e24dc78f26e39c266857',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
