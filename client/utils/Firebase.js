// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries
// import {getAuth, GoogleAuthProvider} from "firebase/auth"

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: "loginvirtualcourses-db718.firebaseapp.com",
//   projectId: "loginvirtualcourses-db718",
//   storageBucket: "loginvirtualcourses-db718.firebasestorage.app",
//   messagingSenderId: "808911078534",
//   appId: "1:808911078534:web:0caba9e9d193e4a3e5bd07"
// };



// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// const auth = getAuth(app)
// const provider = new GoogleAuthProvider()

// export {auth,provider}

//-----------------------------------------------------------------------------
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export default app;

