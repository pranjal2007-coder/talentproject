// Firestore wrappers (lightweight)
import { firestore, storage } from '../firebase';
import {
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  updateDoc,
  deleteDoc,
  serverTimestamp
} from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export async function createEvent(data) {
  const col = collection(firestore, 'events');
  const docRef = await addDoc(col, { ...data, createdAt: serverTimestamp() });
  return docRef.id;
}

export async function uploadImage(file, path = 'events') {
  const storageRef = ref(storage, `${path}/${Date.now()}_${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);
  return new Promise((resolve, reject) => {
    uploadTask.on('state_changed', null, reject, async () => {
      const url = await getDownloadURL(uploadTask.snapshot.ref);
      resolve(url);
    });
  });
}

export async function fetchEvents({ limitCount = 50 } = {}) {
  const col = collection(firestore, 'events');
  const q = query(col, orderBy('createdAt', 'desc'), limit(limitCount));
  const snap = await getDocs(q);
  const arr = [];
  snap.forEach(s => arr.push({ id: s.id, ...s.data() }));
  return arr;
}

export async function getEventById(id) {
  const d = doc(firestore, 'events', id);
  const s = await getDoc(d);
  if (!s.exists()) throw new Error('Not found');
  return { id: s.id, ...s.data() };
}

export async function saveBooking(data) {
  const col = collection(firestore, 'bookings');
  const docRef = await addDoc(col, { ...data, createdAt: serverTimestamp() });
  return docRef.id;
}
