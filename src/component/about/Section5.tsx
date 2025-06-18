
function Section5() {
    return (
        <div className="py-20 bg-gray-50 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-1 mb-4 text-sm font-medium text-teal-800 bg-teal-200 rounded-full">
                        Our Journey
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Milestones Along the Way
                    </h2>
                    <p className="max-w-3xl mx-auto text-gray-600 text-lg">
                        Key moments that have shaped our growth and impact
                    </p>
                </div>

                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-teal-300"></div>

                    <div className="space-y-12">
                        {[
                            {
                                year: "2018",
                                title: "Founding Vision",
                                description: "StayUnfiltered founded in Bangalore with a mission to democratize mental healthcare"
                            },
                            {
                                year: "2019",
                                title: "Platform Launch",
                                description: "First version of our platform launched, serving 500 users in the first month"
                            },
                            {
                                year: "2020",
                                title: "Global Expansion",
                                description: "Expanded services to 5 countries during the pandemic mental health crisis"
                            },
                            {
                                year: "2021",
                                title: "Series A Funding",
                                description: "Secured $8M to expand our therapist network and technology platform"
                            },
                            {
                                year: "2022",
                                title: "Mobile App Launch",
                                description: "Launched iOS and Android apps with 100k downloads in the first quarter"
                            },
                            {
                                year: "2023",
                                title: "100k Members",
                                description: "Reached milestone of 100,000 active users across 20+ countries"
                            }
                        ].map((milestone, index) => (
                            <div
                                key={index}
                                className={`relative flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                            >
                                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                                    <div className="bg-white p-6 rounded-2xl shadow-md">
                                        <div className="text-teal-600 font-bold text-lg mb-1">{milestone.year}</div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                                        <p className="text-gray-600">{milestone.description}</p>
                                    </div>
                                </div>

                                {/* Dot */}
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-teal-600 rounded-full border-4 border-white shadow-lg"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Section5