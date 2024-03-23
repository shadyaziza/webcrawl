const url = require('node:url');

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

module.exports = {
  normalizeURL,
  getUrlsFromHTML,
};
