// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "solutionchallenge2k24.firebaseapp.com",
  projectId: "solutionchallenge2k24",
  storageBucket: "solutionchallenge2k24.appspot.com",
  messagingSenderId: "527437898855",
  appId: "1:527437898855:web:99fef3ea36dfc5a99ce0c2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

