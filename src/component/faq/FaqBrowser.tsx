"use client";
import React, { useState } from 'react';
import { FaChevronDown, FaLock, FaBuilding, FaHandshake, FaUsers, FaChartLine } from 'react-icons/fa';
import type { FaqCategory, FaqIcon, FaqItem } from '@/data/faq';

const ICONS: Record<FaqIcon, React.ReactNode> = {
    building: <FaBuilding className="text-teal-600 text-xl" />,
    handshake: <FaHandshake className="text-teal-600 text-xl" />,
    users: <FaUsers className="text-teal-600 text-xl" />,
    lock: <FaLock className="text-teal-600 text-xl" />,
    chart: <FaChartLine className="text-teal-600 text-xl" />,
};

// Native <details> keeps every answer in the server HTML (crawlers and AI tools
// can read it) while still collapsing it for visitors.
function Question({ q, category }: { q: FaqItem; category?: string }) {
    return (
        <details className="group border-b border-gray-200 last:border-0 open:bg-teal-50">
            <summary className="w-full flex justify-between items-center p-6 text-left cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <div>
                    {category && (
                        <span className="text-sm font-medium text-teal-600 bg-teal-100 px-3 py-1 rounded-full mr-3">
                            {category}
                        </span>
                    )}
                    <span className="font-medium text-gray-900">{q.question}</span>
                </div>
                <FaChevronDown className="text-gray-400 shrink-0 ml-4 transition-transform group-open:rotate-180 group-open:text-teal-600" />
            </summary>
            <div className="px-6 pb-6 text-gray-600">{q.answer}</div>
        </details>
    );
}

export default function FaqBrowser({ categories }: { categories: FaqCategory[] }) {
    const [searchQuery, setSearchQuery] = useState("");

    const allQuestions = categories.flatMap(category =>
        category.questions.map(q => ({ ...q, category: category.title }))
    );

    const filteredQuestions = allQuestions.filter(q =>
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className="mb-12">
                <div className="relative mb-8">
                    <input
                        type="text"
                        placeholder="Search for questions..."
                        aria-label="Search frequently asked questions"
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

            {searchQuery ? (
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        Search Results for &quot;{searchQuery}&quot;
                    </h2>

                    {filteredQuestions.length > 0 ? (
                        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                            {filteredQuestions.map((q) => (
                                <Question key={q.question} q={q} category={q.category} />
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
            ) : (
                <div className="space-y-16">
                    {categories.map((category) => (
                        <div key={category.title} className="bg-white rounded-2xl shadow-md overflow-hidden">
                            <div className="flex items-center p-6 bg-teal-50 border-b border-teal-100">
                                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mr-4">
                                    {ICONS[category.icon]}
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
                            </div>
                            <div>
                                {category.questions.map((q) => (
                                    <Question key={q.question} q={q} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
