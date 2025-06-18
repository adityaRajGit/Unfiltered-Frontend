import Image from "next/image";
import Link from "next/link";
import { FaUser, FaUsers, FaLifeRing, FaCalendarAlt, FaClock } from "react-icons/fa";

function Section6() {
    const services = [
        {
            title: "Individual Therapy",
            desc: "Personalized one-on-one sessions tailored to your unique challenges and goals with a licensed therapist.",
            img: '/therapy1.jpeg',
            button: "Find Your Therapist",
            icon: <FaUser className="text-2xl text-teal-600" />,
            duration: "50 min sessions",
            features: ["Personalized approach", "Confidential space", "Flexible scheduling"]
        },
        {
            title: "Group Sessions",
            desc: "Join supportive communities for shared experiences and collective healing in moderated group settings.",
            img: '/therapy2.jpg',
            button: "Join a Group",
            icon: <FaUsers className="text-2xl text-teal-600" />,
            duration: "60-90 min sessions",
            features: ["Peer support", "Shared experiences", "Community connection"]
        },
        {
            title: "Crisis Support",
            desc: "Immediate access to trained professionals for urgent mental health support when you need it most.",
            img: '/therapy3.jpg',
            button: "Get Help Now",
            icon: <FaLifeRing className="text-2xl text-teal-600" />,
            duration: "24/7 availability",
            features: ["Immediate response", "Trained specialists", "Confidential support"]
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
                        Comprehensive Support Options
                    </h2>
                    <p className="max-w-2xl mx-auto text-gray-600 text-lg">
                        Find the right type of support for your needs with our diverse range of mental wellness services.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {services.map((service, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-teal-100"
                        >
                            <div className="relative h-64">
                                <Image
                                    src={service.img}
                                    alt={service.title}
                                    layout="fill"
                                    objectFit="cover"
                                    className="w-full"
                                />
                                <div className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-md">
                                    {service.icon}
                                </div>
                                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
                                    <h3 className="text-xl font-bold text-white">{service.title}</h3>
                                    <div className="flex items-center text-teal-300 text-sm mt-1">
                                        <FaClock className="mr-1" />
                                        <span>{service.duration}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                <p className="text-gray-600 mb-5">{service.desc}</p>

                                <div className="mb-6">
                                    <h4 className="text-sm font-medium text-gray-900 mb-2">Key Features:</h4>
                                    <ul className="space-y-2">
                                        {service.features.map((feature, i) => (
                                            <li key={i} className="flex items-start">
                                                <svg className="h-5 w-5 text-teal-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="text-gray-600">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <Link
                                    href="/services"
                                    className="w-full flex items-center justify-center px-4 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
                                >
                                    {service.button}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl p-8 md:p-12 text-white">
                    <div className="flex flex-col md:flex-row md:items-center gap-8">
                        <div className="flex-1">
                            <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Begin Your Healing Journey?</h3>
                            <p className="text-teal-100 mb-6">
                                Take the first step toward better mental health. Our team is here to support you every step of the way.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="/pages/login"
                                    className="px-6 py-3 bg-white text-teal-700 font-medium rounded-full hover:bg-gray-100 transition-colors"
                                >
                                    Create Your Account
                                </Link>
                                <Link
                                    href="/contact"
                                    className="px-6 py-3 border-2 border-white text-white font-medium rounded-full hover:bg-white/10 transition-colors"
                                >
                                    Contact Our Team
                                </Link>
                            </div>
                        </div>
                        <div className="flex-1 flex justify-center">
                            <div className="bg-teal-500/20 p-6 rounded-full">
                                <div className="bg-teal-400/20 p-6 rounded-full">
                                    <div className="bg-teal-300/20 p-8 rounded-full flex items-center justify-center">
                                        <FaCalendarAlt className="text-4xl text-white" />
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

export default Section6;