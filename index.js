const fs = require("fs");
const http = require("http");

const regexHeader = /^#+\s/;
const headerMatch = /(?<=#*\s)[\s\S]*/;
const regexParagraph = /.*/;
const regexEmpty = /./;
const regexLink = /\[[\s\S]*\]\([\s\S]*\)/;
const linkMatch = /\(([^\)]+)\)/;
const linkTextMatch = /\[([^\)]+)\]/;
const singleQuote = /'/g;

fs.readFile("./test.md", "utf8", async (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const splitDataArray = data.split("\n");
  let html = "";

  for (let i = 0; i < splitDataArray.length; i++) {
    let currentLine = splitDataArray[i];
    currentLine = currentLine.replace(singleQuote, "&#39;");
    if (currentLine.match(regexLink)) {
      const link = splitDataArray[i].match(linkMatch);
      const linkText = splitDataArray[i].match(linkTextMatch);

      const htmlLink = `<a href="${link[1]}">${linkText[1]}</a>`;
      currentLine = currentLine.replace(regexLink, htmlLink);
    }

    const foundHeader = currentLine.match(regexHeader);
    if (foundHeader) {
      const tagSize = foundHeader[0].length - 1;
      if (tagSize < 7) {
        // then a valid header tag
        const headerContent = currentLine.match(headerMatch);
        html = html + `<h${tagSize}>${headerContent}</h${tagSize}>\n`;
      } else {
        // not a valid header, needs to be a p tag
        html = html + `<p>${currentLine}</p>\n`;
      }
    } else if (currentLine.match(regexEmpty) === null) {
      continue;
    } else if (currentLine.match(regexParagraph)) {
      html = html + `<p>${currentLine}</p>\n`;
    }
  }

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
