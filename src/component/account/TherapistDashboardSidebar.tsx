"use client";

import {
  FaCalendarAlt,
  FaCalendarCheck,
  FaHome,
  FaTimes,
  FaUserMd,
} from "react-icons/fa";

export type TherapistDashboardTab =
  | "overview"
  | "availability"
  | "appointments"
  | "profile";

export const THERAPIST_DASHBOARD_TAB_LABELS: Record<TherapistDashboardTab, string> = {
  overview: "Overview",
  availability: "Availability",
  appointments: "Appointments",
  profile: "Profile",
};

interface TherapistDashboardSidebarProps {
  activeTab: TherapistDashboardTab;
  onTabChange: (tab: TherapistDashboardTab) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  therapistName?: string;
  profileCompletion?: number;
  upcomingCount?: number;
}

const NAV_ITEMS: {
  id: TherapistDashboardTab;
  label: string;
  icon: typeof FaHome;
}[] = [
  { id: "overview", label: "Overview", icon: FaHome },
  { id: "availability", label: "Availability", icon: FaCalendarAlt },
  { id: "appointments", label: "Appointments", icon: FaCalendarCheck },
  { id: "profile", label: "Profile", icon: FaUserMd },
];

export default function TherapistDashboardSidebar({
  activeTab,
  onTabChange,
  mobileOpen,
  onCloseMobile,
  therapistName,
  profileCompletion = 0,
  upcomingCount = 0,
}: TherapistDashboardSidebarProps) {
  const handleSelect = (tab: TherapistDashboardTab) => {
    onTabChange(tab);
    onCloseMobile();
  };

  const navContent = (
    <>
      <div className="px-5 pt-6 pb-4 border-b border-teal-100">
        <p className="text-xs font-semibold uppercase tracking-wider text-teal-600">
          Therapist Dashboard
        </p>
        <p className="mt-1 text-lg font-bold text-gray-900 truncate">
          {therapistName || "My Account"}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full bg-teal-50 px-2.5 py-1 text-xs font-medium text-teal-700">
            {profileCompletion}% complete
          </span>
          <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
            {upcomingCount} upcoming
          </span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelect(item.id)}
              className={`w-full flex items-center gap-3 rounded-xl px-3.5 py-3 text-left text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-[#009689] to-[#00b09b] text-white shadow-md"
                  : "text-gray-600 hover:bg-teal-50 hover:text-teal-700"
              }`}
            >
              <Icon
                className={`text-base shrink-0 ${
                  isActive ? "text-white" : "text-teal-600"
                }`}
              />
              <span>{item.label}</span>
              {item.id === "appointments" && upcomingCount > 0 && !isActive && (
                <span className="ml-auto rounded-full bg-teal-100 px-2 py-0.5 text-xs font-semibold text-teal-700">
                  {upcomingCount}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </>
  );

  return (
    <>
      {/* Desktop sidebar — not sticky; site header is already sticky */}
      <aside className="hidden lg:flex lg:w-64 xl:w-72 shrink-0 flex-col bg-white border-r border-teal-100 self-stretch min-h-full">
        {navContent}
      </aside>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
        <aside
          className={`absolute left-0 top-0 h-full w-72 max-w-[85vw] bg-white shadow-2xl flex flex-col transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            type="button"
            onClick={onCloseMobile}
            className="absolute right-3 top-3 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
          {navContent}
        </aside>
      </div>
    </>
  );
}
