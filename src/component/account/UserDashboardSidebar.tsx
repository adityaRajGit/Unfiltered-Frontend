"use client";

import {
  FaAward,
  FaCalendarCheck,
  FaHome,
  FaSearch,
  FaTimes,
  FaUser,
} from "react-icons/fa";

export type DashboardTab =
  | "overview"
  | "find"
  | "sessions"
  | "achievements"
  | "profile";

export const DASHBOARD_TAB_LABELS: Record<DashboardTab, string> = {
  overview: "Overview",
  find: "Find Therapist",
  sessions: "My Sessions",
  achievements: "Achievements",
  profile: "Profile",
};

interface UserDashboardSidebarProps {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  userName?: string;
  sessionBalance?: number;
  upcomingCount?: number;
}

const NAV_ITEMS: {
  id: DashboardTab;
  label: string;
  icon: typeof FaHome;
}[] = [
  { id: "overview", label: "Overview", icon: FaHome },
  { id: "find", label: "Find Therapist", icon: FaSearch },
  { id: "sessions", label: "My Sessions", icon: FaCalendarCheck },
  { id: "achievements", label: "Achievements", icon: FaAward },
  { id: "profile", label: "Profile", icon: FaUser },
];

export default function UserDashboardSidebar({
  activeTab,
  onTabChange,
  mobileOpen,
  onCloseMobile,
  userName,
  sessionBalance = 0,
  upcomingCount = 0,
}: UserDashboardSidebarProps) {
  const handleSelect = (tab: DashboardTab) => {
    onTabChange(tab);
    onCloseMobile();
  };

  const navContent = (
    <>
      <div className="px-5 pt-6 pb-4 border-b border-teal-100">
        <p className="text-xs font-semibold uppercase tracking-wider text-teal-600">
          Dashboard
        </p>
        <p className="mt-1 text-lg font-bold text-gray-900 truncate">
          {userName || "My Account"}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full bg-teal-50 px-2.5 py-1 text-xs font-medium text-teal-700">
            {sessionBalance} session{sessionBalance === 1 ? "" : "s"}
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
              {item.id === "sessions" && upcomingCount > 0 && !isActive && (
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
      {/* Desktop sidebar */}
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
