"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { FaTimes, FaImage, FaTrash } from "react-icons/fa";
import { addBlog, updateBlog } from "@/store/blogsSlice";
import { Blog } from "./BlogsSection";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: Blog | null;
}

export const BlogFormModal = ({ isOpen, onClose, onSuccess, initialData }: Props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    content: "",
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  // Removed images tracking is no longer needed; we'll send the keep list directly

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        author: initialData.author,
        category: initialData.category,
        content: initialData.content,
      });
      setExistingImages(initialData.images || []);
    } else {
      setFormData({ title: "", author: "", category: "", content: "" });
      setImageFiles([]);
      setExistingImages([]);
    }
  }, [initialData, isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const totalImages = existingImages.length + imageFiles.length + files.length;
    if (totalImages > 5) {
      toast.error("You can upload a maximum of 5 images");
      return;
    }
    setImageFiles((prev) => [...prev, ...files]);
  };

  const removeNewImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (imageUrl: string) => {
    setExistingImages((prev) => prev.filter((img) => img !== imageUrl));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return toast.error("Title is required");
    if (!formData.author.trim()) return toast.error("Author is required");
    if (!formData.category.trim()) return toast.error("Category is required");
    if (!formData.content.trim()) return toast.error("Content is required");
    const totalImages = existingImages.length + imageFiles.length;
    if (totalImages === 0) return toast.error("At least one image is required");

    setLoading(true);
    try {
      const formPayload = new FormData();
      formPayload.append("title", formData.title);
      formPayload.append("author", formData.author);
      formPayload.append("category", formData.category);
      formPayload.append("content", formData.content);
      imageFiles.forEach((file) => formPayload.append("images", file));

      if (initialData) {
        // Send the list of existing image URLs that should be kept
        if (existingImages.length) {
          formPayload.append("existingImages", JSON.stringify(existingImages));
        }
        const response = await dispatch(
          updateBlog({ id: initialData._id, data: formPayload } as any) as any
        );
        if (response?.error) throw new Error(response.error.message);
        toast.success("Blog updated successfully");
      } else {
        const response = await dispatch(addBlog(formPayload as any) as any);
        if (response?.error) throw new Error(response.error.message);
        toast.success("Blog created successfully");
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      toast.error(err.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-teal-100 shadow-xl">
        {/* Header with light teal gradient */}
        <div className="relative bg-gradient-to-r from-teal-500 to-teal-600 px-6 py-4 rounded-t-xl">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">
              {initialData ? "Edit Blog" : "Create New Blog"}
            </h2>
            <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
              <FaTimes size={20} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-teal-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              placeholder="Enter blog title"
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-teal-700 mb-1">
                Author *
              </label>
              <input
                type="text"
                placeholder="Enter blog author"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-teal-700 mb-1">
                Category *
              </label>
              <input
                type="text"
                value={formData.category}
                placeholder="Enter blog category"
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-teal-700 mb-1">
              Content *
            </label>
            <textarea
              rows={6}
              placeholder="Enter blog content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full border resize-none border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-teal-700 mb-2">
              Images (max 5) *
            </label>
            <div className="flex flex-wrap gap-3 mb-3">
              {/* Existing images with visible delete button */}
              {existingImages.map((img, idx) => (
                <div key={idx} className="relative group w-20 h-20 rounded-lg border border-teal-100 shadow-sm overflow-hidden">
                  <img src={img} alt="existing" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeExistingImage(img)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-600 transition shadow-md z-10"
                    title="Remove image"
                  >
                    <FaTrash size={10} />
                  </button>
                </div>
              ))}
              {/* Newly added images preview */}
              {imageFiles.map((file, idx) => (
                <div key={idx} className="relative group w-20 h-20 rounded-lg border border-teal-100 shadow-sm overflow-hidden">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeNewImage(idx)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-600 transition shadow-md z-50"
                    title="Remove image"
                  >
                    <FaTrash size={10} />
                  </button>
                </div>
              ))}
              {/* Add image button */}
              {existingImages.length + imageFiles.length < 5 && (
                <label className="w-20 h-20 flex flex-col items-center justify-center border-2 border-dashed border-teal-200 rounded-lg cursor-pointer hover:bg-teal-50 transition-colors">
                  <FaImage className="text-teal-400 text-2xl" />
                  <span className="text-xs text-teal-500 mt-1">Add</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            <p className="text-xs text-teal-600">
              {existingImages.length + imageFiles.length} / 5 images used
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-teal-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-teal-200 rounded-lg text-teal-700 bg-teal-50 hover:bg-teal-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 transition-colors"
            >
              {loading ? "Saving..." : initialData ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};