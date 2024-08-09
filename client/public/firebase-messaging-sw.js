// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js");

//Firebase Config values imported from .env file
const firebaseConfig = {
  apiKey: "AIzaSyChN9PFukpHJG44yhDVLbajn7TEJcNzVKM",
  authDomain: "responsive-website--reac-7d171.firebaseapp.com",
  // databaseURL:
  //   "https://responsive-website--reac-7d171-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "responsive-website--reac-7d171",
  storageBucket: "responsive-website--reac-7d171.appspot.com",
  messagingSenderId: "522616607033",
  appId: "1:522616607033:web:415382e7c30506150ad8e8",
  measurementId: "G-4Q2KKG0K7V",
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("message", (event) => {
  const { type, data } = event.data;
  if (type === "showNotification") {
    const { title, body } = data;
    self.registration.showNotification(title, {
      body: body,
      // icon
    });
    self.registration.showNotification(title);
  }
});
