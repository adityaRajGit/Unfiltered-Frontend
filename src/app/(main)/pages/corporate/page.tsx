import { PAGE_SEO, pageMetadata } from '@/utils/seo';
import { serviceJsonLd } from '@/utils/schema';
import JsonLd from '@/component/global/JsonLd';
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
      <JsonLd
        data={serviceJsonLd({
          name: 'Employee Assistance Program',
          description: PAGE_SEO['/pages/corporate'].description,
          path: '/pages/corporate',
        })}
      />
      <div className="min-h-screen bg-gradient-to-b from-[#e2fdf7] to-[#d0f7ed]">
        <HeroSection />
        <Benefits />
        <ProgramDetails />
        <Testimonials />
        <div id="corporate-contact" className="scroll-mt-28">
          <ContactForm />
        </div>
      </div>
    </CorporateWellnessClient>
  );
};

export default CorporateWellnessPage;