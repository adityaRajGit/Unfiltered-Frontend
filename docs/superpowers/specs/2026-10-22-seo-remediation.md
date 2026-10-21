# SEO Remediation — stayunfiltered.com

**Date:** 2026-10-22
**Source:** claude-seo full audit of https://www.stayunfiltered.com/ (score 39/100). Plain-language walkthrough: https://claude.ai/artifact/AZtLmuD1ndpQunmhM2jQmC
**Plan:** `docs/superpowers/plans/2026-10-22-seo-remediation.md`

## Problem

Google is told every page is a duplicate of the homepage, and much of what crawlers can read is empty or broken (₹0 prices, an empty blog, hidden FAQ answers). Trust content on a mental-health (YMYL) site includes unverifiable claims. Until the indexing problems are fixed, content and link work has little effect.

## Goals

1. Every indexable page is canonical to itself on one host, `https://www.stayunfiltered.com`.
2. The first HTML response of every page contains correct, real content: no `₹0`, no `NaN`, blog posts and FAQ answers present.
3. Structured data is accurate, page-specific, and policy-safe.
4. On-page basics are correct: one H1 per page, titles ≤ 60 characters, descriptions ≤ 160 characters, unique per page.
5. Trust content contains no false or unverifiable claims, and a crisis helpline is visible site-wide.
6. A repeatable automated check (`npm run seo:check`) proves goals 1–4 against any deployed URL.

## Non-goals

- Backend changes. The backend API is consumed as-is (`POST /blog/list`, `GET /blog/:id`, `POST /package/list`).
- Writing the blog articles, the expanded corporate/about copy, or sourcing real testimonials and therapist credentials. Those are a content track (see "Content track"), owned by the business, and this spec only prepares the code to receive them.
- Visual redesign of the homepage hero beyond heading semantics.
- Paid SEO tools, backlink building.

## Decisions

| # | Decision | Reason |
|---|---|---|
| D1 | Primary host is `https://www.stayunfiltered.com` (with `www`). | Vercel already serves www; least change. |
| D2 | One constant `SITE_URL` in `src/utils/site.ts` is the only place the host is written. Sitemap, robots, `metadataBase`, JSON-LD all read it. | The current bug is four copies of the host disagreeing. |
| D3 | Canonicals come from each route's own `metadata.alternates.canonical` (a path). The root layout sets none. | Next.js resolves the path against `metadataBase`; inheriting `'/'` is what broke every page. |
| D4 | Blog post URL is `/pages/blogs/<slug>-<mongoId>`. The id is the trailing 24-hex segment; the slug is cosmetic. A request whose slug doesn't match the post's current title gets a permanent redirect to the canonical URL. Bare-id URLs (`/pages/blogs/<mongoId>`) redirect the same way. | Readable URLs without a backend `slug` field; old links keep working; title edits never 404. |
| D5 | Blog list and post pages fetch on the server with `revalidate: 300`. Fetch failures return empty/null so a build with an unreachable backend (CI uses `https://ci.invalid`) still succeeds. | Content must be in the first HTML; builds must stay green. |
| D6 | When a price is unknown, the pricing block renders a skeleton, never a number. `savingsPercent` returns `null` when `realPrice <= 0`. The one-on-one page fetches the 1-session package on the server and passes it as initial state. | Removes `₹0`/`NaN` from HTML in all cases; shows a real price when the backend is reachable. |
| D7 | JSON-LD: root layout emits one `@graph` with `Organization` (`@id: SITE_URL/#org`) and `WebSite` (`@id: SITE_URL/#website`). No `aggregateRating`, no `MedicalBusiness`, no offer catalog. FAQPage only on `/pages/faq`, generated from the same data the page renders. `BlogPosting` + `BreadcrumbList` on posts. | Self-serving ratings risk a manual action; page-specific markup must match visible content. Google retired FAQ rich results on 2026-05-07, so FAQPage is kept for accuracy only. |
| D8 | FAQ answers render inside native `<details>/<summary>`. The FAQ data moves to `src/data/faq.ts`. | Answers are in the HTML; no client state needed; page becomes a server component. |
| D9 | `/pages/account` and `/pages/login` (and children) get `robots: { index: false, follow: false }` and are removed from the sitemap. | They are private; currently `index, follow`. |
| D10 | The apex→www redirect is changed to permanent in the Vercel dashboard (Domains → `stayunfiltered.com` → Redirect to `www.stayunfiltered.com`, status 308). | It is a domain-level setting; app code can't override it. |
| D11 | Crisis line shown in the footer on every page: "In crisis? Call Tele-MANAS 14416 (24×7, free). Stay Unfiltered is not an emergency service." | Required trust signal for mental-health content. |

