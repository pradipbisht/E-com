// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtyK9gc1qf2q19CR0LkSlQBvwOuQyVBoY",
  authDomain: "e-com-36739.firebaseapp.com",
  projectId: "e-com-36739",
  storageBucket: "e-com-36739.appspot.com",
  messagingSenderId: "814534951657",
  appId: "1:814534951657:web:fb1c6c93e6d50c8010a678",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage(app);
