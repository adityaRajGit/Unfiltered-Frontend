// Checks one page's server HTML for the problems the 2026-10 SEO audit found.
// Regex-based on purpose: it runs from a plain Node script with no DOM library.

const TITLE_MAX = 60;
const DESCRIPTION_MAX = 160;

function decodeEntities(s: string): string {
  return s
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

// React SSR splits adjacent text nodes with <!-- -->, so "₹0" arrives as
// "₹<!-- -->0". Strip comments, scripts, styles and tags before matching text.
function visibleText(html: string): string {
  return decodeEntities(
    html
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' '),
  );
}

function collectStrings(value: unknown, out: string[]): string[] {
  if (typeof value === 'string') out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => collectStrings(v, out));
  else if (value && typeof value === 'object') Object.values(value).forEach((v) => collectStrings(v, out));
  return out;
}

export function auditHtml(html: string, opts: { path: string; siteUrl: string }): string[] {
  const violations: string[] = [];
  const expectedCanonical = opts.path === '/' ? `${opts.siteUrl}/` : `${opts.siteUrl}${opts.path}`;

  const canonicals = [...html.matchAll(/<link\b[^>]*rel="canonical"[^>]*>/gi)].map(
    (m) => /href="([^"]*)"/i.exec(m[0])?.[1] ?? '',
  );
  if (canonicals.length !== 1) {
    violations.push(`canonical: expected 1 tag, found ${canonicals.length}`);
  } else if (
    decodeEntities(canonicals[0]) !== expectedCanonical &&
    // Next.js renders the root canonical as the bare host; Google treats it as the same URL.
    !(opts.path === '/' && decodeEntities(canonicals[0]) === opts.siteUrl)
  ) {
    violations.push(`canonical: expected ${expectedCanonical}, found ${canonicals[0]}`);
  }

  const h1Count = (html.match(/<h1[\s>]/gi) ?? []).length;
  if (h1Count !== 1) violations.push(`h1: expected 1, found ${h1Count}`);

  const text = visibleText(html);
  const badPrice = /NaN|₹\s*0(?![\d,])/.exec(text);
  if (badPrice) violations.push(`price: broken value "${text.slice(Math.max(0, badPrice.index - 15), badPrice.index + 15).trim()}"`);

  const title = decodeEntities(/<title>([\s\S]*?)<\/title>/i.exec(html)?.[1] ?? '');
  if (!title) violations.push('title: missing');
  else if (title.length > TITLE_MAX) violations.push(`title: ${title.length} chars (max ${TITLE_MAX})`);

  const description = decodeEntities(/<meta\b[^>]*name="description"[^>]*content="([^"]*)"/i.exec(html)?.[1] ?? '');
  if (!description) violations.push('description: missing');
  else if (description.length > DESCRIPTION_MAX) violations.push(`description: ${description.length} chars (max ${DESCRIPTION_MAX})`);

  for (const m of html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    if (m[1].includes('aggregateRating')) violations.push('JSON-LD: aggregateRating present');
    let data: unknown;
    try {
      data = JSON.parse(m[1]);
    } catch {
      violations.push('JSON-LD: invalid JSON');
      continue;
    }
    for (const s of collectStrings(data, [])) {
      if (/^https?:\/\/(www\.)?stayunfiltered\.com/i.test(s) && !s.startsWith(opts.siteUrl)) {
        violations.push(`JSON-LD: URL not on ${opts.siteUrl}: ${s}`);
      }
    }
  }

  return violations;
}
