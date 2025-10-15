
function HealingSection() {
    return (
        <section className="py-16 bg-gradient-to-br from-teal-50 to-cyan-100">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">How Your Healing Journey Works</h2>
                <p className="text-center text-gray-600 mb-12">Simple 4-step process to start your transformation today</p>

                <div className="max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-[#03978a] rounded-full flex items-center justify-center text-white font-bold text-lg">1</div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Book Your Session</h3>
                                <p className="text-gray-600">Choose your preferred package and schedule your first session at your convenience</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-[#03978a] rounded-full flex items-center justify-center text-white font-bold text-lg">2</div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Match with Your Therapist</h3>
                                <p className="text-gray-600">Get paired with a certified therapist who specializes in your specific needs</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-[#03978a] rounded-full flex items-center justify-center text-white font-bold text-lg">3</div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Begin Your Sessions</h3>
                                <p className="text-gray-600">Start your one-on-one sessions via video, phone, or chat - whatever you&apos;re comfortable with</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-[#03978a] rounded-full flex items-center justify-center text-white font-bold text-lg">4</div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Track Your Progress</h3>
                                <p className="text-gray-600">See measurable improvements with regular check-ins and personalized growth plans</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HealingSection