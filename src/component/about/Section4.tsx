import Link from "next/link"

function Section4() {
    const services = [
        {
            title: "Confidential Counseling",
            description: "Personalized one-on-one therapy (via video or phone)",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
            )
        },
        {
            title: "Educational Webinars",
            description: "Live sessions on stress, diversity, and resilience",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            )
        },
        {
            title: "Interactive Workshops",
            description: "Group activities to promote mental health awareness",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            )
        },
        {
            title: "Resource Library",
            description: "Blog posts and insights based on emerging global trends",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            )
        },
        {
            title: "EAP Management",
            description: "Full program handling including assessments and reporting",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            )
        }
    ]

    const values = [
        {
            title: "Employee-First",
            description: "We prioritize people in every decision",
            icon: "👥"
        },
        {
            title: "Inclusivity",
            description: "We embrace diversity and design culturally sensitive programs",
            icon: "🌍"
        },
        {
            title: "Innovation",
            description: "We use AI and data to match employees with the right care fast",
            icon: "🚀"
        },
        {
            title: "Compassion & Integrity",
            description: "We treat every interaction with empathy and honesty",
            icon: "❤️"
        },
        {
            title: "Accountability",
            description: "We track impact and improve continuously",
            icon: "📊"
        }
    ]

    const industries = [
        { name: "Tech Startups", icon: "💻" },
        { name: "Healthcare", icon: "🏥" },
        { name: "Finance", icon: "💰" },
        { name: "Education", icon: "🎓" },
        { name: "Manufacturing", icon: "🏭" },
        { name: "Retail", icon: "🛒" },
        { name: "Non-profits", icon: "🤝" },
        { name: "Government", icon: "🏛️" }
    ]

    return (
        <div className="py-20 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                {/* Services Section */}
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-1 mb-4 text-sm font-medium text-teal-800 bg-teal-200 rounded-full">
                        What We Offer
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Comprehensive Mental Health Solutions
                    </h2>
                    <p className="max-w-3xl mx-auto text-gray-600 text-lg">
                        Tailored programs to enhance employee well-being and organizational health
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-20">
                    {services.map((service, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                            <div className="text-teal-600 mb-3">
                                {service.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                            <p className="text-gray-600 text-sm">{service.description}</p>
                        </div>
                    ))}
                </div>

                {/* Partnerships Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
                    <div>
                        <div className="inline-block px-4 py-1 mb-4 text-sm font-medium text-cyan-800 bg-cyan-200 rounded-full">
                            Who We Serve
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Trusted by Organizations Worldwide
                        </h2>
                        <p className="text-gray-700 mb-6">
                            We partner with companies of all sizes and industries, from MSMEs to Fortune 500 enterprises.
                        </p>
                        <p className="text-gray-700">
                            Whether your team is remote, hybrid, or in-office, Stay Unfiltered adapts to support your employees wherever they are.
                        </p>
                        
                        <div className="mt-8 grid grid-cols-4 gap-4">
                            {industries.slice(0, 4).map((industry, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <span className="text-2xl">{industry.icon}</span>
                                    <span className="text-sm text-gray-700">{industry.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-md p-8">
                        <div className="grid grid-cols-4 gap-4">
                            {industries.map((industry, index) => (
                                <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
                                    <div className="text-3xl mb-2">{industry.icon}</div>
                                    <div className="text-sm font-medium text-gray-700">{industry.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Values Section */}
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-1 mb-4 text-sm font-medium text-teal-800 bg-teal-200 rounded-full">
                        Our Values
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        The Foundation of Everything We Do
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
                    {values.map((value, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                            <div className="text-3xl mb-3">{value.icon}</div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                            <p className="text-gray-600 text-sm">{value.description}</p>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <Link
                        href="/employers"
                        className="inline-flex items-center px-8 py-3 bg-teal-600 text-white font-medium rounded-full hover:bg-teal-700 transition-colors"
                    >
                        Become a Partner
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Section4