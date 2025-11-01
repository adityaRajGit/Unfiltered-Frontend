import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/component/global/Header";
import Footer from "@/component/global/Footer";
import Providers from "@/app/(main)/provider";
import FloatingFeedback from "@/component/global/FloatingFeedback";
import ClarityProvider from "@/component/global/ClarityProvider";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stay Unfiltered - World's Leading Psychologists | Mental Health & Therapy Solutions",
  description: "Connect with world's leading psychologists and certified mental health professionals at Stay Unfiltered. Access private therapy sessions, corporate mental wellness programs, expert-led webinars, and personalized nutrition counseling. Transform your mental health journey with India's premier therapy platform offering confidential one-on-one counseling, stress management, anxiety relief, depression support, and workplace wellness solutions. Trusted by 500+ professionals with proven results: 42% reduction in burnout, 35% decrease in employee turnover, and 68% increase in satisfaction.",
  keywords: [
    "world's leading psychologists",
    "mental health therapy",
    "online therapy India",
    "corporate wellness programs",
    "stress management",
    "anxiety counseling",
    "depression therapy",
    "certified therapists",
    "mental health professionals",
    "workplace mental health",
    "one-on-one therapy",
    "confidential counseling",
    "burnout prevention",
    "employee wellness",
    "mental health webinars",
    "nutrition counseling",
    "holistic wellness",
    "therapy sessions online",
    "licensed psychologists India",
    "mental health support"
  ],
  authors: [{ name: "Stay Unfiltered" }],
  creator: "Stay Unfiltered",
  publisher: "Stay Unfiltered",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://stayunfiltered.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Stay Unfiltered - World's Leading Psychologists | Mental Health Solutions",
    description: "Connect with world's leading psychologists for private therapy, corporate wellness, and mental health support. Proven results with certified professionals. 42% burnout reduction, 68% satisfaction increase.",
    url: 'https://stayunfiltered.com',
    siteName: 'Stay Unfiltered',
    images: [
      {
        url: '/stay_unfiltered_logo.jpg',
        width: 1200,
        height: 630,
        alt: 'Stay Unfiltered - Mental Health & Therapy Solutions',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Stay Unfiltered - World's Leading Psychologists",
    description: "Connect with certified mental health professionals. Private therapy, corporate wellness, expert webinars. 42% burnout reduction proven.",
    images: ['/stay_unfiltered_logo.jpg'],
    creator: '@stayunfiltered',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/stay_unfiltered_logo.jpg',
    shortcut: '/stay_unfiltered_logo.jpg',
    apple: '/stay_unfiltered_logo.jpg',
  },
  verification: {
    google: 'ZBQD2VNzaCxJHNAP3ZRDCDU5GQB8BsWxMuQLoUu5UVY',
    // google-site-verification=ZBQD2VNzaCxJHNAP3ZRDCDU5GQB8BsWxMuQLoUu5UVY
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: 'Stay Unfiltered',
    description: "Connect with world's leading psychologists and certified mental health professionals for therapy, corporate wellness, and mental health support",
    url: 'https://stayunfiltered.com',
    logo: 'https://stayunfiltered.com/stay_unfiltered_logo.jpg',
    image: 'https://stayunfiltered.com/stay_unfiltered_logo.jpg',
    telephone: '+91-8986870971',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
      addressLocality: 'India',
    },
    sameAs: [
      'https://www.instagram.com/stay_unfiltered_',
      'https://www.linkedin.com/company/stay-unfiltered/'
    ],
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Mental Health Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'One-on-One Therapy Sessions',
            description: 'Private therapy with licensed psychologists for stress, anxiety, depression, and personal growth',
            provider: {
              '@type': 'Organization',
              name: 'Stay Unfiltered',
            },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Corporate Wellness Programs',
            description: 'Enterprise mental health solutions reducing burnout by 42% and increasing employee satisfaction by 68%',
            provider: {
              '@type': 'Organization',
              name: 'Stay Unfiltered',
            },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Mental Health Webinars',
            description: 'Free expert-led webinars on stress management, work-life balance, and workplace mental health',
            provider: {
              '@type': 'Organization',
              name: 'Stay Unfiltered',
            },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Nutrition & Wellness Counseling',
            description: 'Personalized diet plans and holistic wellness coaching for complete mind-body health',
            provider: {
              '@type': 'Organization',
              name: 'Stay Unfiltered',
            },
          },
        },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '500',
      bestRating: '5',
      worstRating: '1',
    },
  };

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Stay Unfiltered',
    alternateName: 'Stay Unfiltered Mental Health',
    url: 'https://stayunfiltered.com',
    logo: 'https://stayunfiltered.com/stay_unfiltered_logo.jpg',
    description: "India's premier mental health platform connecting individuals and organizations with world's leading psychologists and certified mental health professionals",
    slogan: 'Transform Your Mental Health Journey',
    foundingDate: '2024',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['English', 'Hindi'],
    },
    knowsAbout: [
      'Mental Health',
      'Psychology',
      'Therapy',
      'Counseling',
      'Corporate Wellness',
      'Stress Management',
      'Anxiety Treatment',
      'Depression Support',
      'Nutrition Counseling',
      'Workplace Mental Health',
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What mental health services does Stay Unfiltered offer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Stay Unfiltered offers one-on-one therapy sessions with licensed psychologists, corporate mental wellness programs, free expert-led webinars, and personalized nutrition counseling. Our services cover stress management, anxiety relief, depression support, workplace mental health, and holistic wellness solutions.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are the therapists at Stay Unfiltered certified professionals?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, all our therapists are licensed and certified mental health professionals with extensive experience. We work with world-class psychologists who specialize in various areas including stress management, anxiety, depression, trauma, and personal growth.',
        },
      },
      {
        '@type': 'Question',
        name: 'How effective are Stay Unfiltered corporate wellness programs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our corporate wellness programs have proven results: 42% reduction in employee burnout, 35% decrease in turnover rates, and 68% increase in employee satisfaction. We provide customized solutions for organizations of all sizes.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is online therapy confidential at Stay Unfiltered?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely. All therapy sessions at Stay Unfiltered are completely confidential and conducted in a safe, secure environment. We prioritize client privacy and follow strict confidentiality protocols.',
        },
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <meta name="theme-color" content="#0d9488" />
        <link rel="canonical" href="https://stayunfiltered.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <ClarityProvider />
          <Header />
          {children}
          <FloatingFeedback />
          <Footer />
        </Providers>
         <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
