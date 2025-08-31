import { bookAppointmentFunc, rescheduleAppointmentFunc } from '@/store/appoinment';
import { getAvailablityOfSingleTherapist } from '@/store/availability';
import { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight, FaClock, FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { LoadingSpinnerWithOverlay } from '../global/Loading';

interface TimeInterval {
  from: string;
  to: string;
}

interface Days {
  [key: string]: TimeInterval[];
  sunday: TimeInterval[];
  monday: TimeInterval[];
  tuesday: TimeInterval[];
  wednesday: TimeInterval[];
  thursday: TimeInterval[];
  friday: TimeInterval[];
  saturday: TimeInterval[];
}

interface BookingCalendarProps {
  id: string;
  userId: string;
  onClose: () => void;
  type: string;
  appoinmentId?: string
}

const BookingCalendar = ({ id, userId, onClose, type, appoinmentId }: BookingCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [timings, setTimings] = useState<Days>({
    sunday: [],
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: []
  });
  const [loading, setLoading] = useState(true);
  const popupRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch()

  // Generate calendar days
  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: (Date | null)[] = [];

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

  async function getAvailabilityTherapist(id: string) {
    const data = {
      pageNum: 1,
      pageSize: 20,
      filters: { therapist: id }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await dispatch(getAvailablityOfSingleTherapist(data as any) as any);
    if (response?.error) {
      setLoading(false)
      toast.error(response.error.message)
    } else {
      setLoading(false)
      setTimings(response.payload.data.availabilityList[0].days)
    }
  }

  // Get weekday name from date
  const getWeekday = (date: Date) => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[date.getDay()];
  };

  // Generate time slots from intervals
  const generateSlotsFromIntervals = (intervals: TimeInterval[]) => {
    const slots: string[] = [];

    intervals.forEach(({ from, to }) => {
      const fromHour = parseInt(from.split(':')[0], 10);
      const toHour = parseInt(to.split(':')[0], 10);

      for (let hour = fromHour; hour < toHour; hour++) {
        // Format hour to HH:mm string, e.g. "09:00", "14:00"
        const slot = hour.toString().padStart(2, '0') + ':00';
        slots.push(slot);
      }
    });

    return slots;
  };

  // Check if a date has available time slots
  const hasAvailableSlots = (date: Date) => {
    const weekday = getWeekday(date);
    const availableIntervals = timings[weekday] || [];
    return availableIntervals.length > 0;
  };

  // Handle click outside popup to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // Reset selected time when date changes
  useEffect(() => {
    setSelectedTime(null);
  }, [selectedDate]);

  // Fetch therapist availability
  useEffect(() => {
    getAvailabilityTherapist(id)
  }, [id]);

  const handleBookAppointment = async () => {
    setLoading(true);
    if (selectedDate && selectedTime) {
      const dateObj = new Date(selectedDate);
      const cleanDate = dateObj.toDateString();

      const data = {
        therapist_id: id,
        user_id: userId,
        scheduled_at: cleanDate + ' ' + selectedTime
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await dispatch(bookAppointmentFunc(data as any) as any);
      if (response?.error) {
        setLoading(false)
        toast.error(response.error.message)
      } else {
        setLoading(false)
        toast.success(`Appointment booked !`);
        setSelectedDate(null);
        setSelectedTime(null);
      }
      onClose();
    }
  };

  const handleReschedule = async () => {
    setLoading(true);
    if (selectedDate && selectedTime) {
      const dateObj = new Date(selectedDate);
      const cleanDate = dateObj.toDateString();

      const updateObject = {
        id: appoinmentId,
        data: {
          scheduled_at: cleanDate + ' ' + selectedTime
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await dispatch(rescheduleAppointmentFunc(updateObject as any) as any);
      if (response?.error) {
        setLoading(false)
        toast.error(response.error.message)
      } else {
        setLoading(false)
        toast.success(`Reschedule Appointment booked !`);
        setSelectedDate(null);
        setSelectedTime(null);
      }
      onClose();
    }
  };

  if (loading) {
    return (
      <div className='w-full min-h-screen'>
        <LoadingSpinnerWithOverlay />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div ref={popupRef} className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg sm:text-2xl font-bold text-gray-800">
            {
              type === 'edit'
                ? 'Reschedule Appointment'
                : 'Book Appointment Again'
            }
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Calendar Section */}
          <div className="w-full lg:w-1/2">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Select Date</h3>

            <div className="bg-gray-50 rounded-lg p-4">
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
                  const hasSlots = hasAvailableSlots(day);

                  return (
                    <button
                      key={day.getDate()}
                      className={`p-2 text-center text-sm rounded-lg transition-colors min-h-[36px] ${isSelected
                        ? 'bg-teal-500 text-white font-medium'
                        : isPast
                          ? 'text-gray-300 cursor-not-allowed'
                          : hasSlots
                            ? isToday
                              ? 'bg-teal-100 text-teal-700 font-medium border-2 border-teal-500'
                              : 'text-gray-700 hover:bg-white hover:shadow-sm'
                            : 'text-gray-400 cursor-not-allowed'
                        }`}
                      onClick={() => !isPast && hasSlots && setSelectedDate(day)}
                      disabled={isPast || !hasSlots}
                    >
                      {day.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Time Slots Section */}
          <div className="w-full lg:w-1/2">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              {selectedDate ? 'Select Time' : 'Select a date first'}
            </h3>

            {selectedDate ? (
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-700 mb-3">
                  Available time slots ({selectedDate.toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                  })})
                </p>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="grid grid-cols-2 gap-3">
                    {(() => {
                      const weekday = getWeekday(selectedDate);
                      const availableIntervals = timings[weekday] || [];
                      const availableSlots = generateSlotsFromIntervals(availableIntervals);

                      return availableSlots.length > 0 ? (
                        availableSlots.map(time => {
                          const [hours, minutes] = time.split(':');
                          const nextHour = (parseInt(hours) + 1).toString().padStart(2, '0');
                          const timeRange = `${time} - ${nextHour}:${minutes}`;

                          return (
                            <button
                              key={time}
                              className={`py-3 px-4 text-sm font-medium rounded-lg transition-all duration-200 border-2 ${selectedTime === time
                                ? 'bg-teal-500 border-teal-500 text-white shadow-md'
                                : 'bg-white border-gray-300 text-gray-700 hover:bg-teal-50 hover:border-teal-300 hover:shadow-sm'
                                }`}
                              onClick={() => setSelectedTime(time)}
                            >
                              {timeRange}
                            </button>
                          );
                        })
                      ) : (
                        <div className="col-span-2 text-center text-gray-500 text-sm py-8 bg-gray-50 rounded-lg">
                          <FaClock className="mx-auto mb-2 text-gray-400 text-lg" />
                          <p>No available time slots for this day</p>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <FaClock className="mx-auto mb-4 text-gray-400 text-3xl" />
                <p className="text-gray-500">Please select a date to see available time slots</p>
              </div>
            )}

            {/* Book Appointment Button */}
            <button
              onClick={type === 'edit' ? handleReschedule : handleBookAppointment}
              disabled={!selectedDate || !selectedTime}
              className={`w-full mt-6 py-3 px-4 rounded-lg font-medium transition-colors ${selectedDate && selectedTime
                ? 'bg-teal-500 text-white hover:bg-teal-600'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
            >
              {
                type === 'edit'
                  ? 'Reschedule Appointment'
                  : 'Book Appointment'
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;