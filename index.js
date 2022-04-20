// Markdown conversion script
// read in mkdown (if passed via args, if not, fall back on test file)
// determine mapping to html via regex
// write back to index.html
// serve the html page

const fs = require("fs");

const regexHeader = /#+/;
const headerMatch = /(?<=#*\s)[\s\S]*/;
const regexP = /.*/;
const regexEmpty = /./;
const regexLink = /\[[\s\S]*\]\([\s\S]*\)/;
const linkMatch = /\(([^\)]+)\)/;
const linkTextMatch = /\[([^\)]+)\]/;

fs.readFile("./test.md", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const splitDataArray = data.split("\n");
  let html = "";

  for (let i = 0; i < splitDataArray.length; i++) {
    let currentLine = splitDataArray[i];

    if (currentLine.match(regexLink)) {
      const link = splitDataArray[i].match(linkMatch);
      const linkText = splitDataArray[i].match(linkTextMatch);

      const htmlLink = `<a href="${link[1]}">${linkText[1]}</a>`;
      currentLine = currentLine.replace(regexLink, htmlLink);
    }

    const headerCount = currentLine.match(regexHeader);
    if (headerCount) {
      const tagSize = headerCount[0].length;
      // console.log(tagSize);
      if (tagSize < 7) {
        // then a valid header tag
        const headerContent = currentLine.match(headerMatch);
        html = html + `<h${tagSize}>${headerContent}</h${tagSize}>\n`;
      } else {
        // not a valid header, needs to be a p
        html = html + `<p>${currentLine}</p>\n`;
      }
    } else if (currentLine.match(regexEmpty) === null) {
      continue;
    } else if (currentLine.match(regexP)) {
      html = html + `<p>${currentLine}</p>\n`;
    }
  }

  // write once to index.html
  fs.writeFile("./index.html", html, err => {
    if (err) {
      console.error(err);
      return;
    }
    //file written successfully
  });
});
