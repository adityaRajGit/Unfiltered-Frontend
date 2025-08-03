"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaQuoteLeft, FaChevronLeft, FaChevronRight, FaUsers, FaHeart, FaGlobeAsia, FaChartLine, FaUserMd } from "react-icons/fa";

const reviews = [
    {
        text: "After struggling with anxiety for years, I finally found relief through StayUnfiltered. My therapist Priya helped me develop coping strategies that actually work.",
        author: "Rajesh M.",
        therapist: "Dr. Priya Sharma (Clinical Psychologist)",
        location: "Mumbai, India",
        image: '/people/indian1.jpg',
    },
    {
        text: "The community support I found here changed my life. Being able to share anonymously made me feel safe to express my deepest struggles for the first time.",
        author: "Ananya P.",
        therapist: "Sanjay Kumar (Counselor)",
        location: "Delhi, India",
        image: '/people/indian2.jpg',
    },
    {
        text: "As a college student dealing with depression, StayUnfiltered made therapy affordable and accessible. My counselor Vikram understood my cultural context perfectly.",
        author: "Arjun S.",
        therapist: "Vikram Patel (LCSW)",
        location: "Bangalore, India",
        image: '/people/indian3.jpg',
    },
    {
        text: "After my divorce, I felt completely lost. The combination of therapy and community support helped me rebuild my confidence and find joy again.",
        author: "Priyanka R.",
        therapist: "Dr. Meera Desai (PhD)",
        location: "Chennai, India",
        image: '/people/indian4.jpg',
    },
    {
        text: "As a working mother, I never had time for therapy. StayUnfiltered's flexible sessions made it possible for me to prioritize my mental health.",
        author: "Sunita K.",
        therapist: "Anjali Mehta (Counseling Psychologist)",
        location: "Hyderabad, India",
        image: '/people/indian5.jpg',
    },
    {
        text: "I was skeptical about online therapy, but my experience with Dr. Kapoor exceeded all expectations. He helped me overcome social anxiety I've had since childhood.",
        author: "Rahul D.",
        therapist: "Dr. Amit Kapoor (Psychiatrist)",
        location: "Kolkata, India",
        image: '/people/indian6.jpg',
    }
];

