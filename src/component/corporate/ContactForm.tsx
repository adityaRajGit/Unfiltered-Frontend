"use client";
import { fbLead } from "@/lib/PixelHelpers";
import { addLead } from "@/store/leadSlice";
import { useState } from "react";
import { FaPhone, FaEnvelope, FaBuilding, FaInfoCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        employees: '',
        phone: '',
        message: '',
        source: 'website'
    });
    const [submitted, setSubmitted] = useState(false);
    const dispatch = useDispatch()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        fbLead(formData)

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response = await dispatch(addLead(formData as any) as any);
        if (response?.error) {
            setSubmitted(false)
            toast.error(response.error.message)
        } else {
            setSubmitted(true)
            setTimeout(() => {
                setSubmitted(false)
                setFormData({
                    name: '',
                    email: '',
                    company: '',
                    employees: '',
                    phone: '',
                    message: '',
                    source: 'website'
                });
            }, 5000)
        }
    }

    return (
        <section id="corporate-contact" className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Corporate Wellness Inquiry
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Let us design a customized wellness program for your organization.
                        Our corporate packages include therapy sessions, workshops, and more.
                    </p>
                </div>

                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    <div className="md:flex">
                        <div className="md:w-2/5 bg-gradient-to-br from-teal-600 to-teal-800 p-10 text-white flex flex-col justify-center">
                            <h3 className="text-3xl font-bold mb-6">Why Partner With Us?</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <div className="bg-white/20 p-2 rounded-lg mr-4 mt-1">
                                        <FaInfoCircle className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Customized Programs</h4>
                                        <p className="text-sm opacity-90 mt-1">Tailored to your company size and needs</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <div className="bg-white/20 p-2 rounded-lg mr-4 mt-1">
                                        <FaInfoCircle className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Certified Therapists</h4>
                                        <p className="text-sm opacity-90 mt-1">Licensed professionals with corporate experience</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <div className="bg-white/20 p-2 rounded-lg mr-4 mt-1">
                                        <FaInfoCircle className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Measurable Results</h4>
                                        <p className="text-sm opacity-90 mt-1">Track employee wellbeing and program ROI</p>
                                    </div>
                                </li>
                            </ul>

                            <div className="mt-8 pt-6 border-t border-white/20">
                                <h4 className="font-semibold mb-3">Contact Our Corporate Team</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center">
                                        <div className="bg-white/20 p-2 rounded-lg mr-4">
                                            <FaPhone className="h-5 w-5" />
                                        </div>
                                        <span>+1 (888) WELL-123</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="bg-white/20 p-2 rounded-lg mr-4">
                                            <FaEnvelope className="h-5 w-5" />
                                        </div>
                                        <span>corporate@wellnesspro.com</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="bg-white/20 p-2 rounded-lg mr-4">
                                            <FaBuilding className="h-5 w-5" />
                                        </div>
                                        <span>Mon-Fri: 9AM-6PM EST</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="md:w-3/5 p-8 md:p-12">
                            <h3 className="text-3xl font-bold text-gray-900 mb-6">
                                Get a Custom Proposal
                            </h3>

                            {submitted ? (
                                <div className="bg-teal-100 border border-teal-400 text-teal-700 px-4 py-8 rounded-lg text-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-teal-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                                    <p className="text-lg">
                                        Our corporate team will contact you within 24 hours to discuss your wellness program.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                                                Contact Person <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                                placeholder="HR Manager/Director"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="company" className="block text-gray-700 font-medium mb-2">
                                                Company Name <span className="text-red-500">*</span>
                                            </label>
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
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                                                Work Email <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                                placeholder="contact@company.com"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                                                Phone Number <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                                placeholder="(123) 456-7890"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4">
                                        <div>
                                            <label htmlFor="employees" className="block text-gray-700 font-medium mb-2">
                                                Number of Employees <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                id="employees"
                                                name="employees"
                                                value={formData.employees}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                            >
                                                <option value="">Select employee count</option>
                                                <option value="1-50">1-50 employees</option>
                                                <option value="51-200">51-200 employees</option>
                                                <option value="201-500">201-500 employees</option>
                                                <option value="501-1000">501-1,000 employees</option>
                                                <option value="1001-5000">1,001-5,000 employees</option>
                                                <option value="5000+">5,000+ employees</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                                            Tell Us About Your Needs
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={3}
                                            className="w-full px-4 py-3 resize-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                            placeholder="Current challenges, specific goals, previous wellness initiatives..."
                                        ></textarea>
                                        <p className="text-sm text-gray-500 mt-1">
                                            What are your primary goals for a corporate wellness program?
                                        </p>
                                    </div>

                                    <div className="pt-4">
                                        <button
                                            type="submit"
                                            className="w-full bg-gradient-to-r from-teal-600 to-teal-800 hover:from-teal-700 hover:to-teal-900 text-white font-semibold py-4 px-8 rounded-lg transition duration-300 shadow-lg hover:shadow-xl"
                                        >
                                            Request Corporate Proposal
                                        </button>
                                        <p className="text-center text-gray-500 text-sm mt-3">
                                            We&apos;ll contact you to discuss customized options
                                        </p>
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

export default ContactForm;