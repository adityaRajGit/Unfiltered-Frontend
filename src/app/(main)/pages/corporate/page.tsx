import Benefits from '@/component/corporate/Benefits';
import ContactForm from '@/component/corporate/ContactForm';
import HeroSection from '@/component/corporate/HeroSection';
import ProgramDetails from '@/component/corporate/ProgramDetails';
import Testimonials from '@/component/corporate/Testimonials';;

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