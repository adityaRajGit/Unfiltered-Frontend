# Statistics Page — Month/Year Selector

**Date:** 2026-06-02  
**Status:** Approved

---

## Overview

Add a month and year selector to the admin Statistics page so admins can view historical monthly statistics rather than always seeing the current month.

---

## Scope

Only the following sections respond to the selected month/year:

- **AppointmentsMonthlyChart** — daily breakdown chart for the selected month
- **AppointmentsThisMonthTable** — paginated list of appointments for the selected month
- **KPI card: "Appointments This Month"** — total count for the selected month

The following sections are **not affected** and continue to fetch once on mount:

- LatestAppointmentsTable
- UpcomingAppointmentsTable
- TopTherapistsList
- SubscribedUsersTable
- KPI cards: Upcoming Appointments, Active Subscriptions, Top Therapist

---

## Architecture

### State

Local React state in `Statistics.tsx`:

```ts
const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
```

No Redux state changes required. Month/year is UI-local state with no need to persist across unmounts or share with other components.

### Data Flow

**On mount:** All existing fetches fire as before (no change).

**On `selectedMonth` or `selectedYear` change:**

1. Dispatch `fetchMonthlyStats({ month: selectedMonth, year: selectedYear })`
2. Dispatch `setMonthlyListPage(1)` — reset pagination to page 1
3. Dispatch `fetchMonthlyList({ month: selectedMonth, year: selectedYear, page: 1 })`

All other fetches (`fetchLatestAppointments`, `fetchUpcomingAppointments`, `fetchTopTherapists`, `fetchSubscribedUsers`) are not re-triggered.

---

## New Component: `MonthYearSelector.tsx`

**Location:** `src/component/admin/statisticsComponents/MonthYearSelector.tsx`

**Props:**

```ts
interface MonthYearSelectorProps {
  month: number;
  year: number;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
}
```

**Month dropdown:** Options January–December (values 1–12).

**Year dropdown:** Options from 2023 to current year.

**Styling:**
- Both dropdowns use a stylized font — bold (`font-weight: 700`), slightly larger than body text (`~1.1rem`), with letter-spacing for a display feel
- If the project has a display/serif font in its font stack, use it; otherwise apply weight + spacing to the existing font
- Minimal border, subtle background consistent with the admin dashboard color scheme
- Small muted labels ("Month" / "Year") above or inline each dropdown

**Placement:** Rendered at the top of `Statistics.tsx`, above the KPI cards row. Right-aligned or center-aligned to match the existing page header layout.

---

## Changes to `Statistics.tsx`

1. Add `selectedMonth` and `selectedYear` local state (initialized to current month/year)
2. Replace the hard-coded `month`/`year` variables with the state values
3. Add a `useEffect` that watches `[selectedMonth, selectedYear]` and dispatches the three affected thunks
4. Render `<MonthYearSelector>` at the top of the return, above KPI cards
5. Pass `onMonthChange={setSelectedMonth}` and `onYearChange={setSelectedYear}` to the selector

---

## Files Changed

| File | Change |
|------|--------|
| `src/component/admin/Statistics.tsx` | Add local state, useEffect, render MonthYearSelector |
| `src/component/admin/statisticsComponents/MonthYearSelector.tsx` | New file |

No changes to Redux slice, API calls, or other sub-components.

---

## Out of Scope

- Bookmarkable URLs with month/year in query params
- Restricting future months from being selectable
- Date range picker (single month granularity only)
