// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8N9PEihj1SqCfxToMwwz8DdDx_XGOXLg",
  authDomain: "y-memo-79d11.firebaseapp.com",
  projectId: "y-memo-79d11",
  storageBucket: "y-memo-79d11.appspot.com",
  messagingSenderId: "610793625898",
  appId: "1:610793625898:web:d496fced137b0cc6d96653",
  measurementId: "G-YB5J0BPL43",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export function singIn() {
  signInWithPopup(auth, new GoogleAuthProvider());
}

export function singOut() {
  auth.signOut();
}

export { app, auth };
