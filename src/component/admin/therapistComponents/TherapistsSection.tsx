"use client"
import { LoadingSpinnerWithOverlay } from '@/component/global/Loading'
import { getAllTherapist } from '@/store/therapistSlice'
import { getInitials } from '@/utils/GetInitials'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

interface Therapist {
    _id: string;
    name: string;
    email: string;
    username: string;
    phone: string;
    profile_image: string;
    academic_background: {
        qualification: string[];
        years_of_experience: number;
    };
    bio: string;
    specialization: string[];
    languages: string[];
    location: {
        city?: string;
        country?: string;
    };
    email_verified?: boolean;
    is_deleted?: boolean;
    created_at?: string;
    updated_at?: string;
}

interface Pagination {
    pageNum: number;
    pageSize: number;
    totalPages?: number;
    totalItems?: number;
}

function TherapistsSection() {
    const [therapists, setTherapists] = useState<Therapist[]>([])
    const [loading, setLoading] = useState(false)
    const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [pagination, setPagination] = useState<Pagination>({
        pageNum: 1,
        pageSize: 10
    })

    const dispatch = useDispatch()

    const fetchAllTherapists = async () => {
        setLoading(true);
        try {
            const params = {
                pageNum: pagination.pageNum,
                pageSize: pagination.pageSize,
            };

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const response = await dispatch(getAllTherapist(params as any) as any);

            if (response?.error) {
                toast.error(response.error.message);
            } else if (response.payload?.data) {
                // console.log(response.payload.data)
                setTherapists(response.payload.data.therapistList);
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
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllTherapists()
    }, [pagination.pageNum])

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= (pagination.totalPages || 1)) {
            setPagination(prev => ({ ...prev, pageNum: newPage }));
        }
    };

    const handleTherapistClick = (therapist: Therapist) => {
        setSelectedTherapist(therapist);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTherapist(null);
    };

    // Improved pagination logic for large datasets
    const generatePageNumbers = () => {
        const totalPages = pagination.totalPages || 1;
        const currentPage = pagination.pageNum;
        const pages = [];

        // Always show first page
        pages.push(1);

        // Calculate range around current page
        const startPage = Math.max(2, currentPage - 1);
        const endPage = Math.min(totalPages - 1, currentPage + 1);

        // Add ellipsis after first page if needed
        if (startPage > 2) {
            pages.push('...');
        }

        // Add pages around current page
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        // Add ellipsis before last page if needed
        if (endPage < totalPages - 1) {
            pages.push('...');
        }

        // Always show last page if there is more than one page
        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return pages;
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return <LoadingSpinnerWithOverlay />
    }

    return (
        <>
            <div className="p-6 bg-white rounded-xl shadow-lg">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-[#009689] mb-2">Our Therapists</h1>
                    <p className="text-[#009689]">Find the right mental health professional for you</p>
                </div>

                {/* Therapists Table */}
                <div className="overflow-hidden rounded-lg border border-teal-100">
                    <table className="min-w-full divide-y divide-teal-100">
                        <thead className="bg-teal-50">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-teal-800">
                                    Therapist
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-teal-800">
                                    Experience
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-teal-800">
                                    Languages
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-teal-800">
                                    Location
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-teal-50 bg-white">
                            {therapists.map((therapist) => (
                                <tr
                                    key={therapist._id}
                                    className="hover:bg-teal-50 transition-colors duration-200 cursor-pointer"
                                    onClick={() => handleTherapistClick(therapist)}
                                >
                                    {/* Therapist Info */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="h-12 w-12 flex-shrink-0">
                                                {
                                                    therapist.profile_image
                                                        ? <Image
                                                            width={45}
                                                            height={45}
                                                            className="h-12 w-12 rounded-full object-cover border-2 border-teal-100"
                                                            src={therapist.profile_image}
                                                            alt={therapist.name}
                                                        />
                                                        : <span className="text-teal-600 font-bold text-lg uppercase border h-12 w-12 flex items-center justify-center rounded-full">
                                                            {getInitials(therapist?.name || '')}
                                                        </span>
                                                }
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-semibold text-teal-900">
                                                    {therapist.name}
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1">
                                                    {therapist.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Experience */}
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-800">
                                            {therapist.academic_background.years_of_experience ? therapist.academic_background.years_of_experience + ' years' : 'N/A'}
                                        </span>
                                    </td>

                                    {/* Languages */}
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-600">
                                            {therapist.languages.length ? therapist.languages.join(', ').toUpperCase() : 'N/A'}
                                        </div>
                                    </td>

                                    {/* Location */}
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-600">
                                            {therapist.location?.city && (
                                                <div className="flex items-center text-teal-700">
                                                    <span className="mr-1">📍</span>
                                                    {therapist.location.city}
                                                    {therapist.location.country && `, ${therapist.location.country}`}
                                                </div>
                                            )}
                                            {!therapist.location?.city && (
                                                <span className="text-gray-400">Not specified</span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Empty State */}
                    {therapists.length === 0 && !loading && (
                        <div className="text-center py-12">
                            <div className="text-teal-400 text-6xl mb-4">🧘‍♀️</div>
                            <h3 className="text-xl font-semibold text-teal-800 mb-2">No Therapists Found</h3>
                            <p className="text-teal-600">We couldn&apos;t find any therapists matching your criteria.</p>
                        </div>
                    )}
                </div>

                {/* Improved Pagination */}
                {pagination.totalPages && pagination.totalPages > 1 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between border-t border-teal-100 pt-6 mt-6 gap-4">
                        {/* Page Info */}
                        <div className="text-sm text-teal-700">
                            Showing page {pagination.pageNum} of {pagination.totalPages}
                            {pagination.totalItems && (
                                <span className="text-teal-500 ml-2">
                                    ({pagination.totalItems.toLocaleString()} total therapists)
                                </span>
                            )}
                        </div>

                        {/* Pagination Controls */}
                        <div className="flex items-center space-x-2">
                            {/* First Button */}
                            <button
                                onClick={() => handlePageChange(1)}
                                disabled={pagination.pageNum === 1}
                                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${pagination.pageNum === 1
                                    ? 'bg-teal-100 text-teal-400 cursor-not-allowed'
                                    : 'bg-teal-500 text-white hover:bg-teal-600'
                                    }`}
                            >
                                First
                            </button>

                            {/* Previous Button */}
                            <button
                                onClick={() => handlePageChange(pagination.pageNum - 1)}
                                disabled={pagination.pageNum === 1}
                                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${pagination.pageNum === 1
                                    ? 'bg-teal-100 text-teal-400 cursor-not-allowed'
                                    : 'bg-teal-500 text-white hover:bg-teal-600'
                                    }`}
                            >
                                Previous
                            </button>

                            {/* Page Numbers */}
                            <div className="flex items-center space-x-1">
                                {generatePageNumbers().map((page, index) => (
                                    typeof page === 'number' ? (
                                        <button
                                            key={index}
                                            onClick={() => handlePageChange(page)}
                                            className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${page === pagination.pageNum
                                                ? 'bg-teal-500 text-white'
                                                : 'bg-teal-100 text-teal-700 hover:bg-teal-200'
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    ) : (
                                        <span key={index} className="text-teal-500 px-2">
                                            {page}
                                        </span>
                                    )
                                ))}
                            </div>

                            {/* Next Button */}
                            <button
                                onClick={() => handlePageChange(pagination.pageNum + 1)}
                                disabled={pagination.pageNum === pagination.totalPages}
                                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${pagination.pageNum === pagination.totalPages
                                    ? 'bg-teal-100 text-teal-400 cursor-not-allowed'
                                    : 'bg-teal-500 text-white hover:bg-teal-600'
                                    }`}
                            >
                                Next
                            </button>

                            {/* Last Button */}
                            <button
                                onClick={() => handlePageChange(pagination.totalPages!)}
                                disabled={pagination.pageNum === pagination.totalPages}
                                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${pagination.pageNum === pagination.totalPages
                                    ? 'bg-teal-100 text-teal-400 cursor-not-allowed'
                                    : 'bg-teal-500 text-white hover:bg-teal-600'
                                    }`}
                            >
                                Last
                            </button>
                        </div>

                        {/* Quick Jump (Optional for very large datasets) */}
                        {pagination.totalPages && pagination.totalPages > 10 && (
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-teal-700">Go to:</span>
                                <input
                                    type="number"
                                    min="1"
                                    max={pagination.totalPages}
                                    className="w-16 px-2 py-1 border border-teal-300 rounded text-sm"
                                    placeholder="Page"
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            const page = parseInt((e.target as HTMLInputElement).value);
                                            if (page >= 1 && page <= pagination.totalPages!) {
                                                handlePageChange(page);
                                            }
                                        }
                                    }}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Therapist Details Modal */}
            {isModalOpen && selectedTherapist && (
                <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div style={{
                        scrollbarWidth: "none"
                    }} className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="bg-teal-500 text-white p-6 rounded-t-xl">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center space-x-4">
                                    <div className="h-16 w-16 flex-shrink-0">
                                        {selectedTherapist.profile_image ? (
                                            <Image
                                                width={100}
                                                height={100}
                                                className="h-16 w-16 rounded-full object-cover border-2 border-white"
                                                src={selectedTherapist.profile_image}
                                                alt={selectedTherapist.name}
                                            />
                                        ) : (
                                            <span className="text-teal-600 font-bold text-xl uppercase border h-16 w-16 flex items-center justify-center rounded-full bg-white">
                                                {getInitials(selectedTherapist.name)}
                                            </span>
                                        )}
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold">{selectedTherapist.name}</h2>
                                        <p className="text-teal-100">{selectedTherapist.email}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="text-white hover:text-teal-200 text-2xl font-bold"
                                >
                                    ×
                                </button>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 space-y-6">
                            {/* Basic Information */}
                            <div>
                                <h3 className="text-lg font-semibold text-teal-800 mb-3">Basic Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Username</label>
                                        <p className="text-gray-900">{selectedTherapist.username}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Phone</label>
                                        <p className="text-gray-900">{selectedTherapist.phone || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Email Verified</label>
                                        <p className="text-gray-900">
                                            {selectedTherapist.email_verified ? (
                                                <span className="text-green-600 font-medium">Yes</span>
                                            ) : (
                                                <span className="text-red-600 font-medium">No</span>
                                            )}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Status</label>
                                        <p className="text-gray-900">
                                            {selectedTherapist.is_deleted ? (
                                                <span className="text-red-600 font-medium">Deleted</span>
                                            ) : (
                                                <span className="text-green-600 font-medium">Active</span>
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Academic Background */}
                            <div>
                                <h3 className="text-lg font-semibold text-teal-800 mb-3">Academic Background</h3>
                                <div className="space-y-2">
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Experience</label>
                                        <p className="text-gray-900">
                                            {selectedTherapist.academic_background.years_of_experience ? selectedTherapist.academic_background.years_of_experience + ' years' : 'N/A'}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Qualifications</label>
                                        {
                                            selectedTherapist.academic_background.qualification.length
                                                ? <ul className="list-disc list-inside text-gray-900 space-y-1">
                                                    {selectedTherapist.academic_background.qualification.map((qual, index) => (
                                                        <li key={index}>{qual}</li>
                                                    ))}
                                                </ul>
                                                : <p className="text-gray-900">
                                                    N/A
                                                </p>
                                        }
                                    </div>
                                </div>
                            </div>

                            {/* Bio */}
                            <div>
                                <h3 className="text-lg font-semibold text-teal-800 mb-3">Bio</h3>
                                <p className="text-gray-700 leading-relaxed">{selectedTherapist.bio ? selectedTherapist.bio : 'N/A'}</p>
                            </div>

                            {/* Specializations */}
                            <div>
                                <h3 className="text-lg font-semibold text-teal-800 mb-3">Specializations</h3>
                                <div className="flex flex-wrap gap-2">
                                    {selectedTherapist.specialization.length ?
                                        selectedTherapist.specialization.map((spec, index) => (
                                            <span
                                                key={index}
                                                className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium"
                                            >
                                                {spec}
                                            </span>
                                        ))
                                        : <p className="text-gray-700">N/A</p>
                                    }
                                </div>
                            </div>

                            {/* Languages */}
                            <div>
                                <h3 className="text-lg font-semibold text-teal-800 mb-3">Languages</h3>
                                <div className="flex flex-wrap gap-2">
                                    {selectedTherapist.languages.length ?
                                        selectedTherapist.languages.map((lang, index) => (
                                            <span
                                                key={index}
                                                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                                            >
                                                {lang.toUpperCase()}
                                            </span>
                                        ))
                                        : <p className="text-gray-700">N/A</p>
                                    }
                                </div>
                            </div>

                            {/* Location */}
                            <div>
                                <h3 className="text-lg font-semibold text-teal-800 mb-3">Location</h3>
                                <div className="text-gray-700">
                                    {selectedTherapist.location?.city ? (
                                        <div className="flex items-center">
                                            <span className="mr-2">📍</span>
                                            {selectedTherapist.location.city}
                                            {selectedTherapist.location.country && `, ${selectedTherapist.location.country}`}
                                        </div>
                                    ) : (
                                        <span className="text-gray-500">Not specified</span>
                                    )}
                                </div>
                            </div>

                            {/* Account Information */}
                            <div>
                                <h3 className="text-lg font-semibold text-teal-800 mb-3">Account Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Created At</label>
                                        <p className="text-gray-900">{formatDate(selectedTherapist.created_at)}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Last Updated</label>
                                        <p className="text-gray-900">{formatDate(selectedTherapist.updated_at)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="bg-gray-50 px-6 py-4 rounded-b-xl flex justify-end">
                            <button
                                onClick={closeModal}
                                className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default TherapistsSection