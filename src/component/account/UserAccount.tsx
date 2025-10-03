"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaEdit, FaCalendarAlt, FaClock, FaVideo, FaCamera, FaUserMd, FaPhone, FaTimes, FaEnvelope, FaStar, FaHistory } from 'react-icons/fa';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { getUserDetails, getUserTherapist, updateUserDetails } from '@/store/userSlice';
import { toast } from 'react-toastify';
import { INDIAN_LANGUAGES, TOKEN } from '@/utils/enum';
import { decodeToken } from '@/utils/decodeToken';
import { useRouter } from 'next/navigation';
import { LoadingSpinnerWithOverlay } from '../global/Loading';
import { getInitials } from '@/utils/GetInitials';
import { useRef } from 'react';
import { getTherapistSpecialisationAndTiming, recommendTherapist } from '@/store/therapistSlice';
import { bookAppointmentFunc, getPastAppointmentsApi, getUpComingAppointments } from '@/store/appoinment';
import BookingCalendar from './BookAppointmentPoup';

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
}

interface FilteredTherapist {
  id: string;
  name: string;
  profile_image: string;
  email: string;
  specialization: string[];
  languages: string[];
  academic_background: {
    years_of_experience: string;
    qualification: string[]
  };
  available_slot: {
    from: string;
    to: string;
  };
  session_details: {
    cost: number;
    currency: string;
    duration: number;
  };
  location: {
    city: string;
    country: string;
  };
  score: number;
}

interface TherapistId {
  _id: string;
  name: string;
  profile_image: string;
  session_details: {
    duration: number;
    cost: number;
    currency: string;
  };
}

interface UpcomingAppointment {
  _id: string;
  therapist_id: TherapistId;
  scheduled_at: string;
  appointment_status: 'scheduled' | 'completed';
  meet_link: string;
  is_deleted: boolean
}


