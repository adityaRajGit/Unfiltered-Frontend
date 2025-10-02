"use client";
import { useState } from "react";
import {
    FaUserFriends,
    FaLock,
    FaComments,
    FaUsers,
    FaCalendarAlt,
    FaHeadset
} from "react-icons/fa";

// Define type for a Feature
interface Feature {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: any;
    title: string;
    description: string;
    fullDescription: string;
    linkText: string
}

function Section4() {
    const [activeFeature, setActiveFeature] = useState<Feature | null>(null);
    const [showModal, setShowModal] = useState(false);

    const features: Feature[] = [
        {
            icon: <FaUserFriends className="text-3xl text-teal-600" />,
            title: "Personalized Matching",
            description:
                "Find the right therapist based on your specific needs, preferences, and therapy goals.",
            fullDescription:
                "Our advanced matching system goes beyond basic preferences. It considers your therapy goals, personality type, and communication style to ensure you’re paired with the best-fit therapist. Whether you prefer cognitive-behavioral therapy, mindfulness practices, or holistic approaches, we help you find someone who truly resonates with your journey. This personalized process increases the chances of building a strong, meaningful therapeutic relationship from the very start.",
            linkText: "Match with a therapist"
        },
        {
            icon: <FaLock className="text-3xl text-teal-600" />,
            title: "Secure & Private Sessions",
            description:
                "End-to-end encrypted sessions ensure your privacy is protected at all times.",
            fullDescription:
                "We understand that privacy is the foundation of trust in therapy. That’s why we employ enterprise-grade, end-to-end encryption across all communication channels. Your video, audio, and chat sessions are never recorded or stored. Additionally, our platform is compliant with HIPAA and GDPR standards, ensuring strict confidentiality. You can focus entirely on your healing, knowing that your sensitive information is safe and respected.",
            linkText: "Learn about security"
        },
        {
            icon: <FaComments className="text-3xl text-teal-600" />,
            title: "Flexible Session Options",
            description:
                "Video, phone, or chat sessions that fit your schedule and comfort level.",
            fullDescription:
                "Life is busy, and we believe therapy should adapt to you—not the other way around. Whether you’re at home, at work, or traveling, you can choose video calls for immersive face-to-face sessions, audio calls for flexibility, or chat-based therapy for discreet conversations on the go. With evening and weekend availability, our therapists work around your schedule, making mental health care more accessible than ever.",
            linkText: "Explore options"
        },
        {
            icon: <FaUsers className="text-3xl text-teal-600" />,
            title: "Supportive Community",
            description:
                "Connect with others on similar journeys in our moderated, safe forums.",
            fullDescription:
                "Healing is not just about one-on-one sessions—it’s also about knowing you’re not alone. Our supportive community brings together individuals facing similar challenges in safe, moderated spaces. From group discussions and Q&A sessions to themed forums focused on anxiety, depression, or self-growth, you can share stories, learn from others, and feel part of a compassionate network that values confidentiality and empathy.",
            linkText: "Join the community"
        },
        {
            icon: <FaCalendarAlt className="text-3xl text-teal-600" />,
            title: "Easy Scheduling",
            description:
                "Book, reschedule, or cancel sessions anytime with our intuitive calendar.",
            fullDescription:
                "Our scheduling system is designed for simplicity and flexibility. With real-time availability and calendar syncing, you can find a time that fits effortlessly into your life. Automated reminders via email and SMS ensure you never miss a session. Need to reschedule at the last minute? No problem—our platform allows quick adjustments without unnecessary hassle, giving you complete control over your therapy journey.",
            linkText: "View availability"
        },
        {
            icon: <FaHeadset className="text-3xl text-teal-600" />,
            title: "24/7 Support",
            description:
                "Our care team is always available to answer your questions and provide assistance.",
            fullDescription:
                "Your mental health journey doesn’t stop after a session—and neither do we. Our dedicated support team is available 24/7 to assist with everything from booking issues and technical troubleshooting to urgent guidance in moments of need. Whether you have a quick question at midnight or need reassurance before a session, you’ll always have someone ready to listen and support you instantly.",
            linkText: "Contact support"
        },
    ];


    const openModal = (feature: Feature) => {
        setActiveFeature(feature);
        setShowModal(true);
        setTimeout(() => {
            const modal = document.getElementById("feature-modal");
            if (modal) modal.classList.remove("opacity-0", "scale-95");
        }, 20);
    };

    const closeModal = () => {
        const modal = document.getElementById("feature-modal");
        if (modal) {
            modal.classList.add("opacity-0", "scale-95");
            setTimeout(() => {
                setShowModal(false);
                setActiveFeature(null);
            }, 200);
        }
    };

    return (
        <div className="py-20 bg-gradient-to-b from-white to-teal-50">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Heading */}
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-1 mb-4 text-sm font-medium text-teal-800 bg-teal-200 rounded-full">
                        Our Services
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Comprehensive Mental Wellness Support
                    </h2>
                    <p className="max-w-2xl mx-auto text-gray-600 text-lg">
                        Everything you need for your mental health journey in one place,
                        designed with your needs in mind.
                    </p>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            onClick={() => openModal(feature)}
                            className="cursor-pointer bg-white rounded-xl shadow-md overflow-hidden border border-teal-100 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                        >
                            <div className="p-1 bg-gradient-to-r from-teal-500 to-cyan-500"></div>
                            <div className="p-7">
                                <div className="mb-5">
                                    <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center">
                                        {feature.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 mb-6">{feature.description}</p>
                                <div
                                    className="inline-flex items-center text-teal-700 font-medium hover:text-teal-900 transition-colors group"
                                >
                                    {feature.linkText}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal */}
                {showModal && activeFeature && (
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
                        onClick={closeModal}
                    >
                        <div
                            id="feature-modal"
                            className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-8 relative transform transition-all duration-200 opacity-0 scale-95"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                                onClick={closeModal}
                            >
                                ✕
                            </button>

                            <div className="mb-6 flex items-center gap-3">
                                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                                    {activeFeature.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">
                                    {activeFeature.title}
                                </h3>
                            </div>

                            <p className="text-gray-600 mb-4">
                                {activeFeature.fullDescription}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Section4;
