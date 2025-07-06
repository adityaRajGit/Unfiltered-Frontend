import { FaSmile, FaBuilding, FaLock, FaUsers } from 'react-icons/fa';

function Stats() {
  return (
    <section className="py-16 bg-gradient-to-b from-[#e3fdf7] to-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#004d46]">Why Companies Choose Our Wellness Programs</h2>
          <div className="w-24 h-1 bg-[#009689] mx-auto mt-4 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-[#009689] transform hover:-translate-y-1 transition duration-300">
            <div className="bg-[#e3fdf7] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaSmile className="text-3xl text-[#009689]" />
            </div>
            <h3 className="text-4xl font-bold text-[#009689] text-center mb-2">95%</h3>
            <p className="text-lg font-semibold text-center text-gray-700">Employee Satisfaction</p>
            <p className="text-gray-600 text-center mt-2">Reported improved work-life balance</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-[#009689] transform hover:-translate-y-1 transition duration-300">
            <div className="bg-[#e3fdf7] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaBuilding className="text-3xl text-[#009689]" />
            </div>
            <h3 className="text-4xl font-bold text-[#009689] text-center mb-2">200+</h3>
            <p className="text-lg font-semibold text-center text-gray-700">Companies Served</p>
            <p className="text-gray-600 text-center mt-2">From startups to Fortune 500</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-[#009689] transform hover:-translate-y-1 transition duration-300">
            <div className="bg-[#e3fdf7] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaLock className="text-3xl text-[#009689]" />
            </div>
            <h3 className="text-4xl font-bold text-[#009689] text-center mb-2">98%</h3>
            <p className="text-lg font-semibold text-center text-gray-700">Retention Rate</p>
            <p className="text-gray-600 text-center mt-2">Of companies renew their programs</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-[#009689] transform hover:-translate-y-1 transition duration-300">
            <div className="bg-[#e3fdf7] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaUsers className="text-3xl text-[#009689]" />
            </div>
            <h3 className="text-4xl font-bold text-[#009689] text-center mb-2">50K+</h3>
            <p className="text-lg font-semibold text-center text-gray-700">Employees Impacted</p>
            <p className="text-gray-600 text-center mt-2">With measurable wellness improvements</p>
          </div>
        </div>
        
        <div className="mt-12 bg-[#009689] rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Proven ROI for Your Business</h3>
          <p className="max-w-3xl mx-auto">
            Companies report an average of <span className="font-bold">3-5x return on investment</span> through reduced absenteeism, 
            increased productivity, and improved employee retention after implementing our programs.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Stats;