"use client"
import React from 'react';
import { Webinar } from './WebinarSection';

interface WebinarDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    webinar: Webinar | null;
}

const WebinarDetailsModal: React.FC<WebinarDetailsModalProps> = ({ isOpen, onClose, webinar }) => {
    if (!isOpen || !webinar) return null;

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const formatDuration = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        if (hours > 0) {
            return `${hours}h ${mins > 0 ? `${mins}m` : ''}`;
        }
        return `${mins}m`;
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'scheduled':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'live':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'completed':
                return 'bg-gray-100 text-gray-800 border-gray-200';
            case 'cancelled':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#009689] to-[#007a6f] text-white p-6 rounded-t-xl">
                    <div className="flex justify-between items-start">
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold mb-2">{webinar.title}</h2>
                            <p className="text-[#dbfcf5] mb-3">Hosted by {webinar.host_name}</p>
                            <div className="flex items-center gap-3 flex-wrap">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(webinar.status)}`}>
                                    {webinar.status.charAt(0).toUpperCase() + webinar.status.slice(1)}
                                </span>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    webinar.visibility 
                                        ? 'bg-green-100 text-green-800 border border-green-200' 
                                        : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                                }`}>
                                    {webinar.visibility ? 'Public' : 'Private'}
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-white hover:bg-white hover:text-[#009689] hover:bg-opacity-20 rounded-full p-2 transition-colors ml-4"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Webinar Schedule Info */}
                    <div className="bg-gradient-to-r from-[#dbfcf5] to-[#c8f7f0] border border-[#009689] rounded-lg p-4 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="text-center md:text-left">
                                <p className="text-sm text-[#009689] font-medium mb-1">Scheduled Date & Time</p>
                                <p className="text-lg font-bold text-[#007a6f]">{formatDate(webinar.scheduled_date)}</p>
                            </div>
                            <div className="text-center md:text-right">
                                <p className="text-sm text-[#009689] font-medium mb-1">Duration</p>
                                <p className="text-lg font-bold text-[#007a6f]">{formatDuration(webinar.duration_minutes)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    {webinar.description && (
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#009689]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Description
                            </h3>
                            <p className="text-gray-700 bg-[#dbfcf5] p-4 rounded-lg border border-[#009689] leading-relaxed">
                                {webinar.description}
                            </p>
                        </div>
                    )}

                    {/* Meeting Details */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        {/* Meeting URL */}
                        {webinar.meeting_url && (
                            <div className="bg-[#dbfcf5] border border-[#009689] rounded-lg p-5">
                                <h3 className="text-lg font-semibold text-[#007a6f] mb-3 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                    </svg>
                                    Meeting Link
                                </h3>
                                <div className="bg-white p-3 rounded border border-[#009689]">
                                    <a 
                                        href={webinar.meeting_url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-[#009689] hover:text-[#007a6f] break-all text-sm font-medium hover:underline"
                                    >
                                        {webinar.meeting_url}
                                    </a>
                                </div>
                                <button
                                    onClick={() => window.open(webinar.meeting_url, '_blank')}
                                    className="mt-3 w-full px-4 py-2 bg-[#009689] text-white rounded-md hover:bg-[#007a6f] transition-colors text-sm font-medium"
                                >
                                    Join Meeting
                                </button>
                            </div>
                        )}

                        {/* Host Information */}
                        <div className="bg-[#dbfcf5] border border-[#009689] rounded-lg p-5">
                            <h3 className="text-lg font-semibold text-[#007a6f] mb-3 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Host Information
                            </h3>
                            <div className="bg-white p-3 rounded border border-[#009689]">
                                <p className="font-semibold text-[#007a6f] text-lg">{webinar.host_name}</p>
                                <p className="text-sm text-[#009689] mt-1">Webinar Host</p>
                            </div>
                        </div>
                    </div>

                    {/* Tags */}
                    {webinar.tags && webinar.tags.length > 0 && (
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#009689]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                </svg>
                                Tags
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {webinar.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-[#dbfcf5] text-[#009689] text-sm rounded-full border border-[#009689]"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* System Information */}
                    <div className="bg-[#dbfcf5] rounded-lg p-5 border border-[#009689]">
                        <h3 className="text-lg font-semibold text-[#007a6f] mb-4">System Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-[#009689]">Webinar ID</p>
                                <p className="font-mono text-sm text-[#007a6f] bg-white px-2 py-1 rounded border border-[#009689]">
                                    {webinar._id}
                                </p>
                            </div>
                            {webinar.created_at && (
                                <div>
                                    <p className="text-sm text-[#009689]">Created On</p>
                                    <p className="font-medium text-[#007a6f]">{formatDate(webinar.created_at.toString())}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-[#dbfcf5] px-6 py-4 rounded-b-xl flex justify-between items-center border-t border-[#009689]">
                    <div className="flex gap-3">
                        {webinar.meeting_url && (
                            <button
                                onClick={() => window.open(webinar.meeting_url, '_blank')}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                            >
                                Join Meeting
                            </button>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-[#009689] text-white rounded-lg hover:bg-[#007a6f] transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WebinarDetailsModal;
