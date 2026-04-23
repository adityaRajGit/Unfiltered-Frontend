"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  fetchLatestAppointments,
  fetchTopTherapists,
  fetchUpcomingAppointments,
  fetchSubscribedUsers,
  fetchActiveSubscriptionCount,
  fetchMonthlyStats,
  fetchMonthlyAppointmentsList,
  setSubscribedPage,
  setMonthlyListPage,
} from "@/store/statisticsSlice";

import KpiCards from "./statisticsComponents/KpiCards";
import AppointmentsMonthlyChart from "./statisticsComponents/AppointmentsMonthlyChart";
import LatestAppointmentsTable from "./statisticsComponents/LatestAppointmentsTable";
import TopTherapistsList from "./statisticsComponents/TopTherapistsList";
import UpcomingAppointmentsTable from "./statisticsComponents/UpcomingAppointmentsTable";
import SubscribedUsersTable from "./statisticsComponents/SubscribedUsersTable";
import AppointmentsThisMonthTable from "./statisticsComponents/AppointmentsThisMonthTable";

export default function Statistics() {
  const dispatch = useDispatch();
  const stats = useSelector((state: any) => state.statistics);

  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  useEffect(() => {
    dispatch(fetchLatestAppointments() as any);
    dispatch(fetchTopTherapists() as any);
    dispatch(fetchUpcomingAppointments() as any);
    dispatch(fetchMonthlyStats({ month, year }) as any);
    dispatch(fetchMonthlyAppointmentsList({ pageNum: 1, month, year }) as any);
    dispatch(fetchSubscribedUsers({ pageNum: 1 }) as any);
    dispatch(fetchActiveSubscriptionCount() as any);
  }, [dispatch]);

  useEffect(() => {
    const sections = [
      stats.latestAppointments,
      stats.topTherapists,
      stats.upcomingAppointments,
      stats.subscribedUsers,
      stats.monthlyStats,
      stats.monthlyList,
    ];
    sections.forEach((s) => {
      if (s.error) toast.error(s.error);
    });
  }, [
    stats.latestAppointments.error,
    stats.topTherapists.error,
    stats.upcomingAppointments.error,
    stats.subscribedUsers.error,
    stats.monthlyStats.error,
    stats.monthlyList.error,
  ]);

  const activeSubscriptions = stats.subscribedUsers.activeCount ?? 0;

  const kpiLoading =
    stats.monthlyStats.loading ||
    stats.upcomingAppointments.loading ||
    stats.subscribedUsers.loading ||
    stats.topTherapists.loading;

  const handleSubscribedPageChange = (page: number) => {
    dispatch(setSubscribedPage(page));
    dispatch(fetchSubscribedUsers({ pageNum: page }) as any);
  };

  const handleMonthlyListPageChange = (page: number) => {
    dispatch(setMonthlyListPage(page));
    dispatch(fetchMonthlyAppointmentsList({ pageNum: page, month, year }) as any);
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      <KpiCards
        monthlyTotal={stats.monthlyStats.data?.total ?? 0}
        upcomingCount={stats.upcomingAppointments.data?.length ?? 0}
        activeSubscriptions={activeSubscriptions}
        topTherapist={stats.topTherapists.data?.[0] ?? null}
        loading={kpiLoading}
      />

      <AppointmentsMonthlyChart
        data={stats.monthlyStats.data?.daily ?? []}
        loading={stats.monthlyStats.loading}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LatestAppointmentsTable
          data={stats.latestAppointments.data ?? []}
          loading={stats.latestAppointments.loading}
        />
        <TopTherapistsList
          data={stats.topTherapists.data ?? []}
          loading={stats.topTherapists.loading}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UpcomingAppointmentsTable
          data={stats.upcomingAppointments.data ?? []}
          loading={stats.upcomingAppointments.loading}
        />
        <SubscribedUsersTable
          data={stats.subscribedUsers.data ?? []}
          total={stats.subscribedUsers.total ?? 0}
          page={stats.subscribedUsers.page ?? 1}
          loading={stats.subscribedUsers.loading}
          onPageChange={handleSubscribedPageChange}
        />
      </div>

      <AppointmentsThisMonthTable
        data={stats.monthlyList.data ?? []}
        total={stats.monthlyList.total ?? 0}
        page={stats.monthlyList.page ?? 1}
        loading={stats.monthlyList.loading}
        onPageChange={handleMonthlyListPageChange}
      />
    </div>
  );
}
