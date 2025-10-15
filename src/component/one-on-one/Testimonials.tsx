import React from 'react'
import { Star } from 'lucide-react';

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

function Testimonials() {
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
    )
}

export default Testimonials