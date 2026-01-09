import { addNote } from '@/store/notesSlice';
import Image from 'next/image';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { LoadingSpinnerWithOverlay } from '../global/Loading';
import { NotesModal } from './NotesModal';

// Icons for better visual representation
const CalendarIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const VideoIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

export const PencilIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

export const NotesIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);


interface Client {
  _id: string;
  name: string;
  email: string;
  profile_image?: string;
}

interface Appointment {
  _id: string;
  user_id: Client;
  therapist_id: string;
  scheduled_at: string;
  appointment_status: string;
  meet_link: string;
}



export function AppointmentList({
  appointments,
  emptyMessage,
  emptyDescription,
  isPast = false,
  therapistName,
  functionToCall
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  appointments: any[];
  emptyMessage: string;
  emptyDescription: string;
  isPast?: boolean;
  therapistName: string
  functionToCall: (id: string) => Promise<void>;
}) {

  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()

  // Handle opening notes modal
  const handleOpenNotes = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsNotesModalOpen(true);
  };

  // Handle saving note
  const handleSaveNote = async (therapistId: string, userId: string, appointmentId: string, noteContent: string) => {
    const data = {
      therapist: therapistId,
      user: userId,
      appointment: appointmentId,
      content: noteContent
    }
    setLoading(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await dispatch(addNote(data as any) as any);
    if (response?.error) {
      setLoading(false)
      toast.error(response.error.message)
    } else {
      setLoading(false)
      toast.success("Note saved successfully!");
      functionToCall(therapistId)
      setIsNotesModalOpen(false);
    }
  };

  if (loading) {
    return (
      <LoadingSpinnerWithOverlay />
    )
  }

  if (appointments.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center">
          <svg
            className="h-8 w-8 text-teal-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isPast
                ? "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                : "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              }
            />
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-medium text-gray-900">{emptyMessage}</h3>
        <p className="mt-1 text-gray-500">{emptyDescription}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => {
        const client = typeof appointment.user_id === 'object' ?
          appointment.user_id :
          { name: 'Unknown User', email: 'Unknown Email' };

        const scheduledDate = new Date(appointment.scheduled_at);
        const isToday = new Date().toDateString() === scheduledDate.toDateString();
        const hasNotes = appointment.is_notes;

        return (
          <div key={appointment._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Client Avatar */}
              <div className="flex-shrink-0">
                {client.profile_image ? (
                  <Image
                    className="h-14 w-14 rounded-full object-cover border-2 border-white shadow"
                    width={56}
                    height={56}
                    src={client.profile_image}
                    alt={client.name}
                  />
                ) : (
                  <div className="h-14 w-14 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                    <UserIcon />
                  </div>
                )}
              </div>

              {/* Client and Appointment Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {client.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{client.email}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    {isToday && !isPast && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Today
                      </span>
                    )}
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${appointment.appointment_status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' :
                      appointment.appointment_status === 'completed' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                      {appointment.appointment_status.charAt(0).toUpperCase() + appointment.appointment_status.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Appointment Details */}
                <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <CalendarIcon />
                    <span className="ml-1.5">
                      {scheduledDate.toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <ClockIcon />
                    <span className="ml-1.5">
                      {scheduledDate.toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  {/* if any previous notes does not exists it will come as condition later */}
                  {/* <div className="flex items-center bg-[#009689] p-2 px-4 text-white rounded-md cursor-pointer md:hover:scale-105 duration-300 ease-in-out">
                    <PencilIcon />
                    <span className="ml-1.5">
                     Write Notes
                    </span>
                  </div> */}

                  {/* if any previous notes exists it will come as condition later */}
                  {/* <div className="flex items-center bg-[#009689] p-2 px-4 text-white rounded-md cursor-pointer md:hover:scale-105 duration-300 ease-in-out">
                    <NotesIcon />
                    <span className="ml-1.5">
                      View Notes
                    </span>
                  </div> */}

                  <button
                    onClick={() => handleOpenNotes(appointment)}
                    className={`flex items-center p-2 px-4 text-white justify-center rounded-md cursor-pointer md:hover:scale-105 duration-300 ease-in-out ${hasNotes ? 'bg-[#009689]' : 'bg-teal-500'}`}
                  >
                    {!isPast ? (
                      <>
                        <NotesIcon />
                        <span className="ml-1.5">
                          View Notes
                        </span>
                      </>
                    ) : hasNotes && isPast ? (
                      <>
                        <NotesIcon />
                        <span className="ml-1.5">
                          View Notes
                        </span>
                      </>
                    )
                      : (
                        <>
                          <PencilIcon />
                          <span className="ml-1.5">
                            Write Notes
                          </span>
                        </>
                      )
                    }
                  </button>

                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {!isPast && appointment.appointment_status === 'scheduled' && (
                    <a
                      href={appointment.meet_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >
                      <VideoIcon />
                      Start Session
                    </a>
                  )}

                  {!isPast && appointment.appointment_status === 'scheduled' && (
                    <button className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                      Reschedule
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {
        isNotesModalOpen && (
          <NotesModal
            onClose={() => { setIsNotesModalOpen(false); setSelectedAppointment(null) }}
            // @ts-ignore
            appointment={selectedAppointment}
            onSaveNote={handleSaveNote}
            therapistName={therapistName}
            isPast={isPast}
          />
        )
      }
    </div>
  );
}