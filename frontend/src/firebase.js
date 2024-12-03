// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, get, child } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCSGTQx6eO2A0xISjzbwhZCCmKbxLoOc2Q",
  authDomain: "liveexam-34f78.firebaseapp.com",
  databaseURL: "https://liveexam-34f78-default-rtdb.firebaseio.com",
  projectId: "liveexam-34f78",
  storageBucket: "liveexam-34f78.firebasestorage.app",
  messagingSenderId: "105048334933",
  appId: "1:105048334933:web:7bb47c13c33f1df6492adc",
  measurementId: "G-FHDPNXKR8J"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const firestore = getFirestore(app);  // where `app` is your Firebase app instance
export const storage = getStorage(app); 
export const db = getFirestore(app);

export { app, auth, database,  ref, set, get, child };