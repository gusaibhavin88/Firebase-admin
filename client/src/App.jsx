import "./App.css";
import { getToken } from "firebase/messaging";
import { messaging } from "./firebase/firebaseConfig";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { onMessage } from "firebase/messaging";

function App() {
  const [data, setData] = useState("");
  const [notification, setNotification] = useState("");
  const [token, setToken] = useState("");
  async function requestPermission() {
    //requesting permission using Notification API
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey:
          "BFuS_lfdUTQIw3J-KTvDL3tens2SzPUo0mZUI_LBUnkM4_SRiF5DG80pArPyyFqmKcBH3eueEFERbJwMD3ufNI0",
      });

      //We can send token to server
      console.log("Token generated : ", token);
      setToken(token);
    } else if (permission === "denied") {
      //notifications are blocked
      alert("You denied for the notification");
    }
  }

  const notify = (message) => toast(message);

  const onMessageLister = async () => {
    return new Promise((resolve) => {
      onMessage(messaging, (payload) => {
        console.log("onMessage Payload", payload);
        setNotification(payload.notification.body);
        resolve(payload);
      });
    });
  };

  useEffect(() => {
    requestPermission();
  }, []);

  useEffect(() => {
    const unsubscribe = onMessageLister()
      .then((payload) => {
        setNotification(payload.notification.body);
        console.log("Received foreground message:", payload);
      })
      .catch((err) => console.log("Failed to receive message:", err));

    return () => {
      unsubscribe;
    };
  }, []);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        console.log("Service Worker ready");
        registration.update();
      });
    }

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );
        })
        .catch((err) => {
          console.log("Service Worker registration failed:", err);
        });
    }
  }, []);

  const sendNotification = () => {
    axios.post("http://localhost:3000/sendNotification", {
      message: data,
      token: token,
    });
  };

  useEffect(() => {
    if (notification !== "") {
      notify(notification);
    }
  }, [notification, setNotification]);

  return (
    <>
      <input onChange={(e) => setData(e.target.value)}></input>
      <button onClick={(e) => sendNotification(e)}>Notify!</button>
      <ToastContainer />
    </>
  );
}

export default App;
