const url = require('node:url');

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

module.exports = {
  normalizeURL,
};
