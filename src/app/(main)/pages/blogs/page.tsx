import type { Metadata } from 'next';
import { pageMetadata } from '@/utils/seo';
import { fetchBlogList } from '@/lib/blogApi';
import BlogsPage from '@/component/blogs/BlogsPage'

async function page() {
  const { blogs, total } = await fetchBlogList({ pageNum: 1, pageSize: 10, filters: {} });
  return (
    <div>
      <BlogsPage initialBlogs={blogs} initialTotal={total} />
    </div>
  )
}

export const metadata: Metadata = pageMetadata('/pages/blogs');

export default page
