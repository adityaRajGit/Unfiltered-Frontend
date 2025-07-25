function Benefits() {
    return (
        <section className="py-16 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Transformative Impact on Organizations
                    </h2>
                    <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                        Our programs deliver measurable results that drive business success
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {[
                        {
                            title: "Enhanced Productivity",
                            description: "Employees with better mental health are 12-15% more productive and engaged",
                            icon: (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            ),
                            color: "from-cyan-500 to-teal-500"
                        },
                        {
                            title: "Reduced Absenteeism",
                            description: "Companies see 20-30% fewer sick days with comprehensive mental health support",
                            icon: (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            ),
                            color: "from-teal-500 to-green-500"
                        },
                        {
                            title: "Improved Retention",
                            description: "65% of employees stay longer with organizations that prioritize mental health",
                            icon: (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            ),
                            color: "from-green-500 to-emerald-500"
                        },
                        {
                            title: "Positive Culture",
                            description: "Foster a supportive environment where employees feel valued and understood",
                            icon: (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            ),
                            color: "from-emerald-500 to-teal-600"
                        }
                    ].map((benefit, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300"
                        >
                            <div className={`h-2 bg-gradient-to-r ${benefit.color}`}></div>
                            <div className="p-6">
                                <div className={`bg-gradient-to-br ${benefit.color} w-20 h-20 rounded-2xl flex items-center justify-center mb-6`}>
                                    {benefit.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                                <p className="text-gray-700">{benefit.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Global Impact Section */}
                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-3xl p-8 md:p-12">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Global Impact of Workplace Mental Health
                        </h2>
                        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                            Mental health challenges affect workplaces worldwide with significant economic consequences
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-8">
                            {[
                                {
                                    stat: "US$ 1 trillion",
                                    description: "Annual lost productivity cost due to mental health conditions (WHO)",
                                    color: "bg-teal-500"
                                },
                                {
                                    stat: "£56 billion",
                                    description: "Annual cost to UK employers from poor mental health (Spill.chat)",
                                    color: "bg-cyan-500"
                                },
                                {
                                    stat: "80%",
                                    description: "Indian workforce reporting mental health issues in past year (Deloitte)",
                                    color: "bg-emerald-500"
                                },
                                {
                                    stat: "$4 for every $1",
                                    description: "Return on investment from effective mental health programs (Talkspace)",
                                    color: "bg-teal-600"
                                }
                            ].map((item, index) => (
                                <div key={index} className="flex items-start">
                                    <div className={`${item.color} w-3 h-3 rounded-full mt-2 mr-4`}></div>
                                    <div>
                                        <p className="text-2xl font-bold text-gray-900 mb-1">{item.stat}</p>
                                        <p className="text-gray-700">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-8 flex items-center justify-center">
                            <div className="text-center">
                                <div className="inline-flex items-center justify-center bg-gradient-to-br from-teal-500 to-teal-700 w-24 h-24 rounded-full mb-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">Global Mental Health Crisis</h3>
                                <p className="text-gray-700">
                                    Workplace mental health has become a critical global issue affecting productivity, retention, and economic growth across all industries and regions.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Benefits