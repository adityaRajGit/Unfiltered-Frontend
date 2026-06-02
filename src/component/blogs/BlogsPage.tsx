"use client";
import { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { listBlogs } from "@/store/blogsSlice";
import { toast } from "react-toastify";

// Types
interface BlogPost {
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

interface PaginationMeta {
    pageNum: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
}

// Custom debounce hook
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
}

export default function BlogsPage() {
    const dispatch = useDispatch();

    // UI state
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [loading, setLoading] = useState(false);
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [pagination, setPagination] = useState<PaginationMeta>({
        pageNum: 1,
        pageSize: 10,
        totalPages: 1,
        totalItems: 0,
    });
    const [categories, setCategories] = useState<string[]>(["all"]);

    // Debounced search term (500ms delay)
    const debouncedSearch = useDebounce(searchTerm, 500);


    // Fetch blogs from API
    const fetchBlogs = useCallback(async () => {
        setLoading(true);
        try {
            // Build query parameters exactly like Mongoose query filters
            const params: Record<string, any> = {
                pageNum: pagination.pageNum,
                pageSize: pagination.pageSize,
                filters: {},
            };

            // Add search filter (title contains term, case-insensitive)
            if (debouncedSearch) {
                params.filters.title = { $regex: debouncedSearch, $options: "i" };
            }

            // Add category filter (exact match, exclude 'all')
            if (selectedCategory !== "all") {
                params.filters.category = selectedCategory;
            }

            // Dispatch Redux action
            const response = await dispatch(listBlogs(params as any) as any);

            if (response?.error) {
                toast.error(response.error.message || "Failed to fetch blogs");
            } else if (response.payload?.data) {
                setBlogs(response.payload.data.blogList || response.payload.data.blogs || []);
                const totalItems = response.payload.data.totalCount || response.payload.data.blogCount;
                const totalPages = Math.ceil(totalItems / pagination.pageSize);
                setPagination((prev) => ({
                    ...prev,
                    totalPages,
                    totalItems,
                }));

                // Extract unique categories from fetched blogs for filter dropdown
                const uniqueCategories: any = [
                    "all",
                    ...new Set(
                        (response.payload.data.blogList || response.payload.data.blogs || []).map(
                            (blog: BlogPost) => blog.category
                        )
                    ),
                ];
                setCategories(uniqueCategories);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch blogs");
        } finally {
            setLoading(false);
        }
    }, [dispatch, pagination.pageNum, pagination.pageSize, debouncedSearch, selectedCategory]);

    // Refetch whenever relevant parameters change
    useEffect(() => {
        fetchBlogs();
    }, [fetchBlogs]);

    // Pagination handlers
    const goToPage = (page: number) => {
        if (page >= 1 && page <= pagination.totalPages) {
            setPagination((prev) => ({ ...prev, pageNum: page }));
        }
    };

    const changePageSize = (newSize: number) => {
        setPagination((prev) => ({ ...prev, pageSize: newSize, pageNum: 1 }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#d7fcf4] to-[#00968910] py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#009689] mb-4">
                        Mental Health Insights
                    </h1>
                    <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                        Expert articles and resources for workplace mental wellbeing
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Search with debounce */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search articles..."
                                className="w-full p-4 pr-12 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#009689]"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {loading && (
                                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#009689]"></div>
                                </div>
                            )}
                            {!loading && searchTerm && (
                                <svg
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            )}
                        </div>

                        {/* Category */}
                        <div>
                            <select
                                className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#009689]"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category === "all"
                                            ? "All Categories"
                                            : category.charAt(0).toUpperCase() + category.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Blog Posts Grid */}
                {loading && blogs.length === 0 ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#009689]"></div>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogs.map((post) => (
                                <Link
                                    key={post._id}
                                    href={`/pages/blogs/${post._id}`}
                                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                                >
                                    <div className="h-48 bg-gradient-to-r from-[#009689] to-[#00b8a9] relative">
                                        {post.images && post.images[0] && (
                                            <img
                                                src={post.images[0]}
                                                alt={post.title}
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-sm font-medium text-[#009689]">
                                                {post.category}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                {new Date(post.created_at).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                })}
                                            </span>
                                        </div>
                                        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                            {post.title}
                                        </h2>
                                        <p className="text-gray-700 mb-4 line-clamp-3">
                                            {post.content.substring(0, 120)}...
                                        </p>
                                        <div className="flex items-center">
                                            <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center">
                                                <span className="text-gray-600 font-medium">
                                                    {post.author.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            <span className="ml-3 text-sm font-medium text-gray-700">
                                                {post.author}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        {pagination.totalPages > 1 && (
                            <div className="flex flex-col sm:flex-row justify-between items-center mt-12 gap-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-700">Rows per page:</span>
                                    <select
                                        value={pagination.pageSize}
                                        onChange={(e) => changePageSize(Number(e.target.value))}
                                        className="border rounded-md px-2 py-1 text-sm"
                                    >
                                        {[5, 10, 20, 50].map((size) => (
                                            <option key={size} value={size}>
                                                {size}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => goToPage(pagination.pageNum - 1)}
                                        disabled={pagination.pageNum === 1}
                                        className="px-3 py-1 rounded-md border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                    >
                                        Previous
                                    </button>

                                    <div className="flex gap-1">
                                        {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                                            let pageNum: number;
                                            const total = pagination.totalPages;
                                            const current = pagination.pageNum;

                                            if (total <= 5) {
                                                pageNum = i + 1;
                                            } else if (current <= 3) {
                                                pageNum = i + 1;
                                            } else if (current >= total - 2) {
                                                pageNum = total - 4 + i;
                                            } else {
                                                pageNum = current - 2 + i;
                                            }

                                            return (
                                                <button
                                                    key={pageNum}
                                                    onClick={() => goToPage(pageNum)}
                                                    className={`w-10 h-10 rounded-md ${pagination.pageNum === pageNum
                                                        ? "bg-[#009689] text-white"
                                                        : "border hover:bg-gray-50"
                                                        }`}
                                                >
                                                    {pageNum}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <button
                                        onClick={() => goToPage(pagination.pageNum + 1)}
                                        disabled={pagination.pageNum === pagination.totalPages}
                                        className="px-3 py-1 rounded-md border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                    >
                                        Next
                                    </button>
                                </div>

                                <div className="text-sm text-gray-700">
                                    Showing {(pagination.pageNum - 1) * pagination.pageSize + 1} to{" "}
                                    {Math.min(pagination.pageNum * pagination.pageSize, pagination.totalItems)} of{" "}
                                    {pagination.totalItems} results
                                </div>
                            </div>
                        )}
                    </>
                )}

                {/* Empty State */}
                {!loading && blogs.length === 0 && (
                    <div className="text-center py-16">
                        <div className="bg-gradient-to-br from-[#d7fcf4] to-[#009689] p-2 rounded-full w-24 h-24 mx-auto flex items-center justify-center mb-6">
                            <svg
                                className="w-12 h-12 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No articles found</h3>
                        <p className="text-gray-700 max-w-md mx-auto">
                            Try adjusting your search or filter to find what you&apos;re looking for.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}