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
              Share Your Story
            </div>

            <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl md:text-6xl font-pj">
              <span className="block">Find Your</span>
              <span className="relative inline-block mt-2 text-teal-600">Unfiltered Minds. Unlimited Growth.</span>
            </h1>

            <p className="max-w-xl mt-6 text-lg text-gray-700 md:mt-8 mx-auto md:text-xl font-inter">
              Helping you navigate life, work, and emotions—through therapy, community, and global impact.
            </p>

            <div className="flex flex-col items-center justify-center mt-10 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 lg:justify-start">
              <button className="flex items-center px-8 py-4 text-base font-bold text-white transition-all bg-teal-600 rounded-full shadow-lg md:text-lg hover:bg-teal-700">
                Get Started Free
                <FaChevronRight className="ml-2 text-sm" />
              </button>

              <button className="px-8 py-4 text-base font-medium text-teal-700 transition-all bg-white rounded-full shadow-md md:text-lg hover:bg-gray-50">
                Watch Demo
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 z-10"></div>
              <Image
                src="/landing.jpeg"
                alt="Dashboard"
                width={600}
                height={600}
                className="w-full"
              />
            </div>

            {/* Floating elements */}
            <div className="absolute z-20 -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-teal-100 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-cyan-100 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-emerald-100 border-2 border-white"></div>
                </div>
                <div className="ml-3">
                  <p className="text-xs font-bold text-gray-900">Active Community</p>
                  <p className="text-xs text-gray-500">5k+ online</p>
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