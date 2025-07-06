import { FaUsers, FaBrain, FaHeartbeat, FaChartLine, FaCalendarCheck, FaStar } from 'react-icons/fa';

function Topics() {
  const webinarTopics = [
    { 
      id: 'relationship', 
      title: 'Relationship Building', 
      icon: <FaUsers className="text-3xl" />, 
      activity: 'Interactive Workshop', 
      duration: '90 min',
      description: 'Build stronger teams through effective communication and empathy training.',
      benefits: ['Improved collaboration', 'Enhanced conflict resolution', 'Stronger team bonds']
    },
    { 
      id: 'stress', 
      title: 'Stress Management', 
      icon: <FaBrain className="text-3xl" />, 
      activity: 'Guided Meditation Session', 
      duration: '60 min',
      description: 'Practical techniques to manage workplace stress and prevent burnout.',
      benefits: ['Reduced anxiety', 'Improved focus', 'Better work-life balance']
    },
    { 
      id: 'mental', 
      title: 'Mental Wellness', 
      icon: <FaHeartbeat className="text-3xl" />, 
      activity: 'Expert Panel Discussion', 
      duration: '75 min',
      description: 'Strategies for maintaining mental health in high-pressure environments.',
      benefits: ['Emotional resilience', 'Coping strategies', 'Mental health awareness']
    },
    { 
      id: 'positive', 
      title: 'Positive Psychology', 
      icon: <FaChartLine className="text-3xl" />, 
      activity: 'Practical Skill Building', 
      duration: '120 min',
      description: 'Leverage strengths and cultivate a positive mindset for productivity.',
      benefits: ['Increased motivation', 'Strengths identification', 'Positive workplace culture']
    },
    { 
      id: 'health', 
      title: 'Health & Wellness', 
      icon: <FaCalendarCheck className="text-3xl" />, 
      activity: 'Lifestyle Assessment', 
      duration: '90 min',
      description: 'Holistic approaches to physical and mental well-being at work.',
      benefits: ['Better physical health', 'Nutrition guidance', 'Energy management']
    },
    { 
      id: 'corporate', 
      title: 'Corporate Resilience', 
      icon: <FaStar className="text-3xl" />, 
      activity: 'Leadership Training', 
      duration: '150 min',
      description: 'Develop organizational resilience to navigate challenges effectively.',
      benefits: ['Change management', 'Adaptability skills', 'Future-proofing teams']
    }
  ];
  
  return (
    <section className="py-16 px-4 bg-[#f7fdfc]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#004d46]">Specialized Webinar Topics</h2>
          <p className="text-gray-600 max-w-3xl mx-auto mt-4">
            Expert-led sessions tailored for corporate wellness programs with measurable outcomes
          </p>
          <div className="w-24 h-1 bg-[#009689] mx-auto mt-4 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {webinarTopics.map((topic) => (
            <div
              key={topic.id}
              className="bg-white rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl"
            >
              <div className="bg-gradient-to-r from-[#009689] to-[#007a70] p-6 text-white">
                <div className="flex items-center">
                  <div className="bg-white/20 p-3 rounded-full mr-4">
                    {topic.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{topic.title}</h3>
                    <div className="flex items-center mt-1">
                      <span className="bg-white/30 px-2 py-1 rounded text-xs mr-2">
                        {topic.activity}
                      </span>
                      <span className="text-sm">{topic.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-700 mb-4">{topic.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-[#009689] mb-2">Key Benefits:</h4>
                  <ul className="space-y-1">
                    {topic.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <div className="bg-[#e3fdf7] rounded-full p-1 mr-2 mt-1">
                          <svg className="w-3 h-3 text-[#009689]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-6 flex justify-end items-center">
                  <button className="bg-gradient-to-r from-[#009689] to-[#007a70] text-white px-4 py-2 rounded-lg hover:from-[#00887c] hover:to-[#006b62] transition-all duration-300 transform hover:scale-105">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-[#004d46] mb-4">Custom Webinar Solutions</h3>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Don&apos;t see exactly what you need? We specialize in creating tailored webinar experiences that address your 
            company&apos;s unique challenges and wellness goals.
          </p>
          <button className="mt-6 bg-white border-2 border-[#009689] text-[#009689] px-6 py-3 rounded-full font-semibold hover:bg-[#009689] hover:text-white transition duration-300">
            Request Custom Program
          </button>
        </div>
      </div>
    </section>
  );
}

export default Topics;