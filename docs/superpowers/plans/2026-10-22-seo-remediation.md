# SEO Remediation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every page of stayunfiltered.com indexable on its own canonical URL, with real content (prices, blog posts, FAQ answers) in the first HTML response, accurate structured data, and no unverifiable trust claims.

**Architecture:** One host constant (`src/utils/site.ts`) feeds metadata, sitemap, robots and JSON-LD. Pure, unit-tested helpers in `src/utils/` (page copy, schema builders, blog URLs, pricing, HTML audit) are consumed by thin server components. Blog and one-on-one pages move their first data fetch to the server through `src/lib/*Api.ts` and pass it to the existing client components as initial props. `scripts/seo-check.mjs` audits a running site and is the acceptance test for the whole plan.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind 4, Node 24 `node --test` with native type stripping.

**Spec:** `docs/superpowers/specs/2026-10-22-seo-remediation.md`

## Global Constraints

- Host: `https://www.stayunfiltered.com`, written only in `src/utils/site.ts` as `SITE_URL` (no trailing slash).
- Unit-tested modules (`src/utils/*.ts`) import siblings by relative path with the `.ts` extension and never use the `@/` alias or runtime imports from `next`/`react`. `import type` is fine. Follow `src/utils/istTime.test.ts`. App code imports these modules through `@/utils/...` as usual. Task 1 enables `allowImportingTsExtensions` so `tsc` accepts the `.ts` sibling imports; it is valid because the project already sets `noEmit: true`.
- Server fetches use `process.env.NEXT_PUBLIC_BACKEND_URL`, `next: { revalidate: 300 }`, and never throw. Any network or parse failure returns `[]`/`null`, so `npm run build` succeeds with the CI placeholder `https://ci.invalid/api/v1`.
- Titles ≤ 60 characters, meta descriptions ≤ 160, unique per route.
- Banned in titles, descriptions, JSON-LD and page copy: "World's Leading" (any case), "HIPAA", unsourced "42%", "35%", "68%", "500+", "3-5x".
- No backend changes. API shapes: `POST /blog/list` → `data.blogList | data.blogs`, `data.totalCount | data.blogCount`; `GET /blog/:id` → `data.blog`; `POST /package/list` → `data.packageList`.
- Every task ends green on: `npm run typecheck`, `npm test`, `npm run lint`.

## Review Focus

1. **Backend unreachable at build or request time.** Pages render with empty blog list, skeleton price and no Offer, and the build passes. Task 5 tests `parseBlogList`/`parseBlog`/`parsePackage` on `null`, `{}` and error-shaped JSON. Task 7 and Task 8 each run `npm run build` with `NEXT_PUBLIC_BACKEND_URL=https://ci.invalid/api/v1`.
2. **Post title edited after links were shared.** The old slug URL permanently redirects to the new one and never 404s. Task 5 tests `idFromBlogParam('old-title-<id>')` returns the id; Task 7 manually verifies a wrong slug redirects 308.
3. **Titles with Hindi/Devanagari, emoji or only punctuation.** `slugify` returns `''` and `blogPath` falls back to `/pages/blogs/<id>`, never `/pages/blogs/-<id>`. Tested in Task 5.
4. **Blog content stored as HTML (Tiptap editor) rather than plain text.** `blogExcerpt` strips tags and entities before truncating, so descriptions never contain `<p>`. Tested in Task 5.
5. **React SSR inserts `<!-- -->` between adjacent text nodes** (for example `₹<!-- -->0`). `auditHtml` strips comments and tags before the price check, so it catches the bug instead of missing it. Tested in Task 1.

## Page copy (used by Task 2)

| Path | Title | Description |
|---|---|---|
| `/` | Online Therapy & Corporate Mental Wellness in India | Private online therapy with qualified Indian therapists, plus employee assistance programs, workshops and webinars for companies. Book a session today. |
| `/pages/one-on-one` | Online Therapy Sessions in India \| Stay Unfiltered | Book private, confidential one-on-one online therapy for stress, anxiety, depression and relationships. Choose a single session or a discounted package. |
| `/pages/corporate` | Employee Assistance Program (EAP) India \| Stay Unfiltered | Confidential employee counselling, manager training and wellbeing workshops for Indian companies. Request a demo of the Stay Unfiltered EAP. |
| `/pages/webinar` | Free Mental Health Webinars \| Stay Unfiltered | Join free, expert-led webinars on stress, burnout, work-life balance and workplace mental health. See upcoming sessions and register. |
| `/pages/about` | About Stay Unfiltered \| Online Mental Health Platform | Stay Unfiltered is an Indian online mental health platform for individuals and companies, founded in 2024. Learn about our approach and care team. |
| `/pages/blogs` | Mental Health Blog \| Stay Unfiltered | Practical articles on therapy, stress, anxiety, burnout and workplace mental health in India, written for individuals and HR teams. |
| `/pages/faq` | FAQ: Online Therapy & EAP Questions \| Stay Unfiltered | Answers about Stay Unfiltered therapy sessions, pricing, confidentiality, corporate EAP plans and how to get started. |
| `/pages/privacy` | Privacy Policy \| Stay Unfiltered | How Stay Unfiltered collects, uses and protects your personal data, in line with India's Digital Personal Data Protection Act, 2023. |

