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

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
            <div className="bg-gradient-to-br from-white to-teal-50 rounded-2xl shadow-2xl w-full max-w-3xl p-8 h-[90vh] overflow-y-auto custom-scrollbar">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
                            Package Details
                        </h2>
                        <div className="w-16 h-1 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full mt-2"></div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-teal-100 rounded-full transition-all duration-200 group"
                    >
                        <svg className="w-6 h-6 text-teal-600 group-hover:text-teal-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="space-y-6">
                    {/* Basic Information Card */}
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-teal-100">
                        <h3 className="text-lg font-semibold text-teal-800 mb-4 flex items-center">
                            <span className="w-2 h-2 bg-teal-400 rounded-full mr-2"></span>
                            Basic Information
                        </h3>
                        
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-teal-700 mb-2">
                                        Package Name
                                    </label>
                                    <div className="w-full px-4 py-3 border border-teal-200 rounded-lg bg-teal-50 text-teal-900 font-medium">
                                        {pkg.name}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-teal-700 mb-2">
                                        Package Type
                                    </label>
                                    <div className="w-full px-4 py-3 border border-teal-200 rounded-lg bg-teal-50 capitalize text-teal-900">
                                        {pkg.package_type}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-teal-700 mb-2">
                                    User Type
                                </label>
                                <div className="w-full px-4 py-3 border border-teal-200 rounded-lg bg-teal-50 capitalize">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                        pkg.user_type === 'corporate' 
                                            ? 'bg-blue-100 text-blue-800' 
                                            : 'bg-teal-100 text-teal-800'
                                    }`}>
                                        {pkg.user_type || 'individual'}
                                    </span>
                                </div>
                            </div>

                            {/* Description */}
                            {pkg.description && (
                                <div>
                                    <label className="block text-sm font-medium text-teal-700 mb-2">
                                        Description
                                    </label>
                                    <div className="w-full px-4 py-3 border border-teal-200 rounded-lg bg-teal-50 text-teal-800 leading-relaxed">
                                        {pkg.description}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Package Features Card */}
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-teal-100">
                        <h3 className="text-lg font-semibold text-teal-800 mb-4 flex items-center">
                            <span className="w-2 h-2 bg-teal-400 rounded-full mr-2"></span>
                            Package Features
                        </h3>

                        {/* Individual Package Details */}
                        {pkg.user_type === 'individual' && (
                            <div className="space-y-4">
                                {/* Total Sessions */}
                                <div className="flex items-center justify-between p-3 bg-teal-50 rounded-lg border border-teal-200">
                                    <span className="text-sm font-medium text-teal-700">Total Sessions</span>
                                    <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-semibold">
                                        {pkg.total_sessions || 0}
                                    </span>
                                </div>

                                {/* Points */}
                                {pkg.points && pkg.points.length > 0 && (
                                    <div>
                                        <label className="block text-sm font-medium text-teal-700 mb-2">
                                            Key Features
                                        </label>
                                        <div className="space-y-2">
                                            {pkg.points.map((point, index) => (
                                                <div key={index} className="flex items-start space-x-3 p-3 bg-teal-50 rounded-lg border border-teal-200">
                                                    <div className="w-2 h-2 bg-teal-400 rounded-full mt-2 flex-shrink-0"></div>
                                                    <span className="text-teal-800 text-sm">{point}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Result Check */}
                                {pkg.resultCheck && (
                                    <div className="flex items-center justify-between p-3 bg-teal-50 rounded-lg border border-teal-200">
                                        <span className="text-sm font-medium text-teal-700">Result Check</span>
                                        <span className="text-teal-800 font-medium">{pkg.resultCheck}</span>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Corporate Package Details */}
                        {pkg.user_type === 'corporate' && (
                            <div className="space-y-4">
                                {/* Webinar Features */}
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="text-center p-4 bg-teal-50 rounded-lg border border-teal-200">
                                        <div className="text-2xl font-bold text-teal-600">{pkg.max_webinars_per_month || 0}</div>
                                        <div className="text-xs text-teal-700 mt-1">Webinars/Month</div>
                                    </div>
                                    <div className="text-center p-4 bg-teal-50 rounded-lg border border-teal-200">
                                        <div className="text-2xl font-bold text-teal-600">{pkg.max_attendees_per_webinar || 0}</div>
                                        <div className="text-xs text-teal-700 mt-1">Max Attendees</div>
                                    </div>
                                    <div className="text-center p-4 bg-teal-50 rounded-lg border border-teal-200">
                                        <div className="text-2xl font-bold text-teal-600">{pkg.max_duration_minutes || 0}</div>
                                        <div className="text-xs text-teal-700 mt-1">Duration (min)</div>
                                    </div>
                                </div>

                                {/* Session Features */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="text-center p-4 bg-teal-50 rounded-lg border border-teal-200">
                                        <div className="text-2xl font-bold text-teal-600">{pkg.max_sessions_per_month || 0}</div>
                                        <div className="text-xs text-teal-700 mt-1">Sessions/Month</div>
                                    </div>
                                    <div className="text-center p-4 bg-teal-50 rounded-lg border border-teal-200">
                                        <div className="text-2xl font-bold text-teal-600">{pkg.max_sessions_minutes || 0}</div>
                                        <div className="text-xs text-teal-700 mt-1">Session Duration</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Common Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            <div className="text-center p-4 bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg border border-teal-200">
                                <div className="text-2xl font-bold text-teal-700">{pkg.timeLine}</div>
                                <div className="text-xs text-teal-600 mt-1">Timeline (Days)</div>
                            </div>
                            <div className="text-center p-4 bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg border border-teal-200">
                                <div className="text-2xl font-bold text-teal-700">₹{pkg.discountedPrice.toFixed(2)}</div>
                                <div className="text-xs text-teal-600 mt-1">Discounted Price</div>
                            </div>
                            <div className="text-center p-4 bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg border border-teal-200">
                                <div className="text-2xl font-bold text-teal-700 line-through">₹{pkg.realPrice.toFixed(2)}</div>
                                <div className="text-xs text-teal-600 mt-1">Real Price</div>
                            </div>
                        </div>

                        {/* Status */}
                        <div className="flex items-center justify-center mt-4 p-3 bg-teal-50 rounded-lg border border-teal-200">
                            <div className={`w-3 h-3 rounded-full mr-3 ${pkg.is_active ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                            <span className="text-sm font-medium text-teal-700">
                                {pkg.is_active ? 'Featured Package' : 'Non-Featured Package'}
                            </span>
                        </div>
                    </div>

                    {/* Package Metadata Card */}
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-teal-100">
                        <h3 className="text-lg font-semibold text-teal-800 mb-4 flex items-center">
                            <span className="w-2 h-2 bg-teal-400 rounded-full mr-2"></span>
                            Package Information
                        </h3>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium text-teal-700 mb-2">
                                    Package ID
                                </label>
                                <div className="w-full px-4 py-3 border border-teal-200 rounded-lg bg-teal-50 font-mono text-sm text-teal-800">
                                    {pkg._id}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-teal-700 mb-2">
                                        Created At
                                    </label>
                                    <div className="w-full px-4 py-3 border border-teal-200 rounded-lg bg-teal-50 text-sm text-teal-800">
                                        {formatDate(pkg.created_at)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="mt-8 flex justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg font-semibold hover:from-teal-700 hover:to-teal-800 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                        Close Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PackageDetailsModal;