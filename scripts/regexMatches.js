module.exports = {
  regexHeader: /^#+\s/,
  headerMatch: /(?<=#*\s)[\s\S]*/,
  regexParagraph: /.*/,
  regexEmpty: /./,
  regexLink: /\[[\s\S]*\]\([\s\S]*\)/,
  linkMatch: /\(([^\)]+)\)/,
  linkTextMatch: /\[([^\)]+)\]/,
  singleQuote: /'/g
};
