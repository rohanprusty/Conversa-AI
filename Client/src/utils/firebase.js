import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
   authDomain: "conversa-87f1b.firebaseapp.com",
  projectId: "conversa-87f1b",
  storageBucket: "conversa-87f1b.firebasestorage.app",
  messagingSenderId: "301661227855",
  appId: "1:301661227855:web:54dc0d09faf7e04f7c133a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth , provider}

