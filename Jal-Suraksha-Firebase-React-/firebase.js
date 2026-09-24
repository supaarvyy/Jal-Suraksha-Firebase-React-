// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpyXw3J3A6T--mYDN9n7m6oOgut7Ulhl8",
  authDomain: "jal-suraksha-health-app-98629.firebaseapp.com",
  projectId: "jal-suraksha-health-app-98629",
  storageBucket: "jal-suraksha-health-app-98629.firebasestorage.app",
  messagingSenderId: "818881803669",
  appId: "1:818881803669:web:433e9caae15a720eeeb29c",
  measurementId: "G-DWY4MYH4G3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Analytics (optional)
const analytics = getAnalytics(app);

export default app;