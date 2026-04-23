import { SubscribedUserRow } from "@/utils/types/statistics";
import { format, parseISO } from "date-fns";

interface Props {
  data: SubscribedUserRow[];
  total: number;
  page: number;
  loading: boolean;
  onPageChange: (page: number) => void;
}

const fmt = (iso?: string) => {
  if (!iso) return "—";
  try { return format(parseISO(iso), "d MMM yyyy"); }
  catch { return iso; }
};

const statusStyle: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  paused: "bg-yellow-100 text-yellow-700",
  expired: "bg-gray-100 text-gray-500",
  cancelled: "bg-red-100 text-red-600",
  pending: "bg-blue-100 text-blue-600",
};

export default function SubscribedUsersTable({ data, total, page, loading, onPageChange }: Props) {
  const totalPages = Math.ceil(total / 10);

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm flex flex-col gap-3">
      <h2 className="text-sm font-semibold text-gray-700">Subscribed Users</h2>
      {loading ? (
        <div className="h-40 animate-pulse bg-[#e3fcf7] rounded-lg" />
      ) : data.length === 0 ? (
        <p className="text-sm text-gray-400">No subscriptions found.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-gray-400 border-b">
                  <th className="pb-2 text-left font-medium">User</th>
                  <th className="pb-2 text-left font-medium">Package</th>
                  <th className="pb-2 text-left font-medium">Status</th>
                  <th className="pb-2 text-left font-medium">Bought</th>
                  {/* <th className="pb-2 text-left font-medium">Expires</th> */}
                </tr>
              </thead>
              <tbody>
                {data.map((s) => (
                  <tr key={s._id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="py-2 pr-3">
                      <div className="font-medium text-gray-700">{s.user_id?.name}</div>
                      <div className="text-gray-400">{s.user_id?.email}</div>
                    </td>
                    <td className="py-2 pr-3">{s.package_id?.name ?? "—"}</td>
                    <td className="py-2 pr-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle[s.status] ?? "bg-gray-100 text-gray-600"}`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="py-2 pr-3 whitespace-nowrap">{fmt(s.date_bought)}</td>
                    {/* <td className="py-2 whitespace-nowrap">{fmt(s.expiry_date)}</td> */}
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
