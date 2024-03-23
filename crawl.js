const url = require('node:url');
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const jsdom = require('jsdom');

const { JSDOM } = jsdom;

function normalizeURL(input) {
  const u = url.parse(input);
  let path = u.path;
  if (path.at(-1) == '/') {
    path = path.replace(/.$/, '');
  }
  const ans = u.host + path;
  console.log(ans);
  return ans;
}

function getUrlsFromHTML(htmlBody, baseURL) {
  const dom = new JSDOM(htmlBody);
  const document = dom.window.document;

  const links = document.querySelectorAll('a');

  const hrefs = Array.from(links).map((link) => baseURL + link.href);
  console.log(hrefs);
  return hrefs;
}

async function crawlPage(currentURL) {
  try {
    const response = await fetch(currentURL);

    // Check for HTTP error status codes (400+)
    if (!response.ok) {
      console.error(
        `Error: HTTP status ${response.status} - ${response.statusText}`
      );
      return;
    }

    // Check if response content-type is not text/html
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('text/html')) {
      console.error('Error: Response content type is not text/html');
      return;
    }

    // Read the response body as text
    const htmlBody = await response.text();
    console.log('HTML Body:', htmlBody);
  } catch (error) {
    console.error('Error occurred:', error);
  }
}

module.exports = {
  normalizeURL,
  getUrlsFromHTML,
  crawlPage,
};
