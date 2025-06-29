"use client"

function HeroSection() {
    return (
        <section className="relative py-20 px-4 overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="text-center lg:text-left">
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                            Corporate Wellness
                            <span className="block pb-3 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-teal-800">
                                Programs
                            </span>
                        </h1>
                        <div className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto lg:mx-0">
                            <p className="font-semibold mb-2">Workplace Mental Health: A Global Priority</p>
                            <p className="mb-4">
                                Mental health in the workplace is a critical issue affecting millions worldwide. According to the World Health Organization, 15% of working-age adults live with a mental disorder, and depression and anxiety cost the global economy US$ 1 trillion annually in lost productivity.
                            </p>
                            <p>
                                At StayUnfiltered, we recognize the importance of addressing mental health in the workplace. Our corporate wellness programs are designed to support employees mental well-being, leading to a healthier, more productive workforce.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <button
                                //   onClick={scrollToContact}
                                className="bg-gradient-to-r from-teal-600 to-teal-800 hover:from-teal-700 hover:to-teal-900 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                Request Consultation
                            </button>
                            <button className="bg-white border-2 border-teal-600 text-teal-700 hover:bg-teal-50 font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow hover:shadow-md">
                                View Case Studies
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="relative w-full max-w-xl">
                            <div className="absolute -top-12 -left-12 w-64 h-64 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
                            <div className="absolute top-0 -right-12 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
                            <div className="absolute bottom-0 left-20 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>

                            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white overflow-hidden">
                                <div className="flex flex-col items-center">
                                    <div className="relative mb-8">
                                        <div className="bg-gradient-to-br from-teal-500 to-teal-700 w-32 h-32 rounded-full flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-white text-center font-bold text-xs px-3 py-1 rounded-full">
                                            Trusted by 250+ companies
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                                        <div className="bg-gradient-to-br from-cyan-100 to-teal-100 p-4 rounded-xl text-center">
                                            <div className="text-2xl sm:text-3xl font-bold text-teal-800">12-15%</div>
                                            <div className="text-sm text-teal-700 mt-1">Productivity Gain</div>
                                        </div>
                                        <div className="bg-gradient-to-br from-cyan-100 to-teal-100 p-4 rounded-xl text-center">
                                            <div className="text-2xl sm:text-3xl font-bold text-teal-800">20-30%</div>
                                            <div className="text-sm text-teal-700 mt-1">Absenteeism Reduction</div>
                                        </div>
                                        <div className="bg-gradient-to-br from-cyan-100 to-teal-100 p-4 rounded-xl text-center">
                                            <div className="text-2xl sm:text-3xl font-bold text-teal-800">65%</div>
                                            <div className="text-sm text-teal-700 mt-1">Retention Increase</div>
                                        </div>
                                        <div className="bg-gradient-to-br from-cyan-100 to-teal-100 p-4 rounded-xl text-center">
                                            <div className="text-2xl sm:text-3xl font-bold text-teal-800">4X</div>
                                            <div className="text-sm text-teal-700 mt-1">ROI</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
        </section>
    )
}

export default HeroSection