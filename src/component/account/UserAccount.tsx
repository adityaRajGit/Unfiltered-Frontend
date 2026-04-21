"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaEdit, FaCalendarAlt, FaClock, FaVideo, FaCamera, FaUserMd, FaPhone, FaTimes, FaEnvelope, FaStar, FaHistory, FaSearch } from 'react-icons/fa';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { getUserDetails, getUserTherapist, updateUserDetails } from '@/store/userSlice';
import { toast } from 'react-toastify';
import { INDIAN_LANGUAGES, TOKEN } from '@/utils/enum';
import { decodeToken } from '@/utils/decodeToken';
import { useRouter } from 'next/navigation';
import { LoadingSpinnerWithoutOverlay, LoadingSpinnerWithOverlay } from '../global/Loading';
import { getInitials } from '@/utils/GetInitials';
import { useRef } from 'react';
import { getAllTherapist, getAllTherapistListWithAvailablity, getTherapistSpecialisationAndTiming, recommendTherapist } from '@/store/therapistSlice';
import { bookAppointmentFunc, getPastAppointmentsApi, getUpComingAppointments, updateAppointmentStatussApi } from '@/store/appoinment';
import BookingCalendar from './BookAppointmentPoup';
import NoActivePackage from './NoActivePackage';
import { NotesIcon } from './AppointmentList';
import { NotesModal } from './NotesModal';
import SessionCompletionPopup from './SessionCompletionPopup';
import { TargetIcon } from 'lucide-react';
import { UserGoalsModal } from './UserGoalsPopup';
import { sendOtp, verifyOtp } from '@/store/otpSlice';

const BIO_LIMIT = 1000;

interface User {
  name: string;
  email: string;
  phone: string;
  profile_image: string;
  role: string;
  sessions_balance: number;
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
  // session_details: {
  //   cost: number;
  //   currency: string;
  //   duration: number;
  // };
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
  // session_details: {
  //   duration: number;
  //   cost: number;
  //   currency: string;
  // };
}

interface UpcomingAppointment {
  _id: string;
  therapist_id: TherapistId;
  scheduled_at: string;
  appointment_status: 'scheduled' | 'completed';
  meet_link: string;
  is_deleted: boolean;
  is_notes: boolean;
}

interface PopupItem {
  id: string;
  name: string;
  scheduled_at: string | Date;
}

interface Pagination {
  pageNum: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
}

interface TimeSlot {
  from: string; // format "HH:mm"
  to: string;   // format "HH:mm"
}

interface Availability {
  sunday: TimeSlot[];
  monday: TimeSlot[];
  tuesday: TimeSlot[];
  wednesday: TimeSlot[];
  thursday: TimeSlot[];
  friday: TimeSlot[];
  saturday: TimeSlot[];
}

interface AcademicBackground {
  qualification: string[];
  years_of_experience: number;
}

interface Location {
  city: string;
  country: string;
}

export interface Therapist {
  _id: string;
  name: string;
  profile_image: string;
  academic_background: AcademicBackground;
  specialization: string[];
  location: Location;
  availability: Availability;
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
  const [selectedAppointmentForGoals, setSelectedAppointmentForGoals] = useState<UpcomingAppointment | null>(null)
  const [popupData, setPopupData] = useState<PopupItem[]>([]);

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
  const [selectedAppointmentForNotes, setSelectedAppointmentForNotes] = useState<UpcomingAppointment | null>(null);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [isGoalsModalOpen, setIsGoalsModalOpen] = useState(false);
  const [pagination, setPagination] = useState<Pagination>({
    pageNum: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0
  })
  const [therapistLoading, setTherapistLoading] = useState(true);
  const [searchTherapist, setSearchTherapist] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [therapistList, setTherapistList] = useState<Therapist[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'auto'>('all');
  const [bookTherapistPopup, setBookTherapistPopup] = useState(false);
  const [selectedTherapistForBooking, setSelectedTherapistForBooking] = useState<Therapist | null>(null);
  const [expandedSlots, setExpandedSlots] = useState({});

  const [emailOtpPopup, setEmailOtpPopup] = useState(false);
  const [otp, setOtp] = useState('');
  const [pendingNewEmail, setPendingNewEmail] = useState<string | null>(null);
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);


