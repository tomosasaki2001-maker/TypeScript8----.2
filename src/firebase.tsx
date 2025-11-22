

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDYaNTenQs4Tf2WPT7IZJCUy3xdtCZVjQo",
  authDomain: "quiz-2e060.firebaseapp.com",
  projectId: "quiz-2e060",
  storageBucket: "quiz-2e060.firebasestorage.app",
  messagingSenderId: "119763428220",
  appId: "1:119763428220:web:531a4a4c0a7b6253ed3af9"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);