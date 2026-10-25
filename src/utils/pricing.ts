export type PackageSummary = {
  id: string;
  name: string;
  total_sessions: number;
  realPrice: number;
  discountedPrice: number;
  description: string;
  points: string[];
  resultCheck: string;
};

// null means "price not known yet": callers show a placeholder, never 0 or NaN.
export function savingsPercent(real: number, discounted: number): number | null {
  if (!Number.isFinite(real) || !Number.isFinite(discounted) || real <= 0) return null;
  return Math.max(0, Math.round(((real - discounted) / real) * 100));
}

type RawPackage = Partial<Omit<PackageSummary, 'id'>> & { _id?: string };

// Reads data.packageList[0] from POST /package/list.
export function parsePackage(json: unknown): PackageSummary | null {
  const raw = (json as { data?: { packageList?: RawPackage[] } } | null)?.data?.packageList?.[0];
  if (!raw || typeof raw._id !== 'string') return null;
  if (typeof raw.realPrice !== 'number' || typeof raw.discountedPrice !== 'number') return null;
  return {
    id: raw._id,
    name: raw.name ?? '',
    total_sessions: raw.total_sessions ?? 0,
    realPrice: raw.realPrice,
    discountedPrice: raw.discountedPrice,
    description: raw.description ?? '',
    points: Array.isArray(raw.points) ? raw.points : [],
    resultCheck: raw.resultCheck ?? '',
  };
}
