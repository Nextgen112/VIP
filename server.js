// server.js
const express = require('express');
const app = express();

// List of allowed IPs (add your own IP addresses)
const allowedIPs = ['123.123.123.123', '234.234.234.234']; // Replace with your allowed IPs

// Middleware to check IP
app.use((req, res, next) => {
  const ip = req.ip;
  if (!allowedIPs.includes(ip)) {
    return res.status(403).send('Access Denied');
  }
  next();
});

// Serve VIP.js file
app.get('/VIP.js', (req, res) => {
  res.sendFile(__dirname + '/VIP.js');
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
