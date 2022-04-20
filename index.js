const fs = require("fs");

const generateHTML = require("./scripts/generateHTML");
const createServer = require("./scripts/server");

let markdown = "./test.md";
var argv = require("minimist")(process.argv.slice(2));
if (argv && argv._ && argv._.length > 1) {
  markdown = argv._[0];
}

fs.readFile(markdown, "utf8", async (err, data) => {
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
