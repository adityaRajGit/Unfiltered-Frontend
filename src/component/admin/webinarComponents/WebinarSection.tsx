"use client"

import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { FaSort, FaSortUp, FaSortDown, FaPlus, FaFilter } from "react-icons/fa";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import { LoadingSpinnerWithOverlay } from "@/component/global/Loading";
// import PackageFormModal from "./PackageModalForm";
import { addWebinar, listWebinars, removeWebinar, updateWebinar } from "@/store/webinarSlice";
import DeleteConfirmationModal from "../packagesComponents/DeleteConfirmationModal";
import WebinarFormModal from "./WebinarModalForm";
import WebinarDetailsModal from "./WebinarDetails";
// import PackageDetailsModal from "./PackageDetails";


export interface Webinar {
    _id: string;
    title: string;
    description: string;
    host_name: string;
    scheduled_date: string;
    duration_minutes: number;
    status: string;
    meeting_url: string;
    tags: string[];
    visibility: boolean;
    created_at: Date;
}

function WebinarSection() {
    const [webinars, setWebinars] = useState<Webinar[]>([]);
    const [loading, setLoading] = useState(false);
    const [sortField, setSortField] = useState<"scheduled_date" | "status" | null>(null);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [selectedWebinar, setSelectedWebinar] = useState<Webinar | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

    const statusOptions = [
        { value: "all", label: "All Status" },
        { value: "scheduled", label: "Scheduled" },
        { value: "live", label: "Live" },
        { value: "completed", label: "Completed" },
        { value: "cancelled", label: "Cancelled" }
    ];

    const [pagination, setPagination] = useState({
        pageNum: 1,
        pageSize: 10,
        totalPages: 1,
        totalItems: 0
    });

    const dispatch = useDispatch();

    const fetchWebinars = async () => {
        setLoading(true);
        try {
            const params = {
                pageNum: pagination.pageNum,
                pageSize: pagination.pageSize,
            };

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const response = await dispatch(listWebinars(params as any) as any);

            if (response?.error) {
                toast.error(response.error.message);
            } else if (response.payload?.data) {
                setWebinars(response.payload.data.webinarList);
                const packageCount = response.payload.data.webinarCount;
                const totalPages = Math.ceil(packageCount / pagination.pageSize);

                setPagination(prev => ({
                    ...prev,
                    totalPages,
                    totalItems: packageCount
                }));
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch webinars");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWebinars();
    }, [pagination.pageNum, pagination.pageSize]);

    const sortedWebinars = useMemo(() => {
        // First filter by status
        let filteredWebinars = webinars;
        if (statusFilter !== "all") {
            filteredWebinars = webinars.filter(webinar => webinar.status === statusFilter);
        }

        // Then sort if sortField is selected
        if (!sortField) return filteredWebinars;

        return [...filteredWebinars].sort((a, b) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let valueA: any = a[sortField];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let valueB: any = b[sortField];

            if (sortField === "scheduled_date") {
                valueA = new Date(valueA as string).getTime();
                valueB = new Date(valueB as string).getTime();
            }

            if (sortField === "status") {
                const statusOrder = { 'scheduled': 1, 'live': 2, 'completed': 3, 'cancelled': 4 };
                valueA = statusOrder[valueA as keyof typeof statusOrder] || 5;
                valueB = statusOrder[valueB as keyof typeof statusOrder] || 5;
            }

            if (valueA < valueB) {
                return sortDirection === "asc" ? -1 : 1;
            }
            if (valueA > valueB) {
                return sortDirection === "asc" ? 1 : -1;
            }
            return 0;
        });
    }, [webinars, sortField, sortDirection, statusFilter]);

    const validateWebinarForm = (formData: Omit<Webinar, '_id' | 'created_at' | 'updated_at'>): boolean => {
        const {
            title,
            description,
            host_name,
            scheduled_date,
            duration_minutes,
            status,
            meeting_url,
            tags
        } = formData;

        if (!title || typeof title !== "string") {
            toast.error("Webinar title is required and must be a string.");
            return false;
        }

        if (!description || typeof description !== "string") {
            toast.error("Webinar description is required and must be a string.");
            return false;
        }

        if (!host_name || typeof host_name !== "string") {
            toast.error("Host name is required and must be a string.");
            return false;
        }

        if (!scheduled_date || typeof scheduled_date !== "string") {
            toast.error("Scheduled date is required and must be a string.");
            return false;
        }

        if (!duration_minutes || typeof duration_minutes !== "number" || duration_minutes <= 0) {
            toast.error("Duration minutes must be a positive number.");
            return false;
        }

        if (!status || typeof status !== "string") {
            toast.error("Status is required and must be a string.");
            return false;
        }

        if (!meeting_url || typeof meeting_url !== "string") {
            toast.error("Meeting URL is required and must be a string.");
            return false;
        }

        if (!tags || !Array.isArray(tags)) {
            toast.error("Tags must be an array.");
            return false;
        }

        return true;
    };


    const handleCreateWebinar = async (formData: Omit<Webinar, '_id' | 'created_at' | 'updated_at'>) => {

        if (!validateWebinarForm(formData)) return;

        setLoading(true);
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const response = await dispatch(addWebinar(formData as any) as any);

            if (response?.error) {
                toast.error(response.error.message);
            } else if (response.payload?.data) {
                toast.success("Webinar created successfully!");
                fetchWebinars();
                setSelectedWebinar(null);
                setIsCreateModalOpen(false);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to create webinar");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateWebinar = async (formData: Webinar) => {

        if (!validateWebinarForm(formData)) return;

        setLoading(true);
        try {
            if (!selectedWebinar) return
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const response = await dispatch(updateWebinar({ data: formData, id: selectedWebinar._id } as any) as any);

            if (response?.error) {
                toast.error(response.error.message);
            } else if (response.payload?.data) {
                toast.success("Webinar updated successfully!");
                fetchWebinars();
                setSelectedWebinar(null);
                setIsCreateModalOpen(false);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to update Webinar");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteWebinar = async () => {
        if (!selectedWebinar) return;

        setLoading(true);
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const response = await dispatch(removeWebinar(selectedWebinar._id as any) as any);

            if (response?.error) {
                toast.error(response.error.message);
            } else if (response.payload?.data) {
                toast.success("Webinar deleted successfully!");
                fetchWebinars();
                setIsDeleteModalOpen(false);
                setSelectedWebinar(null);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete Webinar");
        } finally {
            setLoading(false);
        }
    };

    const handlePreviousPage = () => {
        if (pagination.pageNum > 1) {
            setPagination(prev => ({ ...prev, pageNum: prev.pageNum - 1 }));
        }
    };

    const handleNextPage = () => {
        if (pagination.pageNum < pagination.totalPages) {
            setPagination(prev => ({ ...prev, pageNum: prev.pageNum + 1 }));
        }
    };

    const toggleSort = (field: "scheduled_date" | "status") => {
        if (sortField === field) {
            setSortDirection(prev => prev === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("desc");
        }
    };


    const resetSort = () => {
        setSortField(null);
        setSortDirection("desc");
    };


    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getSortIcon = (field: "scheduled_date" | "status") => {
        if (sortField !== field) return <FaSort className="text-gray-400" />;
        return sortDirection === "asc" ? <FaSortUp /> : <FaSortDown />;
    };

    return (
        <div className="p-6 bg-white rounded-xl shadow">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
                <h2 className="text-xl font-bold">Packages Management</h2>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    {/* Status Filter Dropdown */}
                    <div className="relative">
                        <div className="flex items-center gap-2">
                            <FaFilter className="text-gray-500" size={14} />
                            <div className="relative">
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 cursor-pointer shadow-sm"
                                >
                                    {statusOptions.map(option => (
                                        <option key={option.value} value={option.value} className="py-2">
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                {/* Custom dropdown arrow */}
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                            {/* Status indicator badge */}
                            {statusFilter !== "all" && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                                    {statusOptions.find(opt => opt.value === statusFilter)?.label}
                                    <button
                                        onClick={() => setStatusFilter("all")}
                                        className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-600 focus:outline-none focus:bg-blue-200 focus:text-blue-600 transition-colors"
                                        aria-label="Clear filter"
                                    >
                                        <svg className="w-2.5 h-2.5" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                                            <path strokeLinecap="round" strokeWidth="1.5" d="m1 1 6 6m0-6-6 6" />
                                        </svg>
                                    </button>
                                </span>
                            )}
                        </div>
                    </div>


                    <div className="flex items-center gap-3">
                        <div className="flex items-center text-sm text-gray-500">
                            <span>Sort by:</span>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => toggleSort("scheduled_date")}
                                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm transition-all ${sortField === "scheduled_date"
                                    ? "bg-blue-50 text-blue-700 font-medium border border-blue-200"
                                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                                    }`}
                            >
                                <span>Scheduled Date</span>
                                {getSortIcon("scheduled_date")}
                            </button>

                            {(sortField) && (
                                <button
                                    onClick={resetSort}
                                    className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm bg-gray-50 text-gray-600 hover:bg-gray-100 transition-all"
                                >
                                    Reset
                                </button>
                            )}

                            <button
                                onClick={() => setIsCreateModalOpen(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                                <FaPlus size={14} />
                                <span>Add Webinar</span>
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            {loading && <LoadingSpinnerWithOverlay />}

            {/* Create/Update Modal */}
            <WebinarFormModal
                isOpen={isCreateModalOpen}
                onClose={() => {
                    setIsCreateModalOpen(false);
                    setSelectedWebinar(null);
                }}
                onSubmit={selectedWebinar ? handleUpdateWebinar : handleCreateWebinar}
                initialData={selectedWebinar}
            />

            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setSelectedWebinar(null);
                }}
                onConfirm={handleDeleteWebinar}
                title="Delete Webinar"
                message="Are you sure you want to delete this webinar? This action cannot be undone."
            />

            {/* Webinat Details Modal - Add this */}
            <WebinarDetailsModal
                isOpen={isDetailsModalOpen}
                onClose={() => {
                    setIsDetailsModalOpen(false);
                    setSelectedWebinar(null);
                }}
                webinar={selectedWebinar}
            />

            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Host Name</th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scheduled Date</th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration (mins)</th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meeting Url</th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {sortedWebinars?.length > 0 ? (
                            sortedWebinars.map((web) => (
                                <tr onClick={() => {
                                    setSelectedWebinar(web);
                                    setIsDetailsModalOpen(true);
                                }} key={web._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-4 text-sm font-medium text-gray-900">{web.title}</td>
                                    <td className="py-4 px-4 text-sm text-gray-700 capitalize">{web.host_name}</td>
                                    <td className="py-4 px-4 text-sm text-gray-700">{formatDate(web.scheduled_date)}</td>
                                    <td className="py-4 px-4 text-sm text-gray-700">{web.duration_minutes} minutes</td>
                                    <td className="py-4 px-4 text-sm text-gray-700 uppercase">{web.status}</td>
                                    <td className="py-4 px-4 text-sm text-gray-500">{web.meeting_url}</td>
                                    <td className="py-4 px-4 text-sm text-gray-700 flex gap-5">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedWebinar(web)
                                                setIsCreateModalOpen(true)
                                            }}
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            <MdEdit size={20} className="cursor-pointer" />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedWebinar(web);
                                                setIsDeleteModalOpen(true);
                                            }}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            <MdDeleteForever size={20} className="cursor-pointer" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={9} className="py-8 text-center text-gray-500">
                                    No Webinars found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
                <div className="text-sm text-gray-700">
                    Showing <span className="font-medium">{(pagination.pageNum - 1) * pagination.pageSize + 1}</span> to{" "}
                    <span className="font-medium">
                        {Math.min(pagination.pageNum * pagination.pageSize, pagination.totalItems)}
                    </span> of{" "}
                    <span className="font-medium">{pagination.totalItems}</span> webinars
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handlePreviousPage}
                        disabled={pagination.pageNum === 1}
                        className={`px-4 py-2 rounded-md text-sm font-medium ${pagination.pageNum === 1
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                    >
                        Previous
                    </button>
                    <div className="flex items-center px-4 py-2 bg-gray-100 rounded-md text-sm font-medium text-gray-700">
                        Page {pagination.pageNum} of {pagination.totalPages}
                    </div>
                    <button
                        onClick={handleNextPage}
                        disabled={pagination.pageNum >= pagination.totalPages}
                        className={`px-4 py-2 rounded-md text-sm font-medium ${pagination.pageNum >= pagination.totalPages
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div >
    )
}

export default WebinarSection;