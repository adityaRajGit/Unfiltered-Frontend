"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaEdit, FaCalendarAlt, FaClock, FaVideo, FaUserMd, FaPhone, FaTimes, FaEnvelope, FaChevronDown, FaStar, FaHistory } from 'react-icons/fa';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { getUserDetails, updateUserDetails } from '@/store/userSlice';
import { toast } from 'react-toastify';
import { TOKEN } from '@/utils/enum';
import { decodeToken } from '@/utils/decodeToken';
import { useRouter } from 'next/navigation';
import { LoadingSpinnerWithOverlay } from '../global/Loading';
import { getInitials } from '@/utils/GetInitials';
import { useRef } from 'react';

interface User {
  name: string;
  email: string;
  phone: string;
  profile_image: string;
  bio: string;
}

interface BookingForm {
  specialization: string;
  languages: string[];
  date: string;
  time: string;
}

interface FilteredTherapist {
  id: number;
  name: string;
  specialization: string;
  experience: string;
  rating: number;
  image: string;
  languages: string[];
  availability: string[];
  price: number;
  bio: string;
}

const INDIAN_LANGUAGES = [
  'Hindi', 'English', 'Bengali', 'Telugu', 'Marathi', 'Tamil', 'Gujarati',
  'Urdu', 'Kannada', 'Odia', 'Malayalam', 'Punjabi', 'Assamese', 'Maithili',
  'Sanskrit', 'Nepali', 'Konkani', 'Manipuri', 'Sindhi', 'Dogri', 'Kashmiri',
  'Santali', 'Bodo'
];


