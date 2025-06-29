"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaLock, FaUsers, FaUserShield, FaHeadset, FaShieldAlt } from 'react-icons/fa';

const FAQPage = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleQuestion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqCategories = [
        {
            title: "General",
            icon: <FaUsers className="text-teal-600 text-xl" />,
            questions: [
                {
                    question: "What is StayUnfiltered?",
                    answer: "StayUnfiltered is a mental wellness platform that offers two key features: a Community Space to share thoughts, feelings, and stories—anonymously or openly, and Therapy Services with licensed professionals for one-on-one support."
                },
                {
                    question: "Is StayUnfiltered a substitute for therapy?",
                    answer: "The Community is not therapy but a safe space for peer support. For professional help, our Therapy Services connect you with certified mental health experts."
                },
                {
                    question: "Who can use StayUnfiltered?",
                    answer: "StayUnfiltered is intended for individuals aged 16 and above. If you're under 18, therapy sessions may require guardian consent, depending on applicable law."
                }
            ]
        },
        {
            title: "Community Features",
            icon: <FaUserShield className="text-teal-600 text-xl" />,
            questions: [
                {
                    question: "Can I post anonymously?",
                    answer: "Yes. You can post publicly under your username or completely anonymously. You're in control of what and how you share."
                },
                {
                    question: "Will others see my identity?",
                    answer: "No. If you choose anonymity, your real identity is not visible to anyone—not even our moderators."
                },
                {
                    question: "Is the community moderated?",
                    answer: "Yes, lightly. We use a combination of AI filters and human moderation to keep the platform safe, respectful, and free from abuse."
                }
            ]
        },
        {
            title: "Therapy Services",
            icon: <FaHeadset className="text-teal-600 text-xl" />,
            questions: [
                {
                    question: "How do I book a therapy session?",
                    answer: "You can browse our therapist directory based on language, expertise, and availability. Select a therapist and book your session online."
                },
                {
                    question: "Are your therapists certified?",
                    answer: "Yes. All therapists on StayUnfiltered are qualified, licensed professionals, and verified by our team."
                },
                {
                    question: "Is therapy confidential?",
                    answer: "Absolutely. All therapy sessions are private, conducted on secure, encrypted platforms, and never shared with anyone else—not even StayUnfiltered staff."
                },
                {
                    question: "How much does therapy cost?",
                    answer: "Fees vary by therapist and session length. We aim to keep prices affordable and transparent. Some therapists may offer discounted rates for students or low-income individuals."
                }
            ]
        },
        {
            title: "Data Privacy & Security",
            icon: <FaLock className="text-teal-600 text-xl" />,
            questions: [
                {
                    question: "Is my data safe on StayUnfiltered?",
                    answer: "Yes. We follow Indian data protection laws and use secure servers and encryption to protect your information. Therapy data is treated with high confidentiality."
                },
                {
                    question: "Can I delete my account and data?",
                    answer: "Yes. You can delete your account at any time. Once deleted, your data is permanently removed unless required by law to retain (e.g., therapy records for legal compliance)."
                },
                {
                    question: "Do you share my data with third parties?",
                    answer: "No. We do not share, rent, or sell your data without your explicit consent. Some third-party services are used to run the platform securely, but they are bound by strict privacy agreements."
                },
                {
                    question: "Are you compliant with DPDP and GDPR regulations?",
                    answer: "Yes. We comply with both DPDP (India) and GDPR (EU) regulations. We collect and process only the data necessary for service delivery, with your consent. You have full rights over your data, including access, correction, and deletion. All data is handled securely and used only for intended purposes, with no unauthorized sharing."
                }
            ]
        },
        {
            title: "Emergency & Ethical Support",
            icon: <FaShieldAlt className="text-teal-600 text-xl" />,
            questions: [
                {
                    question: "What if I am in crisis?",
                    answer: (
                        <div>
                            <p>StayUnfiltered is not a crisis service. If you are in immediate danger or suicidal distress, please contact national mental health helplines such as:</p>
                            <ul className="mt-3 space-y-2">
                                <li className="flex items-start">
                                    <span className="font-medium mr-2">iCall:</span>
                                    <span>+91 9152987821</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="font-medium mr-2">AASRA:</span>
                                    <span>+91 9820466726</span>
                                </li>
                            </ul>
                            <p className="mt-3">We also list verified emergency contacts in the app/website.</p>
                        </div>
                    )
                },
                {
                    question: "Can I report inappropriate content?",
                    answer: "Yes. Use the 'Report' button on any post or comment. We take every report seriously and act quickly to ensure community safety."
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
                        Frequently Asked Questions
                    </h1>
                    <p className="text-xl text-teal-100 max-w-3xl mx-auto">
                        Find answers to common questions about our platform, services, and community guidelines
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
                                <h2 className="text-2xl md:text-3xl font-bold mb-4">Still have questions?</h2>
                                <p className="text-teal-100 mb-6">
                                    Our support team is here to help you with any additional questions you might have.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Link
                                        href="/contact"
                                        className="px-6 py-3 bg-white text-teal-700 font-medium rounded-full hover:bg-gray-100 transition-colors"
                                    >
                                        Contact Support
                                    </Link>
                                    <Link
                                        href="/community"
                                        className="px-6 py-3 border-2 border-white text-white font-medium rounded-full hover:bg-white/10 transition-colors"
                                    >
                                        Ask the Community
                                    </Link>
                                </div>
                            </div>
                            <div className="flex-1 flex justify-center">
                                <div className="bg-teal-500/20 p-6 rounded-full">
                                    <div className="bg-teal-400/20 p-6 rounded-full">
                                        <div className="bg-teal-300/20 p-8 rounded-full flex items-center justify-center">
                                            <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
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