import { pageMetadata } from '@/utils/seo';
import Benefits from '@/component/corporate/Benefits';
import ContactForm from '@/component/corporate/ContactForm';
import CorporateWellnessClient from '@/component/corporate/CorporateWellnessClient';
import HeroSection from '@/component/corporate/HeroSection';
import ProgramDetails from '@/component/corporate/ProgramDetails';
import Testimonials from '@/component/corporate/Testimonials';
import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata('/pages/corporate');

const CorporateWellnessPage = () => {
  return (
    <CorporateWellnessClient>
      <div className="min-h-screen bg-gradient-to-b from-[#e2fdf7] to-[#d0f7ed]">
        <HeroSection />
        <Benefits />
        <ProgramDetails />
        <Testimonials />
        <div id="corporate-contact">
          <ContactForm />
        </div>
      </div>
    </CorporateWellnessClient>
  );
};

export default CorporateWellnessPage;