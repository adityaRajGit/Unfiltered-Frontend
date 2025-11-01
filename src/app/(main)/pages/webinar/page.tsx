import HeroSection from '@/component/webinar/HeroSection';
import Stats from '@/component/webinar/Stats';
import Topics from '@/component/webinar/Topics';
import Trending from '@/component/webinar/Trending';
import Testimonials from '@/component/webinar/Testimonials';
import InquiryForm from '@/component/webinar/InquiryForm';
import Faq from '@/component/webinar/Faq';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Mental Health Webinars | Expert-Led Sessions by World's Leading Psychologists - Stay Unfiltered",
  description: "Join Stay Unfiltered's free mental health webinars led by world's leading psychologists and certified professionals. Expert sessions on stress management, work-life balance, team building, workplace mental health, anxiety relief, and depression support. Interactive learning with 500+ professionals. Access cutting-edge mental health education, live Q&A with top therapists, and proven wellness strategies. Transform your understanding of mental health with India's premier webinar series.",
  keywords: "mental health webinars, free psychology webinars, stress management sessions, workplace wellness webinars, anxiety relief workshops, world's leading psychologists, online mental health education, corporate wellness training, professional development mental health",
  openGraph: {
    title: "Free Mental Health Webinars by World's Leading Psychologists",
    description: "Join expert-led mental health webinars. Learn stress management, workplace wellness, and team building from certified professionals. Free access.",
    url: 'https://stayunfiltered.com/pages/webinar',
    type: 'website',
  },
};

function Page() {

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#e3fdf7] to-white">
            {/* Hero Section */}
            <HeroSection />

            {/* Stats Section */}
            <Stats />

            {/* Webinar Topics */}
            <Topics />

            {/* Trending Therapies */}
            <Trending />

            {/* Testimonials */}
            <Testimonials />

            {/* Inquiry Form */}
            <InquiryForm />
            
            {/* FAQ Section */}
            <Faq />
        </div>
    );
}

export default Page;