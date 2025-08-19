import React from 'react';
import { FaLock, FaUserCheck, FaDatabase, FaTrash, FaShieldAlt, FaExchangeAlt, FaTools, FaBell, FaSync, FaInfoCircle, FaCookie, FaGavel, FaHistory, FaClipboardList } from 'react-icons/fa';

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
                        GDPR and India&apos;s Digital Personal Data Protection Act (DPDP) 2023.
                    </p>
                    <div className="inline-block px-5 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-medium">
                        Last Updated: August 18, 2025
                    </div>
                </div>

                {/* Introduction */}
                <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border-l-4 border-teal-500">
                    <div className="flex items-start mb-4">
                        <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mr-4 flex-shrink-0">
                            <FaInfoCircle className="text-teal-600 text-xl" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-1">Introduction</h2>
                            <p className="text-gray-600">
                                StayUnfiltered is a mental health and wellness provider offering EAP programs, webinars,
                                workshops, and one-on-one sessions. We are committed to protecting your privacy and
                                safeguarding your personal information in compliance with GDPR (for EU/UK individuals)
                                and India&apos;s DPDP Act 2023.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Commitment to Privacy */}
                <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border-l-4 border-teal-500">
                    <div className="flex items-start mb-4">
                        <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mr-4 flex-shrink-0">
                            <FaLock className="text-teal-600 text-xl" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-1">Commitment to Privacy and Confidentiality</h2>
                            <p className="text-gray-600 mb-4">
                                We prioritize strict confidentiality for all client information. Industry guidelines mandate explicit
                                confidentiality: EAP providers must give users clear statements about confidentiality and protect
                                client information with &quot;appropriate levels of security&quot;.
                            </p>
                            <div className="bg-teal-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-teal-700 mb-2">Our Compliance Framework:</h3>
                                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                    <li>GDPR compliance for EU/UK individuals</li>
                                    <li>DPDP Act 2023 compliance for India</li>
                                    <li>Lawful, purpose-limited processing of data</li>
                                    <li>Implementation of security safeguards</li>
                                    <li>Support for data subject rights</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Data Collected */}
                <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border-l-4 border-teal-500">
                    <div className="flex items-start mb-4">
                        <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mr-4 flex-shrink-0">
                            <FaDatabase className="text-teal-600 text-xl" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-1">Data We Collect</h2>
                            <p className="text-gray-600 mb-4">
                                We collect only the personal data needed to provide our services. This includes:
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                                <div className="bg-teal-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-teal-700 mb-2">Identifiers & Contacts</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                        <li>Name</li>
                                        <li>Email address</li>
                                        <li>Phone number</li>
                                        <li>Employment details (if relevant)</li>
                                    </ul>
                                </div>

                                <div className="bg-teal-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-teal-700 mb-2">Health & Wellness Data</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                        <li>Health history</li>
                                        <li>Dietary preferences</li>
                                        <li>Mental health status</li>
                                        <li>Well-being information</li>
                                    </ul>
                                </div>

                                <div className="bg-teal-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-teal-700 mb-2">Usage Data</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                        <li>Website/app usage</li>
                                        <li>Service preferences</li>
                                        <li>Survey responses</li>
                                        <li>Feedback data</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* How We Use Data */}
                <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border-l-4 border-teal-500">
                    <div className="flex items-start mb-4">
                        <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mr-4 flex-shrink-0">
                            <FaTools className="text-teal-600 text-xl" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-1">How We Use Your Data</h2>
                            <p className="text-gray-600 mb-4">
                                Your data is used strictly to deliver and improve our services, and for related administrative purposes.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div className="bg-teal-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-teal-700 mb-2">Service Delivery</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                        <li>Providing EAP programs and webinars</li>
                                        <li>Scheduling and conducting sessions</li>
                                        <li>Facilitating workshops</li>
                                    </ul>
                                </div>

                                <div className="bg-teal-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-teal-700 mb-2">Personalization & Improvement</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                        <li>Tailoring advice based on health data</li>
                                        <li>Personalizing care based on dietary information</li>
                                        <li>Improving services through anonymized analytics</li>
                                    </ul>
                                </div>

                                <div className="bg-teal-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-teal-700 mb-2">Communication</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                        <li>Sending appointment reminders</li>
                                        <li>Requesting feedback (with consent)</li>
                                        <li>Providing service updates</li>
                                    </ul>
                                </div>

                                <div className="bg-teal-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-teal-700 mb-2">Administrative Purposes</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                        <li>Billing and payment processing</li>
                                        <li>Account management</li>
                                        <li>Legal compliance</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cookies & Tracking */}
                <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border-l-4 border-teal-500">
                    <div className="flex items-start mb-4">
                        <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mr-4 flex-shrink-0">
                            <FaCookie className="text-teal-600 text-xl" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-1">Cookies & Tracking Technologies</h2>
                            <p className="text-gray-600">
                                Our website and mobile platforms use cookies and similar tracking technologies for functionality and analytics.
                            </p>

                            <div className="mt-6">
                                <h3 className="font-semibold text-teal-700 mb-3">Our Cookie Categories:</h3>

                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div className="bg-teal-50 p-4 rounded-lg">
                                        <h4 className="font-medium text-teal-700 mb-1">Essential</h4>
                                        <p className="text-sm text-gray-600">Required for basic functionality</p>
                                    </div>

                                    <div className="bg-teal-50 p-4 rounded-lg">
                                        <h4 className="font-medium text-teal-700 mb-1">Preferences</h4>
                                        <p className="text-sm text-gray-600">Remember your settings</p>
                                    </div>

                                    <div className="bg-teal-50 p-4 rounded-lg">
                                        <h4 className="font-medium text-teal-700 mb-1">Analytics</h4>
                                        <p className="text-sm text-gray-600">Help us improve our services</p>
                                    </div>

                                    <div className="bg-teal-50 p-4 rounded-lg">
                                        <h4 className="font-medium text-teal-700 mb-1">Marketing</h4>
                                        <p className="text-sm text-gray-600">Used only with your consent</p>
                                    </div>
                                </div>

                                <div className="mt-6 bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
                                    <p className="text-amber-800">
                                        <span className="font-semibold">Consent Notice:</span> In compliance with GDPR and related EU laws,
                                        we obtain user consent before setting any non-essential cookies. You can withdraw your consent at any time.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Data Sharing */}
                <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border-l-4 border-teal-500">
                    <div className="flex items-start mb-4">
                        <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mr-4 flex-shrink-0">
                            <FaExchangeAlt className="text-teal-600 text-xl" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-1">Data Sharing & Disclosure</h2>
                            <p className="text-gray-600 mb-4">
                                We do not sell personal data. We share user data only in limited, controlled circumstances.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                <div className="bg-teal-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-teal-700 mb-2">With Employers</h3>
                                    <p className="text-gray-600">
                                        Only with consent for EAP coordination purposes. We share minimal necessary information.
                                    </p>
                                </div>

                                <div className="bg-teal-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-teal-700 mb-2">With Service Providers</h3>
                                    <p className="text-gray-600">
                                        Trusted partners under strict contracts for hosting, analytics, and support services.
                                    </p>
                                </div>

                                <div className="bg-teal-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-teal-700 mb-2">Legal Obligations</h3>
                                    <p className="text-gray-600">
                                        When required by law or to protect our rights, property, or safety.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 bg-teal-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-teal-700 mb-2">No Third-Party Marketing</h3>
                                <p className="text-gray-600">
                                    We never share your data with third parties for marketing purposes without your explicit consent.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Data Security */}
                <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border-l-4 border-teal-500">
                    <div className="flex items-start mb-4">
                        <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mr-4 flex-shrink-0">
                            <FaShieldAlt className="text-teal-600 text-xl" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-1">Data Security Measures</h2>
                            <p className="text-gray-600 mb-4">
                                We implement strong technical and organizational safeguards to protect personal data.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div className="bg-teal-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-teal-700 mb-2">Technical Safeguards</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                        <li>Encryption in transit (TLS 1.3) and at rest (AES-256)</li>
                                        <li>Secure hosting with Vercel (ISO 27001 certified)</li>
                                        <li>Secure hosting with Hostinger</li>
                                        <li>Regular security audits and vulnerability scans</li>
                                    </ul>
                                </div>

                                <div className="bg-teal-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-teal-700 mb-2">Organizational Safeguards</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                        <li>Access restricted to authorized staff only</li>
                                        <li>Comprehensive staff training on data protection</li>
                                        <li>Strict confidentiality agreements</li>
                                        <li>Regular security awareness programs</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-6 bg-teal-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-teal-700 mb-2">Incident Response</h3>
                                <p className="text-gray-600">
                                    We have a comprehensive incident response plan to address potential data breaches.
                                    In the unlikely event of a breach, we will notify affected users and relevant authorities
                                    within 72 hours as required by GDPR and DPDP regulations.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Data Retention */}
                <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border-l-4 border-teal-500">
                    <div className="flex items-start mb-4">
                        <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mr-4 flex-shrink-0">
                            <FaHistory className="text-teal-600 text-xl" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-1">Data Retention</h2>
                            <p className="text-gray-600">
                                We retain personal data only as long as necessary to fulfill its intended purpose.
                            </p>

                            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-teal-50 p-5 rounded-lg">
                                    <h3 className="font-bold text-lg text-teal-700 mb-2">Active Data</h3>
                                    <div className="text-gray-600">
                                        <span>We retain data during active engagement with our services. This includes:</span>
                                        <ul className="list-disc pl-5 mt-2 space-y-1">
                                            <li>Duration of EAP program participation</li>
                                            <li>Active therapy sessions</li>
                                            <li>Ongoing workshop enrollment</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="bg-teal-50 p-5 rounded-lg">
                                    <h3 className="font-bold text-lg text-teal-700 mb-2">Post-Service Retention</h3>
                                    <p className="text-gray-600">
                                        After service completion, we retain data only as required:
                                        <ul className="list-disc pl-5 mt-2 space-y-1">
                                            <li>For legal or regulatory requirements</li>
                                            <li>For financial record keeping (7 years)</li>
                                            <li>For dispute resolution purposes</li>
                                        </ul>
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 bg-teal-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-teal-700 mb-2">Data Disposal</h3>
                                <p className="text-gray-600">
                                    Once retention periods expire, we securely delete or anonymize your personal data using
                                    industry-standard data destruction methods that prevent reconstruction.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Compliance */}
                <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border-l-4 border-teal-500">
                    <div className="flex items-start mb-4">
                        <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mr-4 flex-shrink-0">
                            <FaGavel className="text-teal-600 text-xl" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-1">Compliance with GDPR & DPDP</h2>
                            <p className="text-gray-600 mb-4">
                                StayUnfiltered is fully compliant with GDPR and India&apos;s DPDP Act (2023). We adhere to all
                                applicable requirements for data protection.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div className="bg-teal-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-teal-700 mb-2">GDPR Compliance</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                        <li>Lawful basis for processing</li>
                                        <li>Data subject rights implementation</li>
                                        <li>Data Protection Impact Assessments</li>
                                        <li>Appointment of EU representative</li>
                                    </ul>
                                </div>

                                <div className="bg-teal-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-teal-700 mb-2">DPDP 2023 Compliance</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                        <li>Consent-based processing</li>
                                        <li>Purpose limitation</li>
                                        <li>Data minimization</li>
                                        <li>Appointment of Data Protection Officer</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-6 bg-teal-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-teal-700 mb-2">Core Principles</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    <span className="bg-white px-3 py-1 rounded-full text-sm text-center border border-teal-200">Lawfulness</span>
                                    <span className="bg-white px-3 py-1 rounded-full text-sm text-center border border-teal-200">Transparency</span>
                                    <span className="bg-white px-3 py-1 rounded-full text-sm text-center border border-teal-200">Purpose Limitation</span>
                                    <span className="bg-white px-3 py-1 rounded-full text-sm text-center border border-teal-200">Data Minimization</span>
                                    <span className="bg-white px-3 py-1 rounded-full text-sm text-center border border-teal-200">Accuracy</span>
                                    <span className="bg-white px-3 py-1 rounded-full text-sm text-center border border-teal-200">Storage Limitation</span>
                                    <span className="bg-white px-3 py-1 rounded-full text-sm text-center border border-teal-200">Security</span>
                                    <span className="bg-white px-3 py-1 rounded-full text-sm text-center border border-teal-200">Accountability</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Your Rights */}
                <div className="bg-teal-50 rounded-2xl p-8 mb-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Privacy Rights</h2>
                    <p className="text-gray-600 mb-6">
                        Under GDPR and DPDP, you have the following rights regarding your personal data:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-5 rounded-lg shadow-sm">
                            <div className="flex items-center mb-3">
                                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mr-3">
                                    <FaUserCheck className="text-teal-600" />
                                </div>
                                <h3 className="font-bold text-lg text-teal-700">Access Rights</h3>
                            </div>
                            <p className="text-gray-600">
                                Request access to the personal information we hold about you at any time.
                            </p>
                        </div>

                        <div className="bg-white p-5 rounded-lg shadow-sm">
                            <div className="flex items-center mb-3">
                                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mr-3">
                                    <FaSync className="text-teal-600" />
                                </div>
                                <h3 className="font-bold text-lg text-teal-700">Correction Rights</h3>
                            </div>
                            <p className="text-gray-600">
                                Request correction of inaccurate or incomplete personal information.
                            </p>
                        </div>

                        <div className="bg-white p-5 rounded-lg shadow-sm">
                            <div className="flex items-center mb-3">
                                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mr-3">
                                    <FaTrash className="text-teal-600" />
                                </div>
                                <h3 className="font-bold text-lg text-teal-700">Deletion Rights</h3>
                            </div>
                            <p className="text-gray-600">
                                Request deletion of your personal data when it&apos;s no longer necessary for our services (&quot;Right to be Forgotten&quot;).
                            </p>
                        </div>

                        <div className="bg-white p-5 rounded-lg shadow-sm">
                            <div className="flex items-center mb-3">
                                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mr-3">
                                    <FaExchangeAlt className="text-teal-600" />
                                </div>
                                <h3 className="font-bold text-lg text-teal-700">Data Portability</h3>
                            </div>
                            <p className="text-gray-600">
                                Request a copy of your data in a structured, commonly used format.
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-5 rounded-lg shadow-sm">
                            <div className="flex items-center mb-3">
                                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mr-3">
                                    <FaBell className="text-teal-600" />
                                </div>
                                <h3 className="font-bold text-lg text-teal-700">Objection Rights</h3>
                            </div>
                            <p className="text-gray-600">
                                Object to certain types of processing, such as direct marketing.
                            </p>
                        </div>

                        <div className="bg-white p-5 rounded-lg shadow-sm">
                            <div className="flex items-center mb-3">
                                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mr-3">
                                    <FaLock className="text-teal-600" />
                                </div>
                                <h3 className="font-bold text-lg text-teal-700">Restriction Rights</h3>
                            </div>
                            <p className="text-gray-600">
                                Request restriction of processing in certain circumstances.
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 bg-white p-5 rounded-lg shadow-sm">
                        <h3 className="font-bold text-lg text-teal-700 mb-3">Exercising Your Rights</h3>
                        <p className="text-gray-600">
                            To exercise any of these rights, please contact our Data Protection Officer at stay.unfiltered.2025@gmail.com.
                            We will respond to your request within 30 days as required by law.
                        </p>
                    </div>
                </div>

                {/* Key Practices Summary */}
                <div className="bg-white rounded-2xl shadow-md p-6 mb-16 border-l-4 border-teal-500">
                    <div className="flex items-start mb-4">
                        <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mr-4 flex-shrink-0">
                            <FaClipboardList className="text-teal-600 text-xl" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-1">Summary of Key Practices</h2>

                            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="border border-teal-200 rounded-lg p-5">
                                    <div className="flex items-center mb-3">
                                        <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center mr-3">
                                            <FaLock className="text-teal-600 text-sm" />
                                        </div>
                                        <h3 className="font-bold text-teal-700">Strict Confidentiality</h3>
                                    </div>
                                    <p className="text-gray-600 text-sm">
                                        All client information is treated with the highest level of confidentiality in accordance with industry standards.
                                    </p>
                                </div>

                                <div className="border border-teal-200 rounded-lg p-5">
                                    <div className="flex items-center mb-3">
                                        <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center mr-3">
                                            <FaShieldAlt className="text-teal-600 text-sm" />
                                        </div>
                                        <h3 className="font-bold text-teal-700">GDPR/DPDP Compliance</h3>
                                    </div>
                                    <p className="text-gray-600 text-sm">
                                        Full compliance with GDPR for EU/UK individuals and India&apos;s DPDP Act 2023.
                                    </p>
                                </div>

                                <div className="border border-teal-200 rounded-lg p-5">
                                    <div className="flex items-center mb-3">
                                        <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center mr-3">
                                            <FaShieldAlt className="text-teal-600 text-sm" />
                                        </div>
                                        <h3 className="font-bold text-teal-700">Security First</h3>
                                    </div>
                                    <p className="text-gray-600 text-sm">
                                        Implementation of robust security measures including encryption and certified hosting.
                                    </p>
                                </div>

                                <div className="border border-teal-200 rounded-lg p-5">
                                    <div className="flex items-center mb-3">
                                        <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center mr-3">
                                            <FaInfoCircle className="text-teal-600 text-sm" />
                                        </div>
                                        <h3 className="font-bold text-teal-700">Transparency</h3>
                                    </div>
                                    <p className="text-gray-600 text-sm">
                                        Clear privacy notices and consent practices so you understand how your data is used.
                                    </p>
                                </div>

                                <div className="border border-teal-200 rounded-lg p-5">
                                    <div className="flex items-center mb-3">
                                        <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center mr-3">
                                            <FaUserCheck className="text-teal-600 text-sm" />
                                        </div>
                                        <h3 className="font-bold text-teal-700">User Control</h3>
                                    </div>
                                    <p className="text-gray-600 text-sm">
                                        You remain in full control of your personal data with multiple rights to manage it.
                                    </p>
                                </div>
                            </div>
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
                                    href="mailto:stay.unfiltered.2025@gmail.com"
                                    className="sm:text-xl hover:underline"
                                >
                                    stay.unfiltered.2025@gmail.com
                                </a>
                            </div>

                            <div className="bg-teal-700/30 p-6 rounded-xl">
                                <h3 className="font-bold sm:text-lg mb-3">Phone</h3>
                                <p className="sm:text-xl">+91-XXXXXXXXXX</p>
                            </div>

                            <div className="bg-teal-700/30 p-6 rounded-xl md:col-span-2">
                                <h3 className="font-bold sm:text-lg mb-3">Registered Office</h3>
                                <p>Flat No. 1151, Tower - G ,</p>
                                <p>11th Avenue, Gaur City 2 ,</p>
                                <p>Greater Noida , Uttar Pradesh 201009</p>
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