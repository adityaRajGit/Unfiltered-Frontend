"use client"
import { useState } from "react"


function ProgramDetails() {
    const [activeTab, setActiveTab] = useState('group');

    return (
        <section className="py-16 px-4 bg-gradient-to-b from-teal-50 to-cyan-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Comprehensive Wellness Solutions
                    </h2>
                    <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                        Tailored programs designed to meet your organization&apos;s unique needs
                    </p>
                </div>

                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-16">
                    <div className="border-b border-gray-200">
                        <div className="flex flex-wrap">
                            {[
                                { id: 'group', label: 'Group Support' },
                                { id: 'individual', label: 'Individual Support' },
                                { id: 'resources', label: 'Organizational Resources' },
                                { id: 'analytics', label: 'Analytics & Reporting' }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    className={`px-6 py-4 font-medium text-lg transition-colors duration-300 ${activeTab === tab.id
                                        ? 'text-teal-700 border-b-2 border-teal-700'
                                        : 'text-gray-600 hover:text-teal-600'
                                        }`}
                                    onClick={() => setActiveTab(tab.id)}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="p-8">
                        {/* Group Support Tab */}
                        {activeTab === 'group' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-8">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 bg-teal-100 p-3 rounded-xl mr-4">
                                            <div className="w-10 h-10 bg-teal-500 rounded-lg"></div>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">Themed Workshops</h3>
                                            <p className="text-gray-700">
                                                Monthly sessions on stress management, resilience building, work-life balance, and communication skills
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 bg-teal-100 p-3 rounded-xl mr-4">
                                            <div className="w-10 h-10 bg-teal-500 rounded-lg"></div>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">Department-Specific Groups</h3>
                                            <p className="text-gray-700">
                                                Customized support for teams facing unique challenges (leadership, sales, customer support, etc.)
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 bg-teal-100 p-3 rounded-xl mr-4">
                                            <div className="w-10 h-10 bg-teal-500 rounded-lg"></div>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">Team Building Activities</h3>
                                            <p className="text-gray-700">
                                                Collaborative exercises that strengthen relationships and improve communication
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="inline-flex items-center justify-center bg-white p-4 rounded-full mb-6">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">Group Engagement</h3>
                                        <p className="text-gray-700">
                                            Foster team cohesion and shared understanding through collaborative wellness activities
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Individual Support Tab */}
                        {activeTab === 'individual' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-8">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 bg-teal-100 p-3 rounded-xl mr-4">
                                            <div className="w-10 h-10 bg-teal-500 rounded-lg"></div>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">Confidential Counseling</h3>
                                            <p className="text-gray-700">
                                                Private sessions with licensed therapists tailored to individual needs
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 bg-teal-100 p-3 rounded-xl mr-4">
                                            <div className="w-10 h-10 bg-teal-500 rounded-lg"></div>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">Specialized Support</h3>
                                            <p className="text-gray-700">
                                                Access to therapists with expertise in trauma, grief, anxiety, and more
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 bg-teal-100 p-3 rounded-xl mr-4">
                                            <div className="w-10 h-10 bg-teal-500 rounded-lg"></div>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">Career Coaching</h3>
                                            <p className="text-gray-700">
                                                Guidance for employees navigating career transitions and professional development
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="inline-flex items-center justify-center bg-white p-4 rounded-full mb-6">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">Personalized Care</h3>
                                        <p className="text-gray-700">
                                            One-on-one support for employees needing individualized attention
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Organizational Resources Tab */}
                        {activeTab === 'resources' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-8">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 bg-teal-100 p-3 rounded-xl mr-4">
                                            <div className="w-10 h-10 bg-teal-500 rounded-lg"></div>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">Leadership Training</h3>
                                            <p className="text-gray-700">
                                                Programs to help managers support team mental health effectively
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 bg-teal-100 p-3 rounded-xl mr-4">
                                            <div className="w-10 h-10 bg-teal-500 rounded-lg"></div>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">Policy Consultation</h3>
                                            <p className="text-gray-700">
                                                Guidance on developing mental health-friendly workplace policies
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 bg-teal-100 p-3 rounded-xl mr-4">
                                            <div className="w-10 h-10 bg-teal-500 rounded-lg"></div>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">Resource Library</h3>
                                            <p className="text-gray-700">
                                                Curated materials for employees on various mental health topics
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="inline-flex items-center justify-center bg-white p-4 rounded-full mb-6">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">Strategic Development</h3>
                                        <p className="text-gray-700">
                                            Build sustainable mental health infrastructure for your organization
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Analytics & Reporting Tab */}
                        {activeTab === 'analytics' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-8">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 bg-teal-100 p-3 rounded-xl mr-4">
                                            <div className="w-10 h-10 bg-teal-500 rounded-lg"></div>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">Engagement Metrics</h3>
                                            <p className="text-gray-700">
                                                Track participation rates and session utilization across your organization
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 bg-teal-100 p-3 rounded-xl mr-4">
                                            <div className="w-10 h-10 bg-teal-500 rounded-lg"></div>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">Well-being Trends</h3>
                                            <p className="text-gray-700">
                                                Understand organizational mental health patterns without compromising privacy
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 bg-teal-100 p-3 rounded-xl mr-4">
                                            <div className="w-10 h-10 bg-teal-500 rounded-lg"></div>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">ROI Analysis</h3>
                                            <p className="text-gray-700">
                                                Measure program effectiveness through key organizational metrics
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="inline-flex items-center justify-center bg-white p-4 rounded-full mb-6">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">Data-Driven Insights</h3>
                                        <p className="text-gray-700">
                                            Make informed decisions with comprehensive program analytics
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="text-center">
                    <button
                        //   onClick={scrollToContact}
                        className="bg-gradient-to-r from-teal-600 to-teal-800 hover:from-teal-700 hover:to-teal-900 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                        Customize Your Program
                    </button>
                </div>
            </div>
        </section>
    )
}

export default ProgramDetails