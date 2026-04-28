import { MonthlyAppointmentPoint } from "@/utils/types/statistics";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { format, parseISO } from "date-fns";

interface Props {
  data: MonthlyAppointmentPoint[];
  loading: boolean;
}

export default function AppointmentsMonthlyChart({ data, loading }: Props) {
  const chartData = data.map((d) => {
    try {
      return { day: format(parseISO(d.date), "d"), count: d.count };
    } catch {
      return { day: d.date, count: d.count };
    }
  });

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm">
      <h2 className="text-sm font-semibold text-gray-700 mb-4">Appointments This Month (by day)</h2>
      {loading ? (
        <div className="h-48 animate-pulse bg-[#e3fcf7] rounded-lg" />
      ) : data.length === 0 ? (
        <p className="text-sm text-gray-400 h-48 flex items-center justify-center">No appointment data for this month.</p>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#009689" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