## Requirements

### R1 Host and canonicals
- R1.1 `SITE_URL = 'https://www.stayunfiltered.com'`, no trailing slash. `absoluteUrl(path)` joins with exactly one `/`.
- R1.2 `src/app/layout.tsx` has no `<link rel="canonical">`. `src/app/(main)/layout.tsx` has no `alternates.canonical`; `metadataBase = new URL(SITE_URL)`.
- R1.3 Each indexable route declares its canonical path: `/`, `/pages/one-on-one`, `/pages/corporate`, `/pages/webinar`, `/pages/about`, `/pages/blogs`, `/pages/faq`, `/pages/privacy`, and each post's D4 path.
- R1.4 Every indexable page's HTML contains exactly one `<link rel="canonical">`, equal to `SITE_URL + its own path` (homepage: `SITE_URL + '/'`).
- R1.5 `curl -I https://stayunfiltered.com/` returns 308 or 301 with `location: https://www.stayunfiltered.com/` (D10).

### R2 Sitemap and robots
- R2.1 Sitemap lists the 8 static indexable paths from R1.3 plus every blog post, all on `SITE_URL`.
- R2.2 Static entries carry no `lastModified`, `changeFrequency` or `priority`. Post entries carry `lastModified = updated_at ?? created_at`.
- R2.3 Sitemap excludes `/pages/account`, `/pages/login`, and anything under them.
- R2.4 robots.txt keeps today's allow/disallow rules (one `*` group is enough: the named AI-bot groups are identical and add nothing), and its `Sitemap:` line is `SITE_URL/sitemap.xml`.
- R2.5 Blog post fetching for the sitemap pages through `/blog/list` (pageSize 100) until all posts are collected, stopping after 50 pages.

### R3 Blog rendering
- R3.1 `/pages/blogs` first-page HTML contains an `<a href>` to each post on page 1 using the D4 path. Search, category filter and pagination keep working client-side.
- R3.2 `/pages/blogs/<slug>-<id>` server-renders title, author, date and full content.
- R3.3 Each post has `generateMetadata`: title = post title (truncated to 60 chars on a word boundary, suffix " | Stay Unfiltered" only if it still fits), description = first 155 chars of plain-text content, canonical = D4 path, `openGraph.images` = first image when present.
- R3.4 Unknown id → Next.js `notFound()` (real 404). Non-canonical slug or bare id → `permanentRedirect` to the D4 path.
- R3.5 Post JSON-LD: `BlogPosting` (headline, datePublished, dateModified, image, author `Person`, publisher `{ "@id": SITE_URL/#org }`, `mainEntityOfPage`) and `BreadcrumbList` (Home → Blogs → post).
- R3.6 Related-post links use the D4 path.

### R4 Pricing
- R4.1 No page's HTML contains `NaN`, `₹0` followed by a non-digit, or `Save ₹0`.
- R4.2 `savingsPercent(real, discounted)` → `Math.round((real - discounted) / real * 100)`, or `null` when `real <= 0` or either input is not finite. Negative results clamp to `0`.
- R4.3 `BudgetPackage` accepts `initialPackage: PackageSummary | null`. When it is non-null, the first render shows its real price; when null, it shows a skeleton until the client fetch succeeds.
- R4.4 The one-on-one route becomes a server `page.tsx` that fetches the 1-session package (D5 failure rules) and renders the existing client UI with `initialPackage`.

### R5 Structured data
- R5.1 Implement D7. All URLs in JSON-LD start with `SITE_URL`.
- R5.2 Organization: name "Stay Unfiltered", alternateName ["StayUnfiltered"], url `SITE_URL/`, logo `SITE_URL/stay_unfiltered_logo.jpg`, telephone "+91-8986870971", areaServed India, sameAs the existing Instagram and LinkedIn URLs, contactPoint (Customer Service, English and Hindi). No `address` until a real one exists.
- R5.3 `/pages/faq` FAQPage contains exactly the questions and answers rendered on that page.
- R5.4 `/pages/one-on-one` and `/pages/corporate` each emit one `Service` (provider `{ "@id": SITE_URL/#org }`, areaServed India). The one-on-one Service includes an `Offer` with `price` and `priceCurrency: "INR"` only when the server fetch returned a package.

### R6 On-page
- R6.1 Exactly one `<h1>` in the HTML of every indexable page.
  - Homepage hero: the slide at index 0 renders its title as `h1`, the others as `h2`. Add a space between the `main` and `highlight` spans.
  - One-on-one: `Header.tsx` keeps "Transform Your Life with One-on-One Therapy" as the H1; the other heading there, plus `BudgetPackage` and `VideoSection`, become `h2`.
  - FAQ: H1 text "Frequently Asked Questions".
