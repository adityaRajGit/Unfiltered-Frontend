import HeroSection from "@/component/home/HeroSection";
import Section2 from "@/component/home/Section2";
import Section3 from "@/component/home/Section3";
import Section4 from "@/component/home/Section4";
import Section5 from "@/component/home/Section5";
import Section6 from "@/component/home/Section6";
import WhyChooseUs from "@/component/home/WhyChooseUs";

export default function Home() {
  return (
    <div className="w-full h-auto flex flex-col">
      <HeroSection />
      <Section2 />
      <WhyChooseUs />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
    </div>
  );
}
