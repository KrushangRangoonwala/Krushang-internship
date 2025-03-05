import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDkMP3OPwJFq-2lJRV_oRTCd0SEOEtyQzE",
  authDomain: "parc00.firebaseapp.com",
  databaseURL: "https://parc00-default-rtdb.firebaseio.com",
  projectId: "parc00",
  storageBucket: "parc00.firebasestorage.app",
  messagingSenderId: "433429254302",
  appId: "1:433429254302:web:a4ec9fad47e496c278ab8f"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);