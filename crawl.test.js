const { test, expect } = require('@jest/globals');

const { normalizeURL, getUrlsFromHTML } = require('./crawl');

const test1Url = 'https://blog.boot.dev/path/';
const test2Url = 'https://blog.boot.dev/path';
const test3Url = 'http://blog.boot.dev/path/';
const test4Url = 'http://blog.boot.dev/path';

const normalized = 'blog.boot.dev/path';

test('url1', () => {
  expect(normalizeURL(test1Url)).toBe(normalized);
});
test('url2', () => {
  expect(normalizeURL(test2Url)).toBe(normalized);
});
test('url3', () => {
  expect(normalizeURL(test3Url)).toBe(normalized);
});
test('url4', () => {
  expect(normalizeURL(test4Url)).toBe(normalized);
});

const testHtmlString =
  '<!DOCTYPE html><html><body><a href="/help">Example</a><a href="/about">Another Example</a></body></html>';

const baseUrl = 'test.com';
const hrefResult = [baseUrl + '/help', baseUrl + '/about'];

test('getUrlsFromHTML', () => {
  expect(getUrlsFromHTML(testHtmlString, baseUrl)).toStrictEqual(hrefResult);
});
