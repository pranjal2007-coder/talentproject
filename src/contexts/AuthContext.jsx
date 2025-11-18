import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, firestore } from '../firebase';
import {
  onAuthStateChanged,
  signOut as firebaseSignOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp
} from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

/**
 * AuthProvider - manages user session and role
 * Stores user profile in Firestore under /users/{uid}
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        try {
          const ref = doc(firestore, 'users', u.uid);
          const snap = await getDoc(ref);
          if (snap.exists()) {
            setProfile(snap.data());
          } else {
            setProfile(null);
          }
        } catch (err) {
          console.error('Failed loading user profile', err);
        }
      } else {
        setProfile(null);
      }
      setInitializing(false);
    });
    return unsub;
  }, []);

  async function signup({ name, email, password, role, phone }) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: name });
    // Save profile in Firestore
    const userRef = doc(firestore, 'users', cred.user.uid);
    await setDoc(userRef, {
      name,
      email,
      role,
      phone: phone || '',
      emailVerified: cred.user.emailVerified || false,
      phoneVerified: false,
      createdAt: serverTimestamp()
    });
    // send verification email
    await sendEmailVerification(cred.user);
    return cred.user;
  }

  async function login(email, password) {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user;
  }

  async function signOut() {
    await firebaseSignOut(auth);
    setProfile(null);
    setUser(null);
  }

  const value = {
    user,
    profile,
    initializing,
    signup,
    login,
    signOut,
    setProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
