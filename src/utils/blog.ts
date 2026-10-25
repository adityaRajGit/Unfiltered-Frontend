// Blog URLs are /pages/blogs/<slug>-<mongoId>. The id is what we look the post up
// by; the slug is for people and search engines and may go stale when a title is
// edited (the page then redirects to the current one).

export type BlogPost = {
  _id: string;
  title: string;
  images: string[];
  content: string;
  author: string;
  category: string;
  created_at: string;
  updated_at?: string;
};

const SLUG_MAX = 60;
const MONGO_ID_AT_END = /(?:^|-)([0-9a-f]{24})$/i;

export function slugify(title: string): string {
  const slug = title
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  if (slug.length <= SLUG_MAX) return slug;
  const cut = slug.slice(0, SLUG_MAX + 1);
  const lastDash = cut.lastIndexOf('-');
  return (lastDash > 0 ? cut.slice(0, lastDash) : slug.slice(0, SLUG_MAX)).replace(/-+$/, '');
}

export function blogPath(post: Pick<BlogPost, '_id' | 'title'>): string {
  const slug = slugify(post.title);
  return slug ? `/pages/blogs/${slug}-${post._id}` : `/pages/blogs/${post._id}`;
}

// Guards the backend URL: only a bare Mongo id may be interpolated into /blog/<id>.
export function isBlogId(id: string): boolean {
  return /^[0-9a-f]{24}$/i.test(id);
}

export function idFromBlogParam(param: string): string | null {
  return MONGO_ID_AT_END.exec(param)?.[1] ?? null;
}

function truncateWords(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max); // leaves one character for the ellipsis
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut.slice(0, max - 1)).trimEnd()}…`;
}

// Blog content may be plain text or Tiptap HTML; descriptions must be plain text.
export function blogExcerpt(content: string, max = 155): string {
  const text = content
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
  return truncateWords(text, max);
}

export function truncateTitle(title: string, max = 60): string {
  return truncateWords(title.trim(), max);
}

const BRAND_SUFFIX = ' | Stay Unfiltered';

// Post <title>: the brand is appended only when the whole thing still fits in 60.
export function blogTitle(title: string): string {
  const base = truncateTitle(title);
  return base.length + BRAND_SUFFIX.length <= 60 ? base + BRAND_SUFFIX : base;
}

type ListData = { blogList?: BlogPost[]; blogs?: BlogPost[]; totalCount?: number; blogCount?: number };

// Mirrors the response handling in BlogsPage.tsx: the API has used both shapes.
export function parseBlogList(json: unknown): { blogs: BlogPost[]; total: number } {
  const data = (json as { data?: ListData } | null)?.data;
  const blogs = data?.blogList ?? data?.blogs;
  if (!Array.isArray(blogs)) return { blogs: [], total: 0 };
  return { blogs, total: data?.totalCount ?? data?.blogCount ?? blogs.length };
}

export function parseBlog(json: unknown): BlogPost | null {
  const blog = (json as { data?: { blog?: BlogPost } } | null)?.data?.blog;
  return blog && typeof blog._id === 'string' ? blog : null;
}
