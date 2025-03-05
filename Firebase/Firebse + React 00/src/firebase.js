// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkMP3OPwJFq-2lJRV_oRTCd0SEOEtyQzE",
  authDomain: "parc00.firebaseapp.com",
  projectId: "parc00",
  storageBucket: "parc00.firebasestorage.app",
  messagingSenderId: "433429254302",
  appId: "1:433429254302:web:a4ec9fad47e496c278ab8f",
//   databaseURL: "https://console.firebase.google.com/u/0/project/parc00/database/parc00-default-rtdb/data/~2F",
  databaseURL: "https://parc00-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);