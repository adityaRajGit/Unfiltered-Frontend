import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

// Run with: node --test src/utils/trustCopy.test.ts
// Guards the public site against claims we can't back up (spec R7). Admin screens
// are excluded: they are not public and may legitimately show percentages.

const ROOTS = ['src/app', 'src/component'];

const BANNED: { label: string; pattern: RegExp }[] = [
  { label: 'HIPAA (US law; India uses the DPDP Act)', pattern: /HIPAA/ },
  { label: 'LCSW (US licence on an Indian therapist)', pattern: /LCSW/ },
  { label: 'placeholder company TechNova', pattern: /TechNova/ },
  { label: 'placeholder company Global Finance Co.', pattern: /Global Finance Co\./ },
  { label: 'placeholder company HealthFirst Providers', pattern: /HealthFirst Providers/ },
  { label: 'placeholder contact address (use hello@stayunfiltered.com)', pattern: /wellnesspro\.com|contact@stayunfiltered\.com/ },
  { label: "World's Leading superlative", pattern: /world's leading/i },
  { label: 'unsourced 42% statistic', pattern: /42%/ },
  { label: 'unsourced 35% statistic', pattern: /35%/ },
  { label: 'unsourced 68% statistic', pattern: /68%/ },
  { label: 'unsourced 3-5x ROI', pattern: /3-5x/ },
  { label: 'fake urgency countdown', pattern: /disappears in/ },
  { label: 'fake urgency countdown', pattern: /OFFER ENDS IN/i },
  { label: 'money-back guarantee without terms', pattern: /Money-Back/i },
  { label: 'unsourced 500+ figure', pattern: /500\+/ },
];

function publicSourceFiles(): string[] {
  return ROOTS.flatMap((root) =>
    (readdirSync(root, { recursive: true }) as string[])
      .filter((f) => /\.tsx?$/.test(f) && !/(^|[\\/])admin([\\/]|$)/.test(f) && !f.endsWith('.test.ts'))
      .map((f) => join(root, f)),
  );
}

test('public pages contain no unverifiable or misleading claims', () => {
  const hits: string[] = [];
  for (const file of publicSourceFiles()) {
    const text = readFileSync(file, 'utf8');
    for (const { label, pattern } of BANNED) {
      if (pattern.test(text)) hits.push(`${file}: ${label}`);
    }
  }
  assert.deepEqual(hits, []);
});

test('the footer shows the Tele-MANAS crisis line', () => {
  assert.match(readFileSync('src/component/global/Footer.tsx', 'utf8'), /14416/);
});
