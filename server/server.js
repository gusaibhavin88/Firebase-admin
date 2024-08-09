const express = require("express");
const admin = require("./firebase");

const app = express();
const port = 3000;
const cors = require("cors");

app.use(express.json()); // For parsing application/json
app.use(cors());

// Example route using Firebase Admin
app.post("/sendNotification", async (req, res) => {
  const { token } = req.body;

  console.log(req.body);

  const message = {
    notification: {
      title: "Notification",
      body: req.body.message,
    },
    token: token,
  };

  try {
    await admin.messaging().send(message);
    res.status(200).send("Notification sent successfully");
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).send("Failed to send notification");
  }
});

// app.js
app.post("/verifyToken", async (req, res) => {
  try {
    const { token } = req.body;
    const decodedToken = await admin.auth().verifyIdToken(token);
    res.status(200).json(decodedToken);
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).send("Unauthorized");
  }
});

app.listen(port, () => {
  console.log(`Express server running on http://localhost:${port}`);
});
