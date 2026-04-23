import { AppointmentRow } from "@/utils/types/statistics";
import { formatDistanceToNow, parseISO } from "date-fns";

interface Props {
  data: AppointmentRow[];
  loading: boolean;
}

const fmt = (iso: string) => {
  try {
    const d = parseISO(iso);
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium", timeStyle: "short",
    }).format(d);
  } catch { return iso; }
};

const timeUntil = (iso: string) => {
  try { return formatDistanceToNow(parseISO(iso), { addSuffix: true }); }
  catch { return "—"; }
};

export default function UpcomingAppointmentsTable({ data, loading }: Props) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm flex flex-col gap-3">
      <h2 className="text-sm font-semibold text-gray-700">Next 5 Upcoming Appointments</h2>
      {loading ? (
        <div className="h-36 animate-pulse bg-[#e3fcf7] rounded-lg" />
      ) : data.length === 0 ? (
        <p className="text-sm text-gray-400">No upcoming appointments.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-gray-400 border-b">
                <th className="pb-2 text-left font-medium">Scheduled At</th>
                <th className="pb-2 text-left font-medium">User</th>
                <th className="pb-2 text-left font-medium">Therapist</th>
                <th className="pb-2 text-left font-medium">Time Until</th>
                <th className="pb-2 text-left font-medium">Meet</th>
              </tr>
            </thead>
            <tbody>
              {data.map((a) => (
                <tr key={a._id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="py-2 pr-3 whitespace-nowrap">{fmt(a.scheduled_at)}</td>
                  <td className="py-2 pr-3">{a.user_id?.name}</td>
                  <td className="py-2 pr-3">{a.therapist_id?.name}</td>
                  <td className="py-2 pr-3 whitespace-nowrap text-[#009689]">{timeUntil(a.scheduled_at)}</td>
                  <td className="py-2">
                    {a.meet_link ? (
                      <a
                        href={a.meet_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2 py-1 bg-[#009689] text-white rounded text-xs hover:opacity-90"
                      >
                        Join
                      </a>
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
