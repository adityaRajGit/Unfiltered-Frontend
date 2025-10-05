import Link from "next/link";
import { FaInstagram, FaLinkedin /*, FaFacebook */ } from "react-icons/fa";

function Footer() {
    const data = [
        {
            label: 'Instagram',
            link: 'https://www.instagram.com/stay_unfiltered_?igsh=MTR6cGE0aXU1OWsxaw=='
        },
        {
            label: 'LinkedIn',
            link: 'https://www.linkedin.com/company/stay-unfiltered/'
        }
    ]
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                    {/* Brand & Description */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center mb-6">
                            <div className="text-2xl font-bold">
                                <span>Stay</span>
                                <span className="text-teal-400 font-light">Unfiltered</span>
                            </div>
                        </div>
                        <p className="text-gray-400 mb-8 max-w-md">
                            Your mental wellness journey starts here. We&apos;re dedicated to providing accessible,
                            compassionate care for everyone.
                        </p>

                        <div className="mt-8">
                            <h3 className="font-semibold mb-2">Have a question?</h3>
                            <p className="text-gray-400">
                                Email us anytime:{" "}
                                <a href="mailto:contact@stayunfiltered.com" className="text-teal-400 hover:text-teal-300 transition-colors">
                                    contact@stayunfiltered.com
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Connect Links */}
                    <div className="flex flex-col">
                        <h3 className="text-lg font-semibold mb-4">Connect</h3>
                        <ul className="space-y-3">
                            {data.map((item, i) => (
                                <li key={i}>
                                    <Link href={item.link} target="_blank" className="text-gray-400 hover:text-teal-400 transition-colors duration-200">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter Subscription - Moved to right */}
                    <div className="flex flex-col">
                        <h3 className="text-lg font-semibold mb-4">Subscribe to our newsletter</h3>
                        <p className="text-gray-400 mb-4 text-sm">
                            Get the latest updates on mental wellness tips and resources.
                        </p>
                        <div className="flex flex-col space-y-4">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full py-3 px-4 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 border border-gray-700 transition-colors duration-200"
                            />
                            <button className="bg-teal-600 hover:bg-teal-700 text-white py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 font-medium">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-800 my-10"></div>

                {/* Bottom Row */}
                <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
                    <p className="text-gray-500 text-sm text-center md:text-left">
                        © 2025 StayUnfiltered. All rights reserved.
                    </p>

                    <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                        <Link href="#terms" className="text-gray-400 hover:text-teal-400 text-sm transition-colors duration-200">
                            Terms and Conditions
                        </Link>
                        <Link href="/pages/privacy" className="text-gray-400 hover:text-teal-400 text-sm transition-colors duration-200">
                            Privacy Policy
                        </Link>
                        <Link href="#compliance" className="text-gray-400 hover:text-teal-400 text-sm transition-colors duration-200">
                            GDPR & DPDP Compliance
                        </Link>
                    </div>

                    {/* Social Icons */}
                    <div className="flex space-x-4">
                        <Link
                            href="https://www.instagram.com/stay_unfiltered_?igsh=MTR6cGE0aXU1OWsxaw=="
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-teal-600 transition-all duration-300 transform hover:scale-110"
                            aria-label="Instagram"
                        >
                            <FaInstagram className="w-5 h-5 text-gray-300" />
                        </Link>

                        <Link
                            href="https://www.linkedin.com/company/stay-unfiltered/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-teal-600 transition-all duration-300 transform hover:scale-110"
                            aria-label="LinkedIn"
                        >
                            <FaLinkedin className="w-5 h-5 text-gray-300" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;