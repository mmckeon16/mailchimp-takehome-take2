const fs = require("fs");

const generateHTML = require("./scripts/generateHTML");
const createServer = require("./scripts/server");

fs.readFile("./test.md", "utf8", async (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const html = generateHTML(data);

  await fs.writeFile("./output/index.html", html, err => {
    if (err) {
      console.error(err);
      return;
    }
    //file written successfully
  });

  const server = createServer();

  server.listen(process.env.PORT || 3000);
});
