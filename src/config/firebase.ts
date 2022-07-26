// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FirebaseApp, FirebaseOptions, getApp, getApps, initializeApp } from "firebase/app";
import { Auth, getAuth, initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from 'firebase/auth/react-native'
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
let app: FirebaseApp;
let auth: Auth;
if (getApps().length < 1) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} else {
  app = getApp();
  auth = getAuth();
}

export {
  app,
  auth
}