function Section3() {
    const [current, setCurrent] = useState(0);
    const total = reviews.length;

    const nextSlide = () => setCurrent((prev) => (prev + 1) % total);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + total) % total);

    return (
        <div className="w-full py-16 bg-gradient-to-b from-teal-50 to-white">
            <div className="max-w-7xl mx-auto px-4">
                {/* Stats Section */}
                <div className="mb-20">
                    <div className="text-center">
                        <div className="inline-block px-4 py-1 mb-4 text-sm font-medium text-teal-800 bg-teal-200 rounded-full">
                            Our Impact in India
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Transforming Mental Healthcare Across India
                        </h2>
                        <p className="max-w-2xl mx-auto text-gray-600 mb-12">
                            We&apos;re committed to making quality mental healthcare accessible to every Indian
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {/* Stat 1 */}
                        <div className="bg-white p-6 rounded-xl shadow-md border border-teal-50 flex items-start">
                            <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                <FaUsers className="text-xl text-teal-600" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-teal-800 mb-1">250k+</div>
                                <h3 className="text-lg font-medium text-gray-900">Lives Touched</h3>
                                <p className="text-sm text-gray-600">Across 25+ Indian states</p>
                            </div>
                        </div>

                        {/* Stat 2 */}
                        <div className="bg-white p-6 rounded-xl shadow-md border border-teal-50 flex items-start">
                            <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                <FaUserMd className="text-xl text-teal-600" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-teal-800 mb-1">1,200+</div>
                                <h3 className="text-lg font-medium text-gray-900">Indian Therapists</h3>
                                <p className="text-sm text-gray-600">Speaking 15+ Indian languages</p>
                            </div>
                        </div>

                        {/* Stat 3 */}
                        <div className="bg-white p-6 rounded-xl shadow-md border border-teal-50 flex items-start">
                            <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                <FaHeart className="text-xl text-teal-600" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-teal-800 mb-1">97%</div>
                                <h3 className="text-lg font-medium text-gray-900">Satisfaction Rate</h3>
                                <p className="text-sm text-gray-600">From Indian users</p>
                            </div>
                        </div>

                        {/* Stat 4 */}
                        <div className="bg-white p-6 rounded-xl shadow-md border border-teal-50 flex items-start">
                            <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                <FaChartLine className="text-xl text-teal-600" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-teal-800 mb-1">75%</div>
                                <h3 className="text-lg font-medium text-gray-900">Cost Savings</h3>
                                <p className="text-sm text-gray-600">Compared to traditional therapy</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Testimonial Section */}
                <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden max-w-5xl mx-auto border border-teal-100">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-500 to-cyan-500"></div>

                    <div className="py-12 px-6 md:px-16">
                        <div className="flex justify-center mb-8">
                            <div className="bg-teal-100 p-4 rounded-full">
                                <FaQuoteLeft className="text-3xl text-teal-600" />
                            </div>
                        </div>

                        <div className="relative min-h-[200px] md:min-h-[180px]">
                            <div className="text-center">
                                <p className="text-xl md:text-2xl text-gray-800 font-medium mb-8 leading-relaxed max-w-3xl mx-auto">
                                    {reviews[current].text}
                                </p>

                                <div className="flex flex-col items-center">
                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-3">
                                        <div className="relative">
                                            <Image
                                                src={reviews[current].image}
                                                width={300}
                                                height={300}
                                                alt={reviews[current].author}
                                                className="w-14 h-14 rounded-full object-cover border-2 border-teal-500"
                                            />
                                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
                                                <FaGlobeAsia className="text-xs text-white" />
                                            </div>
                                        </div>
                                        <div className="text-center sm:text-left">
                                            <p className="font-semibold text-gray-900">{reviews[current].author}</p>
                                            <p className="text-sm text-gray-600">{reviews[current].location}</p>
                                            <p className="text-xs text-teal-600 mt-1">with {reviews[current].therapist}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Navigation */}
                        <div className="flex justify-between items-center mt-8">
                            {/* Dots */}
                            <div className="flex justify-center gap-2">
                                {reviews.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrent(idx)}
                                        className={`w-3 h-3 rounded-full ${idx === current ? "bg-teal-600" : "bg-gray-300"}`}
                                        aria-label={`Go to testimonial ${idx + 1}`}
                                    />
                                ))}
                            </div>

                            {/* Arrows */}
                            <div className="flex gap-4">
                                <button
                                    onClick={prevSlide}
                                    className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 hover:bg-teal-200 transition-colors"
                                    aria-label="Previous testimonial"
                                >
                                    <FaChevronLeft />
                                </button>
                                <button
                                    onClick={nextSlide}
                                    className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 hover:bg-teal-200 transition-colors"
                                    aria-label="Next testimonial"
                                >
                                    <FaChevronRight />
                                </button>
                            </div>
                        </div>

                        <div className="mt-10 text-center">
                            <Link
                                href="/testimonials"
                                className="inline-flex items-center px-6 py-3 bg-teal-600 text-white font-medium rounded-full hover:bg-teal-700 transition-colors"
                            >
                                Read more Indian success stories
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Additional Stats */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    <div className="bg-teal-50 rounded-xl p-6 border border-teal-100">
                        <div className="text-4xl font-bold text-teal-700 mb-2">89%</div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Users from Tier 1/2 Cities</h3>
                        <p className="text-gray-600">Bridging the urban-rural mental healthcare gap</p>
                    </div>

                    <div className="bg-cyan-50 rounded-xl p-6 border border-cyan-100">
                        <div className="text-4xl font-bold text-cyan-700 mb-2">92%</div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">First-Time Therapy Users</h3>
                        <p className="text-gray-600">Making mental healthcare accessible to newcomers</p>
                    </div>

                    <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100">
                        <div className="text-4xl font-bold text-emerald-700 mb-2">4.8/5</div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Average Therapist Rating</h3>
                        <p className="text-gray-600">From our Indian user community</p>
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-16 text-center">
                    <Link
                        href="/therapists"
                        className="inline-flex items-center px-8 py-4 bg-teal-600 text-white font-bold rounded-full hover:bg-teal-700 transition-colors text-lg"
                    >
                        Find an Indian Therapist
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                    <p className="mt-4 text-gray-600 max-w-xl mx-auto">
                        Join thousands of Indians who have transformed their mental health with culturally-aware therapy
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Section3;