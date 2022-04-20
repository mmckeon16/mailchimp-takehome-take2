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

fs.readFile("./test.md", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const splitDataArray = data.split("\n");
  let html = "";

  for (let i = 0; i < splitDataArray.length; i++) {
    if (splitDataArray[i].match(regexH2)) {
      const h2Content = splitDataArray[i].match(regexH2Content);
      html = html + `<h2>${h2Content}</h2>\n`;
    } else if (splitDataArray[i].match(regexH1)) {
      const h1Content = splitDataArray[i].match(regexH1Content);
      html = html + `<h1>${h1Content}</h1>\n`;
    } else if (splitDataArray[i].match(regexEmpty) === null) {
      continue;
    } else if (splitDataArray[i].match(regexP)) {
      html = html + `<p>${splitDataArray[i]}</p>\n`;
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
