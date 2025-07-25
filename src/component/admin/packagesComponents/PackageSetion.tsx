"use client"

// import { createPackage, deletePackage, listPackage, updatePackage } from "@/store/packageSlice";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { FaSort, FaSortUp, FaSortDown, FaPlus } from "react-icons/fa";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import { LoadingSpinnerWithOverlay } from "@/component/global/Loading";
import PackageFormModal from "./PackageModalForm";
import { addPackage, listPackage, removePackage, updatePackage } from "@/store/packageSlice";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import PackageDetailsModal from "./PackageDetails";

export type PackageType = 'standard' | 'advanced' | 'premium' | 'custom';

export interface Package {
    _id: string;
    name: string;
    package_type: PackageType;
    description?: string;
    max_webinars_per_month: number;
    max_attendees_per_webinar: number;
    max_duration_minutes: number;
    max_sessions_per_month: number;
    max_sessions_minutes: number;
    timeLine: number;
    price: number;
    is_active: boolean;
    created_at: string;
}

function PackageSections() {
    const [packages, setPackages] = useState<Package[]>([]);
    const [loading, setLoading] = useState(false);
    const [sortField, setSortField] = useState<"price" | "created_at" | null>(null);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
    const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

    const [pagination, setPagination] = useState({
        pageNum: 1,
        pageSize: 10,
        totalPages: 1,
        totalItems: 0
    });

    const dispatch = useDispatch();

    const fetchPackages = async () => {
        setLoading(true);
        try {
            const params = {
                pageNum: pagination.pageNum,
                pageSize: pagination.pageSize,
            };

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const response = await dispatch(listPackage(params as any) as any);

            if (response?.error) {
                toast.error(response.error.message);
            } else if (response.payload?.data) {
                setPackages(response.payload.data.packageList);
                const packageCount = response.payload.data.packageCount;
                const totalPages = Math.ceil(packageCount / pagination.pageSize);

                setPagination(prev => ({
                    ...prev,
                    totalPages,
                    totalItems: packageCount
                }));
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch packages");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPackages();
    }, [pagination.pageNum, pagination.pageSize]);

    const sortedPackages = useMemo(() => {
        if (!sortField) return packages;

        return [...packages].sort((a, b) => {
            let valueA = a[sortField];
            let valueB = b[sortField];

            if (sortField === "created_at") {
                valueA = new Date(valueA).getTime();
                valueB = new Date(valueB).getTime();
            }

            if (valueA < valueB) {
                return sortDirection === "asc" ? -1 : 1;
            }
            if (valueA > valueB) {
                return sortDirection === "asc" ? 1 : -1;
            }
            return 0;
        });
    }, [packages, sortField, sortDirection]);

    const validatePackageForm = (formData: Omit<Package, '_id' | 'created_at' | 'updated_at'>): boolean => {
        const {
            name,
            package_type,
            max_webinars_per_month,
            max_attendees_per_webinar,
            max_duration_minutes,
            max_sessions_per_month,
            max_sessions_minutes,
            timeLine,
            price,
            is_active,
        } = formData;

        if (!name || typeof name !== "string") {
            toast.error("Package name is required and must be a string.");
            return false;
        }

        if (!package_type || typeof package_type !== "string") {
            toast.error("Package type is required and must be a string.");
            return false;
        }

        if (typeof max_webinars_per_month !== "number" || max_webinars_per_month <= 0) {
            toast.error("Max webinars per month must be a positive number.");
            return false;
        }

        if (typeof max_attendees_per_webinar !== "number" || max_attendees_per_webinar <= 0) {
            toast.error("Max attendees per webinar must be a positive number.");
            return false;
        }

        if (typeof max_duration_minutes !== "number" || max_duration_minutes <= 0) {
            toast.error("Max duration in minutes must be a positive number.");
            return false;
        }

        if (typeof max_sessions_per_month !== "number" || max_sessions_per_month <= 0) {
            toast.error("Max sessions per month must be a positive number.");
            return false;
        }

        if (typeof max_sessions_minutes !== "number" || max_sessions_minutes <= 0) {
            toast.error("Max sessions minutes must be a positive number.");
            return false;
        }

        if (!timeLine || typeof timeLine !== "number") {
            toast.error("Time line is required and must be a number.");
            return false;
        }

        if (typeof price !== "number" || price < 0) {
            toast.error("Price must be a non-negative number.");
            return false;
        }

        if (typeof is_active !== "boolean") {
            toast.error("Active status must be a boolean.");
            return false;
        }

        return true;
    };


    const handleCreatePackage = async (formData: Omit<Package, '_id' | 'created_at' | 'updated_at'>) => {

        if (!validatePackageForm(formData)) return;

        setLoading(true);
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const response = await dispatch(addPackage(formData as any) as any);

            if (response?.error) {
                toast.error(response.error.message);
            } else if (response.payload?.data) {
                toast.success("Package created successfully!");
                fetchPackages();
                setSelectedPackage(null);
                setIsCreateModalOpen(false);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to create package");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdatePackage = async (formData: Package) => {

        if (!validatePackageForm(formData)) return;

        setLoading(true);
        try {
            if (!selectedPackage) return
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const response = await dispatch(updatePackage({ data: formData, id: selectedPackage._id } as any) as any);

            if (response?.error) {
                toast.error(response.error.message);
            } else if (response.payload?.data) {
                toast.success("Package updated successfully!");
                fetchPackages();
                setSelectedPackage(null);
                setIsCreateModalOpen(false);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to update package");
        } finally {
            setLoading(false);
        }
    };

    const handleDeletePackage = async () => {
        if (!selectedPackage) return;

        setLoading(true);
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const response = await dispatch(removePackage(selectedPackage._id as any) as any);

            if (response?.error) {
                toast.error(response.error.message);
            } else if (response.payload?.data) {
                toast.success("Package deleted successfully!");
                fetchPackages();
                setIsDeleteModalOpen(false);
                setSelectedPackage(null);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete package");
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

    const toggleSort = (field: "price" | "created_at") => {
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

    const getSortIcon = (field: "price" | "created_at") => {
        if (sortField !== field) return <FaSort className="text-gray-400" />;
        return sortDirection === "asc" ? <FaSortUp /> : <FaSortDown />;
    };

    return (
        <div className="p-6 bg-white rounded-xl shadow">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
                <h2 className="text-xl font-bold">Packages Management</h2>

                <div className="flex items-center gap-3">
                    <div className="flex items-center text-sm text-gray-500">
                        <span>Sort by:</span>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => toggleSort("price")}
                            className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm transition-all ${sortField === "price"
                                ? "bg-blue-50 text-blue-700 font-medium border border-blue-200"
                                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            <span>Price</span>
                            {getSortIcon("price")}
                        </button>

                        <button
                            onClick={() => toggleSort("created_at")}
                            className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm transition-all ${sortField === "created_at"
                                ? "bg-blue-50 text-blue-700 font-medium border border-blue-200"
                                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            <span>Date</span>
                            {getSortIcon("created_at")}
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
                            <span>Add Package</span>
                        </button>
                    </div>
                </div>
            </div>

            {loading && <LoadingSpinnerWithOverlay />}

            {/* Create/Update Modal */}
            <PackageFormModal
                isOpen={isCreateModalOpen}
                onClose={() => {
                    setIsCreateModalOpen(false);
                    setSelectedPackage(null);
                }}
                onSubmit={selectedPackage ? handleUpdatePackage : handleCreatePackage}
                initialData={selectedPackage}
            />

            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setSelectedPackage(null);
                }}
                onConfirm={handleDeletePackage}
                title="Delete Package"
                message="Are you sure you want to delete this package? This action cannot be undone."
            />

            {/* Package Details Modal - Add this */}
            <PackageDetailsModal
                isOpen={isDetailsModalOpen}
                onClose={() => {
                    setIsDetailsModalOpen(false);
                    setSelectedPackage(null);
                }}
                package={selectedPackage}
            />

            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (₹)</th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {sortedPackages.length > 0 ? (
                            sortedPackages.map((pkg) => (
                                <tr onClick={() => {
                                    setSelectedPackage(pkg);
                                    setIsDetailsModalOpen(true);
                                }} key={pkg._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-4 text-sm font-medium text-gray-900">{pkg.name}</td>
                                    <td className="py-4 px-4 text-sm text-gray-700 capitalize">{pkg.package_type}</td>
                                    <td className="py-4 px-4 text-sm text-gray-700">₹{pkg.price.toFixed(2)}</td>
                                    <td className="py-4 px-4">
                                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${pkg.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {pkg.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-sm text-gray-500">
                                        {formatDate(pkg.created_at)}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-gray-700 flex gap-5">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedPackage(pkg)
                                                setIsCreateModalOpen(true)
                                            }}
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            <MdEdit size={20} className="cursor-pointer" />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedPackage(pkg);
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
                                    No packages found
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
                    <span className="font-medium">{pagination.totalItems}</span> packages
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
        </div>
    )
}

export default PackageSections;