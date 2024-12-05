const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

// CORS setup
const corsOptions = {
  origin: '*', // This allows any origin to make requests. You can restrict it to ngrok or your frontend's URL.
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));

app.use(express.json());

// Your parameters storage and other routes
let parameters = {
  param1: "Relay1",
  param2: 10,
  param3: true,
};

app.get("/", (req, res) => {
  res.send("Backend is working!");
});

app.get("/parameters", (req, res) => {
  console.log("GET /parameters request received");
  res.json(parameters);
});

app.post("/parameters", (req, res) => {
  const updates = req.body;
  parameters = { ...parameters, ...updates };
  res.status(200).json({ message: "Parameters updated successfully", parameters });
});

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
