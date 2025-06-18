"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { FaEdit, FaCalendarAlt, FaClock, FaVideo, FaUserMd, FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobe, FaChevronDown, FaStar, FaHistory } from 'react-icons/fa';
import Link from 'next/link';

const UserProfilePage = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    description: "Mental wellness enthusiast, practicing mindfulness daily. Currently focusing on managing work-related stress.",
    profilePic: "/user-profile.jpg",
    phone: "+91 98765 43210",
    location: "Bangalore, India",
    languages: ["English", "Hindi", "Kannada"]
  });
  const [tempUserData, setTempUserData] = useState({ ...userData });

  const therapists = [
    {
      id: 1,
      name: "Dr. Ananya Patel",
      specialization: "Clinical Psychologist",
      experience: "10 years",
      rating: 4.9,
      sessions: 24,
      image: "/therapist1.jpg",
      bio: "Specializes in cognitive behavioral therapy and anxiety management. Focuses on creating personalized treatment plans.",
      contact: {
        email: "ananya.patel@therapy.com",
        phone: "+91 87654 32109"
      }
    },
    {
      id: 2,
      name: "Dr. Rajiv Mehta",
      specialization: "Counseling Psychologist",
      experience: "8 years",
      rating: 4.8,
      sessions: 12,
      image: "/therapist2.jpg",
      bio: "Expert in relationship counseling and stress management. Uses evidence-based approaches for emotional well-being.",
      contact: {
        email: "rajiv.mehta@therapy.com",
        phone: "+91 76543 21098"
      }
    }
  ];

  const appointments = {
    upcoming: [
      {
        id: 1,
        therapist: "Dr. Ananya Patel",
        image: "/therapist1.jpg",
        date: "15 Sep 2023",
        time: "10:00 AM - 11:00 AM",
        duration: "60 mins",
        meetLink: "https://meet.stayunfiltered.com/xyz123",
        status: "paid",
        amount: "₹1,200"
      },
      {
        id: 2,
        therapist: "Dr. Rajiv Mehta",
        image: "/therapist2.jpg",
        date: "18 Sep 2023",
        time: "3:30 PM - 4:15 PM",
        duration: "45 mins",
        meetLink: "https://meet.stayunfiltered.com/abc456",
        status: "pending",
        amount: "₹950"
      }
    ],
    past: [
      {
        id: 3,
        therapist: "Dr. Ananya Patel",
        image: "/therapist1.jpg",
        date: "8 Sep 2023",
        time: "10:00 AM - 11:00 AM",
        duration: "60 mins",
        status: "completed",
        amount: "₹1,200",
        rating: 5
      },
      {
        id: 4,
        therapist: "Dr. Vikram Singh",
        image: "/therapist3.jpg",
        date: "1 Sep 2023",
        time: "2:00 PM - 2:45 PM",
        duration: "45 mins",
        status: "completed",
        amount: "₹900",
        rating: 4
      }
    ]
  };

  const handleEditToggle = () => {
    if (isEditing) {
      setUserData({ ...tempUserData });
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTempUserData({ ...tempUserData, [name]: value });
  };

  const handleLanguageChange = (index: number, value: string) => {
    const newLanguages = [...tempUserData.languages];
    newLanguages[index] = value;
    setTempUserData({ ...tempUserData, languages: newLanguages });
  };

  const addLanguage = () => {
    if (tempUserData.languages.length < 5) {
      setTempUserData({
        ...tempUserData,
        languages: [...tempUserData.languages, ""]
      });
    }
  };

  const removeLanguage = (index: number) => {
    if (tempUserData.languages.length > 1) {
      const newLanguages = tempUserData.languages.filter((_, i) => i !== index);
      setTempUserData({ ...tempUserData, languages: newLanguages });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">My Profile</h1>
          <div className="flex space-x-3">
            <button 
              onClick={handleEditToggle}
              className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors"
            >
              <FaEdit className="mr-2" />
              {isEditing ? "Save Changes" : "Edit Profile"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - User Information */}
          <div className="lg:col-span-1 space-y-8">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-teal-500 to-cyan-500 h-24"></div>
              <div className="px-6 pb-6 relative">
                <div className="flex justify-center -mt-12 mb-4">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-gray-200">
                      <Image
                        src={userData.profilePic}
                        alt="Profile"
                        width={96}
                        height={96}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    {isEditing && (
                      <button className="absolute bottom-2 right-0 bg-teal-500 rounded-full p-2 text-white hover:bg-teal-600">
                        <FaEdit className="text-sm" />
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="text-center mb-6">
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={tempUserData.name}
                      onChange={handleInputChange}
                      className="text-xl font-bold text-center mb-1 bg-teal-50 rounded-lg px-3 py-2 w-full max-w-xs mx-auto"
                    />
                  ) : (
                    <h2 className="text-xl font-bold text-gray-900">{userData.name}</h2>
                  )}
                  
                  {isEditing ? (
                    <textarea
                      name="description"
                      value={tempUserData.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="text-gray-600 text-center bg-teal-50 rounded-lg px-3 py-2 w-full max-w-xs mx-auto"
                    />
                  ) : (
                    <p className="text-gray-600 mt-2">{userData.description}</p>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <FaEnvelope className="text-teal-600 mr-3" />
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={tempUserData.email}
                        onChange={handleInputChange}
                        className="flex-1 bg-teal-50 rounded-lg px-3 py-2"
                      />
                    ) : (
                      <span className="text-gray-700">{userData.email}</span>
                    )}
                  </div>
                  
                  <div className="flex items-center">
                    <FaPhone className="text-teal-600 mr-3" />
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={tempUserData.phone}
                        onChange={handleInputChange}
                        className="flex-1 bg-teal-50 rounded-lg px-3 py-2"
                      />
                    ) : (
                      <span className="text-gray-700">{userData.phone}</span>
                    )}
                  </div>
                  
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="text-teal-600 mr-3" />
                    {isEditing ? (
                      <input
                        type="text"
                        name="location"
                        value={tempUserData.location}
                        onChange={handleInputChange}
                        className="flex-1 bg-teal-50 rounded-lg px-3 py-2"
                      />
                    ) : (
                      <span className="text-gray-700">{userData.location}</span>
                    )}
                  </div>
                  
                  <div className="flex items-start">
                    <FaGlobe className="text-teal-600 mr-3 mt-1" />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-2">Preferred Languages</h3>
                      <div className="space-y-2">
                        {tempUserData.languages.map((lang, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            {isEditing ? (
                              <>
                                <select
                                  value={lang}
                                  onChange={(e) => handleLanguageChange(index, e.target.value)}
                                  className="bg-teal-50 rounded-lg px-3 py-2 flex-1"
                                >
                                  <option value="English">English</option>
                                  <option value="Hindi">Hindi</option>
                                  <option value="Kannada">Kannada</option>
                                  <option value="Tamil">Tamil</option>
                                  <option value="Telugu">Telugu</option>
                                  <option value="Malayalam">Malayalam</option>
                                  <option value="Marathi">Marathi</option>
                                  <option value="Bengali">Bengali</option>
                                </select>
                                {tempUserData.languages.length > 1 && (
                                  <button 
                                    onClick={() => removeLanguage(index)}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    Remove
                                  </button>
                                )}
                              </>
                            ) : (
                              <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm">
                                {lang}
                              </span>
                            )}
                          </div>
                        ))}
                        {isEditing && tempUserData.languages.length < 5 && (
                          <button 
                            onClick={addLanguage}
                            className="text-teal-600 hover:text-teal-800 flex items-center text-sm"
                          >
                            + Add another language
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* My Therapists */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">My Therapists</h2>
                <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm">
                  {therapists.length} therapists
                </span>
              </div>
              
              <div className="space-y-6">
                {therapists.map((therapist) => (
                  <div key={therapist.id} className="flex items-center border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                    <div className="w-16 h-16 rounded-full border-2 border-teal-500 overflow-hidden bg-gray-200 mr-4">
                      <Image
                        src={therapist.image}
                        alt={therapist.name}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{therapist.name}</h3>
                      <p className="text-sm text-teal-600">{therapist.specialization}</p>
                      <div className="flex items-center mt-1">
                        <div className="flex items-center text-yellow-400 mr-2">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className={i < Math.floor(therapist.rating) ? "fill-current" : "fill-gray-300"} />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">{therapist.rating}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <FaClock className="mr-1" />
                        <span>{therapist.sessions} sessions</span>
                      </div>
                    </div>
                    <button className="text-teal-600 hover:text-teal-800">
                      <FaChevronDown />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Appointments */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex border-b border-gray-200 mb-6">
                <button
                  onClick={() => setActiveTab('upcoming')}
                  className={`px-4 py-2 font-medium relative ${activeTab === 'upcoming' ? 'text-teal-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Upcoming Appointments
                  {activeTab === 'upcoming' && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-600"></span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('past')}
                  className={`px-4 py-2 font-medium relative ${activeTab === 'past' ? 'text-teal-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Past Appointments
                  {activeTab === 'past' && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-600"></span>
                  )}
                </button>
              </div>

              {activeTab === 'upcoming' ? (
                <div className="space-y-6">
                  {appointments.upcoming.map((appointment) => (
                    <div key={appointment.id} className="border border-gray-200 rounded-xl p-5 hover:border-teal-300 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-start">
                        <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                          <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                            <Image
                              src={appointment.image}
                              alt={appointment.therapist}
                              width={64}
                              height={64}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex flex-wrap justify-between gap-4">
                            <div>
                              <h3 className="font-bold text-gray-900">{appointment.therapist}</h3>
                              <div className="flex items-center text-sm text-gray-500 mt-1">
                                <FaCalendarAlt className="mr-2 text-teal-600" />
                                <span>{appointment.date}</span>
                                <span className="mx-2">•</span>
                                <FaClock className="mr-2 text-teal-600" />
                                <span>{appointment.time}</span>
                              </div>
                              <div className="mt-2">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  appointment.status === 'paid' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {appointment.status === 'paid' ? 'Confirmed' : 'Payment Pending'}
                                </span>
                                <span className="ml-2 text-sm text-gray-700">{appointment.amount}</span>
                              </div>
                            </div>
                            
                            <div className="flex flex-col sm:items-end">
                              <Link
                                href={appointment.meetLink}
                                className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors mb-2"
                              >
                                <FaVideo className="mr-2" />
                                Join Session
                              </Link>
                              <button className="text-sm text-teal-600 hover:text-teal-800">
                                Reschedule
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {appointments.upcoming.length === 0 && (
                    <div className="text-center py-12">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <FaCalendarAlt className="text-2xl text-gray-500" />
                      </div>
                      <h3 className="text-xl font-medium text-gray-900 mb-2">No upcoming appointments</h3>
                      <p className="text-gray-600 mb-6">Schedule a session with your therapist to get started</p>
                      <Link
                        href="/therapists"
                        className="inline-flex items-center px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                      >
                        <FaUserMd className="mr-2" />
                        Find a Therapist
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  {appointments.past.map((appointment) => (
                    <div key={appointment.id} className="border border-gray-200 rounded-xl p-5">
                      <div className="flex flex-col sm:flex-row sm:items-start">
                        <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                          <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                            <Image
                              src={appointment.image}
                              alt={appointment.therapist}
                              width={64}
                              height={64}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex flex-wrap justify-between gap-4">
                            <div>
                              <h3 className="font-bold text-gray-900">{appointment.therapist}</h3>
                              <div className="flex items-center text-sm text-gray-500 mt-1">
                                <FaCalendarAlt className="mr-2 text-teal-600" />
                                <span>{appointment.date}</span>
                                <span className="mx-2">•</span>
                                <FaClock className="mr-2 text-teal-600" />
                                <span>{appointment.time}</span>
                              </div>
                              <div className="mt-2 flex items-center">
                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                  Completed
                                </span>
                                <div className="ml-3 flex items-center text-yellow-400">
                                  {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} className={i < appointment.rating ? "fill-current" : "fill-gray-300"} />
                                  ))}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex flex-col sm:items-end">
                              <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors mb-2">
                                <FaHistory className="mr-2" />
                                View Notes
                              </button>
                              <button className="text-sm text-teal-600 hover:text-teal-800">
                                Book Again
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {appointments.past.length === 0 && (
                    <div className="text-center py-12">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <FaHistory className="text-2xl text-gray-500" />
                      </div>
                      <h3 className="text-xl font-medium text-gray-900 mb-2">No past appointments</h3>
                      <p className="text-gray-600">Your completed therapy sessions will appear here</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;