import CorporateTherapySection from "@/component/home/CorporateTherapy";
import CorporateCTA from "@/component/home/CTA";
import HeroSection from "@/component/home/HeroSection";
import CorporatePopup from "@/component/home/Popup";
import Section2 from "@/component/home/Section2";
import Section3 from "@/component/home/Section3";
import Section4 from "@/component/home/Section4";
import WhyChooseUs from "@/component/home/WhyChooseUs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stay Unfiltered - World's Leading Psychologists | Mental Health Therapy & Wellness Solutions India",
  description: "Transform your mental health with Stay Unfiltered - India's premier therapy platform featuring world's leading psychologists and certified mental health professionals. Access confidential one-on-one therapy, corporate wellness programs, free expert webinars, and holistic nutrition counseling. Proven results: 42% burnout reduction, 68% satisfaction increase. Expert support for stress, anxiety, depression, workplace mental health, and personal growth. Join 500+ professionals experiencing transformative mental health care.",
  keywords: "world's leading psychologists India, mental health therapy, online counseling, corporate wellness programs, stress management therapy, anxiety treatment, depression counseling, certified therapists, mental health professionals, workplace wellness, burnout prevention, confidential therapy sessions",
  openGraph: {
    title: "Stay Unfiltered - World's Leading Psychologists | Mental Health Solutions",
    description: "Transform your mental health with world's leading psychologists. Private therapy, corporate wellness, expert webinars. 42% burnout reduction proven.",
    url: 'https://stayunfiltered.com',
    type: 'website',
    images: [
      {
        url: '/stay_unfiltered_logo.jpg',
        width: 1200,
        height: 630,
        alt: 'Stay Unfiltered Mental Health Platform',
      },
    ],
  },
};

export default function Home() {
  return (
    <div className="w-full h-auto flex flex-col">
      <HeroSection />
      <Section2 />
      <WhyChooseUs />
      <Section3 />
      <CorporateTherapySection />
      <Section4 />
      <CorporateCTA />
      <CorporatePopup />
    </div>
  );
}
