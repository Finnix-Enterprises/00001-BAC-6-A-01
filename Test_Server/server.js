const express = require("express");
const axios = require("axios");
const https = require("https");
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies (if needed)
app.use(express.json());

// HTTPS Agent to ignore SSL certificate errors
const httpsAgent = new https.Agent({
  rejectUnauthorized: false, // Disable SSL validation for development
});

// Proxy route
app.use("/api/endpoint", async (req, res) => {
  try {
    const response = await axios({
      method: req.method, // Forward the HTTP method (GET/POST/etc.)
      url: "https://2313dae3-1da5-41c4-b158-6723d0ef30f7.mock.pstmn.io/api/endpoint", // Target API
      headers: {
        ...req.headers, // Forward incoming headers
        "x-api-key": process.env.POSTMAN_API_KEY, // Replace with your Postman API key
      },
      data: req.body, // Forward the request body (for POST/PUT requests)
      httpsAgent, // Use the custom HTTPS agent
    });
    res.status(response.status).send(response.data); // Return the response from the target API
  } catch (error) {
    console.error("Error forwarding request:", error.message);
    if (error.response) {
      console.error("Error Response Headers:", error.response.headers);
      console.error("Error Response Body:", error.response.data);
    }
    res.status(error.response?.status || 500).send({
      error: "Error forwarding request",
      details: error.message,
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Node.js proxy server running on http://localhost:${PORT}`);
});
