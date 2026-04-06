"use client"
import { LoadingSpinnerWithOverlay } from '@/component/global/Loading'
import { getAllUsers } from '@/store/userSlice'
import { getInitials } from '@/utils/GetInitials'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

interface User {
    _id: string;
    name: string;
    email: string;
    username: string;
    sessions_balance: number;
    profile_image: string;
    email_verified: boolean;
    status: string;
    googleId: string;
    isPrivate: boolean;
    role: string;
    blockedUsers: string[];
    following: string[];
    followers: string[];
    is_deleted: boolean;
    created_at: string;
    updated_at: string;
}

interface Pagination {
    pageNum: number;
    pageSize: number;
    totalPages?: number;
    totalItems?: number;
}

function UsersSection() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(false)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [pagination, setPagination] = useState<Pagination>({
        pageNum: 1,
        pageSize: 10
    })

    const dispatch = useDispatch()

    const fetchAllUsers = async () => {
        setLoading(true);
        try {
            const params = {
                pageNum: pagination.pageNum,
                pageSize: pagination.pageSize,
            };

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const response = await dispatch(getAllUsers(params as any) as any);

            if (response?.error) {
                toast.error(response.error.message);
            } else if (response.payload?.data) {
                console.log(response.payload.data)
                setUsers(response.payload.data.userList);
                const userCount = response.payload.data.userCount;
                const totalPages = Math.ceil(userCount / pagination.pageSize);

                setPagination(prev => ({
                    ...prev,
                    totalPages,
                    totalItems: userCount
                }));
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllUsers()
    }, [pagination.pageNum])

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= (pagination.totalPages || 1)) {
            setPagination(prev => ({ ...prev, pageNum: newPage }));
        }
    };

    const handleUserClick = (user: User) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
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
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusBadge = (status: string) => {
        const statusColors = {
            active: 'bg-green-100 text-green-800',
            inactive: 'bg-gray-100 text-gray-800',
            suspended: 'bg-red-100 text-red-800',
            pending: 'bg-yellow-100 text-yellow-800'
        };
        
        const color = statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800';
        return `inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${color}`;
    };

    if (loading) {
        return <LoadingSpinnerWithOverlay />
    }

    return (
        <>
            <div className="p-6 bg-white rounded-xl shadow-lg">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-[#009689] mb-2">Users</h1>
                    <p className="text-[#009689]">Manage and view all platform users</p>
                </div>

                {/* Users Table */}
                <div className="overflow-hidden rounded-lg border border-teal-100">
                    <table className="min-w-full divide-y divide-teal-100">
                        <thead className="bg-teal-50">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-teal-800">
                                    User
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-teal-800">
                                    Sessions Balance
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-teal-800">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-teal-800">
                                    Account Type
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-teal-800">
                                    Joined Date
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-teal-50 bg-white">
                            {users.map((user) => (
                                <tr
                                    key={user._id}
                                    className="hover:bg-teal-50 transition-colors duration-200 cursor-pointer"
                                    onClick={() => handleUserClick(user)}
                                >
                                    {/* User Info */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="h-12 w-12 flex-shrink-0">
                                                {
                                                    user.profile_image
                                                        ? <Image
                                                            width={48}
                                                            height={48}
                                                            className="h-12 w-12 rounded-full object-cover border-2 border-teal-100"
                                                            src={user.profile_image}
                                                            alt={user.name}
                                                        />
                                                        : <span className="text-teal-600 font-bold text-lg uppercase border h-12 w-12 flex items-center justify-center rounded-full bg-teal-50">
                                                            {getInitials(user?.name || '')}
                                                        </span>
                                                }
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-semibold text-teal-900">
                                                    {user.name}
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1">
                                                    {user.email}
                                                </div>
                                                <div className="text-xs text-gray-400 mt-1">
                                                    @{user.username}
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Sessions Balance */}
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                            {user.sessions_balance || 0} sessions
                                        </span>
                                    </td>

                                    {/* Status */}
                                    <td className="px-6 py-4">
                                        <span className={getStatusBadge(user.status)}>
                                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                                        </span>
                                    </td>

                                    {/* Account Type */}
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-600">
                                            {user.googleId ? (
                                                <span className="flex items-center">
                                                    <span className="mr-2">🔗</span>
                                                    Google Account
                                                </span>
                                            ) : (
                                                <span>Email Account</span>
                                            )}
                                            {/* <div className="text-xs text-gray-400 mt-1">
                                                {user.isPrivate ? 'Private Account' : 'Public Account'}
                                            </div> */}
                                        </div>
                                    </td>

                                    {/* Joined Date */}
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-600">
                                            {formatDate(user.created_at)}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Empty State */}
                    {users.length === 0 && !loading && (
                        <div className="text-center py-12">
                            <div className="text-teal-400 text-6xl mb-4">👥</div>
                            <h3 className="text-xl font-semibold text-teal-800 mb-2">No Users Found</h3>
                            <p className="text-teal-600">We couldn&apos;t find any users matching your criteria.</p>
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
                                    ({pagination.totalItems.toLocaleString()} total users)
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

            {/* User Details Modal */}
            {isModalOpen && selectedUser && (
                <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div style={{
                        scrollbarWidth: "none"
                    }} className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="bg-teal-500 text-white p-6 rounded-t-xl">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center space-x-4">
                                    <div className="h-16 w-16 flex-shrink-0">
                                        {selectedUser.profile_image ? (
                                            <Image
                                                width={100}
                                                height={100}
                                                className="h-16 w-16 rounded-full object-cover border-2 border-white"
                                                src={selectedUser.profile_image}
                                                alt={selectedUser.name}
                                            />
                                        ) : (
                                            <span className="text-teal-600 font-bold text-xl uppercase border h-16 w-16 flex items-center justify-center rounded-full bg-white">
                                                {getInitials(selectedUser.name)}
                                            </span>
                                        )}
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold">{selectedUser.name}</h2>
                                        <p className="text-teal-100">{selectedUser.email}</p>
                                        <p className="text-teal-200 text-sm">@{selectedUser.username}</p>
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
                                        <label className="text-sm font-medium text-gray-600">User ID</label>
                                        <p className="text-gray-900 text-sm font-mono">{selectedUser._id}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Phone</label>
                                        <p className="text-gray-900">N/A</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Email Verified</label>
                                        <p className="text-gray-900">
                                            {selectedUser.email_verified ? (
                                                <span className="text-green-600 font-medium">Yes</span>
                                            ) : (
                                                <span className="text-red-600 font-medium">No</span>
                                            )}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Account Status</label>
                                        <p className="text-gray-900">
                                            <span className={getStatusBadge(selectedUser.status)}>
                                                {selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Account Details */}
                            <div>
                                <h3 className="text-lg font-semibold text-teal-800 mb-3">Account Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Sessions Balance</label>
                                        <p className="text-gray-900 text-xl font-semibold">
                                            {selectedUser.sessions_balance} sessions
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Account Type</label>
                                        <p className="text-gray-900">
                                            {selectedUser.googleId ? (
                                                <span className="flex items-center text-blue-600">
                                                    <span className="mr-2">🔗</span>
                                                    Google OAuth
                                                </span>
                                            ) : (
                                                <span>Email Registration</span>
                                            )}
                                        </p>
                                    </div>
                                    {/* <div>
                                        <label className="text-sm font-medium text-gray-600">Profile Privacy</label>
                                        <p className="text-gray-900">
                                            {selectedUser.isPrivate ? (
                                                <span className="text-purple-600 font-medium">Private</span>
                                            ) : (
                                                <span className="text-green-600 font-medium">Public</span>
                                            )}
                                        </p>
                                    </div> */}
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">User Role</label>
                                        <p className="text-gray-900 capitalize">
                                            <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                                                {selectedUser.role}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Statistics */}
                            {/* <div>
                                <h3 className="text-lg font-semibold text-teal-800 mb-3">Social Statistics</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                                        <div className="text-2xl font-bold text-teal-600">{selectedUser.followers.length}</div>
                                        <div className="text-sm text-gray-600">Followers</div>
                                    </div>
                                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                                        <div className="text-2xl font-bold text-teal-600">{selectedUser.following.length}</div>
                                        <div className="text-sm text-gray-600">Following</div>
                                    </div>
                                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                                        <div className="text-2xl font-bold text-teal-600">{selectedUser.blockedUsers.length}</div>
                                        <div className="text-sm text-gray-600">Blocked Users</div>
                                    </div>
                                </div>
                            </div> */}

                            {/* Account Information */}
                            <div>
                                <h3 className="text-lg font-semibold text-teal-800 mb-3">Account Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Created At</label>
                                        <p className="text-gray-900">{formatDate(selectedUser.created_at)}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Last Updated</label>
                                        <p className="text-gray-900">{formatDate(selectedUser.updated_at)}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Account Deleted</label>
                                        <p className="text-gray-900">
                                            {selectedUser.is_deleted ? (
                                                <span className="text-red-600 font-medium">Yes</span>
                                            ) : (
                                                <span className="text-green-600 font-medium">No</span>
                                            )}
                                        </p>
                                    </div>
                                    {/* {selectedUser.googleId && (
                                        <div>
                                            <label className="text-sm font-medium text-gray-600">Google ID</label>
                                            <p className="text-gray-900 text-sm font-mono truncate">
                                                {selectedUser.googleId}
                                            </p>
                                        </div>
                                    )} */}
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="bg-gray-50 px-6 py-4 rounded-b-xl flex justify-end space-x-3">
                            <button
                                onClick={closeModal}
                                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                            >
                                Close
                            </button>
                            {/* <button
                                onClick={() => {
                                    // Add action for editing user if needed
                                    console.log('Edit user:', selectedUser._id);
                                }}
                                className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                            >
                                Edit User
                            </button> */}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default UsersSection