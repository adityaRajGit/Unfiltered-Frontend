import { FaSmile, FaBuilding, FaLock, FaUsers } from 'react-icons/fa';

function Stats() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-[#e3fdf7] to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-[#e3fdf7] text-[#009689] text-sm uppercase tracking-wider font-semibold rounded-full px-4 py-1.5 mb-4">
            Trusted by industry leaders
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#004d46] mb-3">
            Why Companies <span className="text-[#009689]">Choose Our Wellness Programs</span>
          </h2>
          <div className="w-20 h-1 bg-[#009689] mx-auto rounded-full mt-2"></div>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Proven, measurable results for modern workplaces worldwide.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Card 1 */}
          <div className="group bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-lg hover:border-[#009689] transition-all duration-300 text-center">
            <div className="mx-auto mb-6 w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#009689] to-[#b2f5ea] shadow group-hover:scale-110 transition">
              <FaSmile className="text-2xl text-white" />
            </div>
            <h3 className="text-5xl font-black text-[#009689] mb-3 group-hover:scale-105 transition">95%</h3>
            <p className="text-xl font-bold text-gray-800 mb-1">Employee Satisfaction</p>
            <p className="text-gray-600">Improved work-life balance</p>
          </div>
          {/* Card 2 */}
          <div className="group bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-lg hover:border-[#009689] transition-all duration-300 text-center">
            <div className="mx-auto mb-6 w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#009689] to-[#b2f5ea] shadow group-hover:scale-110 transition">
              <FaBuilding className="text-2xl text-white" />
            </div>
            <h3 className="text-5xl font-black text-[#009689] mb-3 group-hover:scale-105 transition">200+</h3>
            <p className="text-xl font-bold text-gray-800 mb-1">Companies Served</p>
            <p className="text-gray-600">Startups to Fortune 500</p>
          </div>
          {/* Card 3 */}
          <div className="group bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-lg hover:border-[#009689] transition-all duration-300 text-center">
            <div className="mx-auto mb-6 w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#009689] to-[#b2f5ea] shadow group-hover:scale-110 transition">
              <FaLock className="text-2xl text-white" />
            </div>
            <h3 className="text-5xl font-black text-[#009689] mb-3 group-hover:scale-105 transition">98%</h3>
            <p className="text-xl font-bold text-gray-800 mb-1">Retention Rate</p>
            <p className="text-gray-600">Companies renew annually</p>
          </div>
          {/* Card 4 */}
          <div className="group bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-lg hover:border-[#009689] transition-all duration-300 text-center">
            <div className="mx-auto mb-6 w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#009689] to-[#b2f5ea] shadow group-hover:scale-110 transition">
              <FaUsers className="text-2xl text-white" />
            </div>
            <h3 className="text-5xl font-black text-[#009689] mb-3 group-hover:scale-105 transition">50K+</h3>
            <p className="text-xl font-bold text-gray-800 mb-1">Employees Impacted</p>
            <p className="text-gray-600">Measurable wellness gains</p>
          </div>
        </div>

        {/* ROI Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#009689] to-[#00ccaf] p-10 text-white text-center shadow-lg relative overflow-hidden">
          <span className="inline-block bg-white text-[#009689] bg-opacity-20 text-sm uppercase tracking-wider font-semibold rounded-full px-4 py-2 mb-4">
            Real business outcomes
          </span>
          <h3 className="text-3xl font-bold mb-4">Proven ROI for Your Business</h3>
          <p className="text-lg md:text-xl leading-snug mb-6 max-w-3xl mx-auto">
            Companies achieve an average <span className="font-black bg-white/10 px-3 py-1 rounded-lg">3-5x ROI</span> through reduced absenteeism, increased productivity, and higher retention.
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-white/10 rounded-xl py-4 px-4">
              <span className="text-2xl font-bold block mb-1">↓40%</span>
              <span className="text-sm">Absenteeism</span>
            </div>
            <div className="bg-white/10 rounded-xl py-4 px-4">
              <span className="text-2xl font-bold block mb-1">↑25%</span>
              <span className="text-sm">Productivity</span>
            </div>
            <div className="bg-white/10 rounded-xl py-4 px-4">
              <span className="text-2xl font-bold block mb-1">↑60%</span>
              <span className="text-sm">Retention</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Stats;
