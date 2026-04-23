import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ADMINTOKEN } from "@/utils/enum";

const backend = process.env.NEXT_PUBLIC_BACKEND_URL;

const authHeader = () => ({
  Authorization: `Bearer ${JSON.parse(localStorage.getItem(ADMINTOKEN))}`,
});

export const fetchLatestAppointments = createAsyncThunk(
  "statistics/fetchLatestAppointments",
  async () => {
    const res = await axios.post(
      `${backend}/appointment/list`,
      { pageNum: 1, pageSize: 10, filters: { is_deleted: false }, sort: { created_at: -1 } },
      { headers: authHeader() }
    );
    return res.data.data.appointmentList;
  }
);

export const fetchTopTherapists = createAsyncThunk(
  "statistics/fetchTopTherapists",
  async () => {
    const res = await axios.post(
      `${backend}/appointment/top-therapists`,
      { limit: 5 },
      { headers: authHeader() }
    );
    return res.data.data.therapists;
  }
);

export const fetchUpcomingAppointments = createAsyncThunk(
  "statistics/fetchUpcomingAppointments",
  async () => {
    const now = new Date().toISOString();
    const res = await axios.post(
      `${backend}/appointment/list`,
      {
        pageNum: 1,
        pageSize: 5,
        filters: { appointment_status: "SCHEDULED", is_deleted: false, scheduled_at: { $gte: now } },
        sort: { scheduled_at: 1 },
      },
      { headers: authHeader() }
    );
    return res.data.data.appointmentList;
  }
);

export const fetchSubscribedUsers = createAsyncThunk(
  "statistics/fetchSubscribedUsers",
  async ({ pageNum = 1 } = {}) => {
    const res = await axios.post(
      `${backend}/subscription/list`,
      {
        pageNum,
        pageSize: 10,
        filters: { status: { $in: ["active", "paused", "expired", "cancelled"] }, is_deleted: false },
        sort: { date_bought: -1 },
      },
      { headers: authHeader() }
    );
    return { list: res.data.data.subscriptionList, total: res.data.data.subscriptionCount };
  }
);

export const fetchActiveSubscriptionCount = createAsyncThunk(
  "statistics/fetchActiveSubscriptionCount",
  async () => {
    const res = await axios.post(
      `${backend}/subscription/list`,
      {
        pageNum: 1,
        pageSize: 1,
        filters: { status: "active", is_deleted: false },
      },
      { headers: authHeader() }
    );
    return res.data.data.subscriptionCount;
  }
);

export const fetchMonthlyStats = createAsyncThunk(
  "statistics/fetchMonthlyStats",
  async ({ month, year }) => {
    const res = await axios.post(
      `${backend}/appointment/monthly-stats`,
      { month, year },
      { headers: authHeader() }
    );
    return res.data.data;
  }
);

export const fetchMonthlyAppointmentsList = createAsyncThunk(
  "statistics/fetchMonthlyAppointmentsList",
  async ({ pageNum = 1, month, year } = {}) => {
    const res = await axios.post(
      `${backend}/appointment/monthly-list`,
      { pageNum, pageSize: 20, month, year },
      { headers: authHeader() }
    );
    return { list: res.data.data.appointmentList, total: res.data.data.appointmentCount };
  }
);

const pending = (key) => (state) => { state[key].loading = true; state[key].error = null; };
const rejected = (key) => (state, action) => { state[key].loading = false; state[key].error = action.error.message; };

const initialSection = { data: null, loading: false, error: null };

const statisticsSlice = createSlice({
  name: "statistics",
  initialState: {
    latestAppointments: { ...initialSection, data: [] },
    topTherapists: { ...initialSection, data: [] },
    upcomingAppointments: { ...initialSection, data: [] },
    subscribedUsers: { ...initialSection, data: [], total: 0, page: 1, activeCount: 0 },
    monthlyStats: { ...initialSection, data: null },
    monthlyList: { ...initialSection, data: [], total: 0, page: 1 },
  },
  reducers: {
    setSubscribedPage: (state, action) => { state.subscribedUsers.page = action.payload; },
    setMonthlyListPage: (state, action) => { state.monthlyList.page = action.payload; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLatestAppointments.pending, pending("latestAppointments"))
      .addCase(fetchLatestAppointments.fulfilled, (state, action) => {
        state.latestAppointments.loading = false;
        state.latestAppointments.data = action.payload;
      })
      .addCase(fetchLatestAppointments.rejected, rejected("latestAppointments"))

      .addCase(fetchTopTherapists.pending, pending("topTherapists"))
      .addCase(fetchTopTherapists.fulfilled, (state, action) => {
        state.topTherapists.loading = false;
        state.topTherapists.data = action.payload;
      })
      .addCase(fetchTopTherapists.rejected, rejected("topTherapists"))

      .addCase(fetchUpcomingAppointments.pending, pending("upcomingAppointments"))
      .addCase(fetchUpcomingAppointments.fulfilled, (state, action) => {
        state.upcomingAppointments.loading = false;
        state.upcomingAppointments.data = action.payload;
      })
      .addCase(fetchUpcomingAppointments.rejected, rejected("upcomingAppointments"))

      .addCase(fetchSubscribedUsers.pending, pending("subscribedUsers"))
      .addCase(fetchSubscribedUsers.fulfilled, (state, action) => {
        state.subscribedUsers.loading = false;
        state.subscribedUsers.data = action.payload.list;
        state.subscribedUsers.total = action.payload.total;
      })
      .addCase(fetchSubscribedUsers.rejected, rejected("subscribedUsers"))

      .addCase(fetchActiveSubscriptionCount.pending, pending("subscribedUsers"))
      .addCase(fetchActiveSubscriptionCount.fulfilled, (state, action) => {
        state.subscribedUsers.loading = false;
        state.subscribedUsers.activeCount = action.payload;
      })
      .addCase(fetchActiveSubscriptionCount.rejected, rejected("subscribedUsers"))

      .addCase(fetchMonthlyStats.pending, pending("monthlyStats"))
      .addCase(fetchMonthlyStats.fulfilled, (state, action) => {
        state.monthlyStats.loading = false;
        state.monthlyStats.data = action.payload;
      })
      .addCase(fetchMonthlyStats.rejected, rejected("monthlyStats"))

      .addCase(fetchMonthlyAppointmentsList.pending, pending("monthlyList"))
      .addCase(fetchMonthlyAppointmentsList.fulfilled, (state, action) => {
        state.monthlyList.loading = false;
        state.monthlyList.data = action.payload.list;
        state.monthlyList.total = action.payload.total;
      })
      .addCase(fetchMonthlyAppointmentsList.rejected, rejected("monthlyList"));
  },
});

export const { setSubscribedPage, setMonthlyListPage } = statisticsSlice.actions;
export default statisticsSlice.reducer;
