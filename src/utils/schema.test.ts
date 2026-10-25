import { test } from 'node:test';
import assert from 'node:assert/strict';
import { absoluteUrl, SITE_URL } from './site.ts';
import {
  ORG_ID,
  blogPostingJsonLd,
  breadcrumbJsonLd,
  faqPageJsonLd,
  jsonLdString,
  serviceJsonLd,
  siteGraph,
} from './schema.ts';

// Run with: node --test src/utils/schema.test.ts

function strings(value: unknown, out: string[] = []): string[] {
  if (typeof value === 'string') out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => strings(v, out));
  else if (value && typeof value === 'object') Object.values(value).forEach((v) => strings(v, out));
  return out;
}

const post = {
  title: 'Remote Work',
  images: ['https://res.cloudinary.com/demo/image.jpg'],
  author: 'Asha Rao',
  created_at: '2026-09-01T10:00:00.000Z',
  updated_at: '2026-09-05T10:00:00.000Z',
};

const allOutputs = () => [
  siteGraph(),
  faqPageJsonLd([{ question: 'Q?', answer: 'A.' }]),
  breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/pages/blogs' }]),
  serviceJsonLd({ name: 'Therapy', description: 'd', path: '/pages/one-on-one', price: 1499 }),
  blogPostingJsonLd(post, '/pages/blogs/remote-work-66a1f0c2b3d4e5f6a7b8c9d0'),
];

test('the site graph carries no self-declared rating or MedicalBusiness type', () => {
  const json = JSON.stringify(siteGraph());
  assert.doesNotMatch(json, /aggregateRating/);
  assert.doesNotMatch(json, /MedicalBusiness/);
});

test('every site URL in every builder is on the www host', () => {
  for (const out of allOutputs()) {
    for (const s of strings(out)) {
      if (/stayunfiltered\.com/.test(s)) assert.ok(s.startsWith(SITE_URL), s);
    }
  }
});

test('third-party image URLs pass through unchanged', () => {
  const out = blogPostingJsonLd(post, '/pages/blogs/x');
  assert.deepEqual(out.image, ['https://res.cloudinary.com/demo/image.jpg']);
});

test('FAQ schema mirrors the questions and answers it is given', () => {
  const out = faqPageJsonLd([
    { question: 'One?', answer: 'First.' },
    { question: 'Two?', answer: 'Second.' },
  ]);
  assert.equal(out.mainEntity.length, 2);
  assert.equal(out.mainEntity[1].name, 'Two?');
  assert.equal(out.mainEntity[1].acceptedAnswer.text, 'Second.');
});

test('a service without a price has no offer', () => {
  const out = serviceJsonLd({ name: 'EAP', description: 'd', path: '/pages/corporate' });
  assert.equal('offers' in out, false);
});

test('a service with a price offers it in INR', () => {
  const out = serviceJsonLd({ name: 'Therapy', description: 'd', path: '/pages/one-on-one', price: 1499 });
  assert.equal(out.offers?.price, 1499);
  assert.equal(out.offers?.priceCurrency, 'INR');
});

test('blog posting dates, publisher and page come from the post', () => {
  const path = '/pages/blogs/remote-work-66a1f0c2b3d4e5f6a7b8c9d0';
  const out = blogPostingJsonLd(post, path);
  assert.equal(out.datePublished, post.created_at);
  assert.equal(out.dateModified, post.updated_at);
  assert.equal(out.publisher['@id'], ORG_ID);
  assert.equal(out.mainEntityOfPage, absoluteUrl(path));
  assert.equal(out.author.name, 'Asha Rao');
});

test('blog posting falls back to the creation date when never updated', () => {
  const out = blogPostingJsonLd({ ...post, updated_at: undefined }, '/pages/blogs/x');
  assert.equal(out.dateModified, post.created_at);
});

test('jsonLdString cannot be broken out of by a hostile title', () => {
  const data = { headline: '</script><script>alert(1)</script> & <!-- \u2028' };
  const out = jsonLdString(data);
  assert.doesNotMatch(out, /[<>&\u2028\u2029]/);
  assert.deepEqual(JSON.parse(out), data);
});

test('breadcrumb positions count from 1', () => {
  const out = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/pages/blogs' },
    { name: 'Post', path: '/pages/blogs/x' },
  ]);
  assert.deepEqual(out.itemListElement.map((i) => i.position), [1, 2, 3]);
  assert.equal(out.itemListElement[2].item, absoluteUrl('/pages/blogs/x'));
});
