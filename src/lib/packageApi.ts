import { parsePackage, type PackageSummary } from '@/utils/pricing';

// Server-side package read. Never throws: with the backend unreachable the page
// renders a price placeholder and the build still passes.

const backend = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function fetchPackageBySessions(sessions: number): Promise<PackageSummary | null> {
  try {
    const res = await fetch(`${backend}/package/list`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pageNum: 1, pageSize: 3, filters: { total_sessions: sessions } }),
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    return parsePackage(await res.json());
  } catch {
    return null;
  }
}
