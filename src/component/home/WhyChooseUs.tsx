"use client"
import React, { JSX, useState } from 'react';
import { FaUserMd, FaLock, FaCalendarAlt, FaChartLine, FaHeart, FaTimes } from 'react-icons/fa';

interface CardData {
  icon: JSX.Element;
  title: string;
  description: string;
  linkText: string;
  fullDesc: string;
}

const cardData: CardData[] = [
  {
    icon: <FaUserMd className="text-2xl text-teal-600" />,
    title: "Expert Care Team",
    description: "Our therapists are licensed professionals with specialized training in various mental health areas, ensuring you receive expert care tailored to your unique needs.",
    linkText: "Meet our therapists",
    fullDesc: "Our therapists are licensed professionals with years of diverse training, having worked across a wide range of settings — from clinics to corporate environments and community care. Each brings deep experience in handling issues like anxiety, grief, trauma, and workplace stress, with compassion, insight, and professionalism. They employ modern, evidence-informed therapeutic techniques, never one-size-fits-all, always tailored to you. You'll be supported by someone who understands how to listen, guide, and help you build resilience. With high standards for ethics, privacy, and continuous learning, you're in safe, capable hands."
  },
  {
    icon: <FaLock className="text-2xl text-teal-600" />,
    title: "Safe & Confidential",
    description: "Your privacy is our priority. We use end-to-end encryption and strict confidentiality protocols to ensure your mental health journey remains private and secure.",
    linkText: "Our privacy commitment",
    fullDesc: "Your privacy is our top priority — we follow GDPR standards for data protection when working with international users. In India, we comply with the Digital Personal Data Protection Act (DPDP Act), as well as the IT Act and Rules governing sensitive personal data. All personal & health-related information is stored securely, encrypted, and only accessed by authorized licensed professionals. Sessions and records are kept strictly confidential (including virtual/online formats), except only where law or safety requires disclosure. You have full rights: to know how your data is used, to correct or delete it, and to choose consent at every step. Trust and confidentiality aren't just promises — they are built into every policy, practice, and technology we use."
  },
  {
    icon: <FaHeart className="text-2xl text-teal-600" />,
    title: "Holistic Well-Being",
    description: "Support for your complete wellness journey - mind, body, and lifestyle integrated for sustainable mental health.",
    linkText: "Explore holistic care",
    fullDesc: "Your mental health doesn't exist in isolation — we support the full spectrum of your well-being. Alongside therapy, we offer nutrition & diet consulting, movement guidance, and wellness coaching to nourish body and mind. Each plan integrates mental, physical and lifestyle elements (sleep, energy, diet) so progress feels cohesive, not fragmented. We work with you to create a sustainable, balanced routine — not quick fixes, but lasting shifts. Your path is uniquely yours — and we're committed to supporting every aspect that influences your growth. Think of us as a partner for your full wellness journey, not just for moments of crisis."
  },
  {
    icon: <FaCalendarAlt className="text-2xl text-teal-600" />,
    title: "Flexible Options",
    description: "Therapy that fits your schedule and preferences. Choose from video, phone, or text sessions, available at times that work for you, including evenings and weekends.",
    linkText: "View session options",
    fullDesc: "Choose what works for you—session timing, problem areas, communication style—everything tailored to your schedule and preferences. Our smart auto-matcher takes your availability and main concern, then recommends one or more therapists who best align with those inputs. Want weekday mornings, or someone experienced with relationship issues? The matcher handles that automatically. You can switch therapists if needed, with minimal friction, until you find someone you feel truly comfortable with. Sessions can be in-person or virtual, and we'll ensure the format fits your lifestyle and needs. Flexibility isn't just a promise—it's built into how we match, schedule, and support you."
  },
  {
    icon: <FaChartLine className="text-2xl text-teal-600" />,
    title: "Evidence-Based Approaches",
    description: "Our therapeutic methods are grounded in scientific research and clinical best practices, ensuring you receive effective, proven support for your mental wellness.",
    linkText: "Our therapeutic approaches",
    fullDesc: "Our therapeutic methods are grounded in scientific research and clinical best practices, ensuring you receive effective, proven support. We design our packages around behavior-change insights—tracking habits, routines, and consistency—to help you gradually build lasting wellness. Drawing from habit-formation research (which shows every new behaviour develops over time and with repetition) to guide what works best for you. Strategies include small daily actions, tailored prompts, and accountability, aligned with what behavioral science shows helps make change sustainable. We adjust plans as you progress—because what works early on might need shifts later. You'll get personalised support with approaches that have been tested in real-life settings, helping you build momentum at your own pace."
  },
  {
    icon: <FaHeart className="text-2xl text-teal-600" />,
    title: "Compassionate Support",
    description: "Experience care that comes from genuine understanding. Our team is dedicated to creating a non-judgmental space where you can explore your thoughts and feelings freely.",
    linkText: "Read testimonials",
    fullDesc: "Our care doesn't end when the clock strikes 5 — our dedicated customer care team is available 24/7, always ready to listen, assist, and guide you. Whether it's a moment of crisis, confusion, or just needing someone to talk to, there's someone on call who truly cares. Everyone in our team is trained in empathetic communication, listening without judgment, and helping you feel seen and supported. We believe that healing happens in people feeling safe and heard, at any hour of the day or night. Your comfort matters — because sometimes courage is reaching out, and we want to be there when you do. This isn't just service, it's a commitment: you will never feel alone in this journey."
  }
];

const WhyChooseUs = () => {
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (card: CardData) => {
    setSelectedCard(card);
    setIsModalOpen(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Re-enable body scroll
    document.body.style.overflow = 'unset';
    // Delay clearing selected card for smoother animation
    setTimeout(() => setSelectedCard(null), 300);
  };

  // Close modal when clicking on backdrop
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="py-20 bg-gradient-to-b from-teal-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 mb-4 text-sm font-medium text-teal-800 bg-teal-200 rounded-full">
            Our Approach
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose StayUnfiltered for Your Mental Wellness Journey
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            Discover the compassionate, professional care that sets us apart in supporting your mental health
          </p>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cardData.map((card, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-teal-100 transition-all duration-300 hover:shadow-xl cursor-pointer transform hover:-translate-y-1"
              onClick={() => handleCardClick(card)}
            >
              <div className="p-1 bg-gradient-to-r from-teal-500 to-cyan-500"></div>
              <div className="p-8">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6">
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{card.title}</h3>
                <p className="text-gray-600 mb-6">{card.description}</p>
                <div className="flex items-center text-sm text-teal-700 font-medium">
                  <span>Learn more</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Popup */}
      {selectedCard && (
        <div 
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 bg-opacity-50 transition-opacity duration-300 ${
            isModalOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={handleBackdropClick}
        >
          <div 
            className={`bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-300 ${
              isModalOpen ? 'scale-100' : 'scale-95'
            }`}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white z-10 border-b border-teal-100">
              <div className="p-1 bg-gradient-to-r from-teal-500 to-cyan-500"></div>
              <div className="p-6 pb-4 flex justify-between items-start">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                    {selectedCard.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedCard.title}</h3>
                </div>
                <button 
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 pt-4 w-full">
              <div className="prose prose-lg max-w-none">
                {selectedCard.fullDesc.split('\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhyChooseUs;