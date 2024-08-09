// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNLiG_kK10tyK88qCkonN3Crhh2qjc3d0",
  authDomain: "notification-9838f.firebaseapp.com",
  projectId: "notification-9838f",
  storageBucket: "notification-9838f.appspot.com",
  messagingSenderId: "872135136479",
  appId: "1:872135136479:web:ed1994bd4d4e3c8da1056a",
  measurementId: "G-2XFS8F1EV4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
