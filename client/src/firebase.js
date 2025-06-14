import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics"; 
import {getFirestore} from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAf7dbHUMs4_f-cHjVcr1xRf26jWKjtAXM",
  authDomain: "medlink-9d5be.firebaseapp.com",
  projectId: "medlink-9d5be",
  storageBucket: "medlink-9d5be.firebasestorage.app",
  messagingSenderId: "935269125056",
  appId: "1:935269125056:web:368207776318f8af6b9625",
  measurementId: "G-841HBHFTDD"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore (app);