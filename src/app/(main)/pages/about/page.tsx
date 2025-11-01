import Section1 from '@/component/about/Section1';
import Section2 from '@/component/about/Section2';
import Section3 from '@/component/about/Section3';
import Section4 from '@/component/about/Section4';
import Section6 from '@/component/about/Section6';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Stay Unfiltered | World's Leading Psychologists & Mental Health Experts",
  description: "Learn about Stay Unfiltered - India's premier mental health platform founded by world's leading psychologists and mental health advocates. Our mission is to make quality mental healthcare accessible to everyone through innovative therapy solutions, corporate wellness programs, and expert-led education. Meet our team of certified therapists, understand our evidence-based approach, and discover how we're transforming mental health care across India. Trusted by 500+ clients and leading organizations.",
  keywords: "about stay unfiltered, mental health platform India, world's leading psychologists, certified therapists team, mental health mission, therapy experts, corporate wellness leaders, mental health advocacy",
  openGraph: {
    title: "About Stay Unfiltered - World's Leading Mental Health Platform",
    description: "India's premier mental health platform with world-class psychologists. Making quality mental healthcare accessible to all.",
    url: 'https://stayunfiltered.com/pages/about',
    type: 'website',
  },
};

const AboutPage = () => {
  return (
    <div className="bg-white">
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section6 />
    </div>
  );
};

export default AboutPage;