  const today = new Date();

  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  // Start boundary (current month)
  const minDate = new Date(today.getFullYear(), today.getMonth(), 1);

  // End boundary (after 2 months)
  const maxDate = new Date(today.getFullYear(), today.getMonth() + 2, 1);

  const toggleAvailability = (therapistId: string) => {
    // @ts-ignore
    setExpandedSlots(prev => ({ ...prev, [therapistId]: !prev[therapistId] }));
  };

  // Helper to flatten availability slots
  const getFlattenedSlots = (availability: any) => {
    if (!availability) return [];
    const slots = [];
    for (const [day, daySlots] of Object.entries(availability)) {
      // @ts-ignore
      if (!daySlots || daySlots.length === 0) continue;
      // @ts-ignore
      for (const slot of daySlots) {
        slots.push({
          label: `${day.charAt(0).toUpperCase() + day.slice(1)} ${slot.from}–${slot.to}`,
          day,
          from: slot.from,
          to: slot.to
        });
      }
    }
    return slots;
  };

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


  const handleOpenNotes = (appointment: UpcomingAppointment) => {
    setSelectedAppointmentForNotes(appointment);
    setIsNotesModalOpen(true);
  };

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
      if (therapists !== null) {
        filtered.push(therapists)
        setFilteredTherapists(filtered);
        setShowResults(true);
      } else {
        toast.error('No therapist found for this criteria !!')
      }
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

