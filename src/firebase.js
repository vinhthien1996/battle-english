// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBr_-8dXWS1DuvhmnHyYCz_mxGsjfXA8YU",
  authDomain: "battleenglish-nvt.firebaseapp.com",
  databaseURL: "https://battleenglish-nvt-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "battleenglish-nvt",
  storageBucket: "battleenglish-nvt.firebasestorage.app",
  messagingSenderId: "12312998679",
  appId: "1:12312998679:web:a10073be7b427b0c1a7d52",
  measurementId: "G-ZKJJBQHFZH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);