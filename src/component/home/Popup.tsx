"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaTimes, FaBriefcase, FaUsers, FaChartLine, FaCalendarCheck } from "react-icons/fa";

export default function CorporatePopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        // Check if the popup was closed in the last 5 minutes
        const popupClosedTime = localStorage.getItem('popupClosedTime');
        const currentTime = new Date().getTime();
        const fiveMinutes = 5 * 60 * 1000; // 5 minutes in milliseconds

        if (!popupClosedTime || (currentTime - parseInt(popupClosedTime)) > fiveMinutes) {
            // Show popup after a short delay for better UX
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 15000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsVisible(false);
            setIsClosing(false);
            // Store the current time when popup is closed
            localStorage.setItem('popupClosedTime', new Date().getTime().toString());
        }, 300);
    };

    if (!isVisible) return null;

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/50 bg-opacity-50 backdrop-blur-sm"
                onClick={handleClose}
            ></div>

            {/* Popup Container */}
            <div className="relative bg-gradient-to-br from-teal-600 to-teal-800 text-white rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden transform transition-transform duration-300 scale-100">
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-white hover:text-teal-200 transition-colors"
                    aria-label="Close popup"
                >
                    <FaTimes className="h-6 w-6" />
                </button>

                {/* Popup Content */}
                <div className="flex flex-col md:flex-row">
                    {/* Left Section - Visual */}
                    <div className="hidden md:flex md:w-2/5 p-6 bg-gradient-to-tr from-teal-700 to-teal-900  flex-col justify-center items-center">
                        <div className="bg-white/20 rounded-2xl p-6 w-full max-w-xs">
                            <div className="aspect-square bg-white/10 rounded-xl flex items-center justify-center">
                                <div className="text-center p-4">
                                    <div className="bg-white/20 rounded-full p-4 inline-block mb-4">
                                        <FaBriefcase className="h-12 w-12 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold">Corporate Wellness</h3>
                                    <p className="text-sm opacity-90 mt-2">Transform Your Workplace</p>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-3">
                                <div className="bg-white/10 rounded-lg p-3 text-center">
                                    <FaUsers className="h-6 w-6 mx-auto" />
                                    <p className="text-xs mt-1">Employee Wellbeing</p>
                                </div>
                                <div className="bg-white/10 rounded-lg p-3 text-center">
                                    <FaChartLine className="h-6 w-6 mx-auto" />
                                    <p className="text-xs mt-1">Measurable ROI</p>
                                </div>
                                <div className="bg-white/10 rounded-lg p-3 text-center">
                                    <FaCalendarCheck className="h-6 w-6 mx-auto" />
                                    <p className="text-xs mt-1">Flexible Scheduling</p>
                                </div>
                                <div className="bg-white/10 rounded-lg p-3 text-center">
                                    <div className="bg-white/20 rounded-full p-2 w-10 h-10 mx-auto flex items-center justify-center">
                                        <span className="font-bold text-xl">$</span>
                                    </div>
                                    <p className="text-xs mt-1">Cost Effective</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Content */}
                    <div className="md:w-3/5 p-8">
                        <div className="mb-6">
                            <h2 className="text-3xl font-bold mb-3">Boost Your Team&apos;s Wellbeing</h2>
                            <p className="text-teal-100">
                                Discover how our corporate wellness packages can transform your workplace,
                                increase productivity, and reduce employee stress.
                            </p>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-semibold mb-3">Our Corporate Solutions Include:</h3>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <div className="bg-white/20 p-1 rounded mr-3 mt-1">
                                        <div className="bg-white w-2 h-2 rounded-full"></div>
                                    </div>
                                    <span>Customized mental health programs</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="bg-white/20 p-1 rounded mr-3 mt-1">
                                        <div className="bg-white w-2 h-2 rounded-full"></div>
                                    </div>
                                    <span>On-site therapy sessions</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="bg-white/20 p-1 rounded mr-3 mt-1">
                                        <div className="bg-white w-2 h-2 rounded-full"></div>
                                    </div>
                                    <span>Leadership mental health training</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="bg-white/20 p-1 rounded mr-3 mt-1">
                                        <div className="bg-white w-2 h-2 rounded-full"></div>
                                    </div>
                                    <span>Quarterly wellbeing assessments</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="bg-white/20 p-1 rounded mr-3 mt-1">
                                        <div className="bg-white w-2 h-2 rounded-full"></div>
                                    </div>
                                    <span>24/7 employee support portal</span>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <Link
                                href={'pages/corporate#corporate-contact'}
                                className="w-full bg-white text-teal-800 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg transition duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
                            >
                                <span>Request a Custom Proposal</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </Link>

                            <button
                                onClick={handleClose}
                                className="w-full text-white font-medium py-2 px-4 rounded-lg transition duration-300 hover:bg-white/10"
                            >
                                Not right now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}