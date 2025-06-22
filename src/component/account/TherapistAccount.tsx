"use client";
import { decodeToken } from '@/utils/decodeToken';
import { TOKEN } from '@/utils/enum';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { LoadingSpinnerWithOverlay } from '../global/Loading';
import { getTherapistDetails } from '@/store/therapistSlice';
import { toast } from 'react-toastify';
import { FaEdit, FaPlus, FaTimes, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { getInitials } from '@/utils/GetInitials';

interface Therapist {
  name: string;
  email: string;
  profile_pic: string;
  phone: string;
  academic_background: {
    years_of_experience: string;
    qualification: string[];
  };
  specialization: string[];
  experience: string[];
  services: string[];
  location: {
    city: string;
    country: string;
  };
  bio: string;
  session_details: {
    duration: string;
    currency: string;
    cost: string;
  }
  languages: string[];
}

type TherapistArrayFields = keyof Pick<Therapist, 'specialization' | 'experience' | 'services' | 'languages'>;

type Appointment = {
  id: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  date: Date;
  duration: number;
  client: {
    name: string;
    profilePic?: string;
  };
};


export default function TherapistProfile() {
  const [activeTab, setActiveTab] = useState<'future' | 'past'>('future');
  const [loading, setLoading] = useState(true);
  // const [therapistId, setTherapistId] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [tempTherapistData, setTempTherapistData] = useState<Therapist | null>(null);
  const [, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch()
  const router = useRouter()
  const storedToken = typeof window !== 'undefined' ? localStorage.getItem(TOKEN) : null;

  const [therapist, setTherapist] = useState<Therapist | null>(null);

  // Demo appointments data
  const futureAppointments: Appointment[] =  [
    {
      id: "1",
      client: {
        name: "John Doe",
        profilePic: "/client1.jpg"
      },
      date: new Date(Date.now() + 86400000 * 1), // Tomorrow
      duration: 50,
      status: "scheduled"
    },
    {
      id: "2",
      client: {
        name: "Alice Johnson",
        profilePic: "/client2.jpg"
      },
      date: new Date(Date.now() + 86400000 * 3), // 3 days from now
      duration: 50,
      status: "scheduled"
    },
    {
      id: "3",
      client: {
        name: "Robert Chen",
      },
      date: new Date(Date.now() + 86400000 * 5), // 5 days from now
      duration: 50,
      status: "scheduled"
    }
  ];

  const pastAppointments: Appointment[] = [
    {
      id: "4",
      client: {
        name: "Sarah Williams",
        profilePic: "/client3.jpg"
      },
      date: new Date(Date.now() - 86400000 * 2), // 2 days ago
      duration: 50,
      status: "completed"
    },
    {
      id: "5",
      client: {
        name: "Michael Brown"
      },
      date: new Date(Date.now() - 86400000 * 5), // 5 days ago
      duration: 50,
      status: "completed"
    }
  ];

  async function getTherapist(id: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await dispatch(getTherapistDetails(id as any) as any)
    if (response?.error) {
      setLoading(false)
      toast.error(response.error.message)
    } else {
      setLoading(false)
      console.log(response.payload.data.therapist)
      setTherapist(response.payload.data.therapist);
      setTempTherapistData(response.payload.data.therapist);
    }
  }

  async function updateProfile() {
    setLoading(true);

    // try {
    //   // Create FormData object
    //   const formData = new FormData();

    //   // Append all therapist data fields
    //   Object.keys(tempTherapistData).forEach(key => {
    //     if (key === 'academic_background' || key === 'session_details' || key === 'location') {
    //       // Stringify nested objects
    //       formData.append(key, JSON.stringify(tempTherapistData[key]));
    //     } else if (Array.isArray(tempTherapistData[key])) {
    //       // Stringify arrays
    //       formData.append(key, JSON.stringify(tempTherapistData[key]));
    //     } else {
    //       // Append regular fields
    //       formData.append(key, tempTherapistData[key]);
    //     }
    //   });

    //   // Append new profile picture if selected
    //   if (file) {
    //     formData.append('profile_pic', file);
    //   }

    //   // Dispatch update action with FormData
    //   const response = await dispatch(updateTherapistDetails({ 
    //     therapistId, 
    //     therapistData: formData 
    //   }) as any);

    //   if (response?.error) {
    //     toast.error(response.error.message);
    //   } else {
    //     // Refresh therapist data
    //     getTherapist(therapistId);
    //     toast.success('Profile updated successfully!');
    //     setIsEditing(false);

    //     // Clean up preview URL
    //     if (previewUrl) {
    //       URL.revokeObjectURL(previewUrl);
    //       setPreviewUrl(null);
    //       setFile(null);
    //     }
    //   }
    // } catch (error) {
    //   toast.error('Failed to update profile');
    // } finally {
    //   setLoading(false);
    // }
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      // Create preview URL
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (!tempTherapistData) return;
    setTempTherapistData({ ...tempTherapistData, [name]: value });
  };

  const handleNestedInputChange = (
    parent: keyof Pick<Therapist, 'academic_background' | 'location' | 'session_details'>,
    field: string,
    value: string
  ) => {
    if (!tempTherapistData) return;
    setTempTherapistData({
      ...tempTherapistData,
      [parent]: {
        ...tempTherapistData[parent],
        [field]: value
      }
    });
  };

  const handleArrayChange = (field: TherapistArrayFields, index: number, value: string) => {
    if (!tempTherapistData) return;
    const newArray = [...tempTherapistData[field]];
    newArray[index] = value;
    setTempTherapistData({ ...tempTherapistData, [field]: newArray });
  };

  const addArrayItem = (field: TherapistArrayFields, defaultValue = '') => {
    if (!tempTherapistData) return;
    setTempTherapistData({
      ...tempTherapistData,
      [field]: [...tempTherapistData[field], defaultValue],
    });
  };

  const removeArrayItem = (field: TherapistArrayFields, index: number) => {
    if (!tempTherapistData) return;
    const newArray = [...tempTherapistData[field]];
    newArray.splice(index, 1);
    setTempTherapistData({ ...tempTherapistData, [field]: newArray });
  };


  useEffect(() => {
    if (storedToken !== null) {
      const decodedToken = decodeToken(storedToken as string);
      if (decodedToken?.userId) {
        getTherapist(decodedToken.userId._id)
        // setTherapistId(decodedToken.userId._id)
      } else {
        router.push('/')
      }
    } else {
      router.push('/')
    }
  }, [storedToken, router])

  if (loading || !therapist || !tempTherapistData) {
    return (
      <div className='min-h-screen'>
        <LoadingSpinnerWithOverlay />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Edit Button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Therapist Profile</h1>
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
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700"
            >
              <FaEdit className="mr-2" />
              Edit Profile
            </button>
          )}
        </div>

        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-teal-100">
          <div className="px-6 py-8 sm:flex sm:items-center sm:justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0 relative">
                <div className="bg-gradient-to-br from-teal-500 to-teal-700 rounded-full p-1">
                  <div className="bg-white p-1 rounded-full">
                    {previewUrl ? (
                      <Image
                        className="h-24 w-24 rounded-full object-cover border-4 border-white"
                        width={96}
                        height={96}
                        src={previewUrl}
                        alt="Profile preview"
                      />
                    ) : therapist.profile_pic ? (
                      <Image
                        className="h-24 w-24 rounded-full object-cover border-4 border-white"
                        width={96}
                        height={96}
                        src={therapist.profile_pic}
                        alt={therapist.name}
                      />
                    ) : (
                      <div className="bg-gray-200 border-2 border-dashed rounded-full w-24 h-24 flex items-center justify-center text-gray-400">
                        <span className="text-teal-600 font-bold text-4xl uppercase">
                          {getInitials(therapist?.name || '')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 bg-teal-500 rounded-full p-1 border-2 border-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                {isEditing && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 bg-teal-500 rounded-full p-2 text-white hover:bg-teal-600"
                  >
                    <FaEdit className="text-sm" />
                  </button>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
              </div>
              <div className="ml-6">
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={tempTherapistData.name}
                    onChange={handleInputChange}
                    className="text-3xl font-bold w-full bg-teal-50 rounded-lg px-3 py-2 mb-2"
                  />
                ) : (
                  <h1 className="text-3xl font-bold text-gray-900">
                    {therapist.name}
                  </h1>
                )}

                {isEditing ? (
                  <div className="mt-2">
                    <div className="flex flex-wrap gap-2">
                      {tempTherapistData.specialization.map((spec: string, index: number) => (
                        <div key={index} className="flex items-center">
                          <input
                            type="text"
                            value={spec}
                            onChange={(e) => handleArrayChange('specialization', index, e.target.value)}
                            className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-xs font-medium w-32"
                          />
                          <button
                            onClick={() => removeArrayItem('specialization', index)}
                            className="ml-1 text-red-500"
                          >
                            <FaTimes />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => addArrayItem('specialization', 'New Specialization')}
                      className="mt-2 text-xs text-teal-600 flex items-center"
                    >
                      <FaPlus className="mr-1" /> Add Specialization
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {therapist.specialization && therapist.specialization.length > 0 ? (
                      therapist.specialization.map((spec: string, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-xs font-medium"
                        >
                          {spec}
                        </span>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500 italic">Add your specialization</p>
                    )}
                  </div>

                )}

                <div className="flex items-center mt-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {isEditing ? (
                      <input
                        type="number"
                        value={tempTherapistData.academic_background?.years_of_experience || 0}
                        onChange={(e) => handleNestedInputChange('academic_background', 'years_of_experience', e.target.value)}
                        className="ml-1 bg-teal-50 rounded-lg px-2 py-1 w-16"
                      />
                    ) : (
                      <span className="text-sm text-gray-700">
                        {therapist.academic_background?.years_of_experience ? (
                          `${therapist.academic_background.years_of_experience}+ years experience`
                        ) : (
                          <span className="text-gray-500 italic">Add your years of experience</span>
                        )}
                      </span>

                    )}
                  </div>
                  <span className="mx-3 text-gray-300">|</span>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {isEditing ? (
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={tempTherapistData.location?.city || ''}
                          onChange={(e) => handleNestedInputChange('location', 'city', e.target.value)}
                          placeholder="City"
                          className="bg-teal-50 rounded-lg px-2 py-1 w-24"
                        />
                        <input
                          type="text"
                          value={tempTherapistData.location?.country || ''}
                          onChange={(e) => handleNestedInputChange('location', 'country', e.target.value)}
                          placeholder="Country"
                          className="bg-teal-50 rounded-lg px-2 py-1 w-24"
                        />
                      </div>
                    ) : (
                      <span className="text-sm text-gray-700">
                        {therapist.location?.city && therapist.location?.country ? (
                          `${therapist.location.city}, ${therapist.location.country}`
                        ) : (
                          <span className="text-gray-500 italic">Add your location</span>
                        )}
                      </span>

                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-0">
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl p-4 text-white">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Session Rate</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-2xl font-bold mt-1">
                  {isEditing ? (
                    <div className="flex items-center">
                      <span className="mr-1">{therapist.session_details?.currency}</span>
                      <input
                        type="number"
                        value={tempTherapistData.session_details?.cost || 0}
                        onChange={(e) => handleNestedInputChange('session_details', 'cost', e.target.value)}
                        className="w-20 bg-teal-600 bg-opacity-50 rounded px-2 py-1"
                      />
                    </div>
                  ) : (
                    <span className="text-sm ">
                      {therapist.session_details?.currency && therapist.session_details?.cost ? (
                        `${therapist.session_details.currency} ${therapist.session_details.cost}`
                      ) : (
                        <span className="italic">Add your session cost</span>
                      )}
                    </span>
                  )}
                  <span className="text-base font-normal"> / session</span>
                </p>
                <p className="text-sm opacity-90 mt-1">
                  {isEditing ? (
                    <div className="flex items-center">
                      <input
                        type="number"
                        value={tempTherapistData.session_details?.duration || 0}
                        onChange={(e) => handleNestedInputChange('session_details', 'duration', e.target.value)}
                        className="w-16 bg-teal-600 bg-opacity-50 rounded px-2 py-1"
                      />
                      <span className="ml-1">minutes per session</span>
                    </div>
                  ) : (
                    <span className="text-sm">
                      {therapist.session_details?.duration ? (
                        `${therapist.session_details.duration} minutes per session`
                      ) : (
                        <span className=" italic">Add your session duration</span>
                      )}
                    </span>

                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-6 bg-white rounded-2xl shadow-lg p-6 border border-teal-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            About Me
          </h2>
          {isEditing ? (
            <textarea
              name="about"
              value={tempTherapistData.bio}
              onChange={handleInputChange}
              rows={4}
              className="w-full p-3 border rounded-lg bg-teal-50"
            />
          ) : (
            <p className="text-gray-600 leading-relaxed">
              {therapist.bio ? (
                therapist.bio
              ) : (
                <span className="text-gray-500 italic">Add something about yourself</span>
              )}
            </p>

          )}
        </div>

        {/* Main Content */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Details */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-teal-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Contact Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-teal-50 p-2 rounded-lg">
                    <FaEnvelope className="text-teal-600" />
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm text-gray-500">Email</p>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={tempTherapistData.email}
                        onChange={handleInputChange}
                        className="w-full bg-teal-50 rounded-lg px-3 py-2"
                      />
                    ) : (
                      <p className="font-medium text-gray-900">{therapist.email}</p>
                    )}
                  </div>
                </div>

                {therapist.phone && (
                  <div className="flex items-start">
                    <div className="bg-teal-50 p-2 rounded-lg">
                      <FaPhone className="text-teal-600" />
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="text-sm text-gray-500">Phone</p>
                      {isEditing ? (
                        <input
                          type="tel"
                          name="phone"
                          value={tempTherapistData.phone}
                          onChange={handleInputChange}
                          className="w-full bg-teal-50 rounded-lg px-3 py-2"
                        />
                      ) : (
                        <p className="font-medium text-gray-900">{therapist.phone}</p>
                      )}
                    </div>
                  </div>
                )}

                {therapist.location && (
                  <div className="flex items-start">
                    <div className="bg-teal-50 p-2 rounded-lg">
                      <FaMapMarkerAlt className="text-teal-600" />
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="text-sm text-gray-500">Location</p>
                      {isEditing ? (
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={tempTherapistData.location?.city || ''}
                            onChange={(e) => handleNestedInputChange('location', 'city', e.target.value)}
                            placeholder="City"
                            className="w-full bg-teal-50 rounded-lg px-3 py-2"
                          />
                          <input
                            type="text"
                            value={tempTherapistData.location?.country || ''}
                            onChange={(e) => handleNestedInputChange('location', 'country', e.target.value)}
                            placeholder="Country"
                            className="w-full bg-teal-50 rounded-lg px-3 py-2"
                          />
                        </div>
                      ) : (
                        <p className="font-medium text-gray-900">
                          {therapist.location.city}, {therapist.location.country}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Qualifications */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-teal-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
                Education & Qualifications
              </h2>
              {isEditing ? (
                <div>
                  {tempTherapistData.academic_background?.qualification?.map((q: string, index: number) => (
                    <div key={index} className="flex items-start mb-2">
                      <input
                        type="text"
                        value={q}
                        onChange={(e) => {
                          const newQualifications = [...tempTherapistData.academic_background.qualification];
                          newQualifications[index] = e.target.value;
                          setTempTherapistData({
                            ...tempTherapistData,
                            academic_background: {
                              ...tempTherapistData.academic_background,
                              qualification: newQualifications
                            }
                          });
                        }}
                        className="w-full bg-teal-50 rounded-lg px-3 py-2"
                      />
                      <button
                        onClick={() => {
                          const newQualifications = [...tempTherapistData.academic_background.qualification];
                          newQualifications.splice(index, 1);
                          setTempTherapistData({
                            ...tempTherapistData,
                            academic_background: {
                              ...tempTherapistData.academic_background,
                              qualification: newQualifications
                            }
                          });
                        }}
                        className="ml-2 text-red-500 mt-2"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const newQualifications = [...tempTherapistData.academic_background.qualification, ''];
                      setTempTherapistData({
                        ...tempTherapistData,
                        academic_background: {
                          ...tempTherapistData.academic_background,
                          qualification: newQualifications
                        }
                      });
                    }}
                    className="mt-2 text-sm text-teal-600 flex items-center"
                  >
                    <FaPlus className="mr-1" /> Add Qualification
                  </button>

                  <div className="mt-4">
                    <label className="text-sm text-gray-500">Years of Experience</label>
                    <input
                      type="number"
                      value={tempTherapistData.academic_background?.years_of_experience || 0}
                      onChange={(e) => handleNestedInputChange('academic_background', 'years_of_experience', e.target.value)}
                      className="w-full bg-teal-50 rounded-lg px-3 py-2"
                    />
                  </div>
                </div>
              ) : (
                <ul className="space-y-3">
                  {therapist.academic_background?.qualification && therapist.academic_background.qualification.length > 0 ? (
                    therapist.academic_background.qualification.map((q: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="h-5 w-5 text-teal-500 mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="ml-3 text-gray-700">{q}</span>
                      </li>
                    ))
                  ) : (
                    <p className="text-gray-500 italic">Add your qualifications</p>
                  )}
                </ul>

              )}
            </div>

            {/* Languages */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-teal-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                Languages Spoken
              </h2>
              {isEditing ? (
                <div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tempTherapistData.languages?.map((lang: string, index: number) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="text"
                          value={lang}
                          onChange={(e) => handleArrayChange('languages', index, e.target.value)}
                          className="px-4 py-2 bg-gradient-to-r from-teal-50 to-teal-100 text-teal-800 rounded-full text-sm font-medium"
                        />
                        <button
                          onClick={() => removeArrayItem('languages', index)}
                          className="ml-1 text-red-500"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => addArrayItem('languages', 'en')}
                    className="text-sm text-teal-600 flex items-center"
                  >
                    <FaPlus className="mr-1" /> Add Language
                  </button>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {therapist.languages && therapist.languages.length > 0 ? (
                    therapist.languages.map((lang: string) => (
                      <span
                        key={lang}
                        className="px-4 py-2 bg-gradient-to-r from-teal-50 to-teal-100 text-teal-800 rounded-full text-sm font-medium flex items-center"
                      >
                        <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
                        {lang === 'en'
                          ? 'English'
                          : lang === 'hi'
                            ? 'Hindi'
                            : lang === 'es'
                              ? 'Spanish'
                              : lang}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500 italic">Add languages you speak</p>
                  )}
                </div>

              )}
            </div>
          </div>

          {/* Right Column - Appointments */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-teal-100">
              {/* Appointment Tabs */}
              <div className="border-b border-gray-200 bg-gradient-to-r from-teal-50 to-teal-100">
                <nav className="flex">
                  <button
                    onClick={() => setActiveTab('future')}
                    className={`py-5 px-8 text-center font-medium text-base flex items-center ${activeTab === 'future'
                      ? 'border-b-2 border-teal-500 text-teal-700 bg-white shadow-sm'
                      : 'text-gray-600 hover:text-teal-600'
                      }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2 ${activeTab === 'future' ? 'text-teal-600' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Upcoming Appointments
                    <span className="ml-2 bg-teal-100 text-teal-800 text-xs py-0.5 px-2.5 rounded-full">
                      {futureAppointments.length}
                    </span>
                  </button>
                  <button
                    onClick={() => setActiveTab('past')}
                    className={`py-5 px-8 text-center font-medium text-base flex items-center ${activeTab === 'past'
                      ? 'border-b-2 border-teal-500 text-teal-700 bg-white shadow-sm'
                      : 'text-gray-600 hover:text-teal-600'
                      }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2 ${activeTab === 'past' ? 'text-teal-600' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Past Appointments
                    <span className="ml-2 bg-teal-100 text-teal-800 text-xs py-0.5 px-2.5 rounded-full">
                      {pastAppointments.length}
                    </span>
                  </button>
                </nav>
              </div>

              {/* Appointment List */}
              <div className="p-6">
                {activeTab === 'future' ? (
                  <AppointmentList
                    appointments={futureAppointments}
                    emptyMessage="No upcoming appointments"
                    emptyDescription="You don't have any scheduled appointments yet."
                  />
                ) : (
                  <AppointmentList
                    appointments={pastAppointments}
                    emptyMessage="No past appointments"
                    emptyDescription="Your completed appointments will appear here."
                    isPast
                  />
                )}
              </div>
            </div>

            {/* Stats Card */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl shadow-lg p-6 text-white">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm opacity-90">Total Sessions</p>
                    <p className="text-3xl font-bold mt-1">142</p>
                  </div>
                  <div className="bg-white bg-opacity-20 p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-teal-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  <span className="ml-1">12% from last month</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl shadow-lg p-6 text-white">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm opacity-90">Client Satisfaction</p>
                    <p className="text-3xl font-bold mt-1">98%</p>
                  </div>
                  <div className="bg-white bg-opacity-20 p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-teal-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  <span className="ml-1">3% from last month</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-cyan-500 to-teal-500 rounded-2xl shadow-lg p-6 text-white">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm opacity-90">Avg. Response Time</p>
                    <p className="text-3xl font-bold mt-1">2.1h</p>
                  </div>
                  <div className="bg-white bg-opacity-20 p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                  <span className="ml-1">0.3h from last month</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AppointmentList({
  appointments,
  emptyMessage,
  emptyDescription,
  isPast = false
}: {
  appointments: Appointment[];
  emptyMessage: string;
  emptyDescription: string;
  isPast?: boolean;
}) {
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
    <div className="flow-root">
      <ul className="divide-y divide-gray-100">
        {appointments.map((appointment) => (
          <li key={appointment.id} className="py-4 hover:bg-gray-50 rounded-lg px-3 transition-colors">
            <div className="flex items-center">
              <div className="relative">
                {appointment.client.profilePic ? (
                  <Image
                    className="h-14 w-14 rounded-full object-cover border-2 border-white shadow"
                    width={56}
                    height={56}
                    src={appointment.client.profilePic}
                    alt={appointment.client.name}
                  />
                ) : (
                  <div className="bg-gray-200 border-2 border-dashed rounded-full w-14 h-14 flex items-center justify-center text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
                <div className={`absolute -bottom-1 -right-1 rounded-full p-1 border-2 border-white ${appointment.status === 'scheduled' ? 'bg-yellow-400' :
                  appointment.status === 'completed' ? 'bg-green-500' :
                    'bg-red-500'
                  }`}></div>
              </div>
              <div className="ml-4 flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-gray-900 truncate">
                    {appointment.client.name}
                  </h3>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${appointment.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' :
                    appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </span>
                </div>
                <div className="mt-1 flex flex-wrap items-center text-sm text-gray-500">
                  <div className="flex items-center mr-4">
                    <svg
                      className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      {appointment.date.toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center mr-4">
                    <svg
                      className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>
                      {appointment.date.toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>
                      {appointment.duration} min
                    </span>
                  </div>
                </div>
              </div>
              <div className="ml-4 flex-shrink-0">
                <button className="inline-flex items-center px-3 py-1.5 border border-teal-200 shadow-sm text-sm font-medium rounded-lg text-teal-700 bg-teal-50 hover:bg-teal-100 focus:outline-none">
                  View Details
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}