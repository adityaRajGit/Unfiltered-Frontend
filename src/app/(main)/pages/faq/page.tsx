import Link from 'next/link';
import type { Metadata } from 'next';
import FaqBrowser from '@/component/faq/FaqBrowser';
import JsonLd from '@/component/global/JsonLd';
import { FAQ_CATEGORIES } from '@/data/faq';
import { faqPageJsonLd } from '@/utils/schema';
import { pageMetadata } from '@/utils/seo';

export const metadata: Metadata = pageMetadata('/pages/faq');

const FAQPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
            <JsonLd data={faqPageJsonLd(FAQ_CATEGORIES.flatMap(c => c.questions))} />
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-teal-700 to-cyan-600 py-16 md:py-24 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-xl text-teal-100 max-w-3xl mx-auto">
                        Answers about our therapy sessions, Employee Assistance Programs and corporate services
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
                <FaqBrowser categories={FAQ_CATEGORIES} />

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
                                        href="/pages/corporate#corporate-contact"
                                        className="px-6 py-3 bg-white text-teal-700 font-medium rounded-full hover:bg-gray-100 transition-colors"
                                    >
                                        Request a Demo
                                    </Link>
                                    <Link
                                        href="/pages/one-on-one"
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
