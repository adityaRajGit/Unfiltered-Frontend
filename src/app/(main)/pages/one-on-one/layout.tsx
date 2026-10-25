import { pageMetadata } from '@/utils/seo';
import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata('/pages/one-on-one');

export default function OneOnOneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
