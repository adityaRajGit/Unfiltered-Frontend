"use client";

import { Calendar, Clock } from "lucide-react";

interface MonthYearSelectorProps {
  month: number;
  year: number;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
}

export default function MonthYearSelector({
  month,
  year,
  onMonthChange,
  onYearChange,
}: MonthYearSelectorProps) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2023 + 1 }, (_, i) => 2023 + i);

  return (
    <div className="w-full md:w-fit flex flex-col md:flex-row gap-2 md:gap-4 items-stretch md:items-end mb-4 p-2 md:p-3 bg-[#e3fcf7] rounded-lg shadow-sm border border-[#b3e5dc] md:ml-auto">
      {/* Month Selector */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Calendar className="w-3 h-3 text-[#009689]" />
          <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Month</label>
        </div>
        <select
          value={month}
          onChange={(e) => onMonthChange(Number(e.target.value))}
          className="w-full md:w-auto px-3 py-2 font-bold text-sm text-gray-800 bg-white border-2 border-[#b3e5dc] rounded-md hover:border-[#009689] focus:outline-none focus:ring-2 focus:ring-[#009689] focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer appearance-none"
          style={{
            fontWeight: 700,
            fontSize: "0.95rem",
            letterSpacing: "0.2px",
            backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23009689' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 0.4rem center",
            backgroundSize: "1.2em 1.2em",
            paddingRight: "2rem",
          }}
        >
          {months.map((monthName, index) => (
            <option key={index + 1} value={index + 1}>
              {monthName}
            </option>
          ))}
        </select>
      </div>

      {/* Year Selector */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Clock className="w-3 h-3 text-[#009689]" />
          <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Year</label>
        </div>
        <select
          value={year}
          onChange={(e) => onYearChange(Number(e.target.value))}
          className="w-full md:w-auto px-3 py-2 font-bold text-sm text-gray-800 bg-white border-2 border-[#b3e5dc] rounded-md hover:border-[#009689] focus:outline-none focus:ring-2 focus:ring-[#009689] focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer appearance-none"
          style={{
            fontWeight: 700,
            fontSize: "0.95rem",
            letterSpacing: "0.2px",
            backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23009689' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 0.4rem center",
            backgroundSize: "1.2em 1.2em",
            paddingRight: "2rem",
          }}
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
