"use client";
import { useState } from "react";
import { FaUsers, FaBrain, FaHeartbeat, FaChartLine, FaCalendarCheck, FaStar } from 'react-icons/fa';

function InquiryForm() {
    const [formData, setFormData] = useState({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        employeeCount: '',
        webinarTopic: '',
        preferredDate: '',
        additionalInfo: ''
    });

    const webinarTopics = [
        { id: 'relationship', title: 'Relationship Building', icon: <FaUsers className="text-3xl" />, activity: 'Interactive Workshop', duration: '90 min' },
        { id: 'stress', title: 'Stress Management', icon: <FaBrain className="text-3xl" />, activity: 'Guided Meditation Session', duration: '60 min' },
        { id: 'mental', title: 'Mental Wellness', icon: <FaHeartbeat className="text-3xl" />, activity: 'Expert Panel Discussion', duration: '75 min' },
        { id: 'positive', title: 'Positive Psychology', icon: <FaChartLine className="text-3xl" />, activity: 'Practical Skill Building', duration: '120 min' },
        { id: 'health', title: 'Health & Wellness', icon: <FaCalendarCheck className="text-3xl" />, activity: 'Lifestyle Assessment', duration: '90 min' },
        { id: 'corporate', title: 'Corporate Resilience', icon: <FaStar className="text-3xl" />, activity: 'Leadership Training', duration: '150 min' }
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Thank you for your inquiry! Our team will contact you shortly.');
        setFormData({
            companyName: '',
            contactPerson: '',
            email: '',
            phone: '',
            employeeCount: '',
            webinarTopic: '',
            preferredDate: '',
            additionalInfo: ''
        });
    };
    return (
        <section className="py-16 bg-[#009689] px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow-xl p-8">
                    <h2 className="text-3xl font-bold text-center mb-2">Request a Webinar</h2>
                    <p className="text-gray-600 text-center mb-8">
                        Let us know your needs and we&apos;ll create a customized wellness program
                    </p>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-700 mb-2">Company Name</label>
                            <input
                                type="text"
                                name="companyName"
                                placeholder="Enter your company name"
                                value={formData.companyName}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009689]"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2">Contact Person</label>
                            <input
                                type="text"
                                name="contactPerson"
                                placeholder="Enter your name"
                                value={formData.contactPerson}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009689]"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009689]"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2">Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Enter your phone number"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009689]"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2">Number of Employees</label>
                            <input
                                type="text"
                                name="employeeCount"
                                placeholder="Enter the number of employees"
                                value={formData.employeeCount}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009689]"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2">Webinar Topic</label>
                            <select
                                name="webinarTopic"
                                value={formData.webinarTopic}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009689]"
                                required
                            >
                                <option value="">Select a topic</option>
                                {webinarTopics.map(topic => (
                                    <option key={topic.id} value={topic.id}>{topic.title}</option>
                                ))}
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-gray-700 mb-2">Preferred Date(s)</label>
                            <input
                                type="text"
                                name="preferredDate"
                                value={formData.preferredDate}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009689]"
                                placeholder="e.g., Week of June 15-19 or specific dates"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-gray-700 mb-2">Additional Information</label>
                            <textarea
                                name="additionalInfo"
                                value={formData.additionalInfo}
                                onChange={handleChange}
                                rows={4}
                                className="w-full resize-none p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009689]"
                                placeholder="Tell us about your goals, any specific needs, or questions..."
                            ></textarea>
                        </div>

                        <div className="md:col-span-2 text-center">
                            <button
                                type="submit"
                                className="bg-[#009689] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#007a70] transition"
                            >
                                Request Corporate Wellness Program
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default InquiryForm