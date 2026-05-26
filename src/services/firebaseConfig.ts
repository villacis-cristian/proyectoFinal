import { initializeApp } from 'firebase/app';

import { getAuth } from 'firebase/auth';

import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {

apiKey: "AIzaSyADnYPU5pKfe6nhk3M4_mv3Fl4FHgGz76U",
  authDomain: "avashi-b1bb8.firebaseapp.com",
  projectId: "avashi-b1bb8",
  storageBucket: "avashi-b1bb8.firebasestorage.app",
  messagingSenderId: "813385950456",
  appId: "1:813385950456:web:70edbce0533224ea8e870d",
  measurementId: "G-WB2LH9R62S"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);