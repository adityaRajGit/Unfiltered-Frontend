import Image from "next/image";
import Link from "next/link";

function Section2() {
    const therapy = [
        {
            title: "Individual Therapy",
            desc: "One-on-one sessions to address personal challenges and develop coping strategies.",
            img: '/therapy1.jpeg',
        },
        {
            title: "Corporate Wellness",
            desc: "Holistic mental health support for employees through EAPs, on-demand therapy, and expert-led workshops and webinars.",
            img: '/therapy5.jpeg',
        },
        {
            title: "Life Coaching",
            desc: "Unlock potential. Build clarity. Lead with confidence. Personal coaching for goal setting, productivity, emotional growth, and leadership.",
            img: '/therapy6.jpeg',
        },
        {
            title: "Couples Counseling",
            desc: "Work on communication, intimacy, and relationship dynamics with a professional mediator.",
            img: '/therapy2.jpeg',
        },
        {
            title: "Group Therapy",
            desc: "Led by certified mental health professionals, encourages open communication and emotional growth.",
            img: '/therapy3.jpeg',
        },
        {
            title: "Family Therapy",
            desc: "Improve family dynamics, resolve conflicts, and strengthen relationships between members.",
            img: '/therapy4.jpeg',
        },
    ];

    return (
        <div className="py-16 px-4 sm:px-6 bg-gradient-to-b from-teal-50 to-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-14">
                    <div className="inline-block px-4 py-1 mb-4 text-sm font-medium text-teal-800 bg-teal-200 rounded-full">
                        Therapeutic Approaches
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Transforming Employee Wellness, One Company at a Time
                    </h2>
                    <p className="max-w-3xl mx-auto text-gray-600 text-lg">
                        Empowering organizations with complete mental health solutions — from private therapy and group support to corporate webinars and interactive wellness workshops
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {therapy.map((therapy, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl"
                        >
                            <div className="relative h-60">
                                <Image
                                    src={therapy.img}
                                    alt={therapy.title}
                                    fill style={{ objectFit: 'cover' }}
                                    className="w-full"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                <div className="absolute bottom-4 left-4">
                                    <h3 className="text-xl font-bold text-white">{therapy.title}</h3>
                                </div>
                            </div>

                            <div className="p-6">
                                <p className="text-gray-600 mb-5">{therapy.desc}</p>
                                <div className="flex justify-between items-center">
                                    <Link
                                        className="text-teal-700 font-medium hover:text-teal-900 transition-colors flex items-center"
                                        href="/"
                                    >
                                        Learn more
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Link
                        href="/therapy"
                        className="inline-flex items-center px-8 py-3 bg-teal-600 text-white font-medium rounded-full hover:bg-teal-700 transition-colors"
                    >
                        Explore All Therapy Options
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Section2;