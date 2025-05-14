const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  const { path: requestPath } = event;
  
  // Serve static files directly
  if (requestPath === '/vip.js') {
    try {
      const filePath = path.join(process.cwd(), 'public', 'vip.js');
      const fileContent = fs.readFileSync(filePath, 'utf8');
      
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/javascript',
          'Cache-Control': 'no-cache'
        },
        body: fileContent
      };
    } catch (err) {
      return { statusCode: 404, body: 'File not found' };
    }
  }

  // Serve HTML pages
  if (requestPath === '/') {
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>VIP File Hosting</title>
    </head>
    <body>
      <h1>Welcome to VIP Hosting</h1>
      <a href="/vip.js" download>Download VIP File</a>
    </body>
    </html>
    `;
    
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html' },
      body: html
    };
  }

  return { statusCode: 404, body: 'Not found' };
};
