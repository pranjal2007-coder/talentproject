// Firebase initialization (modular SDK)
// NOTE: per task instruction we also export the raw config default export
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBE5yRL0Vx6a1asXMMioEr3t9Ah2w3QxtM",
  authDomain: "talent-f474d.firebaseapp.com",
  projectId: "talent-f474d",
  storageBucket: "talent-f474d.firebasestorage.app",
  messagingSenderId: "826760976811",
  appId: "1:826760976811:web:34c70fe2619bd047885aee",
  measurementId: "G-7L12448Y3H",
  databaseURL: "https://talent-f474d-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
export default firebaseConfig;

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);