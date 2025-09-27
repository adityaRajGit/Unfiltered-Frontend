import { getAvailabilityForTherapist, setAvailabilityForTherapist, updateAvailabilityForTherapist } from '@/store/therapistSlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { LoadingSpinnerWithoutOverlay } from '../global/Loading';

interface TimeSlot {
    from: string;
    to: string;
}

interface DayAvailability {
    [key: string]: TimeSlot[];
}

interface AvailabilityData {
    therapist: string;
    days: DayAvailability;
}

const daysOfWeek = [
    { id: 'sunday', name: 'Sunday', short: 'Sun' },
    { id: 'monday', name: 'Monday', short: 'Mon' },
    { id: 'tuesday', name: 'Tuesday', short: 'Tue' },
    { id: 'wednesday', name: 'Wednesday', short: 'Wed' },
    { id: 'thursday', name: 'Thursday', short: 'Thu' },
    { id: 'friday', name: 'Friday', short: 'Fri' },
    { id: 'saturday', name: 'Saturday', short: 'Sat' }
];

const timeOptions = [
    '08:00', '09:00', '10:00',
    '11:00', '12:00', '13:00',
    '14:00', '15:00', '16:00',
    '17:00', '18:00', '19:00'
];

export default function CalendarAvailabilityScheduler({ therapistId }: { therapistId: string }) {
    const [availability, setAvailability] = useState<DayAvailability>({
        sunday: [],
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: []
    });
    const [loading, setLoading] = useState(true);
    const [selectedDay, setSelectedDay] = useState<string>('monday');
    const [newSlot, setNewSlot] = useState<TimeSlot>({ from: '09:00', to: '10:00' });
    const [isAdding, setIsAdding] = useState<boolean>(false);
    const [availabilityId, setAvailabilityId] = useState<string>('');
    const dispatch = useDispatch()

    const addTimeSlot = (day: string) => {
        if (newSlot.from >= newSlot.to) {
            toast.error('End time must be after start time');
            return;
        }

        setAvailability(prev => ({
            ...prev,
            [day]: [...prev[day], newSlot]
        }));

        setNewSlot({ from: '09:00', to: '10:00' });
        setIsAdding(false);
    };

    const removeTimeSlot = (day: string, index: number) => {
        setAvailability(prev => ({
            ...prev,
            [day]: prev[day].filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async () => {
        setLoading(true)
        const data: AvailabilityData = {
            therapist: therapistId,
            days: availability
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response = await dispatch(setAvailabilityForTherapist(data as any) as any);
        if (response?.error) {
            setLoading(false)
            toast.error(response.error.message)
        } else {
            setLoading(false)
            window.scrollTo(0, 0);
            toast.success('Availability set successfully!');
            getAvailability(therapistId)
        }
    };

    async function getAvailability(id: string) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response = await dispatch(getAvailabilityForTherapist(id as any) as any);
        if (response?.error) {
            setLoading(false)
            toast.error(response.error.message)
        } else {
            setLoading(false)
            const data = response.payload.data?.availability?.days || {
                sunday: [],
                monday: [],
                tuesday: [],
                wednesday: [],
                thursday: [],
                friday: [],
                saturday: []
            }
            setAvailability(data)
            setAvailabilityId(response.payload.data.availability._id)
        }
    }

    async function updateAvailability() {
        setLoading(true)
        const dataToSend = {
            id: availabilityId,
            data: {
                therapist: therapistId,
                days: availability
            }
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response = await dispatch(updateAvailabilityForTherapist(dataToSend as any) as any);
        if (response?.error) {
            setLoading(false)
            toast.error(response.error.message)
        } else {
            setLoading(false)
            window.scrollTo(0, 0);
            toast.success('Availability updated successfully!');
            getAvailability(therapistId)
        }
    }

    const formatTime = (time: string) => {
        const [hours, minutes] = time.split(':');
        const hourNum = parseInt(hours, 10);
        const period = hourNum >= 12 ? 'PM' : 'AM';
        const displayHour = hourNum % 12 || 12;

        return `${displayHour}:${minutes} ${period}`;
    };

    // Function to check if a time slot overlaps with existing slots
    const hasOverlap = (day: string, from: string, to: string) => {
        return availability[day].some(slot => {
            return (from >= slot.from && from < slot.to) ||
                (to > slot.from && to <= slot.to) ||
                (from <= slot.from && to >= slot.to);
        });
    };

    useEffect(() => {
        getAvailability(therapistId)
    }, [])

    if (loading) {
        return (
            <div className='w-full'>
                <LoadingSpinnerWithoutOverlay />
            </div>
        )
    }

    return (
        <div className="w-full mt-10 mx-auto p-6 bg-white rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Set Your Weekly Availability</h2>
            <p className="text-gray-600">Select days and time slots when you&apos;re available for sessions</p>
            <p className="text-sm font-medium text-gray-700 mb-6">
                <span className="font-semibold text-[#00bba7]">Note:</span> We protect your privacy like it’s our own.
            </p>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Calendar View */}
                <div className="lg:w-2/3">
                    <div className="grid grid-cols-7 gap-2 mb-6">
                        {daysOfWeek?.map(day => (
                            <div
                                key={day.id}
                                className={`p-3 text-center font-medium rounded-lg cursor-pointer transition-all ${selectedDay === day.id
                                    ? 'bg-teal-500 text-white shadow-md'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                onClick={() => {
                                    setSelectedDay(day.id);
                                    setIsAdding(false);
                                }}
                            >
                                <div className="text-sm font-semibold">{day.short}</div>
                                <div className="text-xs mt-1">
                                    {availability[day.id]?.length} {availability[day.id]?.length === 1 ? 'slot' : 'slots'}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Selected Day Panel */}
                    <div className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-gray-800 capitalize">{selectedDay}</h3>
                            <button
                                onClick={() => setIsAdding(!isAdding)}
                                className="flex items-center gap-1 text-teal-600 hover:text-teal-700 font-medium"
                            >
                                {isAdding ? (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        Cancel
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        Add Slot
                                    </>
                                )}
                            </button>
                        </div>

                        {isAdding ? (
                            <div className="bg-white rounded-lg p-4 mb-4 border border-teal-200 shadow-sm">
                                <h4 className="font-medium text-gray-700 mb-3">Add Time Slot</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                                        <select
                                            value={newSlot.from}
                                            onChange={(e) => setNewSlot({ ...newSlot, from: e.target.value })}
                                            className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                        >
                                            {timeOptions.map(time => (
                                                <option key={`from-${time}`} value={time}>
                                                    {formatTime(time)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                                        <select
                                            value={newSlot.to}
                                            onChange={(e) => setNewSlot({ ...newSlot, to: e.target.value })}
                                            className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                        >
                                            {timeOptions.map(time => (
                                                <option key={`to-${time}`} value={time}>
                                                    {formatTime(time)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {hasOverlap(selectedDay, newSlot.from, newSlot.to) && (
                                    <div className="text-red-500 text-sm mb-3 bg-red-50 p-2 rounded-lg">
                                        This time slot overlaps with an existing one
                                    </div>
                                )}

                                <div className="flex justify-end">
                                    <button
                                        onClick={() => addTimeSlot(selectedDay)}
                                        disabled={newSlot.from >= newSlot.to || hasOverlap(selectedDay, newSlot.from, newSlot.to)}
                                        className="bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                                    >
                                        Add Time Slot
                                    </button>
                                </div>
                            </div>
                        ) : null}

                        {availability[selectedDay].length === 0 ? (
                            <div className="text-center py-8 bg-white rounded-lg border border-dashed border-gray-300">
                                <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-gray-500">No availability set for {selectedDay}</p>
                                <button
                                    onClick={() => setIsAdding(true)}
                                    className="text-teal-600 hover:text-teal-700 font-medium mt-2"
                                >
                                    Add your first time slot
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <h4 className="font-medium text-gray-700">Available Time Slots</h4>
                                {availability[selectedDay].map((slot, index) => (
                                    <div key={index} className="flex justify-between items-center bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                        <div className="flex items-center">
                                            <div className="bg-teal-100 p-2 rounded-lg mr-3">
                                                <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <span className="font-medium">
                                                {formatTime(slot.from)} - {formatTime(slot.to)}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => removeTimeSlot(selectedDay, index)}
                                            className="text-gray-400 hover:text-red-500 p-1"
                                            aria-label="Remove time slot"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Week Summary */}
                <div className="lg:w-1/3">
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 sticky top-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Weekly Summary</h3>
                        <div className="space-y-4">
                            {daysOfWeek.map(day => (
                                <div
                                    key={day.id}
                                    className={`bg-white p-4 rounded-lg border ${selectedDay === day.id ? 'border-teal-500' : 'border-gray-200'} cursor-pointer transition-colors`}
                                    onClick={() => setSelectedDay(day.id)}
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="font-medium text-gray-700 capitalize">{day.name}</div>
                                        {availability[day.id].length > 0 && (
                                            <span className="bg-teal-100 text-teal-800 text-xs font-medium px-2 py-1 rounded-full">
                                                {availability[day.id].length} {availability[day.id].length === 1 ? 'slot' : 'slots'}
                                            </span>
                                        )}
                                    </div>
                                    {availability[day.id].length === 0 ? (
                                        <p className="text-sm text-gray-400">Not available</p>
                                    ) : (
                                        <div className="space-y-2">
                                            {availability[day.id].map((slot, index) => (
                                                <div key={index} className="text-sm text-gray-600 bg-gray-50 p-2 rounded-md">
                                                    {formatTime(slot.from)} - {formatTime(slot.to)}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <button
                                onClick={availabilityId ? updateAvailability : handleSubmit}
                                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-md"
                            >
                                Save Availability
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}