- R6.2 Titles ≤ 60 chars, descriptions ≤ 160 chars, unique per route, none containing "World's Leading" or an unsourced percentage. Exact copy is in the plan's page-copy table.
- R6.3 The `keywords` metadata array is removed (ignored by Google, and it repeats the unsupported claims).
- R6.4 The hero CTA href is `/pages/corporate#corporate-contact`. `#corporate-contact` gets `scroll-margin-top` larger than the sticky header height.

### R7 Trust content
- R7.1 No source file contains "HIPAA". Replace with "Your data is protected under India's Digital Personal Data Protection Act, 2023." (`CTA.tsx`, `Section4.tsx`, `ProgramDetails.tsx`).
- R7.2 Testimonials attributed to unverifiable people or placeholder companies are removed: all 5 entries in `home/Section3.tsx` (therapist attributions including "Vikram Patel (LCSW)" and "Dr. Priya Sharma") and all 3 in `corporate/Testimonials.tsx` ("TechNova Inc.", "Global Finance Co.", "HealthFirst Providers"). A testimonial section whose array is empty renders nothing. The business restores only entries it can verify, into the same arrays.
- R7.3 Unsourced statistics ("42%", "35%", "68%", "500+", "3-5x ROI", "World's Leading") are removed from metadata, JSON-LD and page copy, unless a source line is added next to the figure.
- R7.4 The one-on-one countdown ("this special offer disappears in") is removed. "Money-Back Guarantee" is removed until a terms page exists.
- R7.5 D11 crisis line is in `Footer.tsx`.

### R8 Performance and hardening
- R8.1 The hero `<Image>` already sets `priority={index === 0}` (`HeroSection.tsx:301`); keep it. Every `<Image>` under `src/component/home/` gets a `sizes` prop matching its rendered width (600px cards: `"(max-width: 768px) 100vw, 600px"`).
- R8.2 Meta Pixel script uses `strategy="lazyOnload"`.
- R8.3 `next.config.ts` replaces `images.domains` with `images.remotePatterns` for `lh3.googleusercontent.com` and `res.cloudinary.com` (drop `example.com`), and adds `headers()` for all routes: `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: SAMEORIGIN`, `Permissions-Policy: camera=(self), microphone=(self), geolocation=()`. (Camera and microphone stay allowed for same-origin video sessions. A full CSP is out of scope because of Razorpay, Clarity, Meta and Jitsi third parties; revisit separately.)

### R9 Verification tooling
- R9.1 `scripts/seo-check.mjs <baseUrl>` fetches every static indexable path plus up to 3 post URLs discovered in `<baseUrl>/sitemap.xml`, and fails (exit 1) listing each violation of: R1.4, R4.1, R6.1, R6.2 lengths, "aggregateRating" present in HTML, any JSON-LD URL not starting with `SITE_URL`.
- R9.2 `npm run seo:check -- <baseUrl>` runs it. It passes against `next start` locally and against production after deploy.

## Content track (business-owned, after the code lands)

These need real information only the business has. The code from this spec gives each one a place to live.

1. Real therapist profiles: name, qualification, RCI CRR number, years of practice. Shown on `/pages/about` and one-on-one.
2. Real, consented testimonials (name or initials, city, permission on file).
3. `/pages/corporate`: "What does an EAP include?", "How is EAP priced?" (per employee per month), "How is confidentiality handled?", each opening with a 40–60 word direct answer. One named case study.
4. `/pages/about`: founders and clinical lead by name, founding story, registered business address.
5. Blog hubs: "Online therapy in India" (8 spokes) and "Corporate mental wellness in India" (8 spokes), as listed in the audit artifact. Every post links to `/pages/one-on-one` or `/pages/corporate`.
6. Google Search Console and Bing Webmaster Tools verification (Search Console already has a token in `(main)/layout.tsx`), sitemap submitted to both.

## Success measures

- `npm run seo:check -- https://www.stayunfiltered.com` exits 0 after deploy.
- Search Console URL Inspection: `/pages/corporate` reports itself as Google-selected canonical within 14 days of deploy.
- Indexed pages in Search Console ≥ 8 static + all posts within 30 days.
- Rich Results Test on `/pages/blogs/<post>` shows BlogPosting and BreadcrumbList with 0 errors.

## Open questions

1. Does production currently have any published blog posts? The live list page shows "No articles found", which is either the client empty state or a genuinely empty collection. The code fix is the same either way; the content track decides what gets published.
2. Production `NEXT_PUBLIC_BACKEND_URL` must be reachable from Vercel's build and runtime for server fetches. It is today for the browser; confirm there is no IP allowlist on the backend.
