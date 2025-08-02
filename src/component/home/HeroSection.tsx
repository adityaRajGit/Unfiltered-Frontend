"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaChevronRight, FaChevronLeft, FaPlay, FaUsers, FaAppleAlt, FaHeart } from "react-icons/fa";

function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const slides = [
    {
      id: 1,
      badge: "Enterprise Mental Health Solutions",
      title: {
        main: "Elevate Your",
        highlight: "Workforce Wellbeing. Boost Productivity."
      },
      description: "Corporate therapy packages designed to reduce burnout by 42%, decrease turnover by 35%, and increase employee satisfaction by 68%.",
      primaryButton: {
        text: "Request Corporate Demo",
        href: "pages/corporate#corporate-contact"
      },
      secondaryButton: {
        text: "View Packages"
      },
      image: "/landing.jpeg",
      imageAlt: "Corporate therapy dashboard showing employee wellbeing metrics",
      floatingCard: {
        icon: "check",
        title: "Proven Results",
        subtitle: "42% lower burnout"
      }
    },
    {
      id: 2,
      badge: "Free Educational Webinars",
      title: {
        main: "Join Our",
        highlight: "Expert-Led Mental Health Webinars"
      },
      description: "Access free webinars covering stress management, work-life balance, team building, and workplace mental health. Learn from certified professionals and improve your team's wellbeing.",
      primaryButton: {
        text: "Browse Free Webinars",
        href: "/webinars"
      },
      secondaryButton: {
        text: "Schedule Demo"
      },
      image: "/landing1.jpg",
      imageAlt: "Professional conducting a mental health webinar for corporate employees",
      floatingCard: {
        icon: "users",
        title: "Live Sessions",
        subtitle: "Join 500+ professionals"
      }
    },
    {
      id: 3,
      badge: "Holistic Wellness Programs",
      title: {
        main: "Nutrition & Diet",
        highlight: "Consulting for Complete Wellness"
      },
      description: "Physical health is as important as mental health. Our certified nutritionists provide personalized diet plans and wellness coaching to help your employees thrive both mentally and physically.",
      primaryButton: {
        text: "Explore Nutrition Plans",
        href: "/nutrition"
      },
      secondaryButton: {
        text: "Learn More"
      },
      image: "/landing1.jpg",
      imageAlt: "Healthy meal planning and nutrition consultation for workplace wellness",
      floatingCard: {
        icon: "heart",
        title: "Complete Health",
        subtitle: "Mind + Body wellness"
      }
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || isTransitioning) return;

    const interval = setInterval(() => {
      handleSlideChange((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isTransitioning, slides.length]);

  const handleSlideChange = (newSlideIndex: number | ((prev: number) => number)) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    const nextSlide = typeof newSlideIndex === 'function' ? newSlideIndex(currentSlide) : newSlideIndex;
    setCurrentSlide(nextSlide);
    
    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const nextSlide = () => {
    handleSlideChange((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    handleSlideChange((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    if (index !== currentSlide) {
      handleSlideChange(index);
      setIsAutoPlaying(false);
    }
  };

  const getFloatingIcon = (iconType: string) => {
    switch (iconType) {
      case "check":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "users":
        return <FaUsers className="h-4 w-4 text-cyan-700" />;
      case "heart":
        return <FaHeart className="h-4 w-4 text-emerald-700" />;
      default:
        return null;
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-teal-50 to-teal-100 py-16 md:py-22 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-b from-cyan-50 to-teal-50 opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-gradient-to-t from-teal-50 to-cyan-50 opacity-40"></div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        disabled={isTransitioning}
        className="absolute hidden sm:block left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous slide"
      >
        <FaChevronLeft className="text-teal-600 text-lg" />
      </button>

      <button
        onClick={nextSlide}
        disabled={isTransitioning}
        className="absolute hidden sm:block right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next slide"
      >
        <FaChevronRight className="text-teal-600 text-lg" />
      </button>

      {/* Slides Container */}
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slideData, index) => (
            <div key={slideData.id} className="w-full flex-shrink-0">
              {/* Main content */}
              <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2 pb-10 lg:pb-4">
                  {/* Text content */}
                  <div className="text-center lg:text-left">
                    <div 
                      className={`inline-block px-4 py-1 mb-4 text-sm font-medium text-teal-800 bg-teal-200 rounded-full transition-all duration-700 ${
                        index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}
                      style={{ transitionDelay: index === currentSlide ? '200ms' : '0ms' }}
                    >
                      {slideData.badge}
                    </div>

                    <h1 
                      className={`text-4xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl font-pj transition-all duration-700 ${
                        index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      }`}
                      style={{ transitionDelay: index === currentSlide ? '300ms' : '0ms' }}
                    >
                      <span className="block">{slideData.title.main}</span>
                      <span className="relative inline-block mt-2 text-teal-600">
                        {slideData.title.highlight}
                      </span>
                    </h1>

                    <p 
                      className={`max-w-xl mt-6 text-lg text-gray-700 md:mt-8 mx-auto md:text-xl font-inter transition-all duration-700 ${
                        index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      }`}
                      style={{ transitionDelay: index === currentSlide ? '400ms' : '0ms' }}
                    >
                      {slideData.description}
                    </p>

                    <div 
                      className={`flex flex-co items-center justify-center mt-10 space-y-4 sm:flex-row sm:space-y-0 lg:flex-col lg:gap-2 xl:gap-0 xl:flex-row  sm:space-x-6 lg:justify-start transition-all duration-700 ${
                        index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      }`}
                      style={{ transitionDelay: index === currentSlide ? '500ms' : '0ms' }}
                    >
                      <Link
                        href={slideData.primaryButton.href}
                        className="flex items-center px-8 py-4 text-base font-bold text-white transition-all bg-teal-600 rounded-full shadow-lg md:text-lg hover:bg-teal-700 hover:shadow-xl transform hover:scale-105"
                      >
                        {slideData.primaryButton.text}
                        <FaChevronRight className="ml-2 text-sm" />
                      </Link>

                      <button className="px-8 py-4 text-base font-medium text-teal-700 transition-all bg-white rounded-full shadow-md md:text-lg hover:bg-gray-50 hover:shadow-lg transform hover:scale-105">
                        {slideData.secondaryButton.text}
                      </button>
                    </div>
                  </div>

                  {/* Image section */}
                  <div className="relative">
                    <div 
                      className={`relative overflow-hidden rounded-2xl shadow-xl transform transition-all duration-700 hover:scale-[1.02] ${
                        index === currentSlide ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-8 scale-95'
                      }`}
                      style={{ transitionDelay: index === currentSlide ? '300ms' : '0ms' }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 z-10"></div>
                      <Image
                        src={slideData.image}
                        alt={slideData.imageAlt}
                        width={600}
                        height={600}
                        className="w-full object-cover"
                        priority={index === 0}
                      />
                    </div>

                    {/* Floating card */}
                    <div 
                      className={`absolute z-20 -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-lg border border-gray-100 transform transition-all duration-700 hover:shadow-xl ${
                        index === currentSlide ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
                      }`}
                      style={{ transitionDelay: index === currentSlide ? '600ms' : '0ms' }}
                    >
                      <div className="flex items-center">
                        <div className="flex -space-x-2">
                          <div className="w-8 h-8 rounded-full bg-teal-100 border-2 border-white flex items-center justify-center">
                            {getFloatingIcon(slideData.floatingCard.icon)}
                          </div>
                          <div className="w-8 h-8 rounded-full bg-cyan-100 border-2 border-white flex items-center justify-center">
                            <FaPlay className="h-3 w-3 text-cyan-700" />
                          </div>
                          <div className="w-8 h-8 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center">
                            <FaAppleAlt className="h-3 w-3 text-emerald-700" />
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-xs font-bold text-gray-900">{slideData.floatingCard.title}</p>
                          <p className="text-xs text-gray-500">{slideData.floatingCard.subtitle}</p>
                        </div>
                      </div>
                    </div>

                    {/* Additional floating elements for webinar slide */}
                    {index === 1 && (
                      <div 
                        className={`absolute z-20 -top-4 -right-4 bg-white p-3 rounded-lg shadow-lg border border-gray-100 transition-all duration-700 ${
                          currentSlide === 1 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-95'
                        }`}
                        style={{ transitionDelay: currentSlide === 1 ? '700ms' : '0ms' }}
                      >
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                          </div>
                          <span className="text-xs font-medium text-gray-700">Live Now</span>
                        </div>
                      </div>
                    )}

                    {/* Additional floating elements for nutrition slide */}
                    {index === 2 && (
                      <div 
                        className={`absolute z-20 -top-4 -right-4 bg-white p-3 rounded-lg shadow-lg border border-gray-100 transition-all duration-700 ${
                          currentSlide === 2 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-95'
                        }`}
                        style={{ transitionDelay: currentSlide === 2 ? '700ms' : '0ms' }}
                      >
                        <div className="flex items-center space-x-2">
                          <FaAppleAlt className="text-green-500 text-lg" />
                          <span className="text-xs font-medium text-gray-700">Healthy Living</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={`h-3 rounded-full transition-all duration-300 disabled:cursor-not-allowed ${
                index === currentSlide
                  ? 'bg-teal-600 w-8'
                  : 'bg-white/60 hover:bg-white/80 w-3'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-teal-200/30">
        <div
          className="h-full bg-teal-600 transition-all duration-500 ease-out"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>
    </div>
  );
}

export default HeroSection;
