import HeroSection from '@/component/webinar/HeroSection';
import Stats from '@/component/webinar/Stats';
import Topics from '@/component/webinar/Topics';
import Trending from '@/component/webinar/Trending';
import Testimonials from '@/component/webinar/Testimonials';
import InquiryForm from '@/component/webinar/InquiryForm';
import Faq from '@/component/webinar/Faq';

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