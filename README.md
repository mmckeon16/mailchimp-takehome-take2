# Mailchimp Takehome Assignment Take 2

## Use the correct node version

```
nvm use
```

## Install the dependencies

```
npm install
```

## Run the parser

```
npm run parse
```

This will parse the `test.md` file in the home directory of this project. The output is in `output/index.html` and is being served on `localhost:3000` if you would like to look at the html in the browser

## Run the tests

```
npm test
```

## Edge cases to test

- ~~handle linked headers~~
- ~~should have links in the middle of paragraphs~~
- spaces in front of headers (stretch)
- would be good to have a browser test
- ~~Having a `#` in the middle of a header line~~
- ~~single quotes must be replaced with `&#39;`. There are probably other characters for this to cover. Since the requirements dont mention this, I will only be replacing the single quote~~
