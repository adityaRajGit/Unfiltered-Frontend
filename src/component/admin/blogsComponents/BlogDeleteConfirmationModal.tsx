"use client";

import { FaExclamationTriangle } from "react-icons/fa";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function BlogDeleteConfirmationModal({ isOpen, onClose, onConfirm }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 border border-teal-100 overflow-hidden">
        {/* Header with light teal accent */}
        <div className="flex items-center gap-3 p-5 pb-0">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
            <FaExclamationTriangle className="text-amber-500 text-xl" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Confirm Deletion</h3>
        </div>
        
        <div className="p-5 pt-3">
          <p className="text-gray-600">
            Are you sure you want to delete this blog? This action cannot be undone.
          </p>
        </div>
        
        <div className="flex justify-end gap-3 p-5 pt-0">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-teal-200 rounded-lg text-teal-700 bg-teal-50 hover:bg-teal-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}