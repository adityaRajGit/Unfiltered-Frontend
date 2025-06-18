import Link from "next/link";
import { FaUserFriends, FaLock, FaComments, FaUsers, FaCalendarAlt, FaHeadset, FaChartLine } from "react-icons/fa";

function Section4() {
    const features = [
        {
            icon: <FaUserFriends className="text-3xl text-teal-600" />,
            title: "Personalized Matching",
            description: "Find the right therapist based on your specific needs, preferences, and therapy goals.",
            linkText: "Match with a therapist",
            href: "/matching"
        },
        {
            icon: <FaLock className="text-3xl text-teal-600" />,
            title: "Secure & Private Sessions",
            description: "End-to-end encrypted sessions ensure your privacy is protected at all times.",
            linkText: "Learn about security",
            href: "/security"
        },
        {
            icon: <FaComments className="text-3xl text-teal-600" />,
            title: "Flexible Session Options",
            description: "Video, phone, or chat sessions that fit your schedule and comfort level.",
            linkText: "Explore options",
            href: "/options"
        },
        {
            icon: <FaUsers className="text-3xl text-teal-600" />,
            title: "Supportive Community",
            description: "Connect with others on similar journeys in our moderated, safe forums.",
            linkText: "Join the community",
            href: "/community"
        },
        {
            icon: <FaCalendarAlt className="text-3xl text-teal-600" />,
            title: "Easy Scheduling",
            description: "Book, reschedule, or cancel sessions anytime with our intuitive calendar.",
            linkText: "View availability",
            href: "/scheduling"
        },
        {
            icon: <FaHeadset className="text-3xl text-teal-600" />,
            title: "24/7 Support",
            description: "Our care team is always available to answer your questions and provide assistance.",
            linkText: "Contact support",
            href: "/support"
        }
    ];

    return (
        <div className="py-20 bg-gradient-to-b from-white to-teal-50">
            <div className="max-w-7xl mx-auto px-4">
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-md overflow-hidden border border-teal-100 transition-all duration-300 hover:shadow-xl"
                        >
                            <div className="p-1 bg-gradient-to-r from-teal-500 to-cyan-500"></div>
                            <div className="p-7">
                                <div className="mb-5">
                                    <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center">
                                        {feature.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600 mb-6">{feature.description}</p>
                                <Link
                                    href={feature.href}
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
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl p-8 md:p-12 text-white">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex flex-col md:flex-row md:items-center gap-8">
                            <div className="flex-1">
                                <h3 className="text-2xl md:text-3xl font-bold mb-4">Start Your Journey Today</h3>
                                <p className="text-teal-100 mb-6">
                                    Take the first step towards better mental health. Our team is ready to support you
                                    on your path to wellness.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Link
                                        href="/pages/login"
                                        className="px-6 py-3 bg-white text-teal-700 font-medium rounded-full hover:bg-gray-100 transition-colors flex items-center"
                                    >
                                        Create Account
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </Link>
                                    <Link
                                        href="/therapists"
                                        className="px-6 py-3 border-2 border-white text-white font-medium rounded-full hover:bg-white/10 transition-colors"
                                    >
                                        Browse Therapists
                                    </Link>
                                </div>
                            </div>
                            <div className="flex-1 flex justify-center">
                                <div className="bg-teal-500/20 p-6 rounded-full">
                                    <div className="bg-teal-400/20 p-6 rounded-full">
                                        <div className="bg-teal-300/20 p-8 rounded-full">
                                            <FaChartLine className="text-4xl text-white" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Section4;