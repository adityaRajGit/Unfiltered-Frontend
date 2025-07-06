import Image from "next/image";
import { FaChevronRight } from "react-icons/fa";

function HeroSection() {
  return (
    <div className="relative bg-gradient-to-br from-teal-50 to-teal-100 py-16 md:py-24">
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-b from-cyan-50 to-teal-50 opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-gradient-to-t from-teal-50 to-cyan-50 opacity-40"></div>
      </div>

      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <div className="inline-block px-4 py-1 mb-4 text-sm font-medium text-teal-800 bg-teal-200 rounded-full">
              Enterprise Mental Health Solutions
            </div>

            <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl font-pj">
              <span className="block">Elevate Your</span>
              <span className="relative inline-block mt-2 text-teal-600">Workforce Wellbeing. Boost Productivity.</span>
            </h1>

            <p className="max-w-xl mt-6 text-lg text-gray-700 md:mt-8 mx-auto md:text-xl font-inter">
              Corporate therapy packages designed to reduce burnout by 42%, decrease turnover by 35%, 
              and increase employee satisfaction by 68%.
            </p>

            <div className="flex flex-col items-center justify-center mt-10 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 lg:justify-start">
              <button className="flex items-center px-8 py-4 text-base font-bold text-white transition-all bg-teal-600 rounded-full shadow-lg md:text-lg hover:bg-teal-700">
                Request Corporate Demo
                <FaChevronRight className="ml-2 text-sm" />
              </button>

              <button className="px-8 py-4 text-base font-medium text-teal-700 transition-all bg-white rounded-full shadow-md md:text-lg hover:bg-gray-50">
                View Packages
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 z-10"></div>
              <Image
                src="/landing.jpeg"
                alt="Corporate therapy dashboard showing employee wellbeing metrics"
                width={600}
                height={600}
                className="w-full"
              />
            </div>

            {/* Floating elements - updated for corporate focus */}
            <div className="absolute z-20 -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-teal-100 border-2 border-white flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-cyan-100 border-2 border-white flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-cyan-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-xs font-bold text-gray-900">Proven Results</p>
                  <p className="text-xs text-gray-500">42% lower burnout</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;