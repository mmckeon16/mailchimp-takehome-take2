// Markdown conversion script
// read in mkdown (if passed via args, if not, fall back on test file)
// determine mapping to html via regex
// write back to index.html
// serve the html page

const fs = require("fs");

const regexH1 = /^#\s[\s\S]*/;
const regexH1Content = /(?<=#\s)[\s\S]*/;
const regexH2 = /^##\s[\s\S]*/;
const regexH2Content = /(?<=##\s)[\s\S]*/;
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

  // logically there are headings, newlines, or paragraphs on each item. but within those lines, there can be a link - link should be searched first

  for (let i = 0; i < splitDataArray.length; i++) {
    let currentLine = splitDataArray[i];

    if (currentLine.match(regexLink)) {
      const link = splitDataArray[i].match(linkMatch);
      const linkText = splitDataArray[i].match(linkTextMatch);

      const htmlLink = `<a href="${link[1]}">${linkText[1]}</a>`;
      currentLine = currentLine.replace(regexLink, htmlLink);
    }

    if (currentLine.match(regexH2)) {
      const h2Content = currentLine.match(regexH2Content);
      html = html + `<h2>${h2Content}</h2>\n`;
    } else if (currentLine.match(regexH1)) {
      const h1Content = currentLine.match(regexH1Content);
      html = html + `<h1>${h1Content}</h1>\n`;
    } else if (currentLine.match(regexEmpty) === null) {
      continue;
    } else if (currentLine.match(regexP)) {
      html = html + `<p>${currentLine}</p>\n`;
    }
  }

  // write once to index.html
  fs.writeFile(
    "./index.html",
    html,
    // flag to add to end of file
    // { flag: "a+" },
    err => {
      if (err) {
        console.error(err);
        return;
      }
      //file written successfully
    }
  );
});
