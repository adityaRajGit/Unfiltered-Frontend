import { AppointmentRow } from "@/utils/types/statistics";
import { format, parseISO } from "date-fns";

interface Props {
  data: AppointmentRow[];
  loading: boolean;
}

const StatusBadge = ({ status }: { status: string }) => {
  const map: Record<string, string> = {
    scheduled: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
  };
  const key = (status ?? "").toLowerCase();
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${map[key] ?? "bg-gray-100 text-gray-600"}`}>
      {status || "—"}
    </span>
  );
};


const fmt = (value: string) => {
  if (!value) return "—";
  try {
    const iso = parseISO(value);
    if (!isNaN(iso.getTime())) return format(iso, "d MMM yyyy, h:mm a");
  } catch {}
  const d = new Date(value);
  if (!isNaN(d.getTime())) return format(d, "d MMM yyyy, h:mm a");
  return value;
};

export default function LatestAppointmentsTable({ data, loading }: Props) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm flex flex-col gap-3">
      <h2 className="text-sm font-semibold text-gray-700">Latest 10 Appointments</h2>
      {loading ? (
        <div className="h-40 animate-pulse bg-[#e3fcf7] rounded-lg" />
      ) : data.length === 0 ? (
        <p className="text-sm text-gray-400">No appointments found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-gray-400 border-b">
                <th className="pb-2 text-left font-medium">Booked At</th>
                <th className="pb-2 text-left font-medium">User</th>
                <th className="pb-2 text-left font-medium">Therapist</th>
                <th className="pb-2 text-left font-medium">Scheduled At</th>
                <th className="pb-2 text-left font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((a) => (
                <tr key={a._id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="py-2 pr-3 whitespace-nowrap">{fmt(a.created_at)}</td>
                  <td className="py-2 pr-3">
                    <div className="font-medium text-gray-700">{a.user_id?.name}</div>
                    <div className="text-gray-400">{a.user_id?.email}</div>
                  </td>
                  <td className="py-2 pr-3">
                    <div className="font-medium text-gray-700">{a.therapist_id?.name}</div>
                  </td>
                  <td className="py-2 pr-3 whitespace-nowrap">{fmt(a.scheduled_at)}</td>
                  <td className="py-2 pr-3"><StatusBadge status={a.appointment_status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
