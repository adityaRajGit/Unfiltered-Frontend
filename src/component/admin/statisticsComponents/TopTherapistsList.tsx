import { TopTherapist } from "@/utils/types/statistics";
import Image from "next/image";

interface Props {
  data: TopTherapist[];
  loading: boolean;
}

export default function TopTherapistsList({ data, loading }: Props) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm flex flex-col gap-3">
      <h2 className="text-sm font-semibold text-gray-700">Top 5 Therapists</h2>
      {loading ? (
        <div className="h-40 animate-pulse bg-[#e3fcf7] rounded-lg" />
      ) : data.length === 0 ? (
        <p className="text-sm text-gray-400">No therapist data.</p>
      ) : (
        <ol className="flex flex-col gap-3">
          {data.map((t, i) => (
            <li key={t.therapist_id} className="flex items-center gap-3">
              <span className="w-5 text-center text-xs font-bold text-[#009689]">{i + 1}</span>
              {t.profile_photo ? (
                <Image
                  src={t.profile_photo}
                  alt={t.name}
                  width={32}
                  height={32}
                  className="rounded-full object-cover w-8 h-8"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#e3fcf7] flex items-center justify-center text-[#009689] text-xs font-bold">
                  {t.name?.[0]}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-gray-700 truncate">{t.name}</div>
                <div className="text-xs text-gray-400">{t.specialization}</div>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-[#009689]">{t.appointment_count}</div>
                <div className="text-xs text-gray-400">total</div>
              </div>
              <div className="text-right">
                <div className="text-xs font-medium text-gray-700">{t.completed_count}</div>
                <div className="text-xs text-gray-400">done</div>
              </div>
              {/* <div className="text-right">
                <div className="text-xs font-medium text-gray-600">
                  {t.avg_feedback != null ? `★ ${t.avg_feedback.toFixed(1)}` : "—"}
                </div>
              </div> */}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
