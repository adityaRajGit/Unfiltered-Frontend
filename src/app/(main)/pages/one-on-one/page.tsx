'use client';

import { useState, useEffect } from 'react';
import { Star, Clock, CheckCircle, Calendar, Users, Zap, Shield, Heart } from 'lucide-react';

interface Plan {
    id: number;
    name: string;
    duration: string;
    sessions: string;
    originalPrice: string;
    discountedPrice: string;
    description: string;
    features: string[];
    results: string;
    popular?: boolean;
}

interface Testimonial {
    id: number;
    name: string;
    age: number;
    location: string;
    plan: string;
    rating: number;
    content: string;
    avatar: string;
    date: string;
}

export default function SessionsPage() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const plans: Plan[] = [
        {
            id: 1,
            name: "The Reset",
            duration: "21 Days",
            sessions: "6 Sessions",
            originalPrice: "₹19,999",
            discountedPrice: "₹14,999",
            description: "Focused on quick relief from trauma, anxiety, depression, or relationship struggles.",
            features: [
                "Quick relief from trauma & anxiety",
                "Guided kickstart to feeling lighter",
                "Personalized coping strategies",
                "Weekly progress assessment"
            ],
            results: "Most clients feel noticeable relief and clarity within 3 weeks",
            popular: false
        },
        {
            id: 2,
            name: "The Transformation",
            duration: "60 Days",
            sessions: "12-14 Sessions",
            originalPrice: "₹49,999",
            discountedPrice: "₹39,999",
            description: "A deeper journey that rewires negative thought patterns for measurable long-term change.",
            features: [
                "Journaling practices & reflection exercises",
                "Mindset shift techniques",
                "Emotional balance training",
                "Personalized growth plan"
            ],
            results: "Clients often report visible shift in habits, thinking, and emotional balance",
            popular: true
        },
        {
            id: 3,
            name: "The Elite Journey",
            duration: "3-12 Months",
            sessions: "3-4 Sessions/Month",
            originalPrice: "₹4,50,000",
            discountedPrice: "₹1,00,000 – ₹3,50,000",
            description: "Complete life detox from negativity, rewiring your brain for resilience and self-mastery.",
            features: [
                "Fully customizable duration",
                "Premium self-healing experience",
                "Leadership & performance focus",
                "Lifelong resilience building"
            ],
            results: "Sustainable rewiring and lifelong resilience",
            popular: false
        }
    ];

    const testimonials: Testimonial[] = [
        {
            id: 1,
            name: "Priya Sharma",
            age: 28,
            location: "Mumbai",
            plan: "The Reset",
            rating: 5,
            content: "The Reset program changed my life. After just 3 weeks, I feel like a weight has been lifted off my shoulders. My therapist was incredibly supportive and the techniques learned are now part of my daily routine.",
            avatar: "PS",
            date: "2 weeks ago"
        },
        {
            id: 2,
            name: "Rahul Mehta",
            age: 35,
            location: "Delhi",
            plan: "The Transformation",
            rating: 5,
            content: "I was skeptical at first, but the Transformation program truly delivered. The mindset shifts I've experienced are remarkable. My relationships have improved and I handle stress much better now.",
            avatar: "RM",
            date: "1 month ago"
        },
        {
            id: 3,
            name: "Ananya Patel",
            age: 42,
            location: "Bangalore",
            plan: "The Elite Journey",
            rating: 5,
            content: "As a CEO, the Elite Journey was exactly what I needed. The personalized approach helped me develop resilience that impacts both my professional and personal life. Worth every rupee.",
            avatar: "AP",
            date: "3 months ago"
        },
        {
            id: 4,
            name: "Sanjay Kumar",
            age: 31,
            location: "Chennai",
            plan: "The Reset",
            rating: 5,
            content: "Quick relief was exactly what I got. The sessions were intensive but gentle. I'm finally sleeping better and managing my anxiety effectively.",
            avatar: "SK",
            date: "3 weeks ago"
        }
    ];

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const endOfWeek = new Date();
            endOfWeek.setDate(now.getDate() + (7 - now.getDay()));
            endOfWeek.setHours(23, 59, 59, 999);

            const difference = endOfWeek.getTime() - now.getTime();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, []);

    const renderStars = (rating: number) => {
        return [...Array(5)].map((_, i) => (
            <Star
                key={i}
                size={16}
                className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
            />
        ));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100">
            {/* Header */}
            <header className="bg-[#03978a] text-white py-6">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Struggling With Mental Health?</h1>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Transform Your Life with One-on-One Therapy</h1>
                    <p className="text-xl opacity-90">Professional guidance tailored to your unique journey,</p>
                    <div className="flex flex-wrap justify-center gap-2 mb-6 mt-4">
                        {[
                            "Anxiety",
                            "Depression",
                            "Trauma",
                            "Relationships",
                            "Sleep Issues",
                            "Stress",
                            "Self-Esteem",
                        ].map((issue, idx) => (
                            <span
                                key={idx}
                                className="bg-white text-teal-700 px-3 py-1 rounded-full text-sm font-medium"
                            >
                                {issue}
                            </span>
                        ))}
                    </div>
                </div>
            </header>

            {/* Limited Time Offer Banner */}
            <div className="bg-red-500 text-white py-4">
                <div className="container mx-auto px-4 text-center">
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8">
                        <div className="flex items-center gap-2">
                            <Clock size={20} />
                            <span className="font-bold text-lg">OFFER ENDS IN:</span>
                        </div>
                        <div className="flex gap-4 text-xl font-mono">
                            <div className="flex flex-col items-center">
                                <span className="bg-white text-red-500 px-3 py-1 rounded-lg font-bold">{timeLeft.days}</span>
                                <span className="text-sm">DAYS</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="bg-white text-red-500 px-3 py-1 rounded-lg font-bold">{timeLeft.hours}</span>
                                <span className="text-sm">HOURS</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="bg-white text-red-500 px-3 py-1 rounded-lg font-bold">{timeLeft.minutes}</span>
                                <span className="text-sm">MIN</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="bg-white text-red-500 px-3 py-1 rounded-lg font-bold">{timeLeft.seconds}</span>
                                <span className="text-sm">SEC</span>
                            </div>
                        </div>
                        <div className="bg-yellow-400 text-red-600 px-4 py-2 rounded-full font-bold animate-pulse">
                            ⚠️ This Week Only - Special Discounts!
                        </div>
                    </div>
                </div>
            </div>

            {/* Benefits Section */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Why Choose Our One-on-One Sessions?</h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        <div className="text-center p-6">
                            <Shield className="w-12 h-12 text-[#03978a] mx-auto mb-4" />
                            <h3 className="font-bold text-lg mb-2">Safe & Confidential</h3>
                            <p className="text-gray-600">Your privacy is our top priority in a secure environment</p>
                        </div>
                        <div className="text-center p-6">
                            <Heart className="w-12 h-12 text-[#03978a] mx-auto mb-4" />
                            <h3 className="font-bold text-lg mb-2">Expert Therapists</h3>
                            <p className="text-gray-600">Licensed professionals with proven track records</p>
                        </div>
                        <div className="text-center p-6">
                            <Zap className="w-12 h-12 text-[#03978a] mx-auto mb-4" />
                            <h3 className="font-bold text-lg mb-2">Quick Results</h3>
                            <p className="text-gray-600">Noticeable improvements within the first few sessions</p>
                        </div>
                        <div className="text-center p-6">
                            <Users className="w-12 h-12 text-[#03978a] mx-auto mb-4" />
                            <h3 className="font-bold text-lg mb-2">Personalized Approach</h3>
                            <p className="text-gray-600">Customized strategies for your unique needs</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-6 bg-teal-600 text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Quote Icon */}
                        <div className="mb-6">
                            <svg
                                className="w-12 h-12 mx-auto text-teal-300"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                            </svg>
                        </div>

                        {/* Main Quote */}
                        <h2 className="text-3xl font-bold mb-6 leading-tight">
                            Why Our Pricing is Different
                        </h2>

                        <blockquote className="text-xl lg:text-2xl font-light mb-8 leading-relaxed italic">
                            &quot;We don&lsquo;t believe in one-size-fits-all. Our prices reflect the personal care, confidential support, and attention we design just for you.&quot;
                        </blockquote>
                    </div>
                </div>
            </section>

            {/* Therapy Plans */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Choose Your Healing Journey</h2>
                    <p className="text-center text-gray-600 mb-12">Select the program that matches your needs and goals</p>

                    <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {plans.map((plan) => (
                            <div
                                key={plan.id}
                                className={`relative bg-white rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300 ${plan.popular ? 'ring-4 ring-[#03978a] ring-opacity-50' : ''
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                        <span className="bg-[#03978a] text-white px-6 py-2 rounded-full font-bold text-sm">
                                            MOST POPULAR
                                        </span>
                                    </div>
                                )}

                                <div className="p-8">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-800">{plan.name}</h3>
                                            <div className="flex items-center gap-2 mt-2">
                                                <Calendar size={16} className="text-[#03978a]" />
                                                <span className="text-gray-600">{plan.duration}</span>
                                                <Users size={16} className="text-[#03978a] ml-2" />
                                                <span className="text-gray-600">{plan.sessions}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <div className="flex flex-wrap items-baseline gap-2">
                                            <span className="text-3xl font-bold text-[#03978a]">{plan.discountedPrice}</span>
                                            <span className="text-lg text-gray-500 line-through">{plan.originalPrice}</span>
                                            <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full ml-2">
                                                Save {plan.id === 3 ? 'Up to 78%' : '25%'}
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 mb-6">{plan.description}</p>

                                    <ul className="space-y-3 mb-6">
                                        {plan.features.map((feature, index) => (
                                            <li key={index} className="flex items-center">
                                                <CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0" />
                                                <span className="text-gray-700">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="bg-teal-50 p-4 rounded-lg mb-6">
                                        <div className="flex items-center">
                                            <Zap size={16} className="text-[#03978a] mr-2" />
                                            <span className="font-semibold text-gray-800">Results Check:</span>
                                        </div>
                                        <p className="text-gray-700 text-sm mt-1">{plan.results}</p>
                                    </div>

                                    <button className="w-full bg-[#03978a] text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors duration-300">
                                        Book Now - Limited Spots
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Success Metrics */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-8 text-center">
                        <div>
                            <div className="text-3xl font-bold text-[#03978a] mb-2">95%</div>
                            <div className="text-gray-600">Clients Report Improvement</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-[#03978a] mb-2">500+</div>
                            <div className="text-gray-600">Lives Transformed</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-[#03978a] mb-2">4.9/5</div>
                            <div className="text-gray-600">Average Rating</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-[#03978a] mb-2">9/10</div>
                            <div className="text-gray-600">Members improve with care</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-[#03978a] mb-2">24/7</div>
                            <div className="text-gray-600">Support Available</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gradient-to-br from-teal-50 to-cyan-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">How Your Healing Journey Works</h2>
                    <p className="text-center text-gray-600 mb-12">Simple 4-step process to start your transformation today</p>

                    <div className="max-w-4xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-8 mb-12">
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-[#03978a] rounded-full flex items-center justify-center text-white font-bold text-lg">1</div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Book Your Session</h3>
                                    <p className="text-gray-600">Choose your preferred package and schedule your first session at your convenience</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-[#03978a] rounded-full flex items-center justify-center text-white font-bold text-lg">2</div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Match with Your Therapist</h3>
                                    <p className="text-gray-600">Get paired with a certified therapist who specializes in your specific needs</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-[#03978a] rounded-full flex items-center justify-center text-white font-bold text-lg">3</div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Begin Your Sessions</h3>
                                    <p className="text-gray-600">Start your one-on-one sessions via video, phone, or chat - whatever you&apos;re comfortable with</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-[#03978a] rounded-full flex items-center justify-center text-white font-bold text-lg">4</div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Track Your Progress</h3>
                                    <p className="text-gray-600">See measurable improvements with regular check-ins and personalized growth plans</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Real Stories, Real Transformations</h2>
                    <p className="text-center text-gray-600 mb-12">Hear from people who took the first step toward healing</p>

                    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {testimonials.map((testimonial) => (
                            <div key={testimonial.id} className="bg-white rounded-2xl shadow-lg p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-[#03978a] rounded-full flex items-center justify-center text-white font-bold mr-4">
                                            {testimonial.avatar}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                                            <p className="text-gray-600 text-sm">{testimonial.age} • {testimonial.location}</p>
                                        </div>
                                    </div>
                                    <span className="bg-teal-100 text-[#03978a] px-2 py-1 rounded-full text-xs font-medium">
                                        {testimonial.plan}
                                    </span>
                                </div>

                                <div className="flex items-center mb-3">
                                    {renderStars(testimonial.rating)}
                                    <span className="text-gray-500 text-sm ml-2">{testimonial.date}</span>
                                </div>

                                <p className="text-gray-700 italic">&quot;{testimonial.content}&quot;</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-16 bg-gradient-to-r from-[#03978a] to-teal-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-4">Ready to Start Your Healing Journey?</h2>
                    <p className="text-xl mb-8 opacity-90">Don&apos;t wait - this special offer disappears in</p>

                    <div className="flex justify-center gap-4 mb-8 text-2xl font-mono">
                        <div className="bg-white text-[#03978a] px-4 py-2 rounded-lg">{timeLeft.days}d</div>
                        <div className="bg-white text-[#03978a] px-4 py-2 rounded-lg">{timeLeft.hours}h</div>
                        <div className="bg-white text-[#03978a] px-4 py-2 rounded-lg">{timeLeft.minutes}m</div>
                        <div className="bg-white text-[#03978a] px-4 py-2 rounded-lg">{timeLeft.seconds}s</div>
                    </div>

                    <div className="space-y-4 max-w-2xl mx-auto">
                        <button className="w-full bg-yellow-400 text-gray-900 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-colors duration-300">
                            🔒 Secure Your Spot Now - Limited Availability
                        </button>
                        <p className="text-teal-200 text-sm">✅ 100% Confidential • ✅ Certified Therapists • ✅ Money-Back Guarantee</p>
                    </div>
                </div>
            </section>
        </div>
    );
}