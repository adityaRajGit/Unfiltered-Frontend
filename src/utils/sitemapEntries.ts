import type { MetadataRoute } from 'next';
import { absoluteUrl, INDEXABLE_STATIC_PATHS } from './site.ts';
import { blogPath, type BlogPost } from './blog.ts';

// Static pages get no lastModified: a build-time date on every URL teaches Google
// to ignore the field. Posts carry their real edit date.
export function buildSitemap(posts: BlogPost[]): MetadataRoute.Sitemap {
  return [
    ...INDEXABLE_STATIC_PATHS.map((path) => ({ url: absoluteUrl(path) })),
    ...posts.map((post) => ({
      url: absoluteUrl(blogPath(post)),
      lastModified: post.updated_at ?? post.created_at,
    })),
  ];
}
