import TrackPageView from "@/component/meta-pixel/TrackPageView";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({ children }: { children: React.ReactNode }) {
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '2133226870826855')
          `}
        </Script>

        {/* NoScript fallback */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=2133226870826855&ev=PageView&noscript=1"
          />
        </noscript>
        {children}
        <TrackPageView />
      </body>
    </html>
  );
}
