// The one place the production host is written. Sitemap, robots, metadataBase and
// JSON-LD all read it, so they can never disagree about www vs. apex again.
export const SITE_URL = 'https://www.stayunfiltered.com';

export function absoluteUrl(path: string): string {
  return `${SITE_URL}/${path.replace(/^\/+/, '')}`;
}

export type StaticPath =
  | '/'
  | '/pages/one-on-one'
  | '/pages/corporate'
  | '/pages/webinar'
  | '/pages/about'
  | '/pages/blogs'
  | '/pages/faq'
  | '/pages/privacy';

export const INDEXABLE_STATIC_PATHS: readonly StaticPath[] = [
  '/',
  '/pages/one-on-one',
  '/pages/corporate',
  '/pages/webinar',
  '/pages/about',
  '/pages/blogs',
  '/pages/faq',
  '/pages/privacy',
];
