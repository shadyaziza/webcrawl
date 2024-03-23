function sortPagesByInboundLinks(pages) {
  return Object.entries(pages).sort((a, b) => b[1] - a[1]);
}

function printReport(pages) {
  console.log('Report starting...');

  const sortedPages = sortPagesByInboundLinks(pages);

  for (const [url, count] of sortedPages) {
    console.log(`Found ${count} internal links to ${url}`);
  }
}

module.exports = {
  printReport,
};
