import React from 'react';
import { FaUserMd, FaLock, FaUsers, FaCalendarAlt, FaChartLine, FaHeart } from 'react-icons/fa';

const cardData = [
    {
        icon: <FaUserMd className="text-2xl text-teal-600" />,
        title: "Expert Care Team",
        description: "Our therapists are licensed professionals with specialized training in various mental health areas, ensuring you receive expert care tailored to your unique needs.",
        linkText: "Meet our therapists"
    },
    {
        icon: <FaLock className="text-2xl text-teal-600" />,
        title: "Safe & Confidential",
        description: "Your privacy is our priority. We use end-to-end encryption and strict confidentiality protocols to ensure your mental health journey remains private and secure.",
        linkText: "Our privacy commitment"
    },
    {
        icon: <FaUsers className="text-2xl text-teal-600" />,
        title: "Supportive Community",
        description: "Connect with others on similar journeys in our moderated community spaces. Share experiences, find understanding, and build meaningful connections.",
        linkText: "Join the community"
    },
    {
        icon: <FaCalendarAlt className="text-2xl text-teal-600" />,
        title: "Flexible Options",
        description: "Therapy that fits your schedule and preferences. Choose from video, phone, or text sessions, available at times that work for you, including evenings and weekends.",
        linkText: "View session options"
    },
    {
        icon: <FaChartLine className="text-2xl text-teal-600" />,
        title: "Evidence-Based Approaches",
        description: "Our therapeutic methods are grounded in scientific research and clinical best practices, ensuring you receive effective, proven support for your mental wellness.",
        linkText: "Our therapeutic approaches"
    },
    {
        icon: <FaHeart className="text-2xl text-teal-600" />,
        title: "Compassionate Support",
        description: "Experience care that comes from genuine understanding. Our team is dedicated to creating a non-judgmental space where you can explore your thoughts and feelings freely.",
        linkText: "Read testimonials"
    }
];

const WhyChooseUs = () => {
    return (
        <div className="py-20 bg-gradient-to-b from-teal-50 to-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-1 mb-4 text-sm font-medium text-teal-800 bg-teal-200 rounded-full">
                        Our Approach
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Why Choose StayUnfiltered for Your Mental Wellness Journey
                    </h2>
                    <p className="max-w-2xl mx-auto text-gray-600 text-lg">
                        Discover the compassionate, professional care that sets us apart in supporting your mental health
                    </p>
                </div>

                {/* Cards Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cardData.map((card, index) => (
                        <div key={index} className="bg-white rounded-2xl shadow-md overflow-hidden border border-teal-100 transition-all duration-300 hover:shadow-xl">
                            <div className="p-1 bg-gradient-to-r from-teal-500 to-cyan-500"></div>
                            <div className="p-8">
                                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6">
                                    {card.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{card.title}</h3>
                                <p className="text-gray-600 mb-6">{card.description}</p>
                                <div className="flex items-center text-sm text-teal-700 font-medium">
                                    <span>{card.linkText}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;
