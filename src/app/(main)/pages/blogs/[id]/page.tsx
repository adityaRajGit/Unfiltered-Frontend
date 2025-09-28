"use client";
import Link from 'next/link';
import { blogPosts } from '@/utils/demoData';
import { notFound } from 'next/navigation';
import { useParams } from 'next/navigation';

export default function BlogPostPage() {
    const params = useParams();
    const post = blogPosts.find(p => p.id === Number(params.id));

    if (!post) {
        return notFound();
    }

    // Find related posts
    const relatedPosts = blogPosts
        .filter(p => p.id !== post.id && p.category === post.category)
        .slice(0, 3);

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#d7fcf4] to-[#00968910] py-16 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <Link href="/pages/blogs" className="inline-flex items-center text-[#009689] font-medium hover:underline">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to all Blogs
                    </Link>
                </div>

                <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="h-64 bg-gradient-to-r from-[#009689] to-[#00b8a9]"></div>

                    <div className="p-8">
                        <div className="flex flex-wrap gap-3 mb-6">
                            <span className="px-3 py-1 bg-[#d7fcf4] text-[#009689] rounded-full text-sm font-medium">
                                {post.category}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            {post.title}
                        </h1>

                        <div className="flex items-center mb-8">
                            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12" />
                            <div className="ml-4">
                                <p className="font-medium text-gray-900">{post.author}</p>
                                <p className="text-sm text-gray-500">
                                    {new Date(post.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>

                        <div className="prose max-w-none text-gray-700">
                            {post.content.split('\n\n').map((paragraph, index) => (
                                <p key={index} className="mb-4">{paragraph}</p>
                            ))}
                        </div>
                    </div>
                </article>

                {/* Related Articles */}
                {relatedPosts.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold text-[#009689] mb-8">Related Articles</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedPosts.map(relatedPost => (
                                <Link
                                    key={relatedPost.id}
                                    href={`/pages/blogs/${relatedPost.id}`}
                                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                                >
                                    <div className="h-32 bg-gradient-to-r from-[#009689] to-[#00b8a9]"></div>
                                    <div className="p-4">
                                        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{relatedPost.title}</h3>
                                        <p className="text-sm text-gray-500 mb-1">
                                            {new Date(relatedPost.date).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </p>
                                        <div className="flex items-center mt-2">
                                            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-6 h-6" />
                                            <span className="ml-2 text-sm text-gray-700">{relatedPost.author}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}