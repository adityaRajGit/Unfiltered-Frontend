"use client";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getSingleBlog, listBlogs } from "@/store/blogsSlice";
import { toast } from "react-toastify";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Blog {
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

interface Props {
  id: string;
}

export default function BlogPostPage({ id }: Props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [post, setPost] = useState<Blog | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Fetch single blog
  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const resultAction = await dispatch(getSingleBlog(id as any) as any);
        if (getSingleBlog.fulfilled.match(resultAction)) {
          const blogData = resultAction.payload.data.blog;
          setPost(blogData);
          setError(null);
        } else {
          const errorMsg = resultAction.error?.message || "Failed to load blog";
          throw new Error(errorMsg);
        }
      } catch (err: any) {
        console.error(err);
        const errorMsg = err.message || "Failed to load blog";
        setError(errorMsg);
        toast.error(errorMsg);
        setTimeout(() => router.push("/pages/blogs"), 2000);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [dispatch, id, router]);

  // Fetch related posts
  useEffect(() => {
    const fetchRelated = async () => {
      if (!post?.category) return;
      try {
        const resultAction = await dispatch(
          listBlogs({
            pageNum: 1,
            pageSize: 4,
            filters: { category: post.category },
          } as any) as any
        );
        if (listBlogs.fulfilled.match(resultAction)) {
          const blogs = resultAction.payload.data.blogs || resultAction.payload.data.blogList || [];
          const filtered = blogs.filter((b: Blog) => b._id !== post._id);
          setRelatedPosts(filtered.slice(0, 3));
        }
      } catch (err) {
        console.error("Failed to fetch related posts", err);
      }
    };
    fetchRelated();
  }, [dispatch, post]);

  const images = post?.images || [];
  const hasImages = images.length > 0;

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || "Blog not found"}</p>
          <Link href="/pages/blogs" className="text-teal-600 hover:underline">
            ← Back to all blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#d7fcf4] to-[#00968910] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link
            href="/pages/blogs"
            className="inline-flex items-center text-teal-600 font-medium hover:underline"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to all Blogs
          </Link>
        </div>

        <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Image Gallery */}
          {hasImages && (
            <div className="space-y-4">
              {/* Main image */}
              <div className="relative bg-gray-100 aspect-video md:aspect-[21/9]">
                <img
                  src={images[selectedImageIndex]}
                  alt={`${post.title} - ${selectedImageIndex + 1}`}
                  className="w-full h-full object-contain cursor-pointer bg-gray-50"
                  onClick={() => setLightboxOpen(true)}
                />
                {/* Navigation arrows (if more than one image) */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage();
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
                    >
                      <FaChevronLeft size={20} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage();
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
                    >
                      <FaChevronRight size={20} />
                    </button>
                    <div className="absolute bottom-4 right-4 bg-black/60 text-white text-sm px-2 py-1 rounded-lg">
                      {selectedImageIndex + 1} / {images.length}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto px-4 pb-4 scrollbar-thin">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        idx === selectedImageIndex
                          ? "border-teal-500 ring-2 ring-teal-200"
                          : "border-gray-200 hover:border-teal-300"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Fallback if no images */}
          {!hasImages && (
            <div className="h-64 bg-gradient-to-r from-teal-500 to-teal-600 flex items-center justify-center">
              <span className="text-white text-lg">No images available</span>
            </div>
          )}

          <div className="p-8">
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm font-medium border border-teal-200">
                {post.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>

            <div className="flex items-center mb-8">
              <div className="bg-teal-100 rounded-full w-12 h-12 flex items-center justify-center">
                <span className="text-teal-700 font-medium text-lg">
                  {post.author?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="ml-4">
                <p className="font-medium text-gray-900">{post.author}</p>
                <p className="text-sm text-gray-500">
                  {post.created_at
                    ? new Date(post.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Recent"}
                </p>
              </div>
            </div>

            <div className="prose max-w-none text-gray-700">
              {post.content.split("\n\n").map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </article>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-teal-700 mb-8">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost._id}
                  href={`/pages/blogs/${relatedPost._id}`}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="h-32 bg-gradient-to-r from-teal-500 to-teal-600 relative">
                    {relatedPost.images?.[0] && (
                      <img
                        src={relatedPost.images[0]}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-1">
                      {new Date(relatedPost.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    <div className="flex items-center mt-2">
                      <div className="bg-teal-100 rounded-full w-6 h-6 flex items-center justify-center">
                        <span className="text-xs font-medium text-teal-700">
                          {relatedPost.author.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="ml-2 text-sm text-gray-700">
                        {relatedPost.author}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && hasImages && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-teal-600/80 transition"
          >
            <FaTimes size={24} />
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition"
              >
                <FaChevronLeft size={24} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition"
              >
                <FaChevronRight size={24} />
              </button>
            </>
          )}

          <img
            src={images[selectedImageIndex]}
            alt="Full size"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
            {selectedImageIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
}