import Link from 'next/link';

const CorporateTherapySection = () => {
    return (
        <section className="py-16 md:py-24 px-4" style={{ backgroundColor: '#e2fdf7' }}>
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Corporate Wellness Programs
                    </h2>
                    <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                        Transform your workplace with our tailored mental health solutions. Support your team&apos;s
                        well-being and foster a healthier, more productive work environment.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Features & Benefits */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">
                            Comprehensive Support for Your Team
                        </h3>

                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1 bg-teal-100 p-3 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <h4 className="font-semibold text-gray-900">Group Therapy Sessions</h4>
                                    <p className="text-gray-600 mt-1">Themed sessions addressing common workplace challenges like stress management and team communication</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1 bg-teal-100 p-3 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <h4 className="font-semibold text-gray-900">Confidential 1-on-1 Support</h4>
                                    <p className="text-gray-600 mt-1">Private sessions for employees needing individual attention</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1 bg-teal-100 p-3 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <h4 className="font-semibold text-gray-900">Regular Wellness Workshops</h4>
                                    <p className="text-gray-600 mt-1">Monthly expert-led sessions on mental health topics relevant to your industry</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1 bg-teal-100 p-3 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <h4 className="font-semibold text-gray-900">Analytics & Reporting</h4>
                                    <p className="text-gray-600 mt-1">Anonymized insights into program engagement and effectiveness</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <Link href="/pages/corporate" passHref>
                                <button
                                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 shadow-lg"
                                    aria-label="Learn more about corporate therapy packages"
                                >
                                    Explore Program Details
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Benefits & Program Options */}
                    <div className="bg-gradient-to-br from-teal-500 to-teal-700 rounded-2xl shadow-lg p-8 text-white">
                        <h3 className="text-2xl font-bold mb-6">Benefits for Your Organization</h3>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <svg className="h-6 w-6 text-teal-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="ml-3">
                                    <span className="font-semibold">Increased Productivity:</span> Employees with better mental health are 12% more productive
                                </p>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <svg className="h-6 w-6 text-teal-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="ml-3">
                                    <span className="font-semibold">Reduced Absenteeism:</span> Companies see up to 25% reduction in sick days
                                </p>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <svg className="h-6 w-6 text-teal-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="ml-3">
                                    <span className="font-semibold">Improved Retention:</span> 65% of employees stay longer with mental health support
                                </p>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <svg className="h-6 w-6 text-teal-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="ml-3">
                                    <span className="font-semibold">Enhanced Culture:</span> Fosters a supportive environment where employees thrive
                                </p>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <svg className="h-6 w-6 text-teal-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="ml-3">
                                    <span className="font-semibold">Boosted Morale:</span> Employees feel more valued and engaged in their work
                                </p>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <svg className="h-6 w-6 text-teal-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="ml-3">
                                    <span className="font-semibold">Lower Healthcare Costs:</span> Organizations spend less on employee medical claims
                                </p>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <svg className="h-6 w-6 text-teal-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="ml-3">
                                    <span className="font-semibold">Stronger Employer Brand:</span> Attracts top talent by showing commitment to well-being
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

                {/* How It Works */}
                <div className="mt-20 max-w-4xl mx-auto">
                    <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">
                        Simple Implementation Process
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="mx-auto bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center text-teal-700 font-bold text-xl mb-4">
                                1
                            </div>
                            <h4 className="font-bold text-lg">Consultation</h4>
                            <p className="text-gray-600 mt-2">We assess your organization&apos;s specific needs</p>
                        </div>

                        <div className="text-center">
                            <div className="mx-auto bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center text-teal-700 font-bold text-xl mb-4">
                                2
                            </div>
                            <h4 className="font-bold text-lg">Customization</h4>
                            <p className="text-gray-600 mt-2">We tailor the program to your team&apos;s requirements</p>
                        </div>

                        <div className="text-center">
                            <div className="mx-auto bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center text-teal-700 font-bold text-xl mb-4">
                                3
                            </div>
                            <h4 className="font-bold text-lg">Onboarding</h4>
                            <p className="text-gray-600 mt-2">Seamless setup with dedicated support</p>
                        </div>

                        <div className="text-center">
                            <div className="mx-auto bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center text-teal-700 font-bold text-xl mb-4">
                                4
                            </div>
                            <h4 className="font-bold text-lg">Ongoing Support</h4>
                            <p className="text-gray-600 mt-2">Continuous optimization and check-ins</p>
                        </div>
                    </div>

                    <div className="text-center mt-12">
                        <Link href="/pages/corporate" passHref>
                            <button
                                className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 shadow-lg inline-flex items-center"
                                aria-label="Contact us about corporate therapy programs"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                                Schedule a Consultation
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CorporateTherapySection;