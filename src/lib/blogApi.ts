import { cache } from 'react';
import { parseBlog, parseBlogList, type BlogPost } from '@/utils/blog';

// Server-side blog reads. They never throw: when the backend is unreachable
// (including CI builds, which point at https://ci.invalid) pages render their
// empty state instead of failing the build.

const backend = process.env.NEXT_PUBLIC_BACKEND_URL;
const REVALIDATE_SECONDS = 300;
const SITEMAP_PAGE_SIZE = 100;
const SITEMAP_MAX_PAGES = 50;

export async function fetchBlogList(params: {
  pageNum: number;
  pageSize: number;
  filters?: Record<string, unknown>;
}): Promise<{ blogs: BlogPost[]; total: number }> {
  try {
    const res = await fetch(`${backend}/blog/list`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filters: {}, ...params }),
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return { blogs: [], total: 0 };
    return parseBlogList(await res.json());
  } catch {
    return { blogs: [], total: 0 };
  }
}

// cache() lets generateMetadata and the page share one request per render.
export const fetchBlog = cache(async (id: string): Promise<BlogPost | null> => {
  try {
    const res = await fetch(`${backend}/blog/${id}`, { next: { revalidate: REVALIDATE_SECONDS } });
    if (!res.ok) return null;
    return parseBlog(await res.json());
  } catch {
    return null;
  }
});

export async function fetchAllBlogs(): Promise<BlogPost[]> {
  const all: BlogPost[] = [];
  for (let pageNum = 1; pageNum <= SITEMAP_MAX_PAGES; pageNum++) {
    const { blogs, total } = await fetchBlogList({ pageNum, pageSize: SITEMAP_PAGE_SIZE });
    all.push(...blogs);
    if (blogs.length === 0 || all.length >= total) break;
  }
  return all;
}
