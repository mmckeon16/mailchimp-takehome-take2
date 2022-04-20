const generateHTML = require("../scripts/generateHTML");

describe("html generation", () => {
  test("simple mailchimp example", () => {
    const markdown =
      "# Sample Document\n\nHello!\n\nThis is sample markdown for the [Mailchimp](https://www.mailchimp.com) homework assignment.";
    const expected =
      '<h1>Sample Document</h1>\n<p>Hello!</p>\n<p>This is sample markdown for the <a href="https://www.mailchimp.com">Mailchimp</a> homework assignment.</p>\n';
    expect(generateHTML(markdown)).toBe(expected);
  });

  test("inline links mailchimp example", () => {
    const markdown =
      "# Header one\n\nHello there\n\nHow are you?\n\nWhat's going on?\n\n## Another Header\n\nThis is a paragraph [with an inline link](http://google.com). Neat, eh?\n\n## This is a header [with a link](http://yahoo.com)";
    const expected =
      '<h1>Header one</h1>\n<p>Hello there</p>\n<p>How are you?</p>\n<p>What&#39;s going on?</p>\n<h2>Another Header</h2>\n<p>This is a paragraph <a href="http://google.com">with an inline link</a>. Neat, eh?</p>\n<h2>This is a header <a href="http://yahoo.com">with a link</a></h2>\n';
    expect(generateHTML(markdown)).toBe(expected);
  });

  test("inline # in a header", () => {
    const markdown = "# Implement # a Markdown => HTML converter";
    const expected = "<h1>Implement # a Markdown => HTML converter</h1>\n";
    expect(generateHTML(markdown)).toBe(expected);
  });

  test("inline single quote replacement", () => {
    const markdown = "How're you?";
    const expected = "<p>How&#39;re you?</p>\n";
    expect(generateHTML(markdown)).toBe(expected);
  });
});
