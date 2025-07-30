"use client"
import { useState, useEffect } from "react";
import { Webinar } from "./WebinarSection";

interface WebinarFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSubmit: (formData: any) => void;
    initialData?: Webinar | null;
}

const WebinarFormModal = ({
    isOpen,
    onClose,
    onSubmit,
    initialData
}: WebinarFormModalProps) => {
    const [formData, setFormData] = useState<Omit<Webinar, '_id' | 'created_at' | 'updated_at'>>({
        title: "",
        description: "",
        host_name: "",
        scheduled_date: "",
        duration_minutes: 0,
        status: "",
        meeting_url: "",
        tags: [],
        visibility: false
    });

    const [currentTag, setCurrentTag] = useState("");

    useEffect(() => {
        if (initialData) {
            // Format the scheduled_date to match datetime-local input format
            const formatDateForInput = (dateString: string) => {
                if (!dateString) return "";
                const date = new Date(dateString);
                // Format as YYYY-MM-DDTHH:MM
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                const hours = String(date.getHours()).padStart(2, '0');
                const minutes = String(date.getMinutes()).padStart(2, '0');
                return `${year}-${month}-${day}T${hours}:${minutes}`;
            };

            setFormData({
                title: initialData.title,
                description: initialData.description,
                host_name: initialData.host_name,
                scheduled_date: formatDateForInput(initialData.scheduled_date),
                duration_minutes: initialData.duration_minutes,
                status: initialData.status,
                meeting_url: initialData.meeting_url,
                tags: initialData.tags,
                visibility: initialData.visibility
            });
        } else {
            setFormData({
                title: "",
                description: "",
                host_name: "",
                scheduled_date: "",
                duration_minutes: 0,
                status: "",
                meeting_url: "",
                tags: [],
                visibility: false
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

    const handleAddTag = () => {
        if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, currentTag.trim()]
            }));
            setCurrentTag("");
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    const handleTagKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddTag();
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
                    {initialData ? "Edit Webinar" : "Create New Webinar"}
                </h2>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Webinar Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                placeholder="Enter webinar title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                name="description"
                                placeholder="Enter webinar description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border resize-none border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                rows={3}
                            />
                        </div>

                        {/* Host Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Host Name
                            </label>
                            <input
                                type="text"
                                name="host_name"
                                placeholder="Enter host name"
                                value={formData.host_name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                required
                            />
                        </div>

                        {/* Grid for Date and Duration */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* Scheduled Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Scheduled Date & Time
                                </label>
                                <input
                                    type="datetime-local"
                                    name="scheduled_date"
                                    value={formData.scheduled_date}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    required
                                />
                            </div>

                            {/* Duration */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Duration (minutes)
                                </label>
                                <input
                                    type="number"
                                    name="duration_minutes"
                                    placeholder="Enter duration in minutes"
                                    value={formData.duration_minutes || ''}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    min="0"
                                    required
                                />
                            </div>
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Status
                            </label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                required
                            >
                                <option value="">Select status</option>
                                <option value="scheduled">Scheduled</option>
                                <option value="live">Live</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>

                        {/* Meeting URL */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Meeting URL
                            </label>
                            <input
                                type="url"
                                name="meeting_url"
                                placeholder="Enter meeting URL (e.g., https://zoom.us/j/123456789)"
                                value={formData.meeting_url}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                        </div>

                        {/* Tags */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tags
                            </label>
                            <div className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    placeholder="Enter a tag"
                                    value={currentTag}
                                    onChange={(e) => setCurrentTag(e.target.value)}
                                    onKeyPress={handleTagKeyPress}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={handleAddTag}
                                    disabled={!currentTag.trim() || formData.tags.includes(currentTag.trim())}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                                >
                                    Add
                                </button>
                            </div>

                            {/* Display Tags */}
                            {formData.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {formData.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full"
                                        >
                                            {tag}
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveTag(tag)}
                                                className="ml-2 text-indigo-600 hover:text-indigo-800 focus:outline-none"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}

                            <p className="text-xs text-gray-500 mt-1">
                                Press Enter or click Add to add tags. Click × to remove tags.
                            </p>
                        </div>

                        {/* Visibility Checkbox */}
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="visibility"
                                checked={formData.visibility}
                                onChange={handleChange}
                                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
                            />
                            <label className="ml-2 text-sm text-gray-700">
                                Make webinar publicly visible
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
                            {initialData ? "Update Webinar" : "Create Webinar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default WebinarFormModal;
