// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, GoogleAuthProvider} from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginvirtualcourses-db718.firebaseapp.com",
  projectId: "loginvirtualcourses-db718",
  storageBucket: "loginvirtualcourses-db718.firebasestorage.app",
  messagingSenderId: "808911078534",
  appId: "1:808911078534:web:0caba9e9d193e4a3e5bd07"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth,provider}
