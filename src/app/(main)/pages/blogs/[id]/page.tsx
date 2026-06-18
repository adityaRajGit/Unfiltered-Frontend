"use client";
import BlogPostPage from "@/component/blogs/SingleBlogPage";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const id = params.id as string; 
  return <BlogPostPage id={id} />;
}