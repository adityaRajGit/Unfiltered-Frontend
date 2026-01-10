import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const backend = process.env.NEXT_PUBLIC_BACKEND_URL

const sendOtp = createAsyncThunk("otp/send-otp", async (data) => {
    try {
        const response = await axios.post(`${backend}/user/signup/send-otp`, data)
        return response.data
    } catch (error) {
        if (error.response) {
            throw error.response.data.data.message
        }
        throw error.message || "An unexpected error occurred"
    }
})

const verifyOtp = createAsyncThunk("otp/verify-otp", async (data) => {
    try {
        const response = await axios.post(`${backend}/otp/verify-email-otp`, data)
        return response.data
    } catch (error) {
        if (error.response) {
            throw error.response.data.message
        }
        throw error.message || "An unexpected error occurred"
    }
})


const initialState = {
    otp: null,
    loading: false,
    error: null
}

const otpSlice = createSlice({
    name: "otp",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(sendOtp.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(sendOtp.fulfilled, (state, action) => {
                state.loading = false
                state.otp = action.payload.data
            })
            .addCase(sendOtp.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred";
            })
            .addCase(verifyOtp.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(verifyOtp.fulfilled, (state, action) => {
                state.loading = false
                state.otp = action.payload.data
            })
            .addCase(verifyOtp.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred";
            })
    }
})

export { sendOtp, verifyOtp }
export default otpSlice.reducer