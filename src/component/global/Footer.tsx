import Link from "next/link";

function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
                    {/* Brand & Newsletter */}
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

                        <div className="mb-8">
                            <h3 className="text-lg font-semibold mb-4">Subscribe to our newsletter</h3>
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-grow w-[54%] sm:w-auto py-3 px-4 rounded-l-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                                <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 rounded-r-lg transition duration-300">
                                    Submit
                                </button>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h3 className="font-semibold mb-2">Have a question?</h3>
                            <p>
                                Email us anytime:
                                <a href="mailto:care@stayunfiltered.com" className="text-teal-400 hover:text-teal-300 ml-1">
                                    care@stayunfiltered.com
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex flex-col">
                        <h3 className="text-lg font-semibold mb-4">Popular</h3>
                        <ul className="space-y-3">
                            {["Mental Health", "Men's Performance", "Women's Health", "For Business", "Content Hub"].map((item, i) => (
                                <li key={i}>
                                    <Link href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col">
                        <h3 className="text-lg font-semibold mb-4">Learn</h3>
                        <ul className="space-y-3">
                            {["How It Works", "About Us", "Testimonials", "Cancel Stigma", "Our Medical Team"].map((item, i) => (
                                <li key={i}>
                                    <Link href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col">
                        <h3 className="text-lg font-semibold mb-4">Connect</h3>
                        <ul className="space-y-3">
                            {["WhatsApp", "Instagram", "Facebook", "Twitter", "LinkedIn"].map((item, i) => (
                                <li key={i}>
                                    <Link href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <h3 className="text-lg font-semibold mt-8 mb-4">Careers</h3>
                        <ul className="space-y-3">
                            {["For Psychologists", "For Doctors", "Others"].map((item, i) => (
                                <li key={i}>
                                    <Link href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-800 my-10"></div>

                {/* Bottom Row */}
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 text-sm mb-4 md:mb-0">
                        © 2025 Unfilter. All rights reserved.
                    </p>

                    <div className="flex space-x-8">
                        <Link href="#terms" className="text-gray-400 hover:text-teal-400 text-sm transition-colors">
                            Terms and Conditions
                        </Link>
                        <Link href="/pages/privacy" className="text-gray-400 hover:text-teal-400 text-sm transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="#privacy" className="text-gray-400 hover:text-teal-400 text-sm transition-colors">
                            GDPR & DPDP Compliance
                        </Link>
                    </div>

                    <div className="flex space-x-6 mt-4 md:mt-0">
                        {["Instagram", "LinkedIn", "YouTube", "Medium"].map((platform, i) => (
                            <Link
                                key={i}
                                href="#"
                                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-teal-600 transition-colors"
                                aria-label={platform}
                            >
                                <div className="bg-gray-400 rounded-full w-4 h-4"></div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;