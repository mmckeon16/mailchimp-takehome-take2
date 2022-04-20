// Markdown conversion script
// read in mkdown (if passed via args, if not, fall back on test file)
// determine mapping to html via regex
// write back to index.html
// serve the html page

const fs = require("fs");

const regexH1 = /#\s[\s\S]*/;
const regexH1Content = /(?<=#\s)[\s\S]*/;
const regexH2 = /##\s[\s\S]*/;
const regexH2Content = /(?<=##\s)[\s\S]*/;

fs.readFile("./test.md", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const splitDataArray = data.split("\n");

  for (let i = 0; i < splitDataArray.length; i++) {
    if (splitDataArray[i].match(regexH2)) {
      const h2Content = splitDataArray[i].match(regexH2Content);
      fs.writeFile(
        "./index.html",
        `<h2>${h2Content}</h2>\n`,
        { flag: "a+" },
        err => {
          if (err) {
            console.error(err);
            return;
          }
          //file written successfully
        }
      );
    } else if (splitDataArray[i].match(regexH1)) {
      const h1Content = splitDataArray[i].match(regexH1Content);
      fs.writeFile(
        "./index.html",
        `<h1>${h1Content}</h1>\n`,
        { flag: "a+" },
        err => {
          if (err) {
            console.error(err);
            return;
          }
          //file written successfully
        }
      );
    }
  }
});
