const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
const jsdom = require('jsdom');

const { JSDOM } = jsdom;

function normalizeURL(input) {
  const url = new URL(input);
  let path = url.pathname;
  if (path.endsWith('/')) {
    path = path.slice(0, -1);
  }
  const ans = url.hostname + path;
  console.log(ans);
  return ans;
}

function getUrlsFromHTML(htmlBody, baseURL) {
  const dom = new JSDOM(htmlBody);
  const document = dom.window.document;

  const links = document.querySelectorAll('a');

  const hrefs = Array.from(links).map((link) =>
    new URL(link.href, baseURL).toString()
  );
  console.log(hrefs);
  return hrefs;
}

async function crawlPage(baseURL, currentURL, pages = {}) {
  if (!currentURL) return pages;
  const currentUrlHost = new URL(currentURL).hostname;
  const baseURLHost = new URL(baseURL).hostname;

  if (currentUrlHost !== baseURLHost) return pages;

  const normalizedCurrentUrl = normalizeURL(currentURL);

  if (pages[normalizedCurrentUrl]) {
    pages[normalizedCurrentUrl]++;
    return pages;
  } else {
    pages[normalizedCurrentUrl] = 1;
  }

  try {
    console.log('Crawling:', currentURL);
    const response = await fetch(currentURL);

    // Check for HTTP error status codes (400+)
    if (!response.ok) {
      console.error(
        `Error: HTTP status ${response.status} - ${response.statusText}`
      );
      return pages;
    }

    // Check if response content-type is not text/html
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('text/html')) {
      console.error('Error: Response content type is not text/html');
      return pages;
    }

    // Read the response body as text
    const htmlBody = await response.text();
    console.log('HTML Body:', htmlBody);
    const urls = getUrlsFromHTML(htmlBody, currentURL);

    // Recursively crawl each URL found on the page
    for (const url of urls) {
      if (url) {
        await crawlPage(baseURL, url, pages);
      }
    }
  } catch (error) {
    console.error('Error occurred:', error);
  }

  return pages;
}

module.exports = {
  normalizeURL,
  getUrlsFromHTML,
  crawlPage,
};
