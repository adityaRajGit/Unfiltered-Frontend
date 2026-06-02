"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { FaSort, FaSortUp, FaSortDown, FaPlus, FaSearch } from "react-icons/fa";
import { MdEdit, MdDeleteForever, MdVisibility } from "react-icons/md";
import { LoadingSpinnerWithOverlay } from "@/component/global/Loading";
import { listBlogs, removeBlog } from "@/store/blogsSlice";
import BlogDeleteConfirmationModal from "./BlogDeleteConfirmationModal";
import BlogDetailsModal from "./BlogDetailsModal";
import { BlogFormModal } from "./BlogFormModal";

// Types
export interface Blog {
  _id: string;
  title: string;
  images: string[];
  content: string;
  author: string;
  category: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

function BlogSections() {
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [categories, setCategories] = useState<string[]>(["all"]);
  const [sortField, setSortField] = useState<"created_at" | "title">("created_at");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [pagination, setPagination] = useState({
    pageNum: 1,
    pageSize: 10,
    totalPages: 1,
    totalItems: 0,
  });

  // Debounce search
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch blogs
  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const params: any = {
        pageNum: pagination.pageNum,
        pageSize: pagination.pageSize,
        filters: {},
        sort: { [sortField]: sortDirection === "asc" ? 1 : -1 },
      };
      if (debouncedSearch) {
        params.filters.title = { $regex: debouncedSearch, $options: "i" };
      }
      if (selectedCategory !== "all") {
        params.filters.category = selectedCategory;
      }

      const response = await dispatch(listBlogs(params) as any);
      if (response?.error) {
        toast.error(response.error.message);
      } else if (response.payload?.data) {
        const blogList = response.payload.data.blogs || response.payload.data.blogList || [];
        setBlogs(blogList);
        const total = response.payload.data.totalCount || response.payload.data.blogCount || 0;
        const totalPages = Math.ceil(total / pagination.pageSize);
        setPagination((prev) => ({ ...prev, totalPages, totalItems: total }));

        // Extract unique categories for filter
        const uniqueCats: any = [
          "all",
          ...new Set(blogList.map((blog: Blog) => blog.category)),
        ];
        setCategories(uniqueCats);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  }, [dispatch, pagination.pageNum, pagination.pageSize, debouncedSearch, selectedCategory, sortField, sortDirection]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // Reset page when filters change
  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageNum: 1 }));
  }, [debouncedSearch, selectedCategory, sortField, sortDirection]);

  const handleDelete = async () => {
    if (!selectedBlog) return;
    setLoading(true);
    try {
      const response = await dispatch(removeBlog(selectedBlog._id as any) as any);
      if (response?.error) {
        toast.error(response.error.message);
      } else {
        toast.success("Blog deleted successfully");
        fetchBlogs();
        setIsDeleteModalOpen(false);
        setSelectedBlog(null);
      }
    } catch (error) {
      toast.error("Failed to delete blog");
    } finally {
      setLoading(false);
    }
  };

  const toggleSort = (field: "created_at" | "title") => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getSortIcon = (field: "created_at" | "title") => {
    if (sortField !== field) return <FaSort className="text-gray-400" />;
    return sortDirection === "asc" ? <FaSortUp /> : <FaSortDown />;
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <h2 className="text-xl font-bold">Blog Management</h2>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <FaPlus size={14} />
            <span>Add Blog</span>
          </button>
        </div>
      </div>

      {loading && <LoadingSpinnerWithOverlay />}

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3.5 px-4 text-left text-sm font-semibold text-gray-900">Title</th>
              <th className="py-3.5 px-4 text-left text-sm font-semibold text-gray-900">Author</th>
              <th className="py-3.5 px-4 text-left text-sm font-semibold text-gray-900">Category</th>
              <th className="py-3.5 px-4 text-left text-sm font-semibold text-gray-900">Images</th>
              <th className="py-3.5 px-4 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="py-3.5 px-4 text-left text-sm font-semibold text-gray-900">Created Date</th>
              <th className="py-3.5 px-4 text-left text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <tr
                  key={blog._id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    setSelectedBlog(blog);
                    setIsDetailsModalOpen(true);
                  }}
                >
                  <td className="py-4 px-4 text-sm font-medium text-gray-900 line-clamp-1">
                    {blog.title}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-700">{blog.author}</td>
                  <td className="py-4 px-4 text-sm text-gray-700 capitalize">{blog.category}</td>
                  <td className="py-4 px-4 text-sm text-gray-500">
                    {blog.images?.length || 0} image(s)
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        blog.is_deleted
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {blog.is_deleted ? "Deleted" : "Published"}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-500">
                    {formatDate(blog.created_at)}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-700">
                    <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => {
                          setSelectedBlog(blog);
                          setIsCreateModalOpen(true);
                        }}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="Edit"
                      >
                        <MdEdit size={20} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedBlog(blog);
                          setIsDeleteModalOpen(true);
                        }}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <MdDeleteForever size={20} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedBlog(blog);
                          setIsDetailsModalOpen(true);
                        }}
                        className="text-gray-600 hover:text-gray-900"
                        title="View Details"
                      >
                        <MdVisibility size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-500">
                  No blogs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
        <div className="text-sm text-gray-700">
          Showing {(pagination.pageNum - 1) * pagination.pageSize + 1} to{" "}
          {Math.min(pagination.pageNum * pagination.pageSize, pagination.totalItems)} of{" "}
          {pagination.totalItems} blogs
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setPagination((p) => ({ ...p, pageNum: p.pageNum - 1 }))}
            disabled={pagination.pageNum === 1}
            className="px-4 py-2 rounded-md text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <div className="px-4 py-2 bg-gray-100 rounded-md text-sm font-medium">
            Page {pagination.pageNum} of {pagination.totalPages}
          </div>
          <button
            onClick={() => setPagination((p) => ({ ...p, pageNum: p.pageNum + 1 }))}
            disabled={pagination.pageNum >= pagination.totalPages}
            className="px-4 py-2 rounded-md text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>

      {/* Modals */}
      <BlogFormModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setSelectedBlog(null);
        }}
        onSuccess={fetchBlogs}
        initialData={selectedBlog}
      />
      <BlogDeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedBlog(null);
        }}
        onConfirm={handleDelete}
      />
      <BlogDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedBlog(null);
        }}
        blog={selectedBlog}
      />
    </div>
  );
}

export default BlogSections;