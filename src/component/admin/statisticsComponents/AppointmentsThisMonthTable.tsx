import { AppointmentRow } from "@/utils/types/statistics";
import { format, parseISO } from "date-fns";

interface Props {
  data: AppointmentRow[];
  total: number;
  page: number;
  loading: boolean;
  onPageChange: (page: number) => void;
}

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

const statusStyle: Record<string, string> = {
  scheduled: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
};

// const paymentStyle: Record<string, string> = {
//   confirmed: "bg-green-100 text-green-700",
//   pending: "bg-amber-100 text-amber-700",
// };

export default function AppointmentsThisMonthTable({ data, total, page, loading, onPageChange }: Props) {
  const totalPages = Math.ceil(total / 20);

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm flex flex-col gap-3">
      <h2 className="text-sm font-semibold text-gray-700">All Appointments This Month</h2>
      {loading ? (
        <div className="h-40 animate-pulse bg-[#e3fcf7] rounded-lg" />
      ) : data.length === 0 ? (
        <p className="text-sm text-gray-400">No appointments this month.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-gray-400 border-b">
                  <th className="pb-2 text-left font-medium">Scheduled At</th>
                  <th className="pb-2 text-left font-medium">User</th>
                  <th className="pb-2 text-left font-medium">Therapist</th>
                  <th className="pb-2 text-left font-medium">Status</th>
                  {/* <th className="pb-2 text-left font-medium">Payment</th> */}
                </tr>
              </thead>
              <tbody>
                {data.map((a) => (
                  <tr key={a._id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="py-2 pr-3 whitespace-nowrap">{fmt(a.scheduled_at)}</td>
                    <td className="py-2 pr-3">{a.user_id?.name}</td>
                    <td className="py-2 pr-3">{a.therapist_id?.name}</td>
                    <td className="py-2 pr-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle[(a.appointment_status ?? "").toLowerCase()] ?? "bg-gray-100 text-gray-600"}`}>
                        {a.appointment_status || "—"}
                      </span>
                    </td>
                    {/* <td className="py-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${paymentStyle[(a.payment_status ?? "").toLowerCase()] ?? "bg-gray-100 text-gray-600"}`}>
                        {a.payment_status || "—"}
                      </span>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <div className="flex items-center gap-2 justify-end mt-1">
              <button
                disabled={page === 1}
                onClick={() => onPageChange(page - 1)}
                className="px-2 py-1 text-xs border rounded disabled:opacity-40 hover:bg-gray-50"
              >
                Prev
              </button>
              <span className="text-xs text-gray-500">{page} / {totalPages}</span>
              <button
                disabled={page === totalPages}
                onClick={() => onPageChange(page + 1)}
                className="px-2 py-1 text-xs border rounded disabled:opacity-40 hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
