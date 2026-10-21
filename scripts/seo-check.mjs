// Audits a running copy of the site against the SEO remediation spec.
// Usage: npm run seo:check -- http://localhost:3000
import { auditHtml } from '../src/utils/seoAudit.ts';
import { INDEXABLE_STATIC_PATHS, SITE_URL } from '../src/utils/site.ts';

const baseUrl = (process.argv[2] || '').replace(/\/+$/, '');
if (!baseUrl) {
  console.error('Usage: npm run seo:check -- <baseUrl>');
  process.exit(2);
}

async function get(url) {
  const res = await fetch(url, { redirect: 'follow' });
  return { status: res.status, body: await res.text() };
}

async function postPaths() {
  try {
    const { body } = await get(`${baseUrl}/sitemap.xml`);
    return [...body.matchAll(/<loc>([^<]+)<\/loc>/g)]
      .map((m) => new URL(m[1]).pathname)
      .filter((p) => p.startsWith('/pages/blogs/'))
      .slice(0, 3);
  } catch {
    return [];
  }
}

const paths = [...INDEXABLE_STATIC_PATHS, ...(await postPaths())];
let failed = 0;

for (const path of paths) {
  let violations;
  try {
    const { status, body } = await get(`${baseUrl}${path}`);
    violations = status === 200 ? auditHtml(body, { path, siteUrl: SITE_URL }) : [`status ${status}`];
  } catch (err) {
    violations = [`fetch failed: ${err.message}`];
  }
  if (violations.length) {
    failed++;
    console.log(`FAIL ${path}`);
    for (const v of violations) console.log(`     ${v}`);
  } else {
    console.log(`PASS ${path}`);
  }
}

console.log(`\n${paths.length - failed}/${paths.length} pages passed`);
process.exit(failed ? 1 : 0);
