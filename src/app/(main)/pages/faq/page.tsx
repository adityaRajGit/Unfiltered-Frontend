"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaLock, FaBuilding, FaHandshake, FaUsers, FaChartLine } from 'react-icons/fa';

const FAQPage = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleQuestion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqCategories = [
        {
            title: "General",
            icon: <FaBuilding className="text-teal-600 text-xl" />,
            questions: [
                {
                    question: "What is Stay Unfiltered?",
                    answer: "Stay Unfiltered is an online mental health platform designed to support emotional well-being in the workplace. We specialize in Employee Assistance Programs (EAPs), offering one-on-one therapy, corporate workshops, and webinars focused on building happier, more resilient teams through B2B partnerships."
                },
                {
                    question: "Why do you focus primarily on corporate clients?",
                    answer: "Over 90% of revenue for leading mental health platforms in India comes from corporate partnerships. Corporate-led EAPs are the most effective channel for adoption, scale, impact, and financial sustainability."
                },
                {
                    question: "Is Stay Unfiltered available across India and globally?",
                    answer: "Yes. Our platform is fully remote-first, serving clients across India and globally with multilingual therapists and time-zone aligned support."
                }
            ]
        },
        {
            title: "Services & EAP Details",
            icon: <FaHandshake className="text-teal-600 text-xl" />,
            questions: [
                {
                    question: "What does an Employee Assistance Program (EAP) include?",
                    answer: "Our EAP services offer comprehensive support to employees and their families. Key components include confidential therapy, 24/7 support, customized webinars and workshops, manager training, digital self-help tools, crisis response, and anonymized reporting."
                },
                {
                    question: "What services are included under Stay Unfiltered's EAP model?",
                    answer: "Our customizable EAP suite includes video or phone-based therapy, live webinars and workshops, CBT-based tools, burnout prevention programs, leadership coaching, and mental health assessments."
                },
                {
                    question: "Do you offer Pay-per-Usage plans?",
                    answer: "Yes, we provide Pay-per-Usage EAP options including session bundles, per-webinar pricing, optional family coverage, and access to digital tools without long-term subscriptions."
                },
                {
                    question: "What kind of issues can your therapists address?",
                    answer: "Our professionals support issues like stress, anxiety, burnout, depression, family challenges, trauma, grief, and career concerns."
                }
            ]
        },
        {
            title: "Corporate Solutions",
            icon: <FaUsers className="text-teal-600 text-xl" />,
            questions: [
                {
                    question: "How do you drive engagement among employees?",
                    answer: "We provide onboarding sessions, monthly campaigns, digital wellness content, and usage nudges to ensure consistent employee participation."
                },
                {
                    question: "Can we customize the EAP to our needs?",
                    answer: "Yes. You can customize sessions, coverage, webinar topics, delivery formats, and reporting. Everything is tailored to your organization's needs."
                },
                {
                    question: "What kind of reporting do you provide to employers?",
                    answer: "We provide anonymized, aggregated usage reports including session counts, popular topics, feedback, and attendance insights."
                }
            ]
        },
        {
            title: "Data Privacy & Security",
            icon: <FaLock className="text-teal-600 text-xl" />,
            questions: [
                {
                    question: "Is employee confidentiality guaranteed?",
                    answer: "Yes. We follow strict GDPR and DPDP standards. No identifiable data is shared. All session data is encrypted and anonymized for employer insights."
                },
                {
                    question: "How is our company data protected?",
                    answer: "We use enterprise-grade security measures including data encryption, secure servers, and strict access controls. All corporate data is treated with the highest confidentiality."
                }
            ]
        },
        {
            title: "Implementation & Support",
            icon: <FaChartLine className="text-teal-600 text-xl" />,
            questions: [
                {
                    question: "How long does it take to launch Stay Unfiltered in our organization?",
                    answer: "Most organizations are onboarded within 7-10 business days, including kickoff, communication rollout, and access setup."
                },
                {
                    question: "What support do you provide during implementation?",
                    answer: "We provide dedicated account managers, customized communication templates, manager training sessions, and ongoing support to ensure successful adoption."
                }
            ]
        }
    ];

    const allQuestions = faqCategories.flatMap(category =>
        category.questions.map(q => ({ ...q, category: category.title }))
    );

    const [searchQuery, setSearchQuery] = useState("");

    const filteredQuestions = allQuestions.filter(q =>
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-teal-700 to-cyan-600 py-16 md:py-24 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Corporate Mental Health Solutions
                    </h1>
                    <p className="text-xl text-teal-100 max-w-3xl mx-auto">
                        Frequently asked questions about our Employee Assistance Programs and corporate services
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
                {/* Search and Tabs */}
                <div className="mb-12">
                    <div className="relative mb-8">
                        <input
                            type="text"
                            placeholder="Search for questions..."
                            className="w-full p-4 pl-12 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <svg
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                {/* Search Results */}
                {searchQuery && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            Search Results for &quot;{searchQuery}&quot;
                        </h2>

                        {filteredQuestions.length > 0 ? (
                            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                                {filteredQuestions.map((q, index) => (
                                    <div
                                        key={index}
                                        className={`border-b border-gray-200 last:border-0 ${activeIndex === index ? "bg-teal-50" : ""
                                            }`}
                                    >
                                        <button
                                            className="w-full flex justify-between items-center p-6 text-left"
                                            onClick={() => toggleQuestion(index)}
                                        >
                                            <div>
                                                <span className="text-sm font-medium text-teal-600 bg-teal-100 px-3 py-1 rounded-full mr-3">
                                                    {q.category}
                                                </span>
                                                <span className="font-medium text-gray-900">{q.question}</span>
                                            </div>
                                            {activeIndex === index ? (
                                                <FaChevronUp className="text-teal-600" />
                                            ) : (
                                                <FaChevronDown className="text-gray-400" />
                                            )}
                                        </button>
                                        {activeIndex === index && (
                                            <div className="px-6 pb-6 text-gray-600">
                                                {q.answer}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                    <svg className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-medium text-gray-900 mb-2">No results found</h3>
                                <p className="text-gray-600">Try different search terms or browse our categories</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Category Sections */}
                {!searchQuery && (
                    <div className="space-y-16">
                        {faqCategories.map((category, catIndex) => (
                            <div key={catIndex} className="bg-white rounded-2xl shadow-md overflow-hidden">
                                <div className="flex items-center p-6 bg-teal-50 border-b border-teal-100">
                                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mr-4">
                                        {category.icon}
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
                                </div>

                                <div>
                                    {category.questions.map((q, qIndex) => {
                                        const globalIndex = faqCategories
                                            .slice(0, catIndex)
                                            .reduce((acc, cat) => acc + cat.questions.length, 0) + qIndex;

                                        return (
                                            <div
                                                key={qIndex}
                                                className={`border-b border-gray-200 last:border-0 ${activeIndex === globalIndex ? "bg-teal-50" : ""
                                                    }`}
                                            >
                                                <button
                                                    className="w-full flex justify-between items-center p-6 text-left"
                                                    onClick={() => toggleQuestion(globalIndex)}
                                                >
                                                    <span className="font-medium text-gray-900">{q.question}</span>
                                                    {activeIndex === globalIndex ? (
                                                        <FaChevronUp className="text-teal-600" />
                                                    ) : (
                                                        <FaChevronDown className="text-gray-400" />
                                                    )}
                                                </button>
                                                {activeIndex === globalIndex && (
                                                    <div className="px-6 pb-6 text-gray-600">
                                                        {q.answer}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Support CTA */}
                <div className="mt-20 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl p-8 md:p-12 text-white">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex flex-col md:flex-row md:items-center gap-8">
                            <div className="flex-1">
                                <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to implement mental wellness at your organization?</h2>
                                <p className="text-teal-100 mb-6">
                                    Our corporate solutions team is ready to help you build a customized EAP program.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Link
                                        href="/contact"
                                        className="px-6 py-3 bg-white text-teal-700 font-medium rounded-full hover:bg-gray-100 transition-colors"
                                    >
                                        Request a Demo
                                    </Link>
                                    <Link
                                        href="/pricing"
                                        className="px-6 py-3 border-2 border-white text-white font-medium rounded-full hover:bg-white/10 transition-colors"
                                    >
                                        View Pricing Plans
                                    </Link>
                                </div>
                            </div>
                            <div className="flex-1 flex justify-center">
                                <div className="bg-teal-500/20 p-6 rounded-full">
                                    <div className="bg-teal-400/20 p-6 rounded-full">
                                        <div className="bg-teal-300/20 p-8 rounded-full flex items-center justify-center">
                                            <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQPage;