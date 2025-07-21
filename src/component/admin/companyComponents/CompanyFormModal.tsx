"use client"

import { useState, useEffect } from "react";
import { Company } from "./CompanySection";
import { useDispatch } from "react-redux";
import { listPackage } from "@/store/packageSlice";
import { toast } from "react-toastify";
import { LoadingSpinnerWithOverlay } from "@/component/global/Loading";

interface CompanyFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSubmit: (formData: any) => void;
    initialData?: Company | null;
}

const CompanyFormModal = ({
    isOpen,
    onClose,
    onSubmit,
    initialData
}: CompanyFormModalProps) => {
    const [formData, setFormData] = useState<Omit<Company, '_id' | 'created_at' | 'updated_at'>>({
        name: '',
        size: '',
        industry: '',
        company_mail: '',
        website: '',
        address: '',
        package: '',
        status: '',
        webinarsCompleted: 0,
        webinarsScheduled: 0
    });
    const [loading, setLoading] = useState(false);
    const [packages, setPackages] = useState<Company[]>([]);
    const dispatch = useDispatch()

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                size: initialData.size,
                industry: initialData.industry,
                company_mail: initialData.company_mail,
                website: initialData.website,
                address: initialData.address,
                package: initialData.package,
                status: initialData.status,
                webinarsCompleted: initialData.webinarsCompleted,
                webinarsScheduled: initialData.webinarsScheduled
            });
        } else {
            setFormData({
                name: '',
                size: '',
                industry: '',
                company_mail: '',
                website: '',
                address: '',
                package: '',
                status: '',
                webinarsCompleted: 0,
                webinarsScheduled: 0
            });
        }
    }, [initialData]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? (e.target as HTMLInputElement).checked
                    : type === "number"
                        ? Number(value)
                        : value,
        }));
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(initialData ? { ...formData, _id: initialData._id } : formData);
        setFormData({
            name: '',
            size: '',
            industry: '',
            company_mail: '',
            website: '',
            address: '',
            package: '',
            status: '',
            webinarsCompleted: 0,
            webinarsScheduled: 0
        });
    };

    const fetchPackages = async () => {
        setLoading(true);
        try {
            const params = {
                pageNum: 1,
                pageSize: 50,
            };

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const response = await dispatch(listPackage(params as any) as any);

            if (response?.error) {
                toast.error(response.error.message);
            } else if (response.payload?.data) {
                setPackages(response.payload.data.packageList);
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
    }, [])

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8 h-[90vh] overflow-y-scroll" style={{
                scrollbarWidth: 'none',
            }}>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    {initialData ? "Edit Package" : "Create New Package"}
                </h2>

                {
                    loading && <LoadingSpinnerWithOverlay />
                }

                <form onSubmit={handleSubmit}>
                    <div className="space-y-3">
                        <div>
                            <label htmlFor="companyName" className="block text-gray-700 text-sm font-medium mb-2">
                                Company Name*
                            </label>
                            <input
                                type="text"
                                id="companyName"
                                name="name"
                                placeholder="Enter company name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#007169] border-gray-300`}
                            />
                        </div>

                        {/* Company Size */}
                        <div>
                            <label htmlFor="companySize" className="block text-sm font-medium text-gray-700 mb-1">
                                Company Size*
                            </label>
                            <select
                                id="companySize"
                                name="size"
                                value={formData.size}
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

                        {/* Industry */}
                        <div>
                            <label htmlFor="industry" className="block text-gray-700 text-sm font-medium mb-2">
                                Industry
                            </label>
                            <input
                                type="text"
                                id="industry"
                                name="industry"
                                value={formData.industry}
                                onChange={handleChange}
                                placeholder="e.g., Technology"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007169]"
                            />
                        </div>

                        {/* Status */}
                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                                Status*
                            </label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                            >
                                <option value="">Select Status</option>
                                <option value="in_process">In Process</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>

                        {/* Website */}
                        <div>
                            <label htmlFor="website" className="block text-gray-700 text-sm font-medium mb-2">
                                Website
                            </label>
                            <input
                                type="text"
                                id="website"
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                                placeholder="https://www.example.com"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007169]"
                            />
                        </div>

                        {/* Address */}
                        <div>
                            <label htmlFor="address" className="block text-gray-700 text-sm font-medium mb-2">
                                Address
                            </label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="123 Main St, City, Country"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007169]"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="companyEmail" className="block text-gray-700 text-sm font-medium mb-2">
                                Company Email
                            </label>
                            <input
                                type="email"
                                id="companyEmail"
                                name="company_mail"
                                value={formData.company_mail}
                                onChange={handleChange}
                                placeholder="contact@company.com"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007169]"
                            />
                        </div>

                        {/* Package */}
                        <div>
                            <label htmlFor="package" className="block text-gray-700 text-sm font-medium mb-2">
                                Package*
                            </label>
                            <select
                                id="package"
                                name="package"
                                value={formData.package}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#007169] border-gray-300`}
                            >
                                <option value="">Select a package</option>
                                {
                                    packages.map((item) => (<option key={item._id} value={item._id}>{item.name}</option>))
                                }
                            </select>
                        </div>
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
                            {initialData ? "Update Package" : "Create Package"}
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default CompanyFormModal;