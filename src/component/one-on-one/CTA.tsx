import React from 'react'

function CTA() {
    return (
        <section className="py-16 bg-gradient-to-r from-[#03978a] to-teal-600 text-white">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold mb-4">Ready to Start Your Healing Journey?</h2>
                <p className="text-xl mb-8 opacity-90">Book a confidential session with a qualified therapist.</p>

                <div className="space-y-4 max-w-2xl mx-auto">
                    <button className="w-full bg-yellow-400 text-gray-900 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-colors duration-300">
                        🔒 Secure Your Spot Now
                    </button>
                    <p className="text-teal-200 text-sm">✅ 100% Confidential • ✅ Certified Therapists</p>
                </div>
            </div>
        </section>
    )
}

export default CTA
