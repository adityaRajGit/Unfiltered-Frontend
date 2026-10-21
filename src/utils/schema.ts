import { absoluteUrl, SITE_URL } from './site.ts';

// JSON-LD builders. Everything here must describe content visible on the page:
// no self-declared ratings, no claims the page itself doesn't make.

const CONTEXT = 'https://schema.org';

export const ORG_ID = `${SITE_URL}/#org`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export function siteGraph() {
  return {
    '@context': CONTEXT,
    '@graph': [
      {
        '@type': 'Organization',
        '@id': ORG_ID,
        name: 'Stay Unfiltered',
        alternateName: ['StayUnfiltered'],
        url: absoluteUrl('/'),
        logo: absoluteUrl('/stay_unfiltered_logo.jpg'),
        telephone: '+91-8986870971',
        areaServed: { '@type': 'Country', name: 'India' },
        sameAs: [
          'https://www.instagram.com/stay_unfiltered_',
          'https://www.linkedin.com/company/stay-unfiltered/',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'Customer Service',
          availableLanguage: ['English', 'Hindi'],
        },
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: absoluteUrl('/'),
        name: 'Stay Unfiltered',
        publisher: { '@id': ORG_ID },
      },
    ],
  };
}

export function faqPageJsonLd(items: { question: string; answer: string }[]) {
  return {
    '@context': CONTEXT,
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.question,
      acceptedAnswer: { '@type': 'Answer', text: i.answer },
    })),
  };
}

export function breadcrumbJsonLd(crumbs: { name: string; path: string }[]) {
  return {
    '@context': CONTEXT,
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function serviceJsonLd(opts: { name: string; description: string; path: string; price?: number }) {
  const url = absoluteUrl(opts.path);
  return {
    '@context': CONTEXT,
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    url,
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'Country', name: 'India' },
    ...(opts.price !== undefined && {
      offers: { '@type': 'Offer', price: opts.price, priceCurrency: 'INR', url },
    }),
  };
}

export function blogPostingJsonLd(
  post: { title: string; images: string[]; author: string; created_at: string; updated_at?: string },
  path: string,
) {
  return {
    '@context': CONTEXT,
    '@type': 'BlogPosting',
    headline: post.title,
    image: post.images,
    datePublished: post.created_at,
    dateModified: post.updated_at ?? post.created_at,
    author: { '@type': 'Person', name: post.author },
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: absoluteUrl(path),
  };
}
