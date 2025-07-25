"use client"
import React from 'react';
import { Package } from './PackageSetion';

interface PackageDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    package: Package | null;
}

const PackageDetailsModal: React.FC<PackageDetailsModalProps> = ({ isOpen, onClose, package: pkg }) => {
    if (!isOpen || !pkg) return null;

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
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

    return (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white p-6 rounded-t-xl">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-bold mb-2">{pkg.name}</h2>
                            <div className="flex items-center gap-3">
                                <span className="bg-white text-teal-600 bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium capitalize">
                                    {pkg.package_type}
                                </span>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    pkg.is_active 
                                        ? 'bg-teal-500 bg-opacity-20 text-teal-100' 
                                        : 'bg-red-500 bg-opacity-20 text-red-100'
                                }`}>
                                    {pkg.is_active ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-white hover:bg-white hover:text-teal-500 hover:bg-opacity-20 rounded-full p-2 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Price Section */}
                    <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 rounded-lg p-4 mb-6">
                        <div className="text-center">
                            <p className="text-sm text-teal-600 font-medium mb-1">Package Price</p>
                            <p className="text-3xl font-bold text-teal-700">₹{pkg.price.toFixed(2)}</p>
                            <p className="text-sm text-teal-600 mt-1">Timeline: {pkg.timeLine} months</p>
                        </div>
                    </div>

                    {/* Description */}
                    {pkg.description && (
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                            <p className="text-gray-600 bg-teal-50 p-4 rounded-lg border border-teal-100">{pkg.description}</p>
                        </div>
                    )}

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Webinar Features */}
                        <div className="bg-teal-50 border border-teal-200 rounded-lg p-5">
                            <h3 className="text-lg font-semibold text-teal-800 mb-4 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                Webinar Features
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-700">Max Webinars/Month</span>
                                    <span className="font-semibold text-teal-700">{pkg.max_webinars_per_month}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-700">Max Attendees/Webinar</span>
                                    <span className="font-semibold text-teal-700">{pkg.max_attendees_per_webinar}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-700">Max Duration</span>
                                    <span className="font-semibold text-teal-700">{formatDuration(pkg.max_duration_minutes)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Session Features */}
                        <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-5">
                            <h3 className="text-lg font-semibold text-cyan-800 mb-4 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                Session Features
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-700">Max Sessions/Month</span>
                                    <span className="font-semibold text-cyan-700">{pkg.max_sessions_per_month}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-700">Max Session Duration</span>
                                    <span className="font-semibold text-cyan-700">{formatDuration(pkg.max_sessions_minutes)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Package Info */}
                    <div className="mt-6 bg-teal-50 rounded-lg p-5 border border-teal-100">
                        <h3 className="text-lg font-semibold text-teal-800 mb-4">Package Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-teal-600">Package ID</p>
                                <p className="font-mono text-sm text-teal-800 bg-white px-2 py-1 rounded border border-teal-200">{pkg._id}</p>
                            </div>
                            <div>
                                <p className="text-sm text-teal-600">Created On</p>
                                <p className="font-medium text-teal-800">{formatDate(pkg.created_at)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-teal-50 px-6 py-4 rounded-b-xl flex justify-end border-t border-teal-100">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PackageDetailsModal;
