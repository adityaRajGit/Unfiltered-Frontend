import { FaChevronRight, FaHandshake, FaChartLine, FaLightbulb } from "react-icons/fa";

const CorporateCTA = () => {
  return (
    <div className="relative bg-gradient-to-br from-teal-50 to-teal-100 py-16 md:py-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-b from-cyan-50 to-teal-50 opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-gradient-to-t from-teal-50 to-cyan-50 opacity-40"></div>
      </div>

      <div className="relative px-4 mx-auto max-w-5xl">
        <div className="text-center">
          <div className="inline-block px-4 py-1 mb-6 text-sm font-medium text-teal-800 bg-teal-200 rounded-full">
            Transform Your Workforce
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl font-pj">
            Ready to Invest in Your Team&apos;s Wellbeing?
          </h2>
          
          <p className="max-w-2xl mt-4 mx-auto text-lg text-gray-700 md:text-xl font-inter">
            Discover how our corporate therapy solutions can reduce burnout, improve retention, and boost productivity.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 max-w-4xl mx-auto">
            {/* Book a Demo Button */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-teal-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="p-6 flex flex-col items-center text-center">
                <div className="bg-teal-100 p-3 rounded-full mb-4">
                  <FaChartLine className="text-teal-600 text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Book a Demo</h3>
                <p className="text-gray-600 mb-6">See our platform in action with a personalized walkthrough</p>
                <button className="w-full flex items-center justify-center px-6 py-3 text-base font-bold text-white bg-teal-600 rounded-full shadow hover:bg-teal-700 transition-colors">
                  Schedule Demo
                  <FaChevronRight className="ml-2 text-sm" />
                </button>
              </div>
            </div>
            
            {/* Partner With Us Button */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-teal-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="p-6 flex flex-col items-center text-center">
                <div className="bg-teal-100 p-3 rounded-full mb-4">
                  <FaHandshake className="text-teal-600 text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Partner With Us</h3>
                <p className="text-gray-600 mb-6">Become a preferred provider for your organization</p>
                <button className="w-full flex items-center justify-center px-6 py-3 text-base font-medium text-teal-700 bg-white rounded-full shadow border border-teal-200 hover:bg-gray-50 transition-colors">
                  Explore Partnership
                </button>
              </div>
            </div>
            
            {/* Explore Solutions Button */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-teal-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="p-6 flex flex-col items-center text-center">
                <div className="bg-teal-100 p-3 rounded-full mb-4">
                  <FaLightbulb className="text-teal-600 text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Explore Solutions</h3>
                <p className="text-gray-600 mb-6">Discover tailored packages for your company&apos;s needs</p>
                <button className="w-full flex items-center justify-center px-6 py-3 text-base font-medium text-teal-700 bg-white rounded-full shadow border border-teal-200 hover:bg-gray-50 transition-colors">
                  View Corporate Plans
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center gap-4 max-w-2xl mx-auto">
            <div className="flex items-center text-sm bg-white px-4 py-2 rounded-full border border-teal-100 shadow-sm">
              <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
              HIPAA Compliant & Secure
            </div>
            <div className="flex items-center text-sm bg-white px-4 py-2 rounded-full border border-teal-100 shadow-sm">
              <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
              Customizable Packages
            </div>
            <div className="flex items-center text-sm bg-white px-4 py-2 rounded-full border border-teal-100 shadow-sm">
              <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
              Dedicated Account Management
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorporateCTA;