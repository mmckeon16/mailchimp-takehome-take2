// Markdown conversion script
// read in mkdown (if passed via args, if not, fall back on test file)
// determine mapping to html via regex
// write back to index.html
// serve the html page

const fs = require("fs");

const regexH1 = /#\s[\s\S]*/;

fs.readFile("./requirements.md", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  //   console.log(data);
  const splitDataArray = data.split("\n");
  // console.log(splitDataArray[0]);

  const found = splitDataArray[0].match(regexH1);
  console.log(found);

  const split = splitDataArray[0].match(/(?<=#\s)[\s\S]*/);

  if (found) {
    fs.writeFile("./index.html", `<h1>${split}</h1>`, err => {
      if (err) {
        console.error(err);
        return;
      }
      //file written successfully
    });
  }
});
