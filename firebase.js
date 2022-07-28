// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { GoogleAuthProvider, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlwjtGKKkIvBgfBqlEVcZvZz5fQv_8Khw",
  authDomain: "carbuk-web.firebaseapp.com",
  projectId: "carbuk-web",
  storageBucket: "carbuk-web.appspot.com",
  messagingSenderId: "218512224844",
  appId: "1:218512224844:web:9dc78d37502f8163497ae9",
  measurementId: "G-1Y6VT7J0SC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const auth = getAuth();

export { app, provider, auth };
