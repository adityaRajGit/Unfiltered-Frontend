import Link from "next/link"


function Section4() {
    return (
        <div className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-1 mb-4 text-sm font-medium text-teal-800 bg-teal-200 rounded-full">
                        Meet Our Leaders
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        The Visionaries Behind StayUnfiltered
                    </h2>
                    <p className="max-w-3xl mx-auto text-gray-600 text-lg">
                        A diverse team united by a passion for mental health innovation
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        {
                            name: "Dr. Priya Sharma",
                            title: "Founder & CEO",
                            bio: "Clinical psychologist with 15+ years experience. Passionate about tech-enabled mental health solutions.",
                            image: ''
                        },
                        {
                            name: "Rajiv Mehta",
                            title: "CTO",
                            bio: "Tech innovator focused on creating secure, accessible platforms for healthcare delivery.",
                            image: ''
                        },
                        {
                            name: "Ananya Patel",
                            title: "Clinical Director",
                            bio: "Oversees therapist network and ensures clinical excellence across all services.",
                            image: ''
                        },
                        {
                            name: "Sanjay Kumar",
                            title: "Head of Community",
                            bio: "Builds and nurtures our global community of users and mental health advocates.",
                            image: ''
                        }
                    ].map((member, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-md overflow-hidden"
                        >
                            <div className="relative h-72">
                                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full" />
                                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
                                    <h3 className="text-xl font-bold text-white">{member.name}</h3>
                                    <p className="text-teal-300 text-sm">{member.title}</p>
                                </div>
                            </div>
                            <div className="p-6">
                                <p className="text-gray-600">{member.bio}</p>
                                <div className="mt-4 flex space-x-3">
                                    <a href="#" className="text-teal-600 hover:text-teal-800">
                                        <span className="sr-only">LinkedIn</span>
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                        </svg>
                                    </a>
                                    <a href="#" className="text-teal-600 hover:text-teal-800">
                                        <span className="sr-only">Twitter</span>
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Link
                        href="/team"
                        className="inline-flex items-center px-8 py-3 bg-teal-600 text-white font-medium rounded-full hover:bg-teal-700 transition-colors"
                    >
                        Meet Our Full Team
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Section4