const fs = require("fs");
const http = require("http");

const generateHTML = require("./scripts/generateHTML");

fs.readFile("./test.md", "utf8", async (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const html = generateHTML(data);

  // write once to index.html
  await fs.writeFile("./index.html", html, err => {
    if (err) {
      console.error(err);
      return;
    }
    //file written successfully
  });

  const server = http.createServer((req, res) => {
    res.writeHead(200, { "content-type": "text/html" });
    fs.createReadStream("index.html").pipe(res);
  });

  server.listen(process.env.PORT || 3000);
});
