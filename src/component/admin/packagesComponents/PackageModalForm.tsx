"use client"

import { Package } from "./PackageSetion";
import { useState, useEffect } from "react";

interface PackageFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSubmit: (formData: any) => void;
    initialData?: Package | null;
}

const PackageFormModal = ({
    isOpen,
    onClose,
    onSubmit,
    initialData
}: PackageFormModalProps) => {
    const [formData, setFormData] = useState<Omit<Package, '_id' | 'created_at' | 'updated_at'>>({
        name: '',
        package_type: 'standard',
        description: '',
        max_webinars_per_month: 0,
        max_attendees_per_webinar: 0,
        max_duration_minutes: 0,
        max_sessions_per_month: 0,
        max_sessions_minutes: 0,
        timeLine: 0,
        price: 0,
        is_active: true,
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                package_type: initialData.package_type,
                description: initialData.description || '',
                max_webinars_per_month: initialData.max_webinars_per_month,
                max_attendees_per_webinar: initialData.max_attendees_per_webinar,
                max_duration_minutes: initialData.max_duration_minutes,
                max_sessions_per_month: initialData.max_sessions_per_month,
                max_sessions_minutes: initialData.max_sessions_minutes,
                timeLine: initialData.timeLine,
                price: initialData.price,
                is_active: initialData.is_active,
            });
        } else {
            setFormData({
                name: '',
                package_type: 'standard',
                description: '',
                max_webinars_per_month: 0,
                max_attendees_per_webinar: 0,
                max_duration_minutes: 0,
                max_sessions_per_month: 0,
                max_sessions_minutes: 0,
                timeLine: 0,
                price: 0,
                is_active: true,
            });
        }
    }, [initialData]);

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(initialData ? { ...formData, _id: initialData._id } : formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8 h-[90vh] overflow-y-scroll" style={{
                scrollbarWidth: 'none',
            }}>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    {initialData ? "Edit Package" : "Create New Package"}
                </h2>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-3">
                        {/* Package Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Package Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter package name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                required
                            />
                        </div>

                        {/* Package Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Package Type
                            </label>
                            <select
                                name="package_type"
                                value={formData.package_type}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            >
                                <option value="standard">Standard</option>
                                <option value="advanced">Advanced</option>
                                <option value="premium">Premium</option>
                                <option value="custom">Custom</option>
                            </select>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                name="description"
                                placeholder="Enter package description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border resize-none border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                rows={3}
                            />
                        </div>

                        {/* Grid Inputs */}
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Webinars/Month
                                </label>
                                <input
                                    type="number"
                                    name="max_webinars_per_month"
                                    placeholder="Enter max webinars per month"
                                    value={formData.max_webinars_per_month || ''}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    min="0"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Max Attendees
                                </label>
                                <input
                                    type="number"
                                    name="max_attendees_per_webinar"
                                    placeholder="Enter max attendees per webinar"
                                    value={formData.max_attendees_per_webinar || ''}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    min="0"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Duration (min)
                                </label>
                                <input
                                    type="number"
                                    name="max_duration_minutes"
                                    placeholder="Enter max duration in minutes"
                                    value={formData.max_duration_minutes || ''}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    min="0"
                                />
                            </div>
                        </div>
                        {/* Grid Inputs Sessions*/}
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Sessions/Month
                                </label>
                                <input
                                    type="number"
                                    name="max_sessions_per_month"
                                    placeholder="Enter max Sessions per month"
                                    value={formData.max_sessions_per_month || ''}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    min="0"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Max Sessions Duration (min)
                                </label>
                                <input
                                    type="number"
                                    name="max_sessions_minutes"
                                    placeholder="Enter max sessions duration in minutes"
                                    value={formData.max_sessions_minutes || ''}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    min="0"
                                />
                            </div>
                        </div>

                        {/* Duration */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Timeline of Package (₹)
                            </label>
                            <input
                                type="number"
                                name="timeLine"
                                placeholder="Enter package Timeline. eg. 1 = 1 month"
                                value={formData.timeLine || ''}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                min="0"
                                step="0.01"
                            />
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Price (₹)
                            </label>
                            <input
                                type="number"
                                name="price"
                                placeholder="Enter package price"
                                value={formData.price || ''}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                min="0"
                                step="0.01"
                            />
                        </div>

                        {/* Active Checkbox */}
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="is_active"
                                checked={formData.is_active}
                                onChange={handleChange}
                                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
                            />
                            <label className="ml-2 text-sm text-gray-700">
                                Active Package
                            </label>
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

export default PackageFormModal;