---

### Task 1: HTML audit tool (acceptance test)

**Files:**
- Create: `src/utils/site.ts`, `src/utils/seoAudit.ts`, `src/utils/seoAudit.test.ts`, `scripts/seo-check.mjs`
- Modify: `package.json` (scripts), `tsconfig.json` (add `"allowImportingTsExtensions": true` to `compilerOptions`)

**Interfaces:**
- Produces: `SITE_URL: string`; `absoluteUrl(path: string): string`; `INDEXABLE_STATIC_PATHS: readonly StaticPath[]` and `type StaticPath = '/' | '/pages/one-on-one' | '/pages/corporate' | '/pages/webinar' | '/pages/about' | '/pages/blogs' | '/pages/faq' | '/pages/privacy'` (all in `site.ts`); `auditHtml(html: string, opts: { path: string; siteUrl: string }): string[]` returning human-readable violations, empty when clean.

- [ ] **Step 1: Write failing tests in `src/utils/seoAudit.test.ts`**

Build fixtures with a small `page({ canonical, h1s, title, description, body, jsonLd })` helper in the test file.
- `absoluteUrl('/pages/faq') === 'https://www.stayunfiltered.com/pages/faq'`, `absoluteUrl('pages/faq')` gives the same, and `absoluteUrl('/') === 'https://www.stayunfiltered.com/'`.
- A clean page for path `/pages/faq` → `[]`.
- Two canonical tags → one violation containing `"canonical"`. A canonical of `https://stayunfiltered.com` on `/pages/faq` → a violation containing `"canonical"`.
- Zero H1s and two H1s each → a violation containing `"h1"`.
- A body of `Save ₹<!-- -->0.00` → a violation containing `"price"`; same for `NaN% savings`. `₹1,499` → no violation.
- A 61-character title → a violation containing `"title"`. A 161-character description → a violation containing `"description"`. `&amp;` counts as one character.
- JSON-LD containing `"aggregateRating"` → a violation. JSON-LD with `"url":"https://stayunfiltered.com/"` → a violation containing `"JSON-LD"`.

- [ ] **Step 2: Run `node --test src/utils/seoAudit.test.ts`.** Expected: FAIL (module not found).

- [ ] **Step 3: Implement `site.ts` and `auditHtml` in `seoAudit.ts`.**

