const {
  regexHeader,
  headerMatch,
  regexParagraph,
  regexEmpty,
  regexLink,
  linkMatch,
  linkTextMatch,
  singleQuote
} = require("./regexMatches");

function generateHTML(data) {
  const lineArray = data.split("\n");
  let html = "";

  for (let i = 0; i < lineArray.length; i++) {
    let currentLine = lineArray[i];

    // need to replace single quotes to show correctly in html
    currentLine = currentLine.replace(singleQuote, "&#39;");

    // matching link tag
    if (currentLine.match(regexLink)) {
      const link = lineArray[i].match(linkMatch);
      const linkText = lineArray[i].match(linkTextMatch);

      const htmlLink = `<a href="${link[1]}">${linkText[1]}</a>`;
      currentLine = currentLine.replace(regexLink, htmlLink);
    }

    // matching header tag
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

      // matching empty line
    } else if (currentLine.match(regexEmpty) === null) {
      continue;

      // matching p tag
    } else if (currentLine.match(regexParagraph)) {
      html = html + `<p>${currentLine}</p>\n`;
    }
  }

  return html;
}
module.exports = generateHTML;
