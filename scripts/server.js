const http = require("http");
const fs = require("fs");

function createServer() {
  const server = http.createServer((req, res) => {
    res.writeHead(200, { "content-type": "text/html" });
    fs.createReadStream("./output/index.html").pipe(res);
  });
  return server;
}

module.exports = createServer;