const UserProfilePage = () => {
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
  const [therapists, setTherapists] = useState<FilteredTherapist[]>([]);
  const [selectedTherapist, setSelectedTherapist] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState<string>("")

  const [bookingForm, setBookingForm] = useState<BookingForm>({
    specialization: '',
    languages: [],
  });
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [filteredTherapists, setFilteredTherapists] = useState<FilteredTherapist[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [specialization, setSpecialization] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState<UpcomingAppointment[]>([]);
  const [pastAppointments, setPastAppointments] = useState<UpcomingAppointment[]>([]);
  const [timings, setTimings] = useState([]);
  const [bookAgainPopup, setBookAgainPopup] = useState(false);
  const [bookAgainType, setBookAgainType] = useState('');


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const generateSlotsFromIntervals = (intervals: any) => {
    const slots: string[] = [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    intervals.forEach(({ from, to }: any) => {
      const fromHour = parseInt(from.split(':')[0], 10);
      const toHour = parseInt(to.split(':'), 10);

      for (let hour = fromHour; hour < toHour; hour++) {
        // Format hour to HH:mm string, e.g. "09:00", "14:00"
        const slot = hour.toString().padStart(2, '0') + ':00';
        slots.push(slot);
      }
    });

    return slots;
  };

  function handleOpenBookingPopup(therapist: string, type: string, appointmentId?: string) {
    setSelectedTherapist(therapist);
    setBookAgainPopup(true);
    setBookAgainType(type);
    setSelectedAppointment(appointmentId ?? "")
  }

  // Handle language selection
  const handleLanguageSelect = (language: string) => {
    if (!bookingForm.languages.includes(language)) {
      setBookingForm(prev => ({
        ...prev,
        languages: [...prev.languages, language]
      }));
    }
    setShowLanguageDropdown(false);
  };

  const getWeekday = (date: Date) => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[date.getDay()];
  };

  // Remove language
  const removeLanguage = (languageToRemove: string) => {
    setBookingForm(prev => ({
      ...prev,
      languages: prev.languages.filter(lang => lang !== languageToRemove)
    }));
  };

  // Handle form change
  const handleBookingFormChange = (field: string, value: string) => {
    setBookingForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  function handleDateFormate() {
    if (!selectedDate || !selectedTime) {
      toast.error('Please select a date and time.');
      return;
    }
    const local = new Date(selectedDate.getTime());
    const [hhStr, mmStr] = selectedTime.split(':');
    const hh = Number(hhStr);
    const mm = Number(mmStr ?? '0');
    if (Number.isNaN(hh) || Number.isNaN(mm)) {
      toast.error('Invalid time format. Expected "HH:mm".');
      return;
    }
    local.setHours(hh, mm, 0, 0);
    function pad(n: number) {
      return String(n).padStart(2, '0');
    }

    function formatAsISTString(d: Date) {
      const utcMs = d.getTime();
      const istMs = utcMs + (5 * 60 + 30) * 60 * 1000;
      const ist = new Date(istMs);

      const Y = ist.getUTCFullYear();
      const M = pad(ist.getUTCMonth() + 1);
      const D = pad(ist.getUTCDate());
      const H = pad(ist.getUTCHours());
      const Min = pad(ist.getUTCMinutes());
      const S = pad(ist.getUTCSeconds());
      return `${Y}-${M}-${D}T${H}:${Min}:${S}`;
    }
    const istISOish = formatAsISTString(local);
    return istISOish
  }

  async function handleFindTherapists() {
    if (!selectedDate || !selectedTime) {
      toast.error('Please select a date and time.');
      return;
    }

    if (bookingForm.languages.length === 0) {
      toast.error('Please select at least one language.');
      return;
    }

    if (bookingForm.specialization === '') {
      toast.error('Please select a specialization.');
      return;
    }

    const date = handleDateFormate()
    // console.log('IST datetime (ISO-like, no Z):', date)
    const data = {
      preferred_datetime: date,
      language: bookingForm.languages,
      specialization: bookingForm.specialization,
      user_id: userId
    };
    window.scrollTo(0, 0);
    setLoading(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await dispatch(recommendTherapist(data as any) as any);
    if (response?.error) {
      setLoading(false)
      toast.error(response.error.message)
    } else {
      setLoading(false)
      const therapists = response.payload.data.recommendedTherapist;
      const filtered = []
      filtered.push(therapists)
      setFilteredTherapists(filtered);
      setShowResults(true);
    }
  }

  // Generate calendar days
  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(prev => {
      const prevMonthDate = new Date(prev);
      prevMonthDate.setMonth(prevMonthDate.getMonth() - 1);
      return prevMonthDate;
    });
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(prev => {
      const nextMonthDate = new Date(prev);
      nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
      return nextMonthDate;
    });
  };

  // Get month and year string
  const getMonthYearString = () => {
    return currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  const bookAppointment = async (therapist: FilteredTherapist) => {
    if (!selectedDate || !selectedTime) {
      toast.error('Please select a date and time.');
      return;
    }
    const dateObj = new Date(selectedDate);
    const cleanDate = dateObj.toDateString(); // Returns "Mon Aug 25 2025"

    const data = {
      therapist_id: therapist.id,
      user_id: userId,
      scheduled_at: cleanDate + ' ' + selectedTime
    }

    window.scrollTo(0, 0);
    setLoading(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await dispatch(bookAppointmentFunc(data as any) as any);
    if (response?.error) {
      setLoading(false)
      toast.error(response.error.message)
    } else {
      setLoading(false)
      toast.success(`Appointment booked with ${therapist.name}!`);
      setSelectedDate(null);
      setShowResults(false);
      setSelectedTime(null);
      setBookingForm({
        languages: [],
        specialization: ''
      });
      getUserTherapists(userId)
      getSpicialisationAndTiming()
      getUpcomingAppointments(userId)
      getPastAppointments(userId)
    }
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

  async function getSpicialisationAndTiming() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await dispatch(getTherapistSpecialisationAndTiming() as any);
    if (response?.error) {
      setLoading(false)
      toast.error(response.error.message)
    } else {
      setLoading(false)
      setTimings(response.payload.data.availability)
      setSpecialization(response.payload.data.specializations)
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

  async function getUpcomingAppointments(id: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await dispatch(getUpComingAppointments(id as any) as any);
    if (response?.error) {
      setLoading(false)
      toast.error(response.error.message)
    } else {
      setLoading(false)
      setUpcomingAppointments(response.payload.data.appointments)
    }
  }

  async function getPastAppointments(id: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await dispatch(getPastAppointmentsApi(id as any) as any);
    if (response?.error) {
      setLoading(false)
      toast.error(response.error.message)
    } else {
      setLoading(false)
      // console.log(response.payload.data.appointments)
      setPastAppointments(response.payload.data.appointments)
    }
  }

  async function getUserTherapists(id: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await dispatch(getUserTherapist(id as any) as any);
    if (response?.error) {
      setLoading(false)
      toast.error(response.error.message)
    } else {
      setLoading(false)
      // console.log(response.payload.data.therapists)
      setTherapists(response.payload.data.therapists)
    }
  }

  function handlePopupClose() {
    setBookAgainPopup(false)
    setSelectedTherapist('')
    setBookAgainType('')
    setSelectedAppointment('')
  }
  useEffect(() => {
    if (storedToken !== null) {
      const decodedToken = decodeToken(storedToken as string);
      if (decodedToken?.userId) {
        window.scrollTo(0, 0);
        getUser(decodedToken.userId._id)
        setUserId(decodedToken.userId._id)
        getUserTherapists(decodedToken.userId._id)
        getSpicialisationAndTiming()
        getUpcomingAppointments(decodedToken.userId._id)
        getPastAppointments(decodedToken.userId._id)
      } else {
        router.push('/');
      }
    } else {
      router.push('/');
    }
  }, [storedToken, router, bookAgainPopup, showResults]);


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

        {
          bookAgainPopup && <BookingCalendar userId={userId} id={selectedTherapist} onClose={handlePopupClose} type={bookAgainType} appoinmentId={selectedAppointment} />
        }

        <div className='w-full h-auto flex flex-col gap-5 pb-10'>
          {/* Profile Card */}
          <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row items-center md:items-start gap-8 p-8 border border-teal-200">
            {/* Profile Image */}
            <div className="relative flex-shrink-0">
              <div className="w-32 h-32 rounded-full border-4 border-teal-400 overflow-hidden bg-white flex items-center justify-center shadow-lg ring-2 ring-teal-200 ring-opacity-50">
                {previewUrl ? (
                  <Image
                    src={previewUrl}
                    alt="Profile preview"
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                  />
                ) : user?.profile_image ? (
                  <Image
                    src={user.profile_image}
                    alt="Profile"
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="text-teal-700 font-bold text-4xl uppercase">
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
                  className="absolute -bottom-2 -right-2 bg-teal-500 rounded-full p-3 text-white hover:bg-teal-600 shadow-lg transition-all duration-300 hover:scale-110"
                  aria-label="Edit profile image"
                >
                  <FaCamera className="text-lg" />
                </button>
              )}
            </div>

            {/* Profile Details */}
            <div className="flex-1 flex flex-col justify-center text-center md:text-left space-y-4">
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={tempUserData?.name}
                  onChange={handleInputChange}
                  className="text-3xl font-bold text-teal-800 mb-1 bg-teal-50 rounded-xl px-5 py-3 w-full max-w-md mx-auto md:mx-0 border-2 border-teal-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none transition-colors"
                  placeholder="Your Name"
                  aria-label="Name"
                />
              ) : (
                <h2 className="text-3xl font-bold text-teal-800 mb-1">{user?.name}</h2>
              )}

              {isEditing ? (
                <textarea
                  name="bio"
                  value={tempUserData?.bio}
                  onChange={handleInputChange}
                  placeholder="Write a short bio about yourself to help others get to know you."
                  rows={3}
                  className="text-teal-700 resize-none bg-teal-50 rounded-xl px-5 py-3 w-full max-w-xl mb-2 mx-auto md:mx-0 border-2 border-teal-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none transition-colors"
                  aria-label="Bio"
                />
              ) : (
                <p className="text-teal-700 mb-4 max-w-xl mx-auto md:mx-0 leading-relaxed">
                  {user?.bio || "Write a short bio about yourself to help others get to know you."}
                </p>
              )}

              {/* Contact Info */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start text-teal-700">
                <div className="flex items-center justify-center md:justify-start">
                  <div className="bg-teal-100 p-3 rounded-full mr-3">
                    <FaEnvelope className="text-teal-600" aria-hidden="true" />
                  </div>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={tempUserData?.email}
                      onChange={handleInputChange}
                      className="bg-teal-50 text-teal-900 rounded-lg px-4 py-2 border-2 border-teal-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none transition-colors"
                      placeholder="Email"
                      aria-label="Email"
                    />
                  ) : (
                    <span className="font-medium">{user?.email}</span>
                  )}
                </div>
                <div className="flex items-center justify-center md:justify-start">
                  <div className="bg-teal-100 p-3 rounded-full mr-3">
                    <FaPhone className="text-teal-600" aria-hidden="true" />
                  </div>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      minLength={0}
                      maxLength={10}
                      value={tempUserData?.phone}
                      onChange={handleInputChange}
                      placeholder="Add a phone number."
                      className="bg-teal-50 text-teal-900 rounded-lg px-4 py-2 border-2 border-teal-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none transition-colors"
                      aria-label="Phone number"
                    />
                  ) : (
                    <span className="font-medium">{user?.phone || 'Add a phone number.'}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Book Appoinment Form */}
          <div className='w-full h-auto'>
            <div className="space-y-6">
              {!showResults ? (
                <>
                  {/* Auto Matcher Card */}
                  <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                    {/* Teal Header */}
                    <div className="bg-teal-500 px-6 py-4">
                      <h3 className="text-xl font-bold text-white">Auto Matcher</h3>
                      <p className="text-white text-sm opacity-90">Find the perfect counsellor based on your preferences</p>
                    </div>

                    {/* Form Content */}
                    <div className="p-6 space-y-6">
                      {/* Specialization */}
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Specialization
                        </label>
                        <div className="relative">
                          <select
                            value={bookingForm.specialization}
                            onChange={(e) => handleBookingFormChange('specialization', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent bg-white text-gray-800 appearance-none"
                          >
                            <option value="">Select your concern</option>
                            {specialization.map((spec, index) => (
                              <option key={index} value={spec}>{spec}</option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Preferred Language */}
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Preferred Language
                        </label>
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent bg-white flex justify-between items-center"
                          >
                            <span className="text-gray-800">
                              {bookingForm.languages.length === 0
                                ? 'Select language'
                                : `${bookingForm.languages.length} language(s) selected`}
                            </span>
                            <span className={`transform transition-transform ${showLanguageDropdown ? 'rotate-180' : ''} text-gray-400`}>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </span>
                          </button>

                          {showLanguageDropdown && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                              {INDIAN_LANGUAGES.map((language, index) => (
                                <button
                                  key={index}
                                  type="button"
                                  onClick={() => handleLanguageSelect(language.code)}
                                  className={`w-full px-4 py-2 text-left transition-colors ${bookingForm.languages.includes(language.code)
                                    ? 'bg-teal-100 text-teal-700'
                                    : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                  {language.name}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        {bookingForm.languages.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {bookingForm.languages.map((language) => (
                              <span
                                key={language}
                                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-teal-100 text-teal-800"
                              >
                                {INDIAN_LANGUAGES.find((lang) => lang.code === language)?.name}
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

                      {/* Preferred Date & Time */}
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Preferred Date & Time
                        </label>

                        <div className="w-full h-auto flex flex-col xl:flex-row xl:gap-6">
                          {/* Calendar */}
                          <div className="bg-gray-50 w-full xl:w-[50%] rounded-lg p-4 mb-4 xl:mb-0">
                            {/* Calendar Header */}
                            <div className="flex items-center justify-between mb-4">
                              <button
                                onClick={prevMonth}
                                className="p-2 rounded-full hover:bg-white text-gray-600 transition-colors"
                              >
                                <FaChevronLeft className="w-4 h-4" />
                              </button>
                              <h4 className="font-semibold text-gray-900 text-base">
                                {getMonthYearString()}
                              </h4>
                              <button
                                onClick={nextMonth}
                                className="p-2 rounded-full hover:bg-white text-gray-600 transition-colors"
                              >
                                <FaChevronRight className="w-4 h-4" />
                              </button>
                            </div>

                            {/* Weekday Headers */}
                            <div className="grid grid-cols-7 gap-1 mb-2">
                              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                                <div key={day} className="text-center text-xs font-medium text-gray-600 py-2">
                                  {day}
                                </div>
                              ))}
                            </div>

                            {/* Calendar Days */}
                            <div className="grid grid-cols-7 gap-1">
                              {getDaysInMonth().map((day, index) => {
                                if (!day) {
                                  return <div key={`empty-${index}`} className="p-2"></div>;
                                }

                                const today = new Date();
                                today.setHours(0, 0, 0, 0);
                                const isToday = today.toDateString() === day.toDateString();
                                const isSelected = selectedDate && selectedDate.toDateString() === day.toDateString();
                                const isPast = day.getTime() < today.getTime();

                                return (
                                  <button
                                    key={day.getDate()}
                                    className={`p-2 text-center text-sm rounded-lg transition-colors min-h-[36px] ${isSelected
                                      ? 'bg-teal-500 text-white font-medium'
                                      : isPast
                                        ? 'text-gray-300 cursor-not-allowed'
                                        : isToday
                                          ? 'bg-teal-100 text-teal-700 font-medium border-2 border-teal-500'
                                          : 'text-gray-700 hover:bg-white hover:shadow-sm'
                                      }`}
                                    onClick={() => !isPast && setSelectedDate(day)}
                                    disabled={isPast}
                                  >
                                    {day.getDate()}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Available Time Slots */}
                          {selectedDate && (
                            <div className="w-full xl:w-[45%]">
                              <p className="text-sm font-medium text-gray-700 mb-3">
                                Available time slots ({selectedDate.toLocaleDateString('en-US', {
                                  weekday: 'short',
                                  month: 'short',
                                  day: 'numeric'
                                })})
                              </p>

                              <div className="bg-white rounded-lg p-4 border border-gray-200">
                                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-2 gap-3">
                                  {(() => {
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    const weekday: any = getWeekday(selectedDate);
                                    const availableIntervals = timings[weekday] || [];
                                    const availableSlots = generateSlotsFromIntervals(availableIntervals);

                                    return availableSlots.length > 0 ? (
                                      availableSlots.map(time => {
                                        // const [hours, minutes] = time.split(':');
                                        // const nextHour = (parseInt(hours) + 1).toString().padStart(2, '0');
                                        // const timeRange = `${time} - ${nextHour}:${minutes}`;

                                        const [hours, minutes] = time.split(':');
                                        const nextHour = (parseInt(hours) + 1).toString().padStart(2, '0');
                                        const timeRange = `${time} - ${nextHour}:${minutes}`;

                                        // ✅ Check if this slot conflicts with upcoming appointments
                                        const isAlreadyBooked = upcomingAppointments.some(appt => {
                                          const apptDate = new Date(appt.scheduled_at);

                                          // Extract the time in HH:mm format
                                          const apptTime = apptDate.toTimeString().slice(0, 5); // e.g. "15:00"

                                          // Extract just the date (without time) to compare
                                          const apptDateOnly = apptDate.toDateString();
                                          const selectedDateOnly = new Date(selectedDate).toDateString();

                                          return (
                                            apptDateOnly === selectedDateOnly && // same day
                                            apptTime === time &&                 // same start time
                                            appt.appointment_status === "scheduled" &&
                                            !appt.is_deleted
                                          );
                                        });
                                        return (
                                          <button
                                            key={time}
                                            disabled={isAlreadyBooked}
                                            className={`py-3 px-4 text-sm font-medium rounded-lg transition-all duration-200 border-2 
          ${isAlreadyBooked
                                                ? 'bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed'
                                                : selectedTime === time
                                                  ? 'bg-teal-500 border-teal-500 text-white shadow-md transform scale-105'
                                                  : 'bg-white border-gray-300 text-gray-700 hover:bg-teal-50 hover:border-teal-300 hover:shadow-sm'
                                              }`}
                                            onClick={() => !isAlreadyBooked && setSelectedTime(time)}
                                          >
                                            {timeRange}
                                          </button>
                                        );

                                        // return (
                                        //   <button
                                        //     key={time}
                                        //     className={`py-3 px-4 text-sm font-medium rounded-lg transition-all duration-200 border-2 ${selectedTime === time
                                        //       ? 'bg-teal-500 border-teal-500 text-white shadow-md transform scale-105'
                                        //       : 'bg-white border-gray-300 text-gray-700 hover:bg-teal-50 hover:border-teal-300 hover:shadow-sm'
                                        //       }`}
                                        //     onClick={() => setSelectedTime(time)}
                                        //   >
                                        //     {timeRange}
                                        //   </button>
                                        // );
                                      })
                                    ) : (
                                      <div className="col-span-2 sm:col-span-3 xl:col-span-2 text-center text-gray-500 text-sm py-8 bg-gray-50 rounded-lg">
                                        <FaClock className="mx-auto mb-2 text-gray-400 text-lg" />
                                        <p>No available time slots for this day</p>
                                      </div>
                                    );
                                  })()}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                      </div>

                      <p className="text-sm font-medium text-gray-700">
                        <span className="font-semibold text-[#00bba7]">Note:</span> We protect your privacy like it’s our own.
                      </p>

                      {/* Find My Match Button */}
                      <button
                        onClick={handleFindTherapists}
                        className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                      >
                        Find My Match
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Results Section  */}
                  <div className="flex items-center justify-between mb-6 ">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Available Therapists</h3>
                      <p className="text-gray-600">
                        Therapists available for {selectedDate ? selectedDate.toLocaleDateString() : ''} at {selectedTime}
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
                    <div className="space-y-4 bg-white">
                      {filteredTherapists.map((therapist) => (
                        <div
                          key={therapist.id}
                          className="border border-gray-200 rounded-xl p-6 hover:border-teal-300 transition-colors"
                        >
                          <div className="flex flex-col md:flex-row gap-6">

                            {/* Therapist Image */}
                            <div className="flex-shrink-0 mx-auto md:mx-0">
                              <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
                                <Image
                                  src={therapist?.profile_image}
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
                                  {/* Name / Specializations */}
                                  <div>
                                    <h4 className="font-bold text-lg text-gray-900">{therapist?.name}</h4>
                                    <p className="text-teal-600 font-medium">
                                      {therapist?.specialization.join(", ")}
                                    </p>
                                  </div>

                                  {/* Location */}
                                  <p className="text-sm text-gray-600">
                                    {therapist?.location.city}, {therapist?.location.country}
                                  </p>

                                  {/* Available slot */}
                                  <p className="text-sm text-gray-600">
                                    Available: {therapist?.available_slot?.from} - {therapist?.available_slot?.to}
                                  </p>

                                  {/* Languages */}
                                  <div className="flex flex-wrap gap-2">
                                    {therapist?.languages.map((language) => (
                                      <span
                                        key={language}
                                        className="px-2 py-1 bg-teal-100 text-teal-800 rounded-full text-xs"
                                      >
                                        {language}
                                      </span>
                                    ))}
                                  </div>

                                  {/* Score Rating */}
                                  <div className="flex items-center text-gray-600 text-sm">
                                    <FaStar className="text-yellow-400 mr-1" />
                                    <span>{therapist.score}</span>
                                  </div>
                                </div>

                                {/* Price and Book Button */}
                                <div className="flex flex-col items-end justify-between">
                                  <p className="text-gray-900 font-semibold">
                                    {therapist.session_details.currency}{therapist.session_details.cost} / {therapist.session_details.duration} min
                                  </p>
                                  <button
                                    onClick={() => bookAppointment(therapist)}
                                    className="px-6 py-2 mt-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
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
          </div>
          {/* My Therapists, Past Appointments and Upcoming Appointments */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {/* My Therapists */}
            <div className="bg-white rounded-2xl shadow-md h-auto max-h-[700px] p-4 md:p-6 md:col-span-2 xl:col-span-1">
              <div className="flex justify-between items-center mb-4 md:mb-6">
                <h2 className="text-lg md:text-xl font-bold text-gray-900">My Therapists</h2>
                <span className="bg-teal-100 text-teal-800 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm">
                  {therapists.length} therapists
                </span>
              </div>

              <div className="space-y-4 md:space-y-5 overflow-y-auto custom-scrollbar" style={{ 
                maxHeight: '600px'
              }}>
                {
                  therapists.length > 0
                    ? (
                      therapists.map((therapist, index) => (
                        <div
                          key={index}
                          className="flex items-center border-b border-gray-100 pb-4 md:pb-6 last:border-0 last:pb-0"
                        >
                          {/* Profile Image */}
                          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-teal-500 overflow-hidden bg-gray-200 mr-3 md:mr-4 flex-shrink-0">
                            <Image
                              src={therapist.profile_image}
                              alt={therapist.name}
                              width={64}
                              height={64}
                              className="object-cover w-full h-full"
                            />
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-gray-900 text-sm md:text-base truncate">
                              {therapist.name}
                            </h3>
                            <p className="text-xs md:text-sm text-teal-600 truncate">
                              {therapist.specialization.join(", ")}
                            </p>
                            <p className="text-xs md:text-sm text-gray-500">
                              {therapist.location.city}, {therapist.location.country}
                            </p>
                            <p className="text-xs md:text-sm text-gray-500">
                              {therapist.academic_background.years_of_experience}+ yrs experience
                            </p>
                          </div>
                        </div>
                      ))
                    )
                    : (
                      <div className="text-center py-6 md:py-8">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 flex items-center justify-center">
                          <FaHistory className="text-lg md:text-2xl text-gray-500" />
                        </div>
                        <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2">No Therapists</h3>
                      </div>
                    )
                }
              </div>

            </div>

            {/* Upcoming Appointments */}
            <div className="bg-white rounded-2xl shadow-md h-auto max-h-[700px] p-4 md:p-6 md:col-span-2 xl:col-span-2">
              <div className="flex justify-between items-center mb-4 md:mb-6">
                <h2 className="text-lg md:text-xl font-bold text-gray-900">Upcoming Appointments</h2>
                <span className="bg-teal-100 text-teal-800 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm">
                  {upcomingAppointments.length} appointments
                </span>
              </div>

              <div className="space-y-4 md:space-y-6 overflow-y-auto custom-scrollbar" style={{
                maxHeight: '600px'
              }}>
                {upcomingAppointments?.length > 0 ? (
                  upcomingAppointments?.map((appointment: UpcomingAppointment) => (
                    <div key={appointment._id} className="flex items-center border-b border-gray-100 pb-4 md:pb-6 last:border-0 last:pb-0">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-teal-500 overflow-hidden bg-gray-200 mr-3 md:mr-4 flex-shrink-0">
                        <Image
                          src={appointment.therapist_id.profile_image}
                          alt={appointment.therapist_id.name}
                          width={64}
                          height={64}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 text-sm md:text-base truncate">
                          {appointment.therapist_id.name}
                        </h3>
                        <div className="flex flex-col sm:flex-row sm:items-center text-xs md:text-sm text-gray-500 mt-1 gap-1 sm:gap-3">
                          <div className="flex items-center">
                            <FaCalendarAlt className="mr-1 text-teal-600 w-3 h-3" />
                            <span className="truncate">
                              {new Date(appointment.scheduled_at).toLocaleDateString('en-US', {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <FaClock className="mr-1 text-teal-600 w-3 h-3" />
                            <span>
                              {new Date(appointment.scheduled_at).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true
                              })}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center mt-2 gap-1 sm:gap-2">
                          <span className={`px-2 py-0.5 capitalize rounded-full text-xs font-medium inline-block ${appointment.appointment_status === 'scheduled'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                            }`}>
                            {appointment.appointment_status}
                          </span>
                          <span className="text-xs md:text-sm text-gray-600">
                            {appointment.therapist_id.session_details.duration} min
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 md:gap-2 flex-shrink-0">
                        <Link
                          href={appointment.meet_link}
                          className="flex items-center px-2 md:px-3 py-1 md:py-1.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-xs md:text-sm"
                        >
                          <FaVideo className="mr-1 w-3 h-3" />
                          Join
                        </Link>
                        <button onClick={() => handleOpenBookingPopup(appointment.therapist_id._id, 'edit', appointment._id)} className="text-xs text-teal-600 hover:text-teal-800 cursor-pointer">
                          Reschedule
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 md:py-8">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 flex items-center justify-center">
                      <FaCalendarAlt className="text-lg md:text-2xl text-gray-500" />
                    </div>
                    <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2">No upcoming appointments</h3>
                    <p className="text-gray-600 mb-3 md:mb-4 text-sm md:text-base">Schedule a session with your therapist to get started</p>
                  </div>
                )}
              </div>

            </div>

            {/* Past Appointments */}
            <div className="bg-white col-span-1 h-auto max-h-[700px] md:col-span-2 xl:col-span-3 rounded-2xl shadow-md p-4 md:p-6">
              <div className="flex justify-between items-center mb-4 md:mb-6">
                <h2 className="text-lg md:text-xl font-bold text-gray-900">Past Appointments</h2>
                <span className="bg-teal-100 text-teal-800 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm">
                  {pastAppointments?.length} completed
                </span>
              </div>

              <div className="space-y-4 md:space-y-6 overflow-y-auto custom-scrollbar" style={{
                maxHeight: '600px'
              }}>
                {pastAppointments?.length > 0 ? (
                  pastAppointments?.map((appointment: UpcomingAppointment) => (
                    <div key={appointment._id} className="flex items-center border-b border-gray-100 pb-4 md:pb-6 last:border-0 last:pb-0">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-teal-500 overflow-hidden bg-gray-200 mr-3 md:mr-4 flex-shrink-0">
                        <Image
                          src={appointment.therapist_id.profile_image}
                          alt={appointment.therapist_id.name}
                          width={64}
                          height={64}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 text-sm md:text-base truncate">
                          {appointment.therapist_id.name}
                        </h3>
                        <div className="flex flex-col sm:flex-row sm:items-center text-xs md:text-sm text-gray-500 mt-1 gap-1 sm:gap-3">
                          <div className="flex items-center">
                            <FaCalendarAlt className="mr-1 text-teal-600 w-3 h-3" />
                            <span className="truncate">
                              {new Date(appointment.scheduled_at).toLocaleDateString('en-US', {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <FaClock className="mr-1 text-teal-600 w-3 h-3" />
                            <span>
                              {new Date(appointment.scheduled_at).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true
                              })}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center mt-2 gap-2 md:gap-3">
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            Completed
                          </span>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <FaStar
                                key={i}
                                className={`w-3 h-3 ${i < 4 ? "text-yellow-400" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                          <span className="text-xs md:text-sm text-gray-600">
                            {appointment.therapist_id.session_details.currency}{appointment.therapist_id.session_details.cost}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 md:gap-2 flex-shrink-0">
                        <button onClick={() => handleOpenBookingPopup(appointment.therapist_id._id, 'book')} className="text-xs text-teal-600 hover:text-teal-800">
                          Book Again
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 md:py-8">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 flex items-center justify-center">
                      <FaHistory className="text-lg md:text-2xl text-gray-500" />
                    </div>
                    <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2">No past appointments</h3>
                    <p className="text-gray-600 text-sm md:text-base">Your completed therapy sessions will appear here</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div >
  );
};

export default UserProfilePage;