"use client"
import { useState } from "react";
import { Lead } from "./LeadSection";
import { useDispatch } from "react-redux";
import { addLead } from "@/store/leadSlice";
import { toast } from "react-toastify";
import { LoadingSpinnerWithOverlay } from "@/component/global/Loading";

interface PackageFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    fetchLeads: () => void;
}

const LeadFormModal = ({ fetchLeads, onClose, isOpen }: PackageFormModalProps) => {
    const [formData, setFormData] = useState<Omit<Lead, '_id' | 'created_at' | 'updated_at' | 'stage'>>({
        name: '',
        email: '',
        phone: '',
        company: '',
        employees: '',
        source: 'other',
    });
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            setFormData(prev => ({
                ...prev,
                [name]: (e.target as HTMLInputElement).checked
            }));
        } else if (type === 'number') {
            setFormData(prev => ({
                ...prev,
                [name]: Number(value)
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const response = await dispatch(addLead(formData as any) as any);
            if (response?.error) {
                setLoading(false);
                toast.error(response.error.message)
            } else {
                setLoading(false);
                toast.success('Lead created successfully');
                fetchLeads();
                onClose();
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    company: '',
                    employees: '',
                    source: 'other',
                })
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
            toast.error('Failed to create lead');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8 h-[90vh] overflow-y-scroll" style={{
                scrollbarWidth: 'none',
            }}>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Create New Lead
                </h2>

                {
                    loading && <LoadingSpinnerWithOverlay />
                }

                <form onSubmit={handleSubmit}>
                    <div className="space-y-3">
                        {/* Lead Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Lead Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter lead name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                required
                            />
                        </div>

                        {/* Lead email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Lead Email
                            </label>
                            <input
                                type="text"
                                name="email"
                                placeholder="Enter lead email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                required
                            />
                        </div>

                        {/* Lead phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Lead Phone
                            </label>
                            <input
                                type="text"
                                name="phone"
                                placeholder="Enter lead phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                required
                            />
                        </div>

                        {/* Lead company */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Lead Company
                            </label>
                            <input
                                type="text"
                                name="company"
                                placeholder="Enter lead company"
                                value={formData.company}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                required
                            />
                        </div>

                        {/* Lead employees */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Number of Employees
                            </label>
                            <select
                                id="employees"
                                name="employees"
                                value={formData.employees}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                            >
                                <option value="">Select employee count</option>
                                <option value="1-50">1-50 employees</option>
                                <option value="51-200">51-200 employees</option>
                                <option value="201-500">201-500 employees</option>
                                <option value="501-1000">501-1,000 employees</option>
                                <option value="1001-5000">1,001-5,000 employees</option>
                                <option value="5000+">5,000+ employees</option>
                            </select>
                        </div>

                        {/* Lead Source */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Lead Source
                            </label>
                            <select
                                name="source"
                                value={formData.source}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            >
                                <option value="referral">Referral</option>
                                <option value="event">Event</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {/* Buttons */}
                        <div className="mt-8 flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100 transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition"
                            >
                                Create Package
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default LeadFormModal;