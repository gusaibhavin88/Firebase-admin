import { initializeApp } from "firebase/app";

import { getMessaging, onMessage } from "firebase/messaging";

//Firebase Config values imported from .env file
const firebaseConfig = {
  apiKey: "AIzaSyChN9PFukpHJG44yhDVLbajn7TEJcNzVKM",
  authDomain: "responsive-website--reac-7d171.firebaseapp.com",
  databaseURL:
    "https://responsive-website--reac-7d171-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "responsive-website--reac-7d171",
  storageBucket: "responsive-website--reac-7d171.appspot.com",
  messagingSenderId: "522616607033",
  appId: "1:522616607033:web:415382e7c30506150ad8e8",
  measurementId: "G-4Q2KKG0K7V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Messaging service
export const messaging = getMessaging(app);
