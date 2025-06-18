import Image from "next/image";
import Link from "next/link";
import { FaStar, FaRegStar, FaRegClock, FaRegComments } from "react-icons/fa";

function Section5() {
    const therapists = [
        {
            name: "Dr. Anand Sharma",
            title: "Clinical Psychologist",
            specialties: ["Anxiety", "Depression", "Stress Management"],
            experience: "15 years",
            sessions: 345,
            rating: 4.9,
            reviews: 128,
            image: '/people/people4.jpg'
        },
        {
            name: "Dr. Rahul Srivastav",
            title: "Licensed Therapist",
            specialties: ["Relationship Issues", "Trauma", "Self-Esteem"],
            experience: "12 years",
            sessions: 520,
            rating: 4.8,
            reviews: 96,
            image: '/people/people2.jpg'
        },
        {
            name: "Dr. Nidhi Rai",
            title: "Counseling Psychologist",
            specialties: ["Grief Counseling", "Life Transitions", "Career Counseling"],
            experience: "10 years",
            sessions: 480,
            rating: 4.9,
            reviews: 142,
            image: '/people/people3.jpg'
        }
    ];

    return (
        <div className="py-20 bg-gradient-to-b from-teal-50 to-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-1 mb-4 text-sm font-medium text-teal-800 bg-teal-200 rounded-full">
                        Meet Our Experts
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Our Experienced Therapists
                    </h2>
                    <p className="max-w-2xl mx-auto text-gray-600 text-lg">
                        Compassionate professionals dedicated to helping you on your journey to mental wellness.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {therapists.map((therapist, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-teal-100 transition-all duration-300 hover:shadow-2xl"
                        >
                            <div className="relative h-72">
                                <Image
                                    src={therapist.image}
                                    alt={therapist.name}
                                    layout="fill"
                                    objectFit="cover"
                                    className="w-full"
                                />
                                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
                                    <h3 className="text-xl font-bold text-white">{therapist.name}</h3>
                                    <p className="text-teal-300 text-sm">{therapist.title}</p>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            i < Math.floor(therapist.rating) ?
                                                <FaStar key={i} className="text-yellow-400" /> :
                                                <FaRegStar key={i} className="text-gray-300" />
                                        ))}
                                        <span className="ml-2 text-gray-700 font-medium">{therapist.rating}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <FaRegComments className="mr-1" />
                                        <span>{therapist.reviews} reviews</span>
                                    </div>
                                </div>

                                <div className="mb-5">
                                    <div className="flex items-center text-sm text-gray-600 mb-2">
                                        <FaRegClock className="mr-2" />
                                        <span>{therapist.experience} experience</span>
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        <span className="font-medium">Sessions conducted:</span> {therapist.sessions.toLocaleString()}
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h4 className="text-sm font-medium text-gray-900 mb-2">Specializes in:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {therapist.specialties.map((specialty, idx) => (
                                            <span
                                                key={idx}
                                                className="px-3 py-1 bg-teal-100 text-teal-800 text-xs font-medium rounded-full"
                                            >
                                                {specialty}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-between">
                                    <Link
                                        href={`/therapists/${therapist.name.replace(/\s+/g, '-').toLowerCase()}`}
                                        className="text-teal-700 font-medium hover:text-teal-900 transition-colors flex items-center"
                                    >
                                        View profile
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                    <Link
                                        href="/schedule"
                                        className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors"
                                    >
                                        Schedule Session
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Link
                        href="/therapists"
                        className="inline-flex items-center px-8 py-3 bg-white border-2 border-teal-600 text-teal-700 font-medium rounded-full hover:bg-teal-50 transition-colors"
                    >
                        Browse All Therapists
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Section5;