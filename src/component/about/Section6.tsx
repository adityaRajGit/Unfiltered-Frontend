import Link from 'next/link'
import React from 'react'

function Section6() {
    return (
        <div className="py-20 bg-gradient-to-r from-teal-600 to-cyan-600">
            <div className="max-w-4xl mx-auto text-center px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    Join Our Mission to Transform Mental Healthcare
                </h2>
                <p className="text-xl text-teal-100 mb-10 max-w-3xl mx-auto">
                    Whether you&apos;re seeking support, looking to join our team, or want to partner with us,
                    we&apos;d love to connect with you.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link href="/pages/signup" className="px-8 py-3 bg-white text-teal-700 font-medium rounded-full hover:bg-gray-100 transition-colors">
                        Create Your Account
                    </Link>
                    <Link href="/careers" className="px-8 py-3 border-2 border-white text-white font-medium rounded-full hover:bg-white/10 transition-colors">
                        Explore Careers
                    </Link>
                    <Link href="/partners" className="px-8 py-3 border-2 border-white text-white font-medium rounded-full hover:bg-white/10 transition-colors">
                        Partner With Us
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Section6