"use client";
import { useState } from "react";


function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        employees: '',
        message: '',
        phone: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setFormData({
                name: '',
                email: '',
                company: '',
                employees: '',
                message: '',
                phone: ''
            });
            setSubmitted(false);
        }, 4000);
    };

    return (
        <section id="contact" className="py-16 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    <div className="md:flex">
                        <div className="md:w-2/5 bg-gradient-to-br from-teal-600 to-teal-800 p-10 text-white flex flex-col justify-center">
                            <h3 className="text-3xl font-bold mb-6">Let&apos;s Connect</h3>
                            <p className="mb-6 opacity-90">
                                Ready to transform your workplace culture? Our team will create a customized wellness program for your organization.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <div className="bg-white/20 p-2 rounded-lg mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <span>+1 (888) 123-4567</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="bg-white/20 p-2 rounded-lg mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <span>corporate@wellness.com</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="bg-white/20 p-2 rounded-lg mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <span>San Francisco, CA</span>
                                </div>
                            </div>
                        </div>

                        <div className="md:w-3/5 p-8 md:p-12">
                            <h3 className="text-3xl font-bold text-gray-900 mb-6">
                                Request a Consultation
                            </h3>

                            {submitted ? (
                                <div className="bg-teal-100 border border-teal-400 text-teal-700 px-4 py-8 rounded-lg text-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-teal-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                                    <p className="text-lg">We&apos;ve received your inquiry and will contact you shortly.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-3">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                                        <div>
                                            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                                placeholder="John Smith"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Work Email</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                                placeholder="john@company.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-6">
                                        <div>
                                            <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number</label>
                                            <input
                                                type="text"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                                placeholder="john@company.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="company" className="block text-gray-700 font-medium mb-2">Company Name</label>
                                            <input
                                                type="text"
                                                id="company"
                                                name="company"
                                                value={formData.company}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                                placeholder="Your Organization"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="employees" className="block text-gray-700 font-medium mb-2">Number of Employees</label>
                                            <select
                                                id="employees"
                                                name="employees"
                                                value={formData.employees}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                            >
                                                <option value="">Select range</option>
                                                <option value="1-20">1-20 employees</option>
                                                <option value="21-100">21-100 employees</option>
                                                <option value="101-500">101-500 employees</option>
                                                <option value="501-1000">501-1,000 employees</option>
                                                <option value="1000+">1,000+ employees</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-gray-700 font-medium mb-2">How can we help?</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={4}
                                            className="w-full px-4 py-3 resize-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                            placeholder="Tell us about your organization's needs and goals..."
                                        ></textarea>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="w-full bg-gradient-to-r from-teal-600 to-teal-800 hover:from-teal-700 hover:to-teal-900 text-white font-semibold py-4 px-8 rounded-lg transition duration-300 shadow-lg"
                                        >
                                            Submit Inquiry
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactForm