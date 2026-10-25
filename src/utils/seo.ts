import type { Metadata } from 'next';
import type { StaticPath } from './site.ts';

// Search-result copy for each static page. Titles stay within 60 characters and
// descriptions within 160 so Google shows them whole (enforced by seo.test.ts).
export const PAGE_SEO: Record<StaticPath, { title: string; description: string }> = {
  '/': {
    title: 'Online Therapy & Corporate Mental Wellness in India',
    description:
      'Private online therapy with qualified Indian therapists, plus employee assistance programs, workshops and webinars for companies. Book a session today.',
  },
  '/pages/one-on-one': {
    title: 'Online Therapy Sessions in India | Stay Unfiltered',
    description:
      'Book private, confidential one-on-one online therapy for stress, anxiety, depression and relationships. Choose a single session or a discounted package.',
  },
  '/pages/corporate': {
    title: 'Employee Assistance Program (EAP) India | Stay Unfiltered',
    description:
      'Confidential employee counselling, manager training and wellbeing workshops for Indian companies. Request a demo of the Stay Unfiltered EAP.',
  },
  '/pages/webinar': {
    title: 'Free Mental Health Webinars | Stay Unfiltered',
    description:
      'Join free, expert-led webinars on stress, burnout, work-life balance and workplace mental health. See upcoming sessions and register.',
  },
  '/pages/about': {
    title: 'About Stay Unfiltered | Online Mental Health Platform',
    description:
      'Stay Unfiltered is an Indian online mental health platform for individuals and companies, founded in 2024. Learn about our approach and care team.',
  },
  '/pages/blogs': {
    title: 'Mental Health Blog | Stay Unfiltered',
    description:
      'Practical articles on therapy, stress, anxiety, burnout and workplace mental health in India, written for individuals and HR teams.',
  },
  '/pages/faq': {
    title: 'FAQ: Online Therapy & EAP Questions | Stay Unfiltered',
    description:
      'Answers about Stay Unfiltered therapy sessions, pricing, confidentiality, corporate EAP plans and how to get started.',
  },
  '/pages/privacy': {
    title: 'Privacy Policy | Stay Unfiltered',
    description:
      "How Stay Unfiltered collects, uses and protects your personal data, in line with India's Digital Personal Data Protection Act, 2023.",
  },
};

export function pageMetadata(path: StaticPath): Metadata {
  const { title, description } = PAGE_SEO[path];
  return {
    title,
    description,
    alternates: { canonical: path },
    // A page's openGraph and twitter replace the layout's whole objects, so repeat
    // the shared fields; otherwise shares of this page show the homepage's text.
    openGraph: { ...SHARED_OPEN_GRAPH, title, description, url: path },
    twitter: { ...SHARED_TWITTER, title, description },
  };
}

export const SHARED_TWITTER = {
  card: 'summary_large_image' as const,
  images: ['/stay_unfiltered_logo.jpg'],
  creator: '@stayunfiltered',
};

export const SHARED_OPEN_GRAPH = {
  siteName: 'Stay Unfiltered',
  locale: 'en_IN',
  type: 'website' as const,
  images: [{ url: '/stay_unfiltered_logo.jpg', width: 1200, height: 630, alt: 'Stay Unfiltered' }],
};

export const NOINDEX: Metadata = { robots: { index: false, follow: false } };
