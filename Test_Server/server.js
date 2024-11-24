const http = require('http');

// Create the HTTP server
const server = http.createServer((req, res) => {
  // Handle GET request
  if (req.method === 'GET' && req.url === '/data') {
    const responseBody = {
      "parameter 1": 0,
      "parameter 2": "OFF",
      "parameter 3": "TIMER_CHECK"
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(responseBody));
  }

  // Handle POST request
  if (req.method === 'POST' && req.url === '/data') {
    let body = '';

    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {
      // Process the POST request and respond with a JSON message
      const response = { "acknowledged": 1 };
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(response));
    });
  }

  // Handle other requests
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
