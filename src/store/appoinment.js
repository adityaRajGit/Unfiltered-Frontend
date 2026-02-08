import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { trackAppointmentEvent } from "@/utils/clarity"

const backend = process.env.NEXT_PUBLIC_BACKEND_URL


const bookAppointmentFunc = createAsyncThunk("appointment/book-appointment", async (data) => {
    try {
        const response = await axios.post(`${backend}/appointment/new`, data)

        // Track successful appointment booking in Clarity
        trackAppointmentEvent('book', response.data?.data?.appointment?._id, data.therapist_id)

        return response.data
    } catch (error) {
        if (error.response) {
            throw error.response.data.data.message
        }
        throw error.message || "An unexpected error occurred"
    }
})

const rescheduleAppointmentFunc = createAsyncThunk("appointment/reschedule-appointment", async (payload) => {
    try {
        const response = await axios.post(`${backend}/appointment/${payload.id}/update`, payload.data)

        // Track appointment reschedule in Clarity
        trackAppointmentEvent('reschedule', payload.id)

        return response.data
    } catch (error) {
        if (error.response) {
            throw error.response.data.data.message
        }
        throw error.message || "An unexpected error occurred"
    }
})

const getUpComingAppointments = createAsyncThunk("appointment/upcoming-appointments", async (id) => {
    try {
        const response = await axios.get(`${backend}/appointment/upcoming/${id}`)
        return response.data
    } catch (error) {
        if (error.response) {
            throw error.response.data.data.message
        }
        throw error.message || "An unexpected error occurred"
    }
})


const getPastAppointmentsApi = createAsyncThunk("appointment/past-appointments", async (id) => {
    try {
        const response = await axios.get(`${backend}/appointment/past/${id}`)
        return response.data
    } catch (error) {
        if (error.response) {
            throw error.response.data.data.message
        }
        throw error.message || "An unexpected error occurred"
    }
})

const updateAppointmentStatussApi = createAsyncThunk("appointment/update-status-appointment", async (formData) => {
    try {
        const response = await axios.post(`${backend}/appointment/mark-completion/${formData.id}`, formData.payload)
        return response.data
    } catch (error) {
        if (error.response) {
            throw error.response.data.data.message
        }
        throw error.message || "An unexpected error occurred"
    }
})


const initialState = {
    loading: false,
    error: null
}

const appointmentSlice = createSlice({
    name: "appointment",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(bookAppointmentFunc.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(bookAppointmentFunc.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(bookAppointmentFunc.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred";
            })
            .addCase(getUpComingAppointments.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getUpComingAppointments.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(getUpComingAppointments.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred";
            })
            .addCase(getPastAppointmentsApi.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getPastAppointmentsApi.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(getPastAppointmentsApi.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred";
            })
            .addCase(rescheduleAppointmentFunc.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(rescheduleAppointmentFunc.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(rescheduleAppointmentFunc.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred";
            })
            .addCase(updateAppointmentStatussApi.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updateAppointmentStatussApi.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(updateAppointmentStatussApi.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred";
            })
    }
})

export { bookAppointmentFunc, getUpComingAppointments, getPastAppointmentsApi, rescheduleAppointmentFunc, updateAppointmentStatussApi }
export default appointmentSlice.reducer