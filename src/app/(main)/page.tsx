import CorporateTherapySection from "@/component/home/CorporateTherapy";
import CorporateCTA from "@/component/home/CTA";
import HeroSection from "@/component/home/HeroSection";
import CorporatePopup from "@/component/home/Popup";
import Section2 from "@/component/home/Section2";
import Section3 from "@/component/home/Section3";
import Section4 from "@/component/home/Section4";
import WhyChooseUs from "@/component/home/WhyChooseUs";

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
