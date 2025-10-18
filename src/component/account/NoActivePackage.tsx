import React from 'react';
import { Package, Calendar, Clock, Heart, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const NoActivePackage = () => {
    const features = [
        {
            icon: Calendar,
            title: 'Book Appointments',
            description: 'Schedule sessions with certified therapists'
        },
        {
            icon: Clock,
            title: 'Flexible Timing',
            description: 'Choose time slots that work for you'
        },
        {
            icon: Heart,
            title: 'Personalized Care',
            description: 'Get tailored mental health support'
        },
        {
            icon: Package,
            title: 'Multiple Sessions',
            description: 'Access ongoing support with package deals'
        }
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Header Section */}
            <div className="text-center mb-12">
                <div className="w-20 h-20 mx-auto mb-6 bg-teal-50 rounded-full flex items-center justify-center border border-teal-100">
                    <Package className="w-10 h-10 text-teal-600" />
                </div>

                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    Start Your Mental Health Journey
                </h1>

                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                    You don&apos;t have any active package to begin your therapy sessions. Choose a package that fits your needs and start your journey towards better mental health.
                </p>

                <Link href={'/pages/one-on-one'} className="bg-teal-500 max-w-xs hover:bg-teal-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 flex items-center justify-center mx-auto shadow-teal-100 shadow-md hover:shadow-teal-200 hover:shadow-lg">
                    Explore Available Packages
                    <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
            </div>

            {/* Features Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-xl border border-teal-50 hover:border-teal-200 transition-all duration-200 hover:shadow-md hover:shadow-teal-50"
                    >
                        <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center mb-4">
                            <feature.icon className="w-6 h-6 text-teal-500" />
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
                        <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NoActivePackage;