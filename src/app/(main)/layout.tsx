import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/component/global/Header";
import Footer from "@/component/global/Footer";
import Providers from "@/app/(main)/provider";
import FloatingFeedback from "@/component/global/FloatingFeedback";
import ClarityProvider from "@/component/global/ClarityProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stay Unfiltered",
  description: "Stay Unfiltered",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
      </body>
    </html>
  );
}
