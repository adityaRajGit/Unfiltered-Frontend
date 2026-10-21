import type { Metadata } from "next";
import { PAGE_SEO, SHARED_OPEN_GRAPH } from "@/utils/seo";
import { SITE_URL } from "@/utils/site";
import "./globals.css";
import { Header } from "@/component/global/Header";
import Footer from "@/component/global/Footer";
import Providers from "@/app/(main)/provider";
import FloatingFeedback from "@/component/global/FloatingFeedback";
import ClarityProvider from "@/component/global/ClarityProvider";
import Script from "next/script";


export const metadata: Metadata = {
  title: PAGE_SEO['/'].title,
  description: PAGE_SEO['/'].description,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(SITE_URL),
  openGraph: {
    ...SHARED_OPEN_GRAPH,
    title: PAGE_SEO['/'].title,
    description: PAGE_SEO['/'].description,
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_SEO['/'].title,
    description: PAGE_SEO['/'].description,
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
