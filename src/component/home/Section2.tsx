import Image from "next/image";
import Link from "next/link";

function Section2() {
    const therapy = [
        {
            title: "Individual Therapy",
            desc: "One-on-one sessions to address personal challenges such as anxiety, trauma, grief, and more, while developing healthy coping strategies.",
            img: '/therapy1.jpeg',
            link: '/pages/one-on-one'
        },
        {
            title: "Nutrition & Diet Consulting",
            desc: "Personalized nutrition plans and wellness guidance from certified experts to support both physical and mental well-being, boost energy levels, and improve workplace performance.",
            img: '/therapy5.jpeg',
            link: ''
        },
        {
            title: "Soft Skills Training & Development",
            desc: "Interactive sessions led by professionals focusing on communication, emotional intelligence, teamwork, adaptability, leadership, and conflict resolution to enhance workplace effectiveness.",
            img: '/therapy3.jpeg',
            link: '/pages/corporate#corporate-contact'
        },
        {
            title: "Workplace Counseling & Support",
            desc: "Focus on work-related mental health concerns: Performance anxiety, conflict with coworkers/managers, workplace harassment or bullying, career dissatisfaction, remote work isolation.",
            img: '/therapy6.jpeg',
            link: '/pages/corporate#corporate-contact'
        },
        {
            title: "Webinars & Workshops",
            desc: "Preventive and educational sessions covering: Managing stress and burnout, mindfulness & emotional resilience, conflict resolution at work, mental health first aid, empathy and leadership, sleep, diet, and mental health.",
            img: '/therapy2.jpg',
            link: '/pages/corporate#corporate-contact'
        },
        {
            title: "Managerial Coaching | Leadership",
            desc: "Well-being focused therapy-like support and strategic coaching: Emotional intelligence coaching, executive stress and pressure support, coaching on supporting struggling employees, and preventing toxic leadership traits.",
            img: '/therapy4.jpg',
            link: '/pages/corporate#corporate-contact'
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
                                        href={therapy.link}
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
                        href="/pages/one-on-one"
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