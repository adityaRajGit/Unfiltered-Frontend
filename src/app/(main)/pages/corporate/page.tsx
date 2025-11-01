import Benefits from '@/component/corporate/Benefits';
import ContactForm from '@/component/corporate/ContactForm';
import HeroSection from '@/component/corporate/HeroSection';
import ProgramDetails from '@/component/corporate/ProgramDetails';
import Testimonials from '@/component/corporate/Testimonials';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corporate Mental Wellness Programs | World's Leading Psychologists for Enterprise - Stay Unfiltered",
  description: "Transform your workplace with Stay Unfiltered's corporate mental wellness programs led by world's leading psychologists. Enterprise mental health solutions delivering proven results: 42% reduction in employee burnout, 35% decrease in turnover rates, and 68% increase in employee satisfaction. Customized programs for stress management, team building, leadership coaching, workplace mental health, and employee wellbeing. Trusted by leading organizations. Expert corporate therapy packages, confidential counseling, mental health workshops, and comprehensive wellness strategies for modern workplaces.",
  keywords: "corporate wellness programs, employee mental health, workplace wellness solutions, corporate therapy packages, world's leading psychologists, burnout prevention, employee wellbeing, corporate counseling, mental health workplace, team building therapy, leadership coaching mental health",
  openGraph: {
    title: "Corporate Mental Wellness by World's Leading Psychologists",
    description: "Enterprise mental health solutions: 42% burnout reduction, 35% lower turnover, 68% satisfaction increase. Customized programs for your organization.",
    url: 'https://stayunfiltered.com/pages/corporate',
    type: 'website',
  },
};

const CorporateWellnessPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#e2fdf7] to-[#d0f7ed]">
            {/* Hero Section */}
            <HeroSection />

            {/* Benefits Section */}
            <Benefits />

            {/* Program Details */}
            <ProgramDetails />

            {/* Testimonials */}
            <Testimonials />

            {/* Contact */}
            <ContactForm />
        </div>
    );
};

export default CorporateWellnessPage;