Use regex extraction, no DOM library. Price and text checks run on the HTML with `<!--…-->` comments, `<script>`/`<style>` blocks and tags removed, and whitespace collapsed. The price pattern is `NaN` or `₹\s*0(?![\d,])` (so `₹0.00` matches and `₹1,499` doesn't). Decode `&amp; &#x27; &quot; &lt; &gt;` before measuring title and description length. JSON-LD URLs: `JSON.parse` each `application/ld+json` block, walk all string values, and flag any matching `^https?://(www\.)?stayunfiltered\.com` that doesn't start with `siteUrl`.

- [ ] **Step 4: Run the test.** Expected: PASS.

- [ ] **Step 5: Implement `scripts/seo-check.mjs <baseUrl>`** and add the script `"seo:check": "node scripts/seo-check.mjs"` to `package.json`.

It imports `../src/utils/seoAudit.ts` and `../src/utils/site.ts`. It fetches each `INDEXABLE_STATIC_PATHS` entry from `baseUrl` and the first 3 `<loc>` entries under `/pages/blogs/` from `${baseUrl}/sitemap.xml`. For post URLs it audits against their pathname. It prints `PASS <path>` or `FAIL <path>: <violations>` per page and exits 1 on any failure. The `siteUrl` passed to `auditHtml` is always `SITE_URL`, even when `baseUrl` is localhost.

- [ ] **Step 6: Record the baseline with `npm run seo:check -- https://www.stayunfiltered.com`.** Expected: exit 1, with canonical failures on every page plus the price failure on `/pages/one-on-one`. Paste the output into the commit body.

- [ ] **Step 7: Commit.** First confirm `npm run typecheck` still passes with the tsconfig change. Then `git add src/utils/site.ts src/utils/seoAudit.ts src/utils/seoAudit.test.ts scripts/seo-check.mjs package.json tsconfig.json` then `git commit -m "test(seo): add HTML audit and seo:check script"`

---

### Task 2: Per-page metadata and canonicals

**Files:**
- Create: `src/utils/seo.ts`, `src/utils/seo.test.ts`, `src/app/(main)/pages/faq/layout.tsx`, `src/app/(main)/pages/account/layout.tsx`, `src/app/(main)/pages/login/layout.tsx`
- Modify: `src/app/layout.tsx:187` (delete the canonical `<link>`); `src/app/(main)/layout.tsx:11-93`; `src/app/(main)/page.tsx`; `src/app/(main)/pages/{about,corporate,webinar,blogs,privacy}/page.tsx`; `src/app/(main)/pages/one-on-one/layout.tsx`

**Interfaces:**
- Consumes: `SITE_URL`, `StaticPath`, `INDEXABLE_STATIC_PATHS` from Task 1.
- Produces: `PAGE_SEO: Record<StaticPath, { title: string; description: string }>` (values exactly from the Page copy table) and `pageMetadata(path: StaticPath): Metadata`, returning `{ title, description, alternates: { canonical: path }, openGraph: { title, description, url: path } }`. Also `NOINDEX: Metadata = { robots: { index: false, follow: false } }`.

- [ ] **Step 1: Write failing tests in `src/utils/seo.test.ts`.**
  - Every `INDEXABLE_STATIC_PATHS` entry has a `PAGE_SEO` entry.
  - Every title is ≤ 60 characters and every description ≤ 160.
  - All titles are unique, and all descriptions are unique.
  - No title or description matches `/world's leading|\d+%|500\+/i`.
  - `pageMetadata('/pages/faq').alternates.canonical === '/pages/faq'`.

- [ ] **Step 2: Run `node --test src/utils/seo.test.ts`.** Expected: FAIL.

- [ ] **Step 3: Implement `seo.ts`.**

- [ ] **Step 4: Run the test.** Expected: PASS.

- [ ] **Step 5: Wire up the metadata.**
  - In `(main)/layout.tsx`:
    - Set `metadataBase: new URL(SITE_URL)`.
    - Delete `alternates`, `keywords`, `authors`, `creator` and `publisher`.
    - Set the default `title` and `description` to the `/` row.
    - Make `openGraph` and `twitter` use the `/` row. `openGraph.url` becomes `'/'`.
  - Each static route replaces its whole `export const metadata` with `export const metadata = pageMetadata('<path>')`. This removes their `keywords` and `openGraph` blocks.
    - `/` uses `(main)/page.tsx`, and `/pages/one-on-one` keeps using its existing `layout.tsx`.
    - `/pages/faq` gets a new `faq/layout.tsx` that passes children through, because its page is a client component until Task 4.
  - `account/layout.tsx` and `login/layout.tsx` export `metadata = NOINDEX` and pass children through.

- [ ] **Step 6: Verify against a local build.** Run `npm run build && npm start`, then in a second shell `npm run seo:check -- http://localhost:3000`. Expected: no canonical, title or description failures. Price and h1 failures remain; Tasks 8 and 9 fix them.

- [ ] **Step 7: Commit.** `git commit -m "fix(seo): self-referencing canonicals and per-page metadata on www host"`

---

### Task 3: Structured data

**Files:**
- Create: `src/utils/schema.ts`, `src/utils/schema.test.ts`, `src/component/global/JsonLd.tsx`
- Modify: `src/app/layout.tsx:17-190` (replace the three JSON-LD objects and their `<script>` tags)

**Interfaces:**
- Consumes: `SITE_URL`, `absoluteUrl`.
- Produces (all return plain objects with `@context`):
  - `ORG_ID = SITE_URL + '/#org'` and `WEBSITE_ID = SITE_URL + '/#website'`.
  - `siteGraph()`: Organization and WebSite in one `@graph`, with values from spec R5.2.
  - `faqPageJsonLd(items: { question: string; answer: string }[])`.
  - `breadcrumbJsonLd(crumbs: { name: string; path: string }[])`.
  - `serviceJsonLd(opts: { name: string; description: string; path: string; price?: number })`. When `price` is given, it adds `offers: { '@type': 'Offer', price, priceCurrency: 'INR', url }`.
  - `blogPostingJsonLd(post: { title: string; images: string[]; author: string; created_at: string; updated_at?: string }, path: string)`.
  - `<JsonLd data={object} />` renders `<script type="application/ld+json">` with `JSON.stringify(data).replace(/</g, '\\u003c')`.

- [ ] **Step 1: Write failing tests in `src/utils/schema.test.ts`.**
  - `JSON.stringify(siteGraph())` contains no `aggregateRating` and no `MedicalBusiness`.
  - Every `http` string in every builder's output starts with `SITE_URL`. Walk the values recursively and pass absolute image URLs through as given.
  - `faqPageJsonLd` of 2 items has `mainEntity.length === 2`, and its answer text equals the input.
  - `serviceJsonLd` without `price` has no `offers` key. With `price: 1499` it has `offers.price === 1499` and `offers.priceCurrency === 'INR'`.
  - `blogPostingJsonLd` uses `updated_at` for `dateModified`, falls back to `created_at` when `updated_at` is missing, sets `publisher['@id'] === ORG_ID`, and sets `mainEntityOfPage === absoluteUrl(path)`.
  - `breadcrumbJsonLd` positions run 1..n.

- [ ] **Step 2: Run `node --test src/utils/schema.test.ts`.** Expected: FAIL.

- [ ] **Step 3: Implement `schema.ts` and `JsonLd.tsx`.** In `src/app/layout.tsx`, render only `<JsonLd data={siteGraph()} />` in `<head>`, and delete `jsonLd`, `organizationJsonLd` and `faqJsonLd`.

- [ ] **Step 4: Run the tests, then verify locally.** Run `npm test` and expect PASS. Then run `npm run seo:check -- http://localhost:3000` against a fresh build and expect no JSON-LD or aggregateRating failures.

- [ ] **Step 5: Commit.** `git commit -m "fix(seo): replace sitewide JSON-LD with Organization/WebSite graph, drop self-serving rating"`

---

### Task 4: FAQ answers in HTML

**Files:**
- Create: `src/data/faq.ts`
- Modify: `src/app/(main)/pages/faq/page.tsx` (server component); `src/app/(main)/pages/faq/layout.tsx` (from Task 2, optional to fold back)

**Interfaces:**
- Consumes: `faqPageJsonLd`, `JsonLd`.
- Produces: `type FaqItem = { question: string; answer: string }` and `FAQ_CATEGORIES: { title: string; icon: 'building' | 'lock' | 'handshake' | 'users' | 'chart'; questions: FaqItem[] }[]`. The data moves verbatim from the current page's `faqCategories`, and each icon JSX becomes its key.

- [ ] **Step 1: Move the data to `src/data/faq.ts`.** Rewrite the page as a server component without `"use client"` and without `useState`. Each question is a `<details>` whose `<summary>` holds the question, with the answer in the body. Use Tailwind `group-open:` classes for the active style and the chevron rotation. Map icon keys to the existing `react-icons` components. Set the H1 text to "Frequently Asked Questions". Render `<JsonLd data={faqPageJsonLd(FAQ_CATEGORIES.flatMap(c => c.questions))} />`.

- [ ] **Step 2: Verify.** Run `npm run build && npm start`, then `curl -s localhost:3000/pages/faq | grep -c "<details"`. Expected: 16. Then check that `curl -s localhost:3000/pages/faq | grep -o "Stay Unfiltered is an online mental health platform"` prints the answer text. Finally, `seo:check` must show no failures for `/pages/faq`.

- [ ] **Step 3: Commit.** `git commit -m "fix(seo): render FAQ answers server-side and scope FAQPage schema to /faq"`

---

### Task 5: Blog URL and API helpers

**Files:**
- Create: `src/utils/blog.ts`, `src/utils/blog.test.ts`, `src/lib/blogApi.ts`

**Interfaces:**
- Produces in `blog.ts`:
  - `type BlogPost = { _id: string; title: string; images: string[]; content: string; author: string; category: string; created_at: string; updated_at?: string }`
  - `slugify(title: string): string`
  - `blogPath(post: Pick<BlogPost, '_id' | 'title'>): string`
  - `idFromBlogParam(param: string): string | null`
  - `blogExcerpt(content: string, max?: number): string`, with default 155
  - `truncateTitle(title: string, max?: number): string`, with default 60
  - `parseBlogList(json: unknown): { blogs: BlogPost[]; total: number }`
  - `parseBlog(json: unknown): BlogPost | null`
- Produces in `blogApi.ts` (server-only, not unit-tested):
  - `fetchBlogList(params: { pageNum: number; pageSize: number; filters?: Record<string, unknown> }): Promise<{ blogs: BlogPost[]; total: number }>`
  - `fetchBlog(id: string): Promise<BlogPost | null>`, wrapped in React `cache()`
  - `fetchAllBlogs(): Promise<BlogPost[]>`

- [ ] **Step 1: Write failing tests in `src/utils/blog.test.ts`.** Use `id = '66a1f0c2b3d4e5f6a7b8c9d0'`.
  - `slugify('Mindfulness for Busy Professionals!') === 'mindfulness-for-busy-professionals'`.
  - `slugify('Café   Stress & Burnout') === 'cafe-stress-burnout'`.
  - `slugify('मानसिक स्वास्थ्य') === ''` and `slugify('!!!') === ''`.
  - `slugify` of a 100-character title is ≤ 60 characters and does not end in `-`.
  - `blogPath({ _id: id, title: 'Remote Work' }) === '/pages/blogs/remote-work-' + id`.
  - `blogPath({ _id: id, title: '!!!' }) === '/pages/blogs/' + id`.
  - `idFromBlogParam('remote-work-' + id) === id` and `idFromBlogParam(id) === id`. `idFromBlogParam('remote-work')` and `idFromBlogParam('')` both return `null`.
  - `blogExcerpt('<p>Hello &amp; welcome</p><p>to therapy</p>') === 'Hello & welcome to therapy'`.
  - `blogExcerpt` of 400 characters of words is ≤ 155 characters, ends on a word boundary, and ends with `…`.
  - `truncateTitle` follows the same rules with 60.
  - `parseBlogList({ data: { blogList: [post], totalCount: 7 } })` gives `{ blogs: [post], total: 7 }`, and `{ data: { blogs: [post], blogCount: 1 } }` parses the same way.
  - `parseBlogList` of `null`, `{}` and `{ data: { message: 'err' } }` gives `{ blogs: [], total: 0 }`.
  - `parseBlog({ data: { blog: post } })` returns `post`. `parseBlog({})` returns `null`.

- [ ] **Step 2: Run `node --test src/utils/blog.test.ts`.** Expected: FAIL.

- [ ] **Step 3: Implement `blog.ts`.** `slugify` lowercases, applies NFKD normalization and removes combining marks, replaces runs of characters outside `[a-z0-9]` with `-`, trims leading and trailing dashes, then cuts at the last `-` at or before index 60.

- [ ] **Step 4: Run the test.** Expected: PASS.

- [ ] **Step 5: Implement `blogApi.ts`** following the Global Constraints fetch rules. `fetchBlogList` sends `POST ${backend}/blog/list` with a JSON body. `fetchBlog` sends `GET ${backend}/blog/${id}`. `fetchAllBlogs` requests `pageSize: 100`, increments `pageNum` until it has collected ≥ `total` posts or a page returns 0, and stops after 50 pages.

- [ ] **Step 6: Run `npm run typecheck`.** Expected: PASS.

- [ ] **Step 7: Commit.** `git commit -m "feat(blog): slug URLs and server-side blog API helpers"`

---

### Task 6: Sitemap and robots

**Files:**
- Create: `src/utils/sitemapEntries.ts`, `src/utils/sitemapEntries.test.ts`
- Modify: `src/app/sitemap.ts`, `src/app/robots.ts`

**Interfaces:**
- Consumes: `INDEXABLE_STATIC_PATHS`, `absoluteUrl`, `blogPath`, `BlogPost`.
- Produces: `buildSitemap(posts: BlogPost[]): MetadataRoute.Sitemap`, where `MetadataRoute` is a type import from `next`.

- [ ] **Step 1: Write failing tests in `src/utils/sitemapEntries.test.ts`.**
  - `buildSitemap([])` has 8 entries, and every `url` starts with `https://www.stayunfiltered.com`.
  - No entry contains `/pages/account` or `/pages/login`.
  - No entry has `priority`, `changeFrequency` or `lastModified`.
  - With one post, there are 9 entries. The post entry's `url === absoluteUrl(blogPath(post))`, and its `lastModified` equals `updated_at`, falling back to `created_at`.

- [ ] **Step 2: Run the test.** Expected: FAIL.

- [ ] **Step 3: Implement `buildSitemap`.** `sitemap.ts` becomes `export default async function sitemap() { return buildSitemap(await fetchAllBlogs()) }` with `export const revalidate = 3600`. `robots.ts` keeps one `userAgent: '*'` rule with the current allow and disallow lists, and sets `sitemap: absoluteUrl('/sitemap.xml')`.

- [ ] **Step 4: Run the test, then verify locally.** Run `npm test` and expect PASS. Then check that `curl -s localhost:3000/robots.txt` ends with `Sitemap: https://www.stayunfiltered.com/sitemap.xml`, and that `curl -s localhost:3000/sitemap.xml | grep -c "<loc>"` is ≥ 8.

- [ ] **Step 5: Commit.** `git commit -m "fix(seo): www sitemap with blog posts, drop private pages and fake lastmod"`

---

### Task 7: Server-rendered blog list and posts

**Files:**
- Modify: `src/app/(main)/pages/blogs/page.tsx`; `src/app/(main)/pages/blogs/[id]/page.tsx` (rewritten as a server component); `src/component/blogs/BlogsPage.tsx:9-111,205`; `src/component/blogs/SingleBlogPage.tsx:10-62,268`

**Interfaces:**
- Consumes: `fetchBlogList`, `fetchBlog`, `blogPath`, `idFromBlogParam`, `blogExcerpt`, `truncateTitle`, `BlogPost`, `blogPostingJsonLd`, `breadcrumbJsonLd`, `JsonLd`, `pageMetadata('/pages/blogs')`.
- Produces:
  - `BlogsPage` props `{ initialBlogs: BlogPost[]; initialTotal: number }`.
  - `SingleBlogPage` props `{ post: BlogPost }`. Drop the old `id` prop and its fetch, loading and error effect for the main post. Keep the related-posts effect.

- [ ] **Step 1: Make the list page server-rendered.** `blogs/page.tsx` awaits `fetchBlogList({ pageNum: 1, pageSize: 10, filters: {} })` and renders `<BlogsPage initialBlogs={blogs} initialTotal={total} />`. In `BlogsPage`, seed the blog and pagination state from the props, start `loading` at `initialBlogs.length === 0`, and change every post `href` to `blogPath(post)`.

- [ ] **Step 2: Rewrite `blogs/[id]/page.tsx` as a server component.**
  - It receives `params: Promise<{ id: string }>`.
  - `id = idFromBlogParam(param)`. If there is no id, or `await fetchBlog(id)` returns null, call `notFound()`.
  - If `'/pages/blogs/' + param !== blogPath(post)`, call `permanentRedirect(blogPath(post))`.
  - Render `<JsonLd data={blogPostingJsonLd(post, path)} />`, then `<JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/pages/blogs' }, { name: post.title, path }])} />`, then `<SingleBlogPage post={post} />`.
  - `generateMetadata` returns:
    - `title: truncateTitle(post.title)`
    - `description: blogExcerpt(post.content)`
    - `alternates: { canonical: blogPath(post) }`
    - `openGraph: { type: 'article', images: post.images.slice(0, 1) }`
    - For a missing post, return `{}`.

- [ ] **Step 3: Update `SingleBlogPage`.** Related links use `blogPath(relatedPost)`.

- [ ] **Step 4: Build with the backend unreachable.** Run `NEXT_PUBLIC_BACKEND_URL=https://ci.invalid/api/v1 npm run build`. Expected: the build succeeds. `/pages/blogs` renders its empty state, and `/pages/blogs/x` returns 404.

- [ ] **Step 5: Verify with a reachable backend.** Point `.env` at a backend that has at least one post, then `npm run build && npm start`.
  - `curl -s localhost:3000/pages/blogs | grep -o 'href="/pages/blogs/[^"]*"' | head -3` prints slug URLs.
  - `curl -sI localhost:3000/pages/blogs/<bare-id>` returns 308 with the slug `location`.
  - `curl -sI localhost:3000/pages/blogs/wrong-slug-<id>` also returns 308.
  - `npm run seo:check -- http://localhost:3000` passes for the post URLs it checks.

- [ ] **Step 6: Commit.** `git commit -m "feat(blog): server-render blog list and posts with slug URLs, metadata and BlogPosting schema"`

---

### Task 8: Real prices in the one-on-one HTML

**Files:**
- Create: `src/utils/pricing.ts`, `src/utils/pricing.test.ts`, `src/lib/packageApi.ts`, `src/component/one-on-one/SessionsPageClient.tsx`
- Modify: `src/app/(main)/pages/one-on-one/page.tsx` (becomes a server component); `src/component/one-on-one/BudgetPackage.tsx:22-62,190-300,391-398`; `src/app/(main)/pages/corporate/page.tsx` (Service JSON-LD)

**Interfaces:**
- Produces in `pricing.ts`:
  - `type PackageSummary = { id: string; name: string; total_sessions: number; realPrice: number; discountedPrice: number; description: string; points: string[]; resultCheck: string }`
  - `savingsPercent(real: number, discounted: number): number | null`
  - `parsePackage(json: unknown): PackageSummary | null`, which reads `data.packageList[0]` and maps `_id` to `id`
- Produces in `packageApi.ts`: `fetchPackageBySessions(sessions: number): Promise<PackageSummary | null>`, which posts `{ pageNum: 1, pageSize: 3, filters: { total_sessions: sessions } }` to `/package/list`.
- Produces: `SessionsPageClient` props `{ initialPackage: PackageSummary | null }` and `BudgetPackage` props `{ initialPackage?: PackageSummary | null }`.

- [ ] **Step 1: Write failing tests in `src/utils/pricing.test.ts`.**
  - `savingsPercent(2000, 1500) === 25`.
  - `savingsPercent(0, 0) === null`, `savingsPercent(-5, 1) === null` and `savingsPercent(NaN, 1) === null`.
  - `savingsPercent(1000, 1200) === 0`.
  - `parsePackage` of a valid `{ data: { packageList: [...] } }` maps `_id` to `id`.
  - `parsePackage(null)`, `parsePackage({ data: { packageList: [] } })` and `parsePackage({})` all return `null`.

- [ ] **Step 2: Run the test.** Expected: FAIL.

- [ ] **Step 3: Implement `pricing.ts` and `packageApi.ts`.**

- [ ] **Step 4: Run the test.** Expected: PASS.

- [ ] **Step 5: Split the one-on-one page.**
  - Move the current `one-on-one/page.tsx` body verbatim into `SessionsPageClient.tsx` (`'use client'`) and pass `initialPackage` to `<BudgetPackage>`.
  - The new `page.tsx` awaits `fetchPackageBySessions(1)` and renders, in order:
    - `<JsonLd data={serviceJsonLd({ name: 'Online therapy sessions', description: PAGE_SEO['/pages/one-on-one'].description, path: '/pages/one-on-one', price: pkg?.discountedPrice })} />`
    - `<SessionsPageClient initialPackage={pkg} />`
  - `corporate/page.tsx` renders `<JsonLd data={serviceJsonLd({ name: 'Employee Assistance Program', description: PAGE_SEO['/pages/corporate'].description, path: '/pages/corporate' })} />`.

- [ ] **Step 6: Update `BudgetPackage`.**
  - Seed `packageDetails` from `initialPackage`, and start `loading` at `!initialPackage`.
  - Skip the first client fetch when `initialPackage` is set and `sessions === 1`.
  - Replace `calculateSavingsPercentage` with `savingsPercent`.
  - Render every price, savings and total element only when `packageDetails.realPrice > 0`. Otherwise render a pulse skeleton of the same size. Never render a numeric fallback.

- [ ] **Step 7: Build with the backend unreachable.** Run `NEXT_PUBLIC_BACKEND_URL=https://ci.invalid/api/v1 npm run build && npm start`, then `npm run seo:check -- http://localhost:3000`. Expected: no price failure on `/pages/one-on-one`, because the skeleton shows and no Offer is emitted.

- [ ] **Step 8: Verify with a reachable backend.** Run `curl -s localhost:3000/pages/one-on-one | grep -o '"priceCurrency":"INR"'`. Expected: it prints a match, and the visible price matches the admin package.

- [ ] **Step 9: Commit.** `git commit -m "fix(one-on-one): server-render package price and never render NaN or ₹0"`

---

### Task 9: One H1 per page and the CTA link

**Files:**
- Modify:
  - `src/component/home/HeroSection.tsx:23,223-233`
  - `src/component/one-on-one/Header.tsx:5`
  - `src/component/one-on-one/BudgetPackage.tsx:247`
  - `src/component/one-on-one/VideoSection.tsx:94`
  - `src/component/corporate/ContactForm.tsx:54`

- [ ] **Step 1: Make the heading changes.**
  - In `HeroSection`, render the slide title with `const Heading = index === 0 ? 'h1' : 'h2'`, keeping the classes. Insert `{' '}` between the `main` span and the `highlight` span. Set line 23 to `href: "/pages/corporate#corporate-contact"`.
  - In one-on-one `Header.tsx`, line 5 ("Struggling With Mental Health?") becomes a `<p>` with the same classes.
  - `BudgetPackage:247` and `VideoSection:94` become `<h2>`.
  - The `ContactForm` section gets `scroll-mt-28`.

- [ ] **Step 2: Verify.** Build and start, then `npm run seo:check -- http://localhost:3000`. Expected: no h1 failures on any page. Also check that `curl -s localhost:3000/ | grep -o "Your Workforce"` matches (the space is present).

- [ ] **Step 3: Commit.** `git commit -m "fix(seo): single H1 per page, absolute demo CTA link"`

---

### Task 10: Trust content

**Files:**
- Create: `src/utils/trustCopy.test.ts`
- Modify:
  - Home components: `src/component/home/{CTA.tsx:74,Section4.tsx:42,Section3.tsx:5-45,HeroSection.tsx:20,30,87}`
  - Corporate components: `src/component/corporate/{ProgramDetails.tsx:72,Testimonials.tsx:15-35}`
  - One-on-one components: `src/component/one-on-one/{CTA.tsx:30-55,Metrices.tsx:11}`
  - Webinar components: `src/component/webinar/{Stats.tsx:68,Faq.tsx:21}`
  - `src/component/global/Footer.tsx`

- [ ] **Step 1: Write a failing test in `src/utils/trustCopy.test.ts`.**

It walks `src/app` and `src/component` recursively, skipping any `admin` directory. It asserts that no `.ts` or `.tsx` file contains any of these strings:
- `HIPAA`
- `LCSW`
- `TechNova`
- `Global Finance Co.`
- `HealthFirst Providers`
- `World's Leading` (case-insensitive)
- `42%`, `35%`, `68%`
- `3-5x`
- `disappears in`
- `Money-Back`
- `Join 500+`

It also asserts that `Footer.tsx` contains `14416`. Use `node:fs` `readdirSync` with `recursive: true`.

- [ ] **Step 2: Run `node --test src/utils/trustCopy.test.ts`.** Expected: FAIL, listing the offending files.

- [ ] **Step 3: Edit the copy (spec R7).**
  - Replace the HIPAA sentences with "Your data is protected under India's Digital Personal Data Protection Act, 2023."
  - Empty the testimonial arrays in `home/Section3.tsx` and `corporate/Testimonials.tsx`. Each component returns `null` when its array is empty.
  - Delete the unsourced figures. In the hero, replace a figure subtitle with a non-numeric claim of the same length, for example "Confidential, expert-led support".
  - In one-on-one `CTA.tsx`, remove the countdown block and its timer state, and drop "• ✅ Money-Back Guarantee".
  - `Metrices.tsx`: remove the 500+ tile, or replace it with a sourced figure.
  - Footer: add D11's crisis line: "In crisis? Call Tele-MANAS 14416 (24×7, free). Stay Unfiltered is not an emergency service." Show `14416` as plain text, not as a `tel:` link only.

- [ ] **Step 4: Run `npm test && npm run typecheck && npm run lint`.** Expected: PASS.

- [ ] **Step 5: Commit.** `git commit -m "fix(trust): remove unverifiable testimonials and claims, add crisis helpline"`

---

### Task 11: Performance and security headers

**Files:**
- Modify: `next.config.ts`; `src/app/layout.tsx` (Meta Pixel `<Script>`); `<Image>` usages under `src/component/home/`

- [ ] **Step 1: Make the changes.**
  - Meta Pixel `<Script id="meta-pixel">` gets `strategy="lazyOnload"`.
  - Every home `<Image>` gets `sizes`. Use `"(max-width: 768px) 100vw, 600px"` for 600px cards, and the width the component renders at for the rest.
  - In `next.config.ts`, replace `images.domains` with `remotePatterns` for `https://lh3.googleusercontent.com/**` and `https://res.cloudinary.com/**`.
  - Add `async headers()` returning, for `source: '/:path*'`, the four headers in spec R8.3 with their exact values.

- [ ] **Step 2: Verify.** Run `npm run build && npm start`, then `curl -sI localhost:3000/ | grep -iE "x-content-type-options|referrer-policy|x-frame-options|permissions-policy"`. Expected: all four print.

  Then smoke-test by hand on localhost, because these headers can break third-party flows:
  - Google login works.
  - Razorpay checkout opens.
  - A session video page loads camera and microphone.

- [ ] **Step 3: Commit.** `git commit -m "perf(seo): lazy-load Meta Pixel, responsive image sizes, baseline security headers"`

---

### Task 12: Permanent redirect and production verification

**Files:** none. These are dashboard and verification steps.

- [ ] **Step 1: Change the redirect in Vercel.** In Vercel → Project → Settings → Domains → `stayunfiltered.com` → Edit, keep "Redirect to `www.stayunfiltered.com`" and set the status code to **308 Permanent**. Save.

- [ ] **Step 2: Check the apex redirect.** Run `curl -sI https://stayunfiltered.com/ | head -3`. Expected: `308` with `location: https://www.stayunfiltered.com/`.

- [ ] **Step 3: Check the http redirect.** Run `curl -sI http://www.stayunfiltered.com/`. Expected: a single redirect straight to `https://www.stayunfiltered.com/`. If it still hops through the apex, set the www domain as Primary in the same screen.

- [ ] **Step 4: Run the full check.** After the branch deploys to production, run `npm run seo:check -- https://www.stayunfiltered.com`. Expected: exit 0.

- [ ] **Step 5: Update Search Console.** Submit `https://www.stayunfiltered.com/sitemap.xml` and request indexing for `/`, `/pages/one-on-one` and `/pages/corporate`. Record the date in the PR description; the spec's 14- and 30-day success measures count from it.
