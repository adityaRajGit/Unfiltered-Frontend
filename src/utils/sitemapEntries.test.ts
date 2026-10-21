import { test } from 'node:test';
import assert from 'node:assert/strict';
import { absoluteUrl } from './site.ts';
import { blogPath, type BlogPost } from './blog.ts';
import { buildSitemap } from './sitemapEntries.ts';

// Run with: node --test src/utils/sitemapEntries.test.ts

const post: BlogPost = {
  _id: '66a1f0c2b3d4e5f6a7b8c9d0',
  title: 'Remote Work',
  images: [],
  content: '',
  author: 'Asha Rao',
  category: 'workplace',
  created_at: '2026-09-01T10:00:00.000Z',
  updated_at: '2026-09-05T10:00:00.000Z',
};

test('static pages are listed on the www host', () => {
  const entries = buildSitemap([]);
  assert.equal(entries.length, 8);
  for (const e of entries) assert.ok(e.url.startsWith('https://www.stayunfiltered.com'), e.url);
});

test('private pages are never listed', () => {
  for (const e of buildSitemap([post])) assert.doesNotMatch(e.url, /\/pages\/(account|login)/);
});

test('static entries carry no fake dates or ignored hints', () => {
  for (const e of buildSitemap([])) {
    assert.equal('lastModified' in e, false, e.url);
    assert.equal('priority' in e, false, e.url);
    assert.equal('changeFrequency' in e, false, e.url);
  }
});

test('each post is listed at its slug URL with its real modified date', () => {
  const entries = buildSitemap([post]);
  assert.equal(entries.length, 9);
  const entry = entries.find((e) => e.url === absoluteUrl(blogPath(post)));
  assert.ok(entry);
  assert.equal(entry.lastModified, post.updated_at);
});

test('a never-edited post uses its creation date', () => {
  const entries = buildSitemap([{ ...post, updated_at: undefined }]);
  assert.equal(entries[8].lastModified, post.created_at);
});
