// pages/api/allowlist.js

export default function handler(req, res) {
  // List of allowed IP addresses
  const allowedIps = ['62.201.240.35'];  // Change to your IP

  // Get the client IP address
  const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  // Check if the IP address is allowed
  if (allowedIps.includes(clientIp)) {
    return res.status(200).json({ message: 'Access granted' });  // IP is allowed
  } else {
    return res.status(403).json({ message: 'Access denied' });  // IP is not allowed
  }
}
