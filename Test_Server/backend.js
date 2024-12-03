const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000; // Backend running on port 3000

// Enable CORS to allow requests from any origin
app.use(cors());

// Parse JSON bodies in incoming requests
app.use(express.json());

// Store parameters (in-memory)
let parameters = {
  param1: "Relay1",
  param2: 10,
  param3: true,
};
app.get("/", (req, res) => {
  res.send("Backend is working!");
});
app.get("/test", (req, res) => {
  res.send("Test API endpoint");
});

// Get parameters from the backend
app.get("/parameters", (req, res) => {
  console.log("GET /parameters request received"); // Log when the GET request is received
  console.log("Current parameters:", parameters); // Log the current parameters being sent
  res.json(parameters);
});

// Update parameters on the backend
app.post("/parameters", (req, res) => {
  const updates = req.body; // Receive updated parameters from frontend
  console.log("POST /parameters request received"); // Log when the POST request is received
  console.log("Updating parameters with:", updates); // Log the received updates
  parameters = { ...parameters, ...updates }; // Update the parameters
  console.log("Updated parameters:", parameters); // Log the updated parameters
  res
    .status(200)
    .json({ message: "Parameters updated successfully", parameters });
});

// Start the server
app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
