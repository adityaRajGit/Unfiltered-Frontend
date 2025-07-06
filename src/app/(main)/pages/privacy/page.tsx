import React from 'react';
import { FaLock, FaUserCheck, FaDatabase, FaTrash, FaUserSecret, FaShieldAlt, FaExchangeAlt, FaComments, FaTools, FaBell, FaSync } from 'react-icons/fa';

const PrivacyPolicyPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-teal-700 to-cyan-600 py-16 md:py-24 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Privacy Policy
                    </h1>
                    <p className="text-xl text-teal-100 max-w-3xl mx-auto">
                        Your trust is our priority. Learn how we protect your sensitive mental health data.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
                <div className="mb-12 text-center">
                    <p className="text-gray-600 mb-8 max-w-3xl mx-auto">
                        At StayUnfiltered, we recognize that mental health data requires the highest level of protection.
                        This policy outlines our commitment to safeguarding your sensitive information in compliance with
                        Indian data protection regulations.
                    </p>
                    <div className="inline-block px-5 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-medium">
                        Last Updated: May 10, 2025
                    </div>
                </div>

                {/* Policy Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {/* Sensitive Data Handling */}
                    <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-teal-500">
                        <div className="flex items-start mb-4">
                            <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mr-4 flex-shrink-0">
                                <FaLock className="text-teal-600 text-xl" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-1">Sensitive Data Handling</h2>
                                <p className="text-gray-600">
                                    Mental health data is categorized as Sensitive Personal Data or Information (SPDI) under Indian law.
                                    We handle this data with the highest care, following applicable data protection standards.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Explicit User Consent */}
                    <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-teal-500">
                        <div className="flex items-start mb-4">
                            <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mr-4 flex-shrink-0">
                                <FaUserCheck className="text-teal-600 text-xl" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-1">Explicit User Consent</h2>
                                <p className="text-gray-600">
                                    We seek clear, informed, and voluntary consent from users before collecting or processing any
                                    sensitive personal information, including mental health disclosures or therapy records.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Data Minimization */}
                    <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-teal-500">
                        <div className="flex items-start mb-4">
                            <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mr-4 flex-shrink-0">
                                <FaDatabase className="text-teal-600 text-xl" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-1">Data Minimization</h2>
                                <p className="text-gray-600">
                                    We only collect information that is absolutely necessary to provide our services—nothing more.
                                    Optional fields are clearly marked as such.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right to Access & Deletion */}
                    <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-teal-500">
                        <div className="flex items-start mb-4">
                            <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mr-4 flex-shrink-0">
                                <FaTrash className="text-teal-600 text-xl" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-1">Right to Access & Deletion</h2>
                                <div className="text-gray-600">
                                    Users have the right to:
                                    <ul className="list-disc pl-5 mt-2 space-y-1">
                                        <li>Access their personal data</li>
                                        <li>Request corrections</li>
                                        <li>Request deletion of their data (&quot;Right to be Forgotten&quot;)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Anonymity Options */}
                    <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-teal-500">
                        <div className="flex items-start mb-4">
                            <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mr-4 flex-shrink-0">
                                <FaUserSecret className="text-teal-600 text-xl" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-1">Anonymity Options</h2>
                                <p className="text-gray-600">
                                    Users can share content anonymously within the community. No identity is linked to anonymous
                                    posts unless the user chooses otherwise.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Data Storage and Security */}
                    <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-teal-500">
                        <div className="flex items-start mb-4">
                            <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mr-4 flex-shrink-0">
                                <FaShieldAlt className="text-teal-600 text-xl" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-1">Data Storage and Security</h2>
                                <p className="text-gray-600">
                                    User data is stored on secure, encrypted servers. We implement strong cybersecurity protocols
                                    to prevent unauthorized access, breaches, or misuse.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* No Data Sharing Without Consent */}
                    <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-teal-500">
                        <div className="flex items-start mb-4">
                            <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mr-4 flex-shrink-0">
                                <FaExchangeAlt className="text-teal-600 text-xl" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-1">No Data Sharing Without Consent</h2>
                                <p className="text-gray-600">
                                    We do not sell, rent, or share personal or mental health information with third parties
                                    without explicit user consent, except when legally obligated.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Therapy Confidentiality */}
                    <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-teal-500">
                        <div className="flex items-start mb-4">
                            <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mr-4 flex-shrink-0">
                                <FaComments className="text-teal-600 text-xl" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-1">Therapy Confidentiality</h2>
                                <p className="text-gray-600">
                                    All therapy sessions are private and confidential. Therapist-client communications are
                                    never shared with other users, staff, or platforms.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Third-Party Tools */}
                    <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-teal-500">
                        <div className="flex items-start mb-4">
                            <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mr-4 flex-shrink-0">
                                <FaTools className="text-teal-600 text-xl" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-1">Third-Party Tools</h2>
                                <p className="text-gray-600">
                                    We ensure that all third-party tools or services we use (for hosting, analytics, etc.)
                                    comply with strong data protection standards and do not misuse your data.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Breach Notification */}
                    <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-teal-500">
                        <div className="flex items-start mb-4">
                            <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mr-4 flex-shrink-0">
                                <FaBell className="text-teal-600 text-xl" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-1">Breach Notification</h2>
                                <p className="text-gray-600">
                                    In the unlikely event of a data breach, we will notify users and relevant authorities
                                    (such as CERT-In) in accordance with Indian cybersecurity rules.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Policy Updates */}
                    <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-teal-500">
                        <div className="flex items-start mb-4">
                            <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mr-4 flex-shrink-0">
                                <FaSync className="text-teal-600 text-xl" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-1">Policy Updates</h2>
                                <p className="text-gray-600">
                                    We will notify users of any material changes to our privacy practices through the platform
                                    or registered email, ensuring transparency and choice.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Information */}
                <div className="bg-teal-50 rounded-2xl p-8 mb-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Privacy Rights</h2>
                    <p className="text-gray-600 mb-6">
                        Under applicable Indian laws and regulations, you have the following rights regarding your personal data:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-5 rounded-lg shadow-sm">
                            <h3 className="font-bold text-lg text-teal-700 mb-2">Access Rights</h3>
                            <p className="text-gray-600">
                                You may request access to the personal information we hold about you at any time.
                            </p>
                        </div>

                        <div className="bg-white p-5 rounded-lg shadow-sm">
                            <h3 className="font-bold text-lg text-teal-700 mb-2">Correction Rights</h3>
                            <p className="text-gray-600">
                                You may request correction of inaccurate or incomplete personal information.
                            </p>
                        </div>

                        <div className="bg-white p-5 rounded-lg shadow-sm">
                            <h3 className="font-bold text-lg text-teal-700 mb-2">Deletion Rights</h3>
                            <p className="text-gray-600">
                                You may request deletion of your personal data when it&apos;s no longer necessary for our services.
                            </p>
                        </div>

                        <div className="bg-white p-5 rounded-lg shadow-sm">
                            <h3 className="font-bold text-lg text-teal-700 mb-2">Data Portability</h3>
                            <p className="text-gray-600">
                                You may request a copy of your data in a structured, commonly used format.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl p-8 md:p-12 text-white">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">Contact Our Privacy Team</h2>
                        <p className="text-teal-100 mb-8">
                            If you have questions about this privacy policy or wish to exercise your privacy rights,
                            please contact our Data Protection Officer:
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-teal-700/30 p-6 rounded-xl">
                                <h3 className="font-bold text-lg mb-3">Email</h3>
                                <a
                                    href="mailto:privacy@stayunfiltered.com"
                                    className="sm:text-xl hover:underline"
                                >
                                    privacy@stayunfiltered.com
                                </a>
                            </div>

                            <div className="bg-teal-700/30 p-6 rounded-xl">
                                <h3 className="font-bold sm:text-lg mb-3">Registered Office</h3>
                                <p className="mb-1">StayUnfiltered Technologies Pvt. Ltd.</p>
                                <p>123 Privacy Lane, Tech District</p>
                                <p>Bangalore, Karnataka 560001</p>
                                <p>India</p>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-teal-500/30">
                            <p className="text-teal-200">
                                We typically respond to privacy inquiries within 48 business hours. For urgent matters
                                regarding data security, please include &quot;URGENT&quot; in your subject line.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;