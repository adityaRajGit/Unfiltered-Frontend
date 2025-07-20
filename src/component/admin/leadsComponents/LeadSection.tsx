"use client"

import { listLead } from "@/store/leadSlice";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { LoadingSpinnerWithOverlay } from "../../global/Loading";
import { FaSort, FaSortUp, FaSortDown, FaFilter, FaPlus } from "react-icons/fa";
import UpdateLeadPopup from "./UpdateLeadModal";
import LeadFormModal from "./CreateLead";

export interface Lead {
    _id: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    employees: string;
    stage: 'open' | 'proposal_sent' | 'negotiation' | 'closed_won' | 'closed_lost';
    source: "other" | "website" | "referral" | "event";
    created_at: Date;
}


function LeadSections() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(false);
    const [sortField, setSortField] = useState<"created_at" | null>(null);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const [pagination, setPagination] = useState({
        pageNum: 1,
        pageSize: 20,
        totalPages: 1,
        totalItems: 0
    });

    const dispatch = useDispatch();

    const fetchLeads = async () => {
        setLoading(true);
        try {
            const params = {
                pageNum: pagination.pageNum,
                pageSize: pagination.pageSize,
            };

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const response = await dispatch(listLead(params as any) as any);

            if (response?.error) {
                toast.error(response.error.message);
            } else if (response.payload?.data) {
                setLeads(response.payload.data.leadList);
                const leadCount = response.payload.data.leadCount;
                const totalPages = Math.ceil(leadCount / pagination.pageSize);

                setPagination(prev => ({
                    ...prev,
                    totalPages,
                    totalItems: leadCount
                }));
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch leads");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, [pagination.pageNum, pagination.pageSize]);

    const sortedLeads = useMemo(() => {
        if (!sortField) return leads;

        return [...leads].sort((a, b) => {
            const valueA = a[sortField];
            const valueB = b[sortField];

            if (sortField === "created_at") {
                const timeA = new Date(valueA).getTime();
                const timeB = new Date(valueB).getTime();

                return sortDirection === "asc" ? timeA - timeB : timeB - timeA;
            }

            if (valueA < valueB) {
                return sortDirection === "asc" ? -1 : 1;
            }
            if (valueA > valueB) {
                return sortDirection === "asc" ? 1 : -1;
            }
            return 0;
        });
    }, [leads, sortField, sortDirection]);


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

    const toggleSort = (field: "created_at") => {
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

    const formatDate = (dateString: Date) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getSortIcon = (field: "boughtPackage" | "created_at") => {
        if (sortField !== field) return <FaSort className="text-gray-400" />;
        return sortDirection === "asc" ? <FaSortUp /> : <FaSortDown />;
    };

    return (
        <div className="p-6 bg-white rounded-xl shadow">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
                <h2 className="text-xl font-bold">Leads Management</h2>

                <div className="flex items-center gap-3">
                    <div className="flex items-center text-sm text-gray-500">
                        <FaFilter className="mr-2" />
                        <span>Sort by:</span>
                    </div>

                    {
                        selectedLead !== null && (
                            <UpdateLeadPopup lead={selectedLead} onClose={() => setSelectedLead(null)} fetchLeads={fetchLeads} />
                        )
                    }

                    <div className="flex gap-2">
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
                            <span>Add Lead</span>
                        </button>
                    </div>
                </div>
            </div>

            {loading && <LoadingSpinnerWithOverlay />}

            {/* Create Modal */}
            <LeadFormModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                fetchLeads={fetchLeads}
            />

            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employees</th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {sortedLeads.length > 0 ? (
                            sortedLeads.map((lead) => (
                                <tr onClick={() => setSelectedLead(lead)} key={lead._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-4 text-sm font-medium text-gray-900">{lead.name}</td>
                                    <td className="py-4 px-4 text-sm text-gray-700">{lead.email}</td>
                                    <td className="py-4 px-4 text-sm text-gray-700">{lead.phone}</td>
                                    <td className="py-4 px-4 text-sm text-gray-700">{lead.company}</td>
                                    <td className="py-4 px-4 text-sm text-gray-700">{lead.employees}</td>
                                    <td className="py-4 px-4">
                                        <span className={`inline-flex uppercase px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 `}>
                                            {lead.stage}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-sm text-gray-700">{lead.source}</td>
                                    <td className="py-4 px-4 text-sm text-gray-500">
                                        {formatDate(lead.created_at)}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="py-8 text-center text-gray-500">
                                    No leads found
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
                    <span className="font-medium">{pagination.totalItems}</span> leads
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

export default LeadSections;