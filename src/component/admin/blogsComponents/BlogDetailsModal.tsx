"use client";

import { useState } from "react";
import { FaTimes, FaCalendarAlt, FaUser, FaTag, FaEye, FaExpand } from "react-icons/fa";
import { Blog } from "./BlogsSection";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  blog: Blog | null;
}

export default function BlogDetailsModal({ isOpen, onClose, blog }: Props) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!isOpen || !blog) return null;

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <>
      {/* Main Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
        <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
          {/* Header with light teal gradient */}
          <div className="relative bg-gradient-to-r from-teal-500 to-teal-600 px-6 py-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white truncate pr-8">
                {blog.title}
              </h2>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/20"
              >
                <FaTimes size={20} />
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-70px)] p-6 space-y-6">
            {/* Image Gallery */}
            {blog.images && blog.images.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-teal-600 uppercase tracking-wider mb-3">
                  Gallery ({blog.images.length} images)
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {blog.images.map((img: string, idx: number) => (
                    <div
                      key={idx}
                      className="relative group aspect-video rounded-lg overflow-hidden bg-gray-100 cursor-pointer border border-gray-200 hover:shadow-md transition-shadow"
                      onClick={() => setSelectedImage(img)}
                    >
                      <img
                        src={img}
                        alt={`${blog.title} - ${idx + 1}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-teal-500/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <FaExpand className="text-white text-2xl drop-shadow" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Metadata Cards - light teal accents */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 p-3 bg-teal-50 rounded-xl border border-teal-100">
                <FaUser className="text-teal-500 text-lg" />
                <div>
                  <p className="text-xs text-gray-500">Author</p>
                  <p className="font-medium text-gray-900">{blog.author}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-teal-50 rounded-xl border border-teal-100">
                <FaTag className="text-teal-500 text-lg" />
                <div>
                  <p className="text-xs text-gray-500">Category</p>
                  <p className="font-medium text-gray-900 capitalize">{blog.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-teal-50 rounded-xl border border-teal-100">
                <FaEye className="text-teal-500 text-lg" />
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <span
                    className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                      blog.is_deleted
                        ? "bg-red-100 text-red-700"
                        : "bg-teal-100 text-teal-700"
                    }`}
                  >
                    {blog.is_deleted ? "Deleted" : "Published"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-teal-50 rounded-xl border border-teal-100">
                <FaCalendarAlt className="text-teal-500 text-lg" />
                <div>
                  <p className="text-xs text-gray-500">Created</p>
                  <p className="font-medium text-gray-900">{formatDate(blog.created_at)}</p>
                </div>
              </div>
            </div>

            {/* Content with light teal border */}
            <div>
              <h3 className="text-sm font-semibold text-teal-600 uppercase tracking-wider mb-3">
                Content
              </h3>
              <div className="prose prose-sm sm:prose max-w-none text-gray-700 bg-teal-50/30 p-5 rounded-xl border border-teal-100">
                {blog.content.split("\n\n").map((paragraph, idx) => (
                  <p key={idx} className="mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox for full-size image */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Full size"
            className="max-w-full max-h-full object-contain"
          />
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-teal-600/80 transition"
          >
            <FaTimes size={24} />
          </button>
        </div>
      )}
    </>
  );
}