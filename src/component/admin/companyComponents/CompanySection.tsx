"use client"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import { MdEdit, MdDeleteForever } from "react-icons/md";
// import DeleteConfirmationModal from "../global/DeleteConfirmationModal";
import { LoadingSpinnerWithOverlay } from "@/component/global/Loading";
// import PackageFormModal from "./PackageModalForm";
import { addCompany, listCompanies, removeCompany, updateCompany } from "@/store/companySlice";
import DeleteConfirmationModal from "../packagesComponents/DeleteConfirmationModal";
import CompanyFormModal from "./CompanyFormModal";


export interface Company {
    _id: string;
    name: string;
    size: string;
    industry: string;
    company_mail: string;
    website: string;
    address: string;
    package: string;
    status: string;
    webinarsCompleted: number;
    webinarsScheduled: number;
    created_at: string;
}

function CompanySections() {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [pagination, setPagination] = useState({
        pageNum: 1,
        pageSize: 10,
        totalPages: 1,
        totalItems: 0
    });

    const dispatch = useDispatch();

    const fetchCompanies = async () => {
        setLoading(true);
        try {
            const params = {
                pageNum: pagination.pageNum,
                pageSize: pagination.pageSize,
            };

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const response = await dispatch(listCompanies(params as any) as any);

            if (response?.error) {
                toast.error(response.error.message);
            } else if (response.payload?.data) {
                setCompanies(response.payload.data.companyList);
                const companyCount = response.payload.data.companyCount;
                const totalPages = Math.ceil(companyCount / pagination.pageSize);

                setPagination(prev => ({
                    ...prev,
                    totalPages,
                    totalItems: companyCount
                }));
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch companies");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCompanies();
    }, [pagination.pageNum, pagination.pageSize]);

    const handleCreateCompany = async (formData: Omit<Company, '_id' | 'created_at' | 'updated_at'>) => {
        setLoading(true);
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const response = await dispatch(addCompany(formData as any) as any);

            if (response?.error) {
                toast.error(response.error.message);
            } else if (response.payload?.data) {
                toast.success("Company created successfully!");
                fetchCompanies();
                setSelectedCompany(null);
                setIsCreateModalOpen(false);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to create Company");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateCompany = async (formData: Company) => {

        setLoading(true);
        try {
            if (!selectedCompany) return
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const response = await dispatch(updateCompany({ data: formData, id: selectedCompany._id } as any) as any);

            if (response?.error) {
                toast.error(response.error.message);
            } else if (response.payload?.data) {
                toast.success("Company updated successfully!");
                fetchCompanies();
                setSelectedCompany(null);
                setIsCreateModalOpen(false);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to update Company");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteCompany = async () => {
        if (!selectedCompany) return;

        setLoading(true);
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const response = await dispatch(removeCompany(selectedCompany._id as any) as any);

            if (response?.error) {
                toast.error(response.error.message);
            } else if (response.payload?.data) {
                toast.success("Company deleted successfully!");
                fetchCompanies();
                setIsDeleteModalOpen(false);
                setSelectedCompany(null);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete Company");
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
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="p-6 bg-white rounded-xl shadow">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
                <h2 className="text-xl font-bold">Companies Management</h2>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        <FaPlus size={14} />
                        <span>Add Company</span>
                    </button>
                </div>
            </div>

            {loading && <LoadingSpinnerWithOverlay />}

            {/* Create/Update Modal */}
            <CompanyFormModal
                isOpen={isCreateModalOpen}
                onClose={() => {
                    setIsCreateModalOpen(false);
                    setSelectedCompany(null);
                }}
                onSubmit={selectedCompany ? handleUpdateCompany : handleCreateCompany}
                initialData={selectedCompany}
            />

            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setSelectedCompany(null);
                }}
                onConfirm={handleDeleteCompany}
                title="Delete Company"
                message="Are you sure you want to delete this company? This action cannot be undone."
            />

            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Company
                            </th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Industry
                            </th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Size
                            </th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Created
                            </th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {companies?.length > 0 ? (
                            companies?.map((company) => (
                                <tr
                                    key={company._id}
                                    onClick={() => {
                                        setSelectedCompany(company);
                                        setIsModalOpen(true);
                                    }}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <td className="py-4 px-4 text-sm font-medium text-gray-900">
                                        <div className="flex items-center">
                                            <div>
                                                <div className="font-medium">{company.name}</div>
                                                <div className="text-gray-500 text-xs">{company.website}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 text-sm text-gray-700 capitalize">
                                        {company.industry || 'N/A'}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-gray-700">
                                        {company.size || 'N/A'}
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${company.status === 'in_process'
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : company.status === 'completed'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                            }`}>
                                            {company.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-sm text-gray-500">
                                        {formatDate(company.created_at)}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-gray-700">
                                        <div className="flex items-center space-x-3">
                                            {/* Edit Button */}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedCompany(company);
                                                    setIsCreateModalOpen(true);
                                                }}
                                                className="text-blue-600 hover:text-blue-900"
                                                title="Edit Company"
                                            >
                                                <MdEdit size={18} />
                                            </button>

                                            {/* Delete Button */}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedCompany(company);
                                                    setIsDeleteModalOpen(true);
                                                }}
                                                className="text-red-600 hover:text-red-900"
                                                title="Delete Company"
                                            >
                                                <MdDeleteForever size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="py-8 text-center text-gray-500">
                                    No companies found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {isModalOpen && selectedCompany && (
                <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
                    <div className="relative bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-2xl font-bold text-white">{selectedCompany.name}</h2>
                                    <p className="text-blue-100 mt-1">{selectedCompany.industry}</p>
                                </div>
                                <button
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setSelectedCompany(null);
                                    }}
                                    className="text-white hover:text-blue-200 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Left Column */}
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">COMPANY DETAILS</h3>
                                    <div className="mt-2 space-y-3">
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0 h-5 w-5 text-gray-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-gray-500">Contact Email</p>
                                                <p className="text-sm text-gray-900">{selectedCompany.company_mail}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start">
                                            <div className="flex-shrink-0 h-5 w-5 text-gray-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-gray-500">Address</p>
                                                <p className="text-sm text-gray-900">{selectedCompany.address || 'Not specified'}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start">
                                            <div className="flex-shrink-0 h-5 w-5 text-gray-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-gray-500">Company Size</p>
                                                <p className="text-sm text-gray-900">{selectedCompany.size || 'Not specified'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">WEBINARS</h3>
                                    <div className="mt-2 grid grid-cols-2 gap-4">
                                        <div className="bg-blue-50 rounded-lg p-3">
                                            <p className="text-xs font-medium text-blue-600">SCHEDULED</p>
                                            <p className="text-2xl font-bold text-gray-900">{selectedCompany.webinarsScheduled}</p>
                                        </div>
                                        <div className="bg-green-50 rounded-lg p-3">
                                            <p className="text-xs font-medium text-green-600">COMPLETED</p>
                                            <p className="text-2xl font-bold text-gray-900">{selectedCompany.webinarsCompleted}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">SYSTEM INFORMATION</h3>
                                    <div className="mt-2 space-y-3">
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0 h-5 w-5 text-gray-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-gray-500">Status</p>
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${selectedCompany.status === 'in_process' ? 'bg-yellow-100 text-yellow-800' :
                                                    selectedCompany.status === 'active' ? 'bg-green-100 text-green-800' :
                                                        'bg-red-100 text-red-800'
                                                    }`}>
                                                    {selectedCompany.status.replace('_', ' ')}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-start">
                                            <div className="flex-shrink-0 h-5 w-5 text-gray-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-gray-500">Created At</p>
                                                <p className="text-sm text-gray-900">{formatDate(selectedCompany.created_at)}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start">
                                            <div className="flex-shrink-0 h-5 w-5 text-gray-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-gray-500">Package ID</p>
                                                <p className="text-sm text-gray-900 font-mono">{selectedCompany.package}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">WEBSITE</h3>
                                    <div className="mt-2">
                                        <a
                                            href={selectedCompany.website.startsWith('http') ? selectedCompany.website : `https://${selectedCompany.website}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-gray-50"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                            </svg>
                                            Visit Website
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
                            <button
                                onClick={() => {
                                    setIsModalOpen(false);
                                    setSelectedCompany(null);
                                }}
                                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Pagination Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
                <div className="text-sm text-gray-700">
                    Showing <span className="font-medium">{(pagination.pageNum - 1) * pagination.pageSize + 1}</span> to{" "}
                    <span className="font-medium">
                        {Math.min(pagination.pageNum * pagination.pageSize, pagination.totalItems)}
                    </span> of{" "}
                    <span className="font-medium">{pagination.totalItems}</span> Companies
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

export default CompanySections;