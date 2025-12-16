import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/component/global/Header";
import Footer from "@/component/global/Footer";
import Providers from "@/app/(main)/provider";
import FloatingFeedback from "@/component/global/FloatingFeedback";
import ClarityProvider from "@/component/global/ClarityProvider";
import Script from "next/script";


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


  return (
    <>

      {/* <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      > */}
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
      {/* </body> */}
    </>
  );
}
