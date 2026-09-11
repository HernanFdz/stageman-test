const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PAGE = path.join(__dirname, 'page.html');

const server = http.createServer((req, res) => {
  if (req.url === '/favicon.ico') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Read the file on every request so edits show up on the next refresh.
  fs.readFile(PAGE, (err, data) => {
    if (err) {
      console.error('Failed to read page.html:', err);
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(`Could not read page.html: ${err.message}\n`);
      return;
    }

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Serving page.html at http://localhost:${PORT}/`);
});