  const prevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() - 1);

    if (newDate >= minDate) {
      setCurrentDate(newDate);
      setCurrentMonth(prev => {
        const prevMonthDate = new Date(prev);
        prevMonthDate.setMonth(prevMonthDate.getMonth() - 1);
        return prevMonthDate;
      });
    }
  };

  const nextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + 1);

    if (newDate <= maxDate) {
      setCurrentDate(newDate);
      setCurrentMonth(prev => {
        const nextMonthDate = new Date(prev);
        nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
        return nextMonthDate;
      });
    }
  };

  // Get month and year string
  const getMonthYearString = () => {
    return currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  const bookAppointment = async (therapist: FilteredTherapist | Therapist) => {
    if (!selectedDate || !selectedTime) {
      toast.error('Please select a date and time.');
      return;
    }
    const dateObj = new Date(selectedDate);

    const istDate = dateObj.toLocaleDateString('en-IN', {
      timeZone: 'Asia/Kolkata',
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    const data = {
      therapist_id: "id" in therapist ? therapist.id : therapist._id,
      user_id: userId,
      scheduled_at: istDate + ' ' + selectedTime
    };

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
      setSelectedTherapistForBooking(null);
      setBookTherapistPopup(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (!tempUserData) return;

    //  Bio limit check
    if (name === "bio" && value.length > BIO_LIMIT) {
      toast.dismiss(); // prevent stacking
      toast.error(`Bio cannot exceed ${BIO_LIMIT} characters`);
      return;
    }

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
        formData.append('email', tempUserData.email || pendingNewEmail || '');
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
      // console.log(response.payload.data.user)
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

  const formatTime = (time: string) => {
    if (time === "24:00") return "12:00 AM";

    const [hour, minute] = time.split(':');
    let h = parseInt(hour);

    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;

    return `${h}:${minute} ${ampm}`;
  };

  const handleConfirm = async () => {
    const id = popupData[0].id;
    const formData = {
      id,
      payload: {
        role: 'user',
        completed: true
      }
    }
    setLoading(true)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await dispatch(updateAppointmentStatussApi(formData as any) as any);
    if (response?.error) {
      setLoading(false)
      toast.error(response.error.message)
    } else {
      setLoading(false)
      setPopupData(prev => prev.slice(1));
      getPastAppointments(userId)
    }
  };

  const handleCancel = async () => {
    const id = popupData[0].id;
    const formData = {
      id,
      payload: {
        role: 'user',
        completed: false
      }
    }
    setLoading(true)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await dispatch(updateAppointmentStatussApi(formData as any) as any);
    if (response?.error) {
      setLoading(false)
      toast.error(response.error.message)
    } else {
      setLoading(false)
      setPopupData(prev => prev.slice(1));
      getPastAppointments(userId)
    }
  };

  const handleOpenGoals = (appointment: UpcomingAppointment) => {
    setSelectedAppointmentForGoals(appointment);
    setIsGoalsModalOpen(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function getScheduledAppointments(arr: any) {
    if (!Array.isArray(arr)) return [];

    const today = new Date();
    const todayStr = today.toISOString().split("T")[0]; // YYYY-MM-DD

    return arr
      .filter(item => {
        if (item.appointment_status !== "scheduled") return false;
        if (item.user_completed) return false;

        const updatedAt = new Date(item.updated_at);
        const updatedAtStr = updatedAt.toISOString().split("T")[0];

        return updatedAtStr !== todayStr; // not today's date
      })
      .map(item => ({
        id: item._id,
        name: item.therapist_id?.name || "",
        scheduled_at: item.scheduled_at
      }));
  }

  const handleSaveEmail = async () => {
    setLoading(true);
    const newEmail = tempUserData?.email?.trim();

    toast.dismiss(); // Dismiss any existing toasts

    if (tempUserData?.email === user?.email && tempUserData?.name === user?.name && tempUserData?.phone === user?.phone && tempUserData?.bio === user?.bio && !file) {
      toast.info('No changes detected');
      setLoading(false);
      setIsEditing(false);
      return;
    }

    if (!newEmail) {
      toast.error('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    if (!tempUserData?.name?.trim()) {
      toast.error('Name is required');
      setLoading(false);
      return
    }

    const currentEmail = user?.email;

    // No change → do nothing or just exit edit mode
    if (newEmail === currentEmail) {
      setIsEditing(false);
      await updateProfile();
      return;
    }

    // Email changed → start OTP verification
    setPendingNewEmail(newEmail);
    await sendOtpForNewEmail(newEmail);
  };

  const sendOtpForNewEmail = async (email: string) => {
    setIsUpdatingEmail(true);
    try {
      const response = await dispatch(sendOtp({ email: email } as any) as any);
      if (response?.error) {
        toast.error(response.error.message);
      } else {
        toast.success(`Verification code sent to ${email}`);
        setEmailOtpPopup(true);
      }
    } catch (err) {
      toast.error('Failed to send OTP. Please try again.');
    } finally {
      setIsUpdatingEmail(false);
      setLoading(false);
    }
  };

  const verifyEmailOtpAndUpdate = async () => {
    if (!pendingNewEmail) return;

    setIsUpdatingEmail(true);
    try {
      const data = {
        email: pendingNewEmail,
        otp
      }
      const response = await dispatch(verifyOtp(data as any) as any);
      if (response?.error) {
        toast.error(response.error.message);
        setOtp('');
        return;
      }
      setTempUserData(prev => prev ? { ...prev, email: pendingNewEmail } : prev);
      await updateProfile();
      setEmailOtpPopup(false);
      setOtp('');
      setPendingNewEmail(null);
    } catch (err) {
      toast.error('Verification failed. Please try again.');
    } finally {
      setIsUpdatingEmail(false);
    }
  };

  const fetchAllTherapists = async () => {
    setTherapistLoading(true);
    try {
      const params = {
        pageNum: pagination.pageNum,
        pageSize: pagination.pageSize,
        filters: {}
      };

      if (debouncedSearch.trim() !== "") {
        params.filters = {
          $or: [
            {
              name: { $regex: debouncedSearch, $options: "i" }, // search by name
            },
            {
              specialization: {
                $elemMatch: {
                  $regex: debouncedSearch,
                  $options: "i",
                },
              },
            },
          ],
        };
      }


      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await dispatch(getAllTherapistListWithAvailablity(params as any) as any);

      if (response?.error) {
        toast.error(response.error.message);
      } else if (response.payload?.data) {
        console.log(response.payload.data)
        setTherapistList(response.payload.data.therapists);
        const therapistCount = response.payload.data.therapistCount;
        const totalPages = Math.ceil(therapistCount / pagination.pageSize);

        setPagination(prev => ({
          ...prev,
          totalPages,
          totalItems: therapistCount
        }));
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch therapists");
    } finally {
      setTherapistLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTherapist);
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [searchTherapist]);

  useEffect(() => {
    fetchAllTherapists()
  }, [pagination.pageNum, debouncedSearch])

  async function getPastAppointments(id: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await dispatch(getPastAppointmentsApi(id as any) as any);
    if (response?.error) {
      setLoading(false)
      toast.error(response.error.message)
    } else {
      setLoading(false)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result: any = getScheduledAppointments(response.payload.data.appointments);
      setPopupData(result)
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

  const currentPopup = popupData[0];

  if (loading) {
    return (
      <div className='min-h-screen'>
        <LoadingSpinnerWithOverlay />
      </div>
    )
  }

  const isPrevDisabled = currentDate <= minDate;
  const isNextDisabled = currentDate >= maxDate;

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">My Profile</h1>
          {isEditing ? (
            <div className="flex space-x-3">
              <button
                onClick={() => { setIsEditing(false), setTempUserData(user) }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEmail}
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
          popupData.length === 0
            ? null
            : <SessionCompletionPopup name={currentPopup.name} date={currentPopup.scheduled_at} onConfirm={handleConfirm} onCancel={handleCancel} />
        }

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
                  placeholder="Your Name*"
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
                      placeholder="Email*"
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

          <div className="relative w-full h-auto flex gap-3 p-1 bg-gray-100 rounded-full">
            {/* Sliding background pill */}
            <div
              className={`absolute top-1 bottom-1 w-[calc(50%-0.375rem)] rounded-full bg-[#00BBA7] transition-all duration-300 ease-in-out ${activeTab === 'all' ? 'left-1' : 'left-[calc(50%+0.125rem)]'
                }`}
            />

            {/* All Therapists button */}
            <button
              className={`relative z-10 flex-1 py-3 px-6 font-semibold rounded-full cursor-pointer transition-colors duration-200 ${activeTab === 'all'
                ? 'text-white'
                : 'text-gray-700 hover:text-[#00BBA7]'
                }`}
              onClick={() => setActiveTab('all')}
            >
              All therapists
            </button>

            {/* Auto Matcher button */}
            <button
              className={`relative z-10 flex-1 py-3 px-6 font-semibold rounded-full cursor-pointer transition-colors duration-200 ${activeTab === 'auto'
                ? 'text-white'
                : 'text-gray-700 hover:text-[#00BBA7]'
                }`}
              onClick={() => setActiveTab('auto')}
            >
              Auto Matcher
            </button>
          </div>

          {
            bookTherapistPopup && selectedTherapistForBooking && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
                  {/* Modal Header */}
                  <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                        <Image
                          src={selectedTherapistForBooking.profile_image || '/default-avatar.png'}
                          alt={selectedTherapistForBooking.name}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Book session with {selectedTherapistForBooking.name}</h3>
                        <p className="text-sm text-gray-500">{selectedTherapistForBooking.specialization?.join(', ')}</p>
                      </div>
                    </div>
                    <button onClick={() => { setBookTherapistPopup(false); setSelectedTherapistForBooking(null); }} className="p-2 hover:bg-gray-100 rounded-full transition">
                      <FaTimes className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>

                  {/* Modal Body - Calendar & Time Slots */}
                  <div className="p-6">
                    {/* Preferred Date & Time */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Preferred Date & Time</label>

                      <div className="w-full h-auto flex flex-col xl:flex-row xl:gap-6">
                        {/* Calendar */}
                        <div className="bg-gray-50 w-full xl:w-[50%] rounded-lg p-4 mb-4 xl:mb-0">
                          <div className="flex items-center justify-between mb-4">
                            <button
                              onClick={prevMonth}
                              disabled={isPrevDisabled}
                              className={`p-2 rounded-full transition-colors 
    ${isPrevDisabled ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-white text-gray-600'}`}
                            >
                              <FaChevronLeft className="w-4 h-4" />
                            </button>
                            <h4 className="font-semibold text-gray-900 text-base">{getMonthYearString()}</h4>
                            <button
                              onClick={nextMonth}
                              disabled={isNextDisabled}
                              className={`p-2 rounded-full transition-colors 
    ${isNextDisabled ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-white text-gray-600'}`}
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
                                day: 'numeric',
                              })})
                            </p>

                            <div className="bg-white rounded-lg p-4 border border-gray-200">
                              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-2 gap-3">
                                {(() => {
                                  const weekday = getWeekday(selectedDate);
                                  // @ts-ignore
                                  const availableIntervals = selectedTherapistForBooking?.availability[weekday] || [];
                                  const availableSlots = generateSlotsFromIntervals(availableIntervals);

                                  return availableSlots.length > 0 ? (
                                    availableSlots.map(time => {
                                      const [hours, minutes] = time.split(':');
                                      const nextHour = (parseInt(hours) + 1).toString().padStart(2, '0');
                                      const timeRange = `${time} - ${nextHour}:${minutes}`;

                                      const isAlreadyBooked = upcomingAppointments.some(appt => {
                                        const apptDate = new Date(appt.scheduled_at);
                                        const apptTime = apptDate.toTimeString().slice(0, 5);
                                        const apptDateOnly = apptDate.toDateString();
                                        const selectedDateOnly = new Date(selectedDate).toDateString();
                                        return (
                                          apptDateOnly === selectedDateOnly &&
                                          apptTime === time &&
                                          appt.appointment_status === 'scheduled' &&
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
                  </div>

                  {/* Modal Footer - Confirm Button */}
                  <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
                    <button
                      onClick={() => { setBookTherapistPopup(false); setSelectedTherapistForBooking(null); }}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => bookAppointment(selectedTherapistForBooking)}
                      disabled={!selectedDate || !selectedTime}
                      className={`px-6 py-2 rounded-lg text-white transition ${!selectedDate || !selectedTime
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-teal-600 hover:bg-teal-700'
                        }`}
                    >
                      Confirm Booking
                    </button>
                  </div>
                </div>
              </div>
            )
          }


          {emailOtpPopup && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
                <div className="bg-gradient-to-r from-teal-600 to-teal-700 p-6 rounded-t-2xl">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-white">Verify New Email</h2>
                    <button onClick={() => setEmailOtpPopup(false)} className="text-white">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-teal-100 mt-1">We sent a code to {pendingNewEmail}</p>
                </div>
                <div className="p-6">
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    onKeyDown={(prev) => {
                      if (prev.key === 'Enter' && otp.length === 6) {
                        verifyEmailOtpAndUpdate();
                      }
                    }}
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                    className="w-full text-center text-2xl font-mono tracking-widest p-3 border-2 rounded-lg"
                  />
                  <button
                    onClick={verifyEmailOtpAndUpdate}
                    disabled={otp.length !== 6 || isUpdatingEmail}
                    className="w-full mt-6 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-300 text-white font-bold py-3 rounded-lg"
                  >
                    {isUpdatingEmail ? 'Verifying...' : 'Verify & Update Email'}
                  </button>
                  <button
                    onClick={() => sendOtpForNewEmail(pendingNewEmail!)}
                    className="w-full mt-3 text-teal-600 hover:text-teal-800"
                  >
                    Resend Code
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Book Appoinment Form */}
          {
            ((user?.role === "user" && user.sessions_balance > 0) || user?.role === "employee") && (
              <div className='w-full h-auto'>
                <div className="space-y-6">
                  {!showResults ? (
                    <>
                      {
                        activeTab === 'auto'
                          ? <div className="bg-white rounded-2xl shadow-md overflow-hidden">
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
                                        disabled={isPrevDisabled}
                                        className={`p-2 rounded-full transition-colors 
    ${isPrevDisabled ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-white text-gray-600'}`}
                                      >
                                        <FaChevronLeft className="w-4 h-4" />
                                      </button>
                                      <h4 className="font-semibold text-gray-900 text-base">
                                        {getMonthYearString()}
                                      </h4>
                                      <button
                                        onClick={nextMonth}
                                        disabled={isNextDisabled}
                                        className={`p-2 rounded-full transition-colors 
    ${isNextDisabled ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-white text-gray-600'}`}
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

                                                //  Check if this slot conflicts with upcoming appointments
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
                          : <div className="w-full h-auto flex flex-col gap-6">
                            {/* Header with search */}
                            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                              <div>
                                <h3 className="text-xl font-bold text-gray-900">Available Therapists</h3>
                                <p className="text-sm text-gray-500 mt-1">
                                  {pagination.totalItems} therapist{pagination.totalItems !== 1 ? 's' : ''} found
                                </p>
                              </div>
                              <div className="relative">
                                <input
                                  type="text"
                                  placeholder="Search by name or specialization..."
                                  value={searchTherapist}
                                  onChange={(e) => { setSearchTherapist(e.target.value); }}
                                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent w-full sm:w-64"
                                />
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                              </div>
                            </div>

                            {/* Therapist Cards */}
                            {
                              therapistLoading
                                ? <div className='w-full h-60 flex flex-col justify-content items-center'>
                                  <LoadingSpinnerWithoutOverlay />
                                </div>
                                : therapistList.length > 0 ? (
                                  <>
                                    <div className="space-y-4 bg-white">
                                      {therapistList.map((therapist) => {
                                        const allSlots = getFlattenedSlots(therapist.availability);
                                        // @ts-ignore
                                        const isExpanded = expandedSlots[therapist._id] || false;
                                        const visibleSlots = isExpanded ? allSlots : allSlots.slice(0, 3);
                                        const hasHidden = allSlots.length > 3;

                                        return (
                                          <div
                                            key={therapist._id}
                                            className="border border-gray-200 rounded-xl p-6 hover:border-teal-300 hover:shadow-md transition-all"
                                          >
                                            <div className="flex flex-col md:flex-row gap-6">
                                              {/* Image */}
                                              <div className="flex-shrink-0 mx-auto md:mx-0">
                                                <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
                                                  <Image
                                                    src={therapist.profile_image || '/default-avatar.png'}
                                                    alt={therapist.name || 'Therapist'}
                                                    width={80}
                                                    height={80}
                                                    className="object-cover w-full h-full"
                                                  />
                                                </div>
                                              </div>

                                              {/* Details */}
                                              <div className="flex-1">
                                                <div className="flex flex-col md:flex-row md:justify-between gap-4">
                                                  <div className="space-y-3">
                                                    {/* Name & Specialization */}
                                                    <div>
                                                      <h4 className="font-bold text-lg text-gray-900">{therapist.name}</h4>
                                                      <p className="text-teal-600 font-medium">
                                                        {therapist.specialization?.join(', ') || 'General'}
                                                      </p>
                                                    </div>

                                                    {/* Location */}
                                                    <p className="text-sm text-gray-600">
                                                      {therapist.location?.city}, {therapist.location?.country}
                                                    </p>

                                                    {/* ALL availability slots */}
                                                    <div className="space-y-1">
                                                      <p className="text-sm font-medium text-gray-700">Availability:</p>
                                                      {allSlots.length === 0 ? (
                                                        <p className="text-sm text-gray-400">No availability information</p>
                                                      ) : (
                                                        <div className="flex flex-wrap gap-2 items-center">
                                                          {visibleSlots.map((slot, idx) => (
                                                            <span
                                                              key={idx}
                                                              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs whitespace-nowrap"
                                                            >
                                                              {slot.label}
                                                            </span>
                                                          ))}
                                                          {hasHidden && (
                                                            <button
                                                              onClick={() => toggleAvailability(therapist._id)}
                                                              className="px-2 py-1 bg-teal-50 text-teal-700 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-teal-300"
                                                            >
                                                              {isExpanded ? '− Show less' : `+ ${allSlots.length - 3} more`}
                                                            </button>
                                                          )}
                                                        </div>
                                                      )}
                                                    </div>

                                                    {/* Optional: Years of experience */}
                                                    {therapist.academic_background?.years_of_experience && (
                                                      <p className="text-sm text-gray-500">
                                                        {therapist.academic_background.years_of_experience}+ years exp.
                                                      </p>
                                                    )}
                                                  </div>

                                                  {/* Book Button */}
                                                  <div className="flex flex-col md:items-end justify-between md:min-w-[140px] flex-shrink-0">
                                                    <button
                                                      onClick={() => { setBookTherapistPopup(true); setSelectedTherapistForBooking(therapist) }}
                                                      className="w-full md:w-auto px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                                                    >
                                                      Book Now
                                                    </button>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        )
                                      })}
                                    </div>

                                    {/* Pagination Controls */}
                                    {pagination.totalPages > 1 && (
                                      <div className="flex justify-center items-center gap-4 mt-6">
                                        <button
                                          onClick={() => setPagination(prev => ({ ...prev, pageNum: prev.pageNum - 1 }))}
                                          disabled={pagination.pageNum === 1}
                                          className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                                        >
                                          Previous
                                        </button>
                                        <span className="text-sm text-gray-700">
                                          Page {pagination.pageNum} of {pagination.totalPages}
                                        </span>
                                        <button
                                          onClick={() => setPagination(prev => ({ ...prev, pageNum: prev.pageNum + 1 }))}
                                          disabled={pagination.pageNum === pagination.totalPages}
                                          className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                                        >
                                          Next
                                        </button>
                                      </div>
                                    )}
                                  </>
                                ) : (
                                  // Empty state
                                  <div className="text-center py-12">
                                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                      <FaUserMd className="text-2xl text-gray-500" />
                                    </div>
                                    <h3 className="text-xl font-medium text-gray-900 mb-2">No therapists available</h3>
                                    <p className="text-gray-600 mb-6">
                                      {searchTherapist ? 'Try adjusting your search' : 'Check back later for new therapists'}
                                    </p>
                                    {searchTherapist && (
                                      <button
                                        onClick={() => setSearchTherapist('')}
                                        className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                                      >
                                        Clear Search
                                      </button>
                                    )}
                                  </div>
                                )

                            }

                          </div>
                      }
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
                                        Available: {formatTime(therapist?.available_slot?.from)} - {formatTime(therapist?.available_slot?.to)}
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
                                      {/* <p className="text-gray-900 font-semibold">
                                        {therapist.session_details.currency}{therapist.session_details.cost} / {therapist.session_details.duration} min
                                      </p> */}
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
            )
          }

          {
            user?.role === "user" && user.sessions_balance === 0 && (
              <NoActivePackage />
            )
          }
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

              <div className="space-y-4 md:space-y-6 overflow-y-auto custom-scrollbar" style={{ maxHeight: '600px' }}>
                {upcomingAppointments?.length > 0 ? (
                  upcomingAppointments.map((appointment: UpcomingAppointment) => (
                    <div
                      key={appointment._id}
                      className="flex flex-col sm:flex-row items-start sm:items-center border-b border-gray-100 pb-4 md:pb-6 last:border-0 last:pb-0 gap-3"
                    >
                      {/* Therapist image */}
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-teal-500 overflow-hidden bg-gray-200 flex-shrink-0">
                        <Image
                          src={appointment.therapist_id.profile_image}
                          alt={appointment.therapist_id.name}
                          width={64}
                          height={64}
                          className="object-cover w-full h-full"
                        />
                      </div>

                      {/* Main content */}
                      <div className="flex-1 min-w-0 w-full">
                        <h3 className="font-bold text-gray-900 text-sm md:text-base truncate">
                          {appointment.therapist_id.name}
                        </h3>
                        <div className="flex flex-wrap items-center text-xs md:text-sm text-gray-500 mt-1 gap-x-3 gap-y-1">
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

                        {/* Status and Notes */}
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <span
                            className={`px-2 py-0.5 capitalize rounded-full text-xs font-medium inline-block ${appointment.appointment_status === 'scheduled'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                              }`}
                          >
                            {appointment.appointment_status}
                          </span>
                          <button
                            onClick={() => handleOpenNotes(appointment)}
                            className={`flex items-center px-3 py-2 text-sm text-white justify-center rounded-md cursor-pointer md:hover:scale-105 duration-300 ease-in-out ${appointment.is_notes ? 'bg-[#009689]' : 'bg-teal-500'
                              }`}
                          >
                            <NotesIcon />
                            <span className="ml-2">View Notes</span>
                          </button>
                        </div>
                      </div>

                      {/* Join & Reschedule actions */}
                      <div className="flex flex-row sm:flex-col gap-2 self-end sm:self-center ml-auto">
                        <Link
                          href={appointment.meet_link}
                          className="flex items-center px-2 md:px-3 py-1 md:py-1.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-xs md:text-sm"
                        >
                          <FaVideo className="mr-1 w-3 h-3" />
                          Join
                        </Link>
                        <button
                          onClick={() => handleOpenBookingPopup(appointment.therapist_id._id, 'edit', appointment._id)}
                          className="text-xs text-teal-600 hover:text-teal-800 cursor-pointer whitespace-nowrap"
                        >
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

              <div className="space-y-4 md:space-y-6 overflow-y-auto custom-scrollbar" style={{ maxHeight: '600px' }}>
                {pastAppointments?.length > 0 ? (
                  pastAppointments.map((appointment: UpcomingAppointment) => (
                    <div
                      key={appointment._id}
                      className="flex flex-col sm:flex-row items-start sm:items-center border-b border-gray-100 pb-4 md:pb-6 last:border-0 last:pb-0 gap-3"
                    >
                      {/* Therapist image - stays at top on mobile, left on larger screens */}
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-teal-500 overflow-hidden bg-gray-200 flex-shrink-0">
                        <Image
                          src={appointment.therapist_id.profile_image}
                          alt={appointment.therapist_id.name}
                          width={64}
                          height={64}
                          className="object-cover w-full h-full"
                        />
                      </div>

                      {/* Main content - takes remaining width */}
                      <div className="flex-1 min-w-0 w-full">
                        <h3 className="font-bold text-gray-900 text-sm md:text-base truncate">
                          {appointment.therapist_id.name}
                        </h3>
                        <div className="flex flex-wrap items-center text-xs md:text-sm text-gray-500 mt-1 gap-x-3 gap-y-1">
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

                        {/* Action buttons - stack on mobile, row on tablet+ */}
                        <div className="flex flex-wrap items-center gap-2 mt-3">
                          <span className="px-2 py-1 rounded-full text-xs font-medium capitalize bg-purple-100 text-purple-800">
                            {appointment.appointment_status}
                          </span>

                          <button
                            onClick={() => handleOpenNotes(appointment)}
                            className={`flex items-center px-3 py-2 text-sm text-white justify-center rounded-md cursor-pointer md:hover:scale-105 duration-300 ease-in-out ${appointment.is_notes ? 'bg-[#009689]' : 'bg-teal-500'
                              }`}
                          >
                            <NotesIcon />
                            <span className="ml-2">View Notes</span>
                          </button>

                          <button
                            onClick={() => handleOpenGoals(appointment)}
                            className="flex items-center px-3 py-2 justify-center rounded-md cursor-pointer 
                         bg-teal-50 text-teal-700 border border-teal-200
                         hover:bg-teal-100 md:hover:scale-105 duration-300 ease-in-out"
                          >
                            <TargetIcon className="w-5 h-5" />
                            <span className="ml-1.5">View Goals</span>
                          </button>
                        </div>
                      </div>

                      {/* Book Again button - positioned to the right on larger screens, below on mobile */}
                      <div className="self-end sm:self-center ml-auto">
                        <button
                          onClick={() => {
                            if (user?.role === 'user' && user?.sessions_balance === 0) {
                              toast.error('You have no Active Package');
                              return;
                            }
                            handleOpenBookingPopup(appointment.therapist_id._id, 'book');
                          }}
                          className="text-xs text-teal-600 hover:text-teal-800 whitespace-nowrap"
                        >
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
      {
        isNotesModalOpen && (
          <NotesModal
            onClose={() => { setIsNotesModalOpen(false); setSelectedAppointmentForNotes(null) }}
            // @ts-ignore
            appointment={selectedAppointmentForNotes}
            onSaveNote={() => { }}
            therapistName={""}
            isPast={false}
          />
        )
      }


      {
        isGoalsModalOpen && selectedAppointmentForGoals && (
          <UserGoalsModal
            onClose={() => { setIsGoalsModalOpen(false); setSelectedAppointmentForGoals(null) }}
            userId={userId}
            therapistId={selectedAppointmentForGoals?.therapist_id._id}
            therapistName={selectedAppointmentForGoals?.therapist_id.name}
          />
        )
      }
    </div >
  );
};

export default UserProfilePage;