import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  blogExcerpt,
  blogPath,
  blogTitle,
  idFromBlogParam,
  isBlogId,
  parseBlog,
  parseBlogList,
  slugify,
  truncateTitle,
  type BlogPost,
} from './blog.ts';

// Run with: node --test src/utils/blog.test.ts

const id = '66a1f0c2b3d4e5f6a7b8c9d0';
const post: BlogPost = {
  _id: id,
  title: 'Remote Work',
  images: [],
  content: 'Body',
  author: 'Asha Rao',
  category: 'workplace',
  created_at: '2026-09-01T10:00:00.000Z',
};

test('slugify makes a lowercase hyphenated slug', () => {
  assert.equal(slugify('Mindfulness for Busy Professionals!'), 'mindfulness-for-busy-professionals');
});

test('slugify strips accents and collapses symbols', () => {
  assert.equal(slugify('Café   Stress & Burnout'), 'cafe-stress-burnout');
});

test('slugify returns empty for titles with no Latin letters or digits', () => {
  assert.equal(slugify('मानसिक स्वास्थ्य'), '');
  assert.equal(slugify('!!!'), '');
});

test('slugify caps long titles at 60 characters on a word boundary', () => {
  const slug = slugify('word '.repeat(20) + 'end');
  assert.ok(slug.length <= 60, `${slug.length}`);
  assert.doesNotMatch(slug, /-$/);
  assert.doesNotMatch(slug, /wor$/);
});

test('blogPath puts the slug before the id', () => {
  assert.equal(blogPath({ _id: id, title: 'Remote Work' }), `/pages/blogs/remote-work-${id}`);
});

test('blogPath falls back to the bare id when the title has no slug', () => {
  assert.equal(blogPath({ _id: id, title: '!!!' }), `/pages/blogs/${id}`);
});

test('idFromBlogParam reads the trailing id from slug or bare forms', () => {
  assert.equal(idFromBlogParam(`remote-work-${id}`), id);
  assert.equal(idFromBlogParam(`old-title-${id}`), id);
  assert.equal(idFromBlogParam(id), id);
});

test('idFromBlogParam rejects params without an id', () => {
  assert.equal(idFromBlogParam('remote-work'), null);
  assert.equal(idFromBlogParam(''), null);
});

test('isBlogId accepts only a bare 24-character hex id', () => {
  assert.equal(isBlogId(id), true);
  assert.equal(isBlogId('../admin'), false);
  assert.equal(isBlogId(`${id}/remove`), false);
  assert.equal(isBlogId(`x-${id}`), false);
  assert.equal(isBlogId(''), false);
});

test('blogExcerpt strips HTML and decodes entities', () => {
  assert.equal(blogExcerpt('<p>Hello &amp; welcome</p><p>to therapy</p>'), 'Hello & welcome to therapy');
});

test('blogExcerpt truncates on a word boundary with an ellipsis', () => {
  const out = blogExcerpt('calm '.repeat(80));
  assert.ok(out.length <= 155, `${out.length}`);
  assert.match(out, /calm…$/);
});

test('truncateTitle leaves short titles alone and trims long ones', () => {
  assert.equal(truncateTitle('Short title'), 'Short title');
  const out = truncateTitle('anxiety '.repeat(12));
  assert.ok(out.length <= 60, `${out.length}`);
  assert.match(out, /anxiety…$/);
});

test('blogTitle adds the brand only when it still fits in 60 characters', () => {
  assert.equal(blogTitle('Remote Work'), 'Remote Work | Stay Unfiltered');
  const long = 'Mindfulness Practices for Busy Corporate Professionals';
  assert.equal(blogTitle(long), long);
  assert.ok(blogTitle('anxiety '.repeat(12)).length <= 60);
});

test('parseBlogList reads either response shape', () => {
  assert.deepEqual(parseBlogList({ data: { blogList: [post], totalCount: 7 } }), { blogs: [post], total: 7 });
  assert.deepEqual(parseBlogList({ data: { blogs: [post], blogCount: 1 } }), { blogs: [post], total: 1 });
});

test('parseBlogList returns an empty result for anything unexpected', () => {
  const empty = { blogs: [], total: 0 };
  assert.deepEqual(parseBlogList(null), empty);
  assert.deepEqual(parseBlogList({}), empty);
  assert.deepEqual(parseBlogList({ data: { message: 'err' } }), empty);
});

test('parseBlog reads the post or returns null', () => {
  assert.deepEqual(parseBlog({ data: { blog: post } }), post);
  assert.equal(parseBlog({}), null);
  assert.equal(parseBlog(null), null);
});
