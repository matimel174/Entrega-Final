import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
const firebaseConfig = {
  apiKey: "AIzaSyApKEKLEoYW7938FITSLtzwr5jOcTJTH_U",
  authDomain: "proyecto-final-ce0c9.firebaseapp.com",
  projectId: "proyecto-final-ce0c9",
  storageBucket: "proyecto-final-ce0c9.appspot.com",
  messagingSenderId: "549644744789",
  appId: "1:549644744789:web:f11ab34067a2197d2fbcdc",
  measurementId: "G-KRT0LK81FE"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);