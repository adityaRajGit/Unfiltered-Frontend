import { TopTherapist } from "@/utils/types/statistics";

interface Props {
  monthlyTotal: number;
  upcomingCount: number;
  activeSubscriptions: number;
  topTherapist: TopTherapist | null;
  loading: boolean;
}

const Card = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-[#e3fcf7] rounded-xl p-5 flex flex-col gap-1 min-w-0">
    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{label}</p>
    <p className="text-2xl font-bold text-[#009689]">{value}</p>
  </div>
);

export default function KpiCards({ monthlyTotal, upcomingCount, activeSubscriptions, topTherapist, loading }: Props) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-[#e3fcf7] rounded-xl p-5 h-20 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card label="Appointments This Month" value={String(monthlyTotal)} />
      <Card label="Upcoming Appointments" value={String(upcomingCount)} />
      <Card label="Active Subscriptions" value={String(activeSubscriptions)} />
      <Card label="Top Therapist" value={topTherapist?.name ?? "—"} />
    </div>
  );
}
