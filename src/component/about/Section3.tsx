import { FaUserFriends, FaLightbulb, FaHandshake, FaHeart, FaChartLine, FaGlobe } from 'react-icons/fa';

function Section3() {
    return (
        <div className="py-20 bg-teal-50 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-1 mb-4 text-sm font-medium text-teal-800 bg-teal-200 rounded-full">
                        Our Core Beliefs
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        The Principles That Guide Us
                    </h2>
                    <p className="max-w-3xl mx-auto text-gray-600 text-lg">
                        These values shape every decision we make and every interaction we have
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            icon: <FaUserFriends className="text-3xl text-teal-600" />,
                            title: "Compassion First",
                            description: "We approach every interaction with empathy, understanding, and genuine care for the individual."
                        },
                        {
                            icon: <FaLightbulb className="text-3xl text-teal-600" />,
                            title: "Innovative Solutions",
                            description: "We continuously explore new ways to make mental healthcare more accessible and effective."
                        },
                        {
                            icon: <FaHandshake className="text-3xl text-teal-600" />,
                            title: "Integrity Always",
                            description: "We maintain the highest ethical standards in everything we do, especially regarding privacy."
                        },
                        {
                            icon: <FaHeart className="text-3xl text-teal-600" />,
                            title: "Inclusive Care",
                            description: "We believe mental wellness is a universal right, regardless of background or circumstance."
                        },
                        {
                            icon: <FaChartLine className="text-3xl text-teal-600" />,
                            title: "Evidence-Based",
                            description: "Our approaches are grounded in scientific research and clinical best practices."
                        },
                        {
                            icon: <FaGlobe className="text-3xl text-teal-600" />,
                            title: "Global Perspective",
                            description: "We embrace diverse cultural approaches to mental health and healing."
                        }
                    ].map((value, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow"
                        >
                            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6">
                                {value.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                            <p className="text-gray-600">{value.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Section3