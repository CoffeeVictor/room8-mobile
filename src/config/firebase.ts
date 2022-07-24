// Import the functions you need from the SDKs you need
import { FirebaseOptions, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyB1Eeut9DqfgpbJ6YsFqs-b2cCrFx9wbEk",
  authDomain: "dev-room8.firebaseapp.com",
  projectId: "dev-room8",
  storageBucket: "dev-room8.appspot.com",
  messagingSenderId: "472465191768",
  appId: "1:472465191768:web:65e244c8e674bbbf7eab2d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
