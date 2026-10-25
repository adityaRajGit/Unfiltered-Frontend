import { test } from 'node:test';
import assert from 'node:assert/strict';
import { absoluteUrl, SITE_URL } from './site.ts';
import { auditHtml } from './seoAudit.ts';

// Run with: node --test src/utils/seoAudit.test.ts

type PageOpts = {
  canonical?: string[];
  h1s?: string[];
  title?: string;
  description?: string;
  body?: string;
  jsonLd?: unknown[];
};

function page({
  canonical = [`${SITE_URL}/pages/faq`],
  h1s = ['Frequently Asked Questions'],
  title = 'FAQ | Stay Unfiltered',
  description = 'Answers about therapy sessions and pricing.',
  body = '<p>Sessions from ₹1,499.</p>',
  jsonLd = [],
}: PageOpts = {}): string {
  return [
    '<html><head>',
    `<title>${title}</title>`,
    `<meta name="description" content="${description}"/>`,
    ...canonical.map((href) => `<link rel="canonical" href="${href}"/>`),
    ...jsonLd.map((d) => `<script type="application/ld+json">${JSON.stringify(d)}</script>`),
    '</head><body>',
    ...h1s.map((h) => `<h1>${h}</h1>`),
    body,
    '</body></html>',
  ].join('');
}

const opts = { path: '/pages/faq', siteUrl: SITE_URL };
const has = (v: string[], word: string) => v.some((m) => m.includes(word));

test('absoluteUrl joins paths onto the www host with exactly one slash', () => {
  assert.equal(absoluteUrl('/pages/faq'), 'https://www.stayunfiltered.com/pages/faq');
  assert.equal(absoluteUrl('pages/faq'), 'https://www.stayunfiltered.com/pages/faq');
  assert.equal(absoluteUrl('/'), 'https://www.stayunfiltered.com/');
});

test('a clean page has no violations', () => {
  assert.deepEqual(auditHtml(page(), opts), []);
});

test('homepage canonical is the host with a trailing slash', () => {
  assert.deepEqual(auditHtml(page({ canonical: [`${SITE_URL}/`] }), { path: '/', siteUrl: SITE_URL }), []);
});

test('homepage canonical without a trailing slash is accepted (Next.js renders it that way)', () => {
  assert.deepEqual(auditHtml(page({ canonical: [SITE_URL] }), { path: '/', siteUrl: SITE_URL }), []);
});

test('two canonical tags are a violation', () => {
  const v = auditHtml(page({ canonical: [`${SITE_URL}/pages/faq`, `${SITE_URL}/pages/faq`] }), opts);
  assert.ok(has(v, 'canonical'), v.join('\n'));
});

test('a canonical pointing at the non-www homepage is a violation', () => {
  const v = auditHtml(page({ canonical: ['https://stayunfiltered.com'] }), opts);
  assert.ok(has(v, 'canonical'), v.join('\n'));
});

test('zero or several H1s are violations', () => {
  assert.ok(has(auditHtml(page({ h1s: [] }), opts), 'h1'));
  assert.ok(has(auditHtml(page({ h1s: ['A', 'B'] }), opts), 'h1'));
});

test('a zero price split by a React text comment is caught', () => {
  const v = auditHtml(page({ body: '<p>Save ₹<!-- -->0.00</p>' }), opts);
  assert.ok(has(v, 'price'), v.join('\n'));
});

test('NaN in the page text is caught', () => {
  assert.ok(has(auditHtml(page({ body: '<span>NaN<!-- -->% savings</span>' }), opts), 'price'));
});

test('a real price is not flagged', () => {
  assert.equal(has(auditHtml(page({ body: '<p>₹1,499 per session</p>' }), opts), 'price'), false);
});

test('a 61-character title is a violation', () => {
  assert.ok(has(auditHtml(page({ title: 'x'.repeat(61) }), opts), 'title'));
});

test('a 161-character description is a violation', () => {
  assert.ok(has(auditHtml(page({ description: 'x'.repeat(161) }), opts), 'description'));
});

test('an encoded ampersand counts as one character', () => {
  const title = 'a'.repeat(59) + '&amp;';
  assert.equal(has(auditHtml(page({ title }), opts), 'title'), false);
});

test('aggregateRating in JSON-LD is a violation', () => {
  const v = auditHtml(page({ jsonLd: [{ '@type': 'Organization', aggregateRating: { ratingValue: '4.8' } }] }), opts);
  assert.ok(has(v, 'aggregateRating'), v.join('\n'));
});

test('a non-www site URL inside JSON-LD is a violation', () => {
  const v = auditHtml(page({ jsonLd: [{ '@type': 'Organization', url: 'https://stayunfiltered.com/' }] }), opts);
  assert.ok(has(v, 'JSON-LD'), v.join('\n'));
});
