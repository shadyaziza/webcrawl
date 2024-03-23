const { test, expect } = require('@jest/globals');

const { normalizeURL } = require('./crawl');

const test1Url = 'https://blog.boot.dev/path/';
const test2Url = 'https://blog.boot.dev/path';
const test3Url = 'http://blog.boot.dev/path/';
const test4Url = 'http://blog.boot.dev/path';

const result = 'blog.boot.dev/path';

test('url1', () => {
  expect(normalizeURL(test1Url)).toBe(result);
});
test('url2', () => {
  expect(normalizeURL(test2Url)).toBe(result);
});
test('url3', () => {
  expect(normalizeURL(test3Url)).toBe(result);
});
test('url4', () => {
  expect(normalizeURL(test4Url)).toBe(result);
});
