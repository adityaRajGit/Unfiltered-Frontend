import { listNote } from "@/store/notesSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { LoadingSpinnerWithoutOverlay } from "../global/Loading";
import { NotesIcon } from "./AppointmentList";
import { PencilIcon } from "lucide-react";


const CloseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const SaveIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

// Types

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

interface NotesModalProps {
  onClose: () => void;
  appointment: Appointment;
  onSaveNote: (therapistId: string, userId: string, appointmentId: string, noteContent: string) => void;
  therapistName: string;
  isPast: boolean
}

// Notes Modal Component
export const NotesModal = ({ onClose, appointment, onSaveNote, therapistName, isPast }: NotesModalProps) => {
  const [newNote, setNewNote] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState([])
  const dispatch = useDispatch()

  console.log("appointment", appointment)
  // if (!isOpen || !appointment) return null;
  const client = typeof appointment.user_id === 'string' ? appointment.therapist_id : appointment.user_id

  const scheduledDate = new Date(appointment.scheduled_at);

  async function getNotes(therapistId: string, userId: string, appointmentId: string) {
    const data = {
      pageNum: 1,
      pageSize: 10,
      filters: {
        therapist: therapistId,
        user: userId,
      }
    }
    setLoading(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await dispatch(listNote(data as any) as any);
    if (response?.error) {
      setLoading(false)
      toast.error(response.error.message)
    } else {
      setLoading(false)
      let totalCount = response.payload.data.notesCount
      setNotes(response.payload.data.notesList)
    }
  }

  const handleSaveNote = async () => {
    if (!newNote.trim()) return;

    setIsSaving(true);
    try {
      await onSaveNote(appointment.therapist_id, appointment.user_id._id, appointment._id, newNote);
      setNewNote('');
    } catch (error) {
      console.error('Failed to save note:', error);
      toast.error('Failed to save note.');
    } finally {
      setIsSaving(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };


  useEffect(() => {
    if (!appointment) return;

    const userId =
      typeof appointment.user_id === 'object'
        ? appointment.user_id._id
        : appointment.user_id;

    getNotes(appointment.therapist_id, userId, appointment._id);
  }, []);


  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl transform overflow-hidden rounded-lg bg-white shadow-xl transition-all">
          {/* Header */}
          <div className="bg-teal-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Session Notes</h3>
                <p className="text-teal-100 text-sm mt-1">
                    {/* @ts-ignore */}
                  {client.name} • {scheduledDate.toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-1 text-white hover:bg-teal-700 transition-colors"
              >
                <CloseIcon />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-4">
            {/* Previous Notes Section */}

            {loading
              ? (
                <div className='mb-8 w-full h-60 flex justify-center items-center'>
                  <LoadingSpinnerWithoutOverlay />
                </div>
              )
              : (
                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center">
                    <NotesIcon />
                    <span className="ml-2">Previous Notes</span>
                    {notes.length > 0 && (
                      <span className="ml-2 bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                        {notes.length} note{notes.length !== 1 ? 's' : ''}
                      </span>
                    )}
                  </h4>

                  {notes.length === 0 ? (
                    <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg">
                      <p className="text-gray-500 mt-2">No notes yet for this session</p>
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-64 overflow-y-auto pr-2" style={
                      {
                        scrollbarWidth: "thin",
                        scrollbarColor: "#009689"
                      }
                    }>
                      {notes.map((note: { _id: string; content: string; created_at: string; }) => (
                        <div key={note._id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center">
                              <div className="ml-3">
                                <p className="text-xs text-gray-500">{formatDate(note.created_at)}</p>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700 whitespace-pre-wrap">{note.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            }



            {
              isPast && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center">
                    <PencilIcon />
                    <span className="ml-2">Add New Note</span>
                  </h4>

                  <div className="border border-gray-300 rounded-lg overflow-hidden">
                    <textarea
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Enter your notes for this session..."
                      className="w-full p-4 min-h-[120px] resize-none focus:outline-none focus:ring-1 focus:ring-teal-500"
                      rows={4}
                    />

                    <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
                      <div className="text-sm text-gray-500 flex items-center">
                        <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center mr-2">
                          <span className="text-teal-700 text-xs font-semibold">
                            {therapistName.charAt(0)}
                          </span>
                        </div>
                        <span>{therapistName}</span>
                      </div>

                      <div className="flex space-x-2">
                        <button
                          onClick={onClose}
                          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveNote}
                          disabled={!newNote.trim() || isSaving}
                          className="px-4 py-2 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                        >
                          {isSaving ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <SaveIcon />
                              <span className="ml-2">Save Note</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};