import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import BlogPostPage from "@/component/blogs/SingleBlogPage";
import JsonLd from "@/component/global/JsonLd";
import { fetchBlog } from "@/lib/blogApi";
import { blogExcerpt, blogPath, blogTitle, idFromBlogParam } from "@/utils/blog";
import { blogPostingJsonLd, breadcrumbJsonLd } from "@/utils/schema";
import { SHARED_OPEN_GRAPH, SHARED_TWITTER } from "@/utils/seo";

type Params = { params: Promise<{ id: string }> };

// The route param is "<slug>-<mongoId>" (or a bare id from older links).
async function loadPost(param: string) {
  const id = idFromBlogParam(param);
  return id ? fetchBlog(id) : null;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = await loadPost((await params).id);
  if (!post) return {};
  const path = blogPath(post);
  const title = blogTitle(post.title);
  const description = blogExcerpt(post.content);
  // Fall back to the site logo when a post has no image, so shares always have one.
  const images = post.images.length > 0 ? post.images.slice(0, 1) : SHARED_OPEN_GRAPH.images;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { ...SHARED_OPEN_GRAPH, type: "article", title, description, url: path, images },
    twitter: { ...SHARED_TWITTER, title, description, images },
  };
}

export default async function Page({ params }: Params) {
  const param = (await params).id;
  const post = await loadPost(param);
  if (!post) notFound();

  // Old bare-id links and slugs from a since-edited title land on the current URL.
  const path = blogPath(post);
  if (`/pages/blogs/${param}` !== path) permanentRedirect(path);

  return (
    <>
      <JsonLd data={blogPostingJsonLd(post, path)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/pages/blogs" },
          { name: post.title, path },
        ])}
      />
      <BlogPostPage post={post} />
    </>
  );
}
