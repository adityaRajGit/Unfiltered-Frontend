import type { Metadata } from 'next';
import { pageMetadata } from '@/utils/seo';

export const metadata: Metadata = pageMetadata('/pages/faq');

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
