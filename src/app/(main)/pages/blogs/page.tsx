import type { Metadata } from 'next';
import { pageMetadata } from '@/utils/seo';
import BlogsPage from '@/component/blogs/BlogsPage'

function page() {
  return (
    <div>
      <BlogsPage />
    </div>
  )
}

export const metadata: Metadata = pageMetadata('/pages/blogs');

export default page