const UserProfilePage = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [isEditing, setIsEditing] = useState(false);
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [tempUserData, setTempUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()
  const router = useRouter()
  const storedToken = typeof window !== 'undefined' ? localStorage.getItem(TOKEN) : null;
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [bookingForm, setBookingForm] = useState<BookingForm>({
    specialization: '',
    languages: [],
    date: '',
    time: '',
  });
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [filteredTherapists, setFilteredTherapists] = useState<FilteredTherapist[]>([]);
  const [showResults, setShowResults] = useState(false);

  const allTherapists: FilteredTherapist[] = [
    {
      id: 1,
      name: "Dr. Ananya Patel",
      specialization: "Addiction Specialist",
      experience: "10 years",
      rating: 4.9,
      image: "/therapist1.jpg",
      languages: ["English", "Hindi", "Gujarati"],
      availability: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      price: 1200,
      bio: "Specializes in substance abuse recovery, behavioral addictions, and cognitive behavioral therapy for addiction treatment."
    },
    {
      id: 2,
      name: "Dr. Rajiv Mehta",
      specialization: "Anxiety Specialist",
      experience: "8 years",
      rating: 4.8,
      image: "/therapist2.jpg",
      languages: ["English", "Hindi", "Marathi"],
      availability: ["10:00", "11:00", "15:00", "16:00", "17:00"],
      price: 950,
      bio: "Expert in anxiety disorders, panic attacks, social anxiety, and stress management using evidence-based approaches."
    },
    {
      id: 3,
      name: "Dr. Priya Sharma",
      specialization: "Depression Specialist", 
      experience: "12 years",
      rating: 4.9,
      image: "/therapist3.jpg",
      languages: ["English", "Hindi", "Punjabi"],
      availability: ["09:00", "10:00", "14:00", "15:00"],
      price: 1100,
      bio: "Specializes in major depressive disorder, bipolar disorder, and mood disorders with focus on therapeutic interventions."
    },
    {
      id: 4,
      name: "Dr. Arjun Reddy",
      specialization: "Trauma Specialist",
      experience: "15 years",
      rating: 4.7,
      image: "/therapist4.jpg",
      languages: ["English", "Telugu", "Tamil"],
      availability: ["11:00", "12:00", "16:00", "17:00", "18:00"],
      price: 1500,
      bio: "Expert in PTSD, trauma-informed care, EMDR therapy, and helping clients recover from traumatic experiences."
    },
    {
      id: 5,
      name: "Dr. Kavya Nair",
      specialization: "Relationship Counseling",
      experience: "9 years",
      rating: 4.8,
      image: "/therapist5.jpg",
      languages: ["English", "Malayalam", "Tamil"],
      availability: ["09:00", "10:00", "11:00", "15:00", "16:00"],
      price: 1300,
      bio: "Specializes in couples therapy, marriage counseling, family dynamics, and relationship conflict resolution."
    },
    {
      id: 6,
      name: "Dr. Vikram Singh",
      specialization: "Child Psychology",
      experience: "11 years",
      rating: 4.8,
      image: "/therapist6.jpg",
      languages: ["English", "Hindi", "Punjabi"],
      availability: ["09:00", "10:00", "11:00", "14:00", "15:00"],
      price: 1150,
      bio: "Specializes in child and adolescent behavioral issues, ADHD, autism spectrum disorders, and developmental concerns."
    },
    {
      id: 7,
      name: "Dr. Meera Joshi",
      specialization: "Family Therapy",
      experience: "13 years",
      rating: 4.9,
      image: "/therapist7.jpg",
      languages: ["English", "Hindi", "Marathi"],
      availability: ["10:00", "11:00", "15:00", "16:00", "17:00"],
      price: 1250,
      bio: "Expert in family systems therapy, intergenerational trauma, and resolving family conflicts and communication issues."
    },
    {
      id: 8,
      name: "Dr. Ravi Kumar",
      specialization: "Stress Management",
      experience: "7 years",
      rating: 4.7,
      image: "/therapist8.jpg",
      languages: ["English", "Telugu", "Kannada"],
      availability: ["09:00", "12:00", "14:00", "16:00", "17:00"],
      price: 900,
      bio: "Focuses on workplace stress, burnout prevention, mindfulness-based stress reduction, and work-life balance."
    }
  ];

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

  const handleLanguageSelect = (language: string) => {
    if (!bookingForm.languages.includes(language)) {
      setBookingForm(prev => ({
        ...prev,
        languages: [...prev.languages, language]
      }));
    }
    setShowLanguageDropdown(false);
  };

  const removeLanguage = (languageToRemove: string) => {
    setBookingForm(prev => ({
      ...prev,
      languages: prev.languages.filter(lang => lang !== languageToRemove)
    }));
  };

  const handleBookingFormChange = (field: keyof BookingForm, value: string) => {
    setBookingForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const filterTherapists = () => {
    if (!bookingForm.specialization || !bookingForm.date || !bookingForm.time || bookingForm.languages.length === 0) {
      toast.error('Please fill all required fields');
      return;
    }

    const filtered = allTherapists.filter(therapist => {
      const hasSpecialization = therapist.specialization.toLowerCase().includes(bookingForm.specialization.toLowerCase());

      const hasLanguage = bookingForm.languages.some(lang =>
        therapist.languages.includes(lang)
      );

      const timeHour = bookingForm.time.split(':')[0] + ':00';
      const hasAvailability = therapist.availability.includes(timeHour);

      return hasSpecialization && hasLanguage && hasAvailability;
    });

    setFilteredTherapists(filtered);
    setShowResults(true);
  };


  const bookAppointment = (therapist: FilteredTherapist) => {
    toast.success(`Appointment booked with ${therapist.name}!`);
    setActiveTab('upcoming');
    setShowResults(false);
    setBookingForm({
      languages: [],
      date: '',
      time: '',
      specialization: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (!tempUserData) return;
    setTempUserData({ ...tempUserData, [name]: value });
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);

      if (tempUserData) {
        setTempUserData({ ...tempUserData, profile_image: objectUrl });
      }
    }
  };

  async function updateProfile() {
    setLoading(true);

    try {
      const formData = new FormData();

      if (tempUserData) {
        formData.append('name', tempUserData.name || '');
        formData.append('email', tempUserData.email || '');
        formData.append('phone', tempUserData.phone || '');
        formData.append('bio', tempUserData.bio || '');
      }

      if (file) {
        formData.append('img', file);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await dispatch(updateUserDetails({ id: userId, formData } as any) as any);

      if (response?.error) {
        toast.error(response.error.message);
      } else {
        getUser(userId);
        toast.success('Profile updated successfully!');
        setIsEditing(false);
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
          setPreviewUrl(null);
          setFile(null);
        }
      }
    } catch (error) {
      toast.error('Failed to update profile');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function getUser(id: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await dispatch(getUserDetails(id as any) as any);
    if (response?.error) {
      setLoading(false)
      toast.error(response.error.message)
    } else {
      setLoading(false)
      setUser(response.payload.data.user)
      setTempUserData(response.payload.data.user)
    }
  }

  useEffect(() => {
    if (storedToken !== null) {
      const decodedToken = decodeToken(storedToken as string);
      if (decodedToken?.userId) {
        getUser(decodedToken.userId._id);
        setUserId(decodedToken.userId._id);
      } else {
        router.push('/');
      }
    } else {
      router.push('/');
    }
  }, [storedToken, router]);


  if (loading) {
    return (
      <div className='min-h-screen'>
        <LoadingSpinnerWithOverlay />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">My Profile</h1>
          {isEditing ? (
            <div className="flex space-x-3">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={updateProfile}
                className="px-4 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700"
              >
                Save Changes
              </button>
            </div>
          ) : (
            <div>
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700"
              >
                <FaEdit className="mr-2" />
                Edit Profile
              </button>
            </div>
          )}
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
                    <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-gray-200 flex items-center justify-center">
                      {/* Show preview if available */}
                      {previewUrl ? (
                        <Image
                          src={previewUrl}
                          alt="Profile preview"
                          width={96}
                          height={96}
                          className="object-cover w-full h-full"
                        />
                      ) : user?.profile_image ? (
                        <Image
                          src={user?.profile_image}
                          alt="Profile"
                          width={96}
                          height={96}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <span className="text-teal-600 font-bold text-sm uppercase">
                          {getInitials(user?.name || '')}
                        </span>
                      )}
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleImageSelect}
                        className="hidden"
                      />

                    </div>
                    {isEditing && (
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-2 right-0 bg-teal-500 rounded-full p-2 text-white hover:bg-teal-600"
                      >
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
                      value={tempUserData?.name}
                      onChange={handleInputChange}
                      className="text-xl font-bold text-center mb-1 bg-teal-50 rounded-lg px-3 py-2 w-full max-w-xs mx-auto"
                    />
                  ) : (
                    <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
                  )}

                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={tempUserData?.bio}
                      onChange={handleInputChange}
                      placeholder={"Write a short bio about yourself to help others get to know you."}
                      rows={3}
                      className="text-gray-600 text-center resize-none h-32 bg-teal-50 rounded-lg px-3 py-2 w-full max-w-xs mx-auto"
                    />
                  ) : (
                    user?.bio
                      ? <p className="text-gray-600 mt-2">{user.bio}</p>
                      : <p className="text-gray-600 mt-2">Write a short bio about yourself to help others get to know you.</p>

                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <FaEnvelope className="text-teal-600 mr-3" />
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={tempUserData?.email}
                        onChange={handleInputChange}
                        className="flex-1 bg-teal-50 rounded-lg px-3 py-2"
                      />
                    ) : (
                      <span className="text-gray-700">{user?.email}</span>
                    )}
                  </div>

                  <div className="flex items-center">
                    <FaPhone className="text-teal-600 mr-3" />
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        minLength={0}
                        maxLength={10}
                        value={tempUserData?.phone}
                        placeholder={'Add a phone number.'}
                        onChange={handleInputChange}
                        className="flex-1 bg-teal-50 rounded-lg px-3 py-2"
                      />
                    ) : (
                      user?.phone
                        ? <span className="text-gray-700">{user?.phone}</span>
                        : <span className="text-gray-700">Add a phone number.</span>
                    )}
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
              <div className="flex flex-col sm:flex-row border-b border-gray-200 mb-6">
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
                <button
                  onClick={() => {
                    setActiveTab('book');
                    setShowResults(false);
                  }}
                  className={`px-4 py-2 font-medium relative ${activeTab === 'book' ? 'text-teal-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Book Appointment
                  {activeTab === 'book' && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-600"></span>
                  )}
                </button>
              </div>

              {activeTab === 'book' ? (
                <div className="space-y-6">
                  {!showResults ? (
                    <>
                      {/* Booking Form */}
                      <div className="bg-teal-50 rounded-xl p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Schedule Your Therapy Session</h3>
                        <div className="mb-6">
                          <label className="block text-gray-700 font-medium mb-3">
                            Specialization *
                          </label>
                          <select
                            value={bookingForm.specialization || ''}
                            onChange={(e) => handleBookingFormChange('specialization', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
                          >
                            <option value="">Select specialization...</option>
                            <option value="Addiction">Addiction</option>
                            <option value="Anxiety">Anxiety</option>
                            <option value="Depression">Depression</option>
                            <option value="Trauma">Trauma</option>
                            <option value="Relationship">Relationship Counseling</option>
                            <option value="Child Psychology">Child Psychology</option>
                            <option value="Family Therapy">Family Therapy</option>
                            <option value="Stress Management">Stress Management</option>
                          </select>
                        </div>
                        <div className="mb-6">
                          <label className="block text-gray-700 font-medium mb-3">
                            Preferred Languages *
                          </label>
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
                            >
                              {bookingForm.languages.length === 0 ? 'Select languages...' : `${bookingForm.languages.length} language(s) selected`}
                            </button>

                            {showLanguageDropdown && (
                              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                {INDIAN_LANGUAGES.map((language) => (
                                  <button
                                    key={language}
                                    type="button"
                                    onClick={() => handleLanguageSelect(language)}
                                    className={`w-full px-4 py-2 text-left hover:bg-teal-50 ${bookingForm.languages.includes(language)
                                      ? 'bg-teal-100 text-teal-700'
                                      : 'text-gray-700'
                                      }`}
                                    disabled={bookingForm.languages.includes(language)}
                                  >
                                    {language}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>

                          {bookingForm.languages.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {bookingForm.languages.map((language) => (
                                <span
                                  key={language}
                                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-teal-100 text-teal-800"
                                >
                                  {language}
                                  <button
                                    type="button"
                                    onClick={() => removeLanguage(language)}
                                    className="ml-2 text-teal-600 hover:text-teal-800"
                                  >
                                    <FaTimes className="w-3 h-3" />
                                  </button>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <label className="block text-gray-700 font-medium mb-3">
                              Preferred Date *
                            </label>
                            <input
                              type="date"
                              value={bookingForm.date}
                              onChange={(e) => handleBookingFormChange('date', e.target.value)}
                              min={new Date().toISOString().split('T')[0]}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-gray-700 font-medium mb-3">
                              Preferred Time *
                            </label>
                            <input
                              type="time"
                              value={bookingForm.time}
                              onChange={(e) => handleBookingFormChange('time', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                        <button
                          onClick={filterTherapists}
                          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                        >
                          Find Available Therapists
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">Available Therapists</h3>
                          <p className="text-gray-600">
                            {filteredTherapists.length} therapist(s) available for {bookingForm.date} at {bookingForm.time}
                          </p>
                        </div>
                        <button
                          onClick={() => setShowResults(false)}
                          className="px-4 py-2 text-teal-600 hover:text-teal-800 font-medium"
                        >
                          ← Modify Search
                        </button>
                      </div>

                      {filteredTherapists.length > 0 ? (
                        <div className="space-y-4">
                          {filteredTherapists.map((therapist) => (
                            <div key={therapist.id} className="border border-gray-200 rounded-xl p-6 hover:border-teal-300 transition-colors">
                              <div className="flex flex-col md:flex-row gap-6">
                                {/* Therapist Image */}
                                <div className="flex-shrink-0 mx-auto md:mx-0">
                                  <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
                                    <Image
                                      src={therapist.image}
                                      alt={therapist.name}
                                      width={80}
                                      height={80}
                                      className="object-cover w-full h-full"
                                    />
                                  </div>
                                </div>

                                {/* Therapist Details */}
                                <div className="flex-1">
                                  <div className="flex flex-col md:flex-row md:justify-between gap-4">
                                    <div className="space-y-3">
                                      <div>
                                        <h4 className="font-bold text-lg text-gray-900">{therapist.name}</h4>
                                        <p className="text-teal-600 font-medium">{therapist.specialization}</p>
                                      </div>

                                      <div className="flex items-center gap-4 text-sm text-gray-600">
                                        <span>{therapist.experience} experience</span>
                                        <div className="flex items-center">
                                          <FaStar className="text-yellow-400 mr-1" />
                                          <span>{therapist.rating}</span>
                                        </div>
                                      </div>

                                      <div className="flex flex-wrap gap-2">
                                        {therapist.languages.filter(lang => bookingForm.languages.includes(lang)).map((language) => (
                                          <span
                                            key={language}
                                            className="px-2 py-1 bg-teal-100 text-teal-800 rounded-full text-xs"
                                          >
                                            {language}
                                          </span>
                                        ))}
                                      </div>

                                      <p className="text-gray-600 text-sm">{therapist.bio}</p>
                                    </div>

                                    {/* Price and Book Button */}
                                    <div className="flex flex-col items-end justify-between">
                                      <button
                                        onClick={() => bookAppointment(therapist)}
                                        className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
                                      >
                                        Book Now
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                            <FaUserMd className="text-2xl text-gray-500" />
                          </div>
                          <h3 className="text-xl font-medium text-gray-900 mb-2">No therapists available</h3>
                          <p className="text-gray-600 mb-6">Try adjusting your search criteria</p>
                          <button
                            onClick={() => setShowResults(false)}
                            className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                          >
                            Modify Search
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ) : activeTab === 'upcoming' ? (
                <div className="space-y-4 md:space-y-6">
                  {appointments.upcoming.length > 0 ? (
                    appointments.upcoming.map((appointment) => (
                      <div key={appointment.id} className="border border-gray-200 rounded-xl p-4 md:p-5 hover:border-teal-300 transition-colors">
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                          {/* Therapist Image */}
                          <div className="flex-shrink-0 mx-auto sm:mx-0">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-gray-200">
                              <Image
                                src={appointment.image}
                                alt={appointment.therapist}
                                width={64}
                                height={64}
                                className="object-cover w-full h-full"
                              />
                            </div>
                          </div>

                          {/* Appointment Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col md:flex-row md:justify-between gap-4">
                              <div className="space-y-2">
                                <h3 className="font-bold text-gray-900 text-base md:text-lg">{appointment.therapist}</h3>

                                <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-4 text-sm text-gray-500">
                                  <div className="flex items-center">
                                    <FaCalendarAlt className="mr-2 text-teal-600 min-w-[16px]" />
                                    <span>{appointment.date}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <FaClock className="mr-2 text-teal-600 min-w-[16px]" />
                                    <span>{appointment.time}</span>
                                  </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-2">
                                  <span className={`px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs font-medium ${appointment.status === 'paid'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                    {appointment.status === 'paid' ? 'Confirmed' : 'Payment Pending'}
                                  </span>
                                  <span className="text-sm text-gray-700">{appointment.amount}</span>
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex flex-col sm:items-end gap-2">
                                <Link
                                  href={appointment.meetLink}
                                  className="flex items-center justify-center px-3 py-1.5 md:px-4 md:py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm md:text-base"
                                >
                                  <FaVideo className="mr-2" />
                                  Join Session
                                </Link>
                                <button className="text-sm text-teal-600 hover:text-teal-800 text-right">
                                  Reschedule
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 md:py-12">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 flex items-center justify-center">
                        <FaCalendarAlt className="text-xl md:text-2xl text-gray-500" />
                      </div>
                      <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-2">No upcoming appointments</h3>
                      <p className="text-gray-600 mb-4 md:mb-6 max-w-md mx-auto">Schedule a session with your therapist to get started</p>
                      <Link
                        href="/therapists"
                        className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm md:text-base"
                      >
                        <FaUserMd className="mr-2" />
                        Find a Therapist
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4 md:space-y-6">
                  {appointments.past.length > 0 ? (
                    appointments.past.map((appointment) => (
                      <div key={appointment.id} className="border border-gray-200 rounded-xl p-4 md:p-5">
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                          {/* Therapist Image */}
                          <div className="flex-shrink-0 mx-auto sm:mx-0">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-gray-200">
                              <Image
                                src={appointment.image}
                                alt={appointment.therapist}
                                width={64}
                                height={64}
                                className="object-cover w-full h-full"
                              />
                            </div>
                          </div>

                          {/* Appointment Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col md:flex-row md:justify-between gap-4">
                              <div className="space-y-2">
                                <h3 className="font-bold text-gray-900 text-base md:text-lg">{appointment.therapist}</h3>

                                <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-4 text-sm text-gray-500">
                                  <div className="flex items-center">
                                    <FaCalendarAlt className="mr-2 text-teal-600 min-w-[16px]" />
                                    <span>{appointment.date}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <FaClock className="mr-2 text-teal-600 min-w-[16px]" />
                                    <span>{appointment.time}</span>
                                  </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-3">
                                  <span className="px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                    Completed
                                  </span>
                                  <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                      <FaStar
                                        key={i}
                                        className={`w-3 h-3 md:w-4 md:h-4 ${i < appointment.rating ? "text-yellow-400" : "text-gray-300"}`}
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex flex-col sm:items-end gap-2">
                                <button className="flex items-center justify-center px-3 py-1.5 md:px-4 md:py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm md:text-base">
                                  <FaHistory className="mr-2" />
                                  View Notes
                                </button>
                                <button className="text-sm text-teal-600 hover:text-teal-800 text-right">
                                  Book Again
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 md:py-12">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 flex items-center justify-center">
                        <FaHistory className="text-xl md:text-2xl text-gray-500" />
                      </div>
                      <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-2">No past appointments</h3>
                      <p className="text-gray-600 max-w-md mx-auto">Your completed therapy sessions will appear here</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default UserProfilePage;