import { test } from 'node:test';
import assert from 'node:assert/strict';
import { INDEXABLE_STATIC_PATHS } from './site.ts';
import { PAGE_SEO, pageMetadata } from './seo.ts';

// Run with: node --test src/utils/seo.test.ts

const entries = INDEXABLE_STATIC_PATHS.map((path) => ({ path, ...PAGE_SEO[path] }));

test('every indexable page has its own copy', () => {
  for (const e of entries) {
    assert.ok(e.title, `missing title for ${e.path}`);
    assert.ok(e.description, `missing description for ${e.path}`);
  }
});

test('titles fit in 60 characters and descriptions in 160', () => {
  for (const e of entries) {
    assert.ok(e.title.length <= 60, `${e.path} title is ${e.title.length} chars`);
    assert.ok(e.description.length <= 160, `${e.path} description is ${e.description.length} chars`);
  }
});

test('titles and descriptions are unique', () => {
  assert.equal(new Set(entries.map((e) => e.title)).size, entries.length);
  assert.equal(new Set(entries.map((e) => e.description)).size, entries.length);
});

test('copy makes no unsupported superlatives or statistics', () => {
  for (const e of entries) {
    assert.doesNotMatch(`${e.title} ${e.description}`, /world's leading|\d+%|500\+/i, e.path);
  }
});

test('pageMetadata points the canonical at the page itself', () => {
  const meta = pageMetadata('/pages/faq');
  assert.equal(meta.alternates?.canonical, '/pages/faq');
  assert.equal(meta.title, PAGE_SEO['/pages/faq'].title);
  assert.equal(meta.openGraph?.url, '/pages/faq');
});
