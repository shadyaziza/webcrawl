const { getUrlsFromHTML, crawlPage } = require('./crawl');
const process = require('node:process');
const { printReport } = require('./report');

function main() {
  // Check if there is exactly one command line argument
  if (process.argv.length !== 3) {
    console.error('Exactly one command line argument is required.');
    process.exit(1); // Exit the application with a non-zero status code to indicate failure
  }

  // Access the single argument (process.argv[0] is node, process.argv[1] is the script name)
  const argument = process.argv[2];
  console.log('Command line argument:', argument);

  console.log('----');
  console.log(printReport(crawlPage(argument, argument)));
  console.log('----');
  // The rest of your application logic goes here
}

main();
