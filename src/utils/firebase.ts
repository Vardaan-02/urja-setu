import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey:"AIzaSyDIE-QXHg60YWUtGtslmmBeX_EiqScG6Vw",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId:"betus-2fea9",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId:"1020986594972",
    appId:"1:1020986594972:android:161385d3de0aa1bf9e7f59"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
  