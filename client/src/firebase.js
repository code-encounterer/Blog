// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "inkweb-blog.firebaseapp.com",
  projectId: "inkweb-blog",
  storageBucket: "inkweb-blog.appspot.com",
  messagingSenderId: "897371746156",
  appId: "1:897371746156:web:51771d46c45b396709cd49"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);