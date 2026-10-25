import { MetadataRoute } from 'next'
import { fetchAllBlogs } from '@/lib/blogApi'
import { buildSitemap } from '@/utils/sitemapEntries'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return buildSitemap(await fetchAllBlogs())
}
