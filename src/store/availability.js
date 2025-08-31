import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const backend = process.env.NEXT_PUBLIC_BACKEND_URL


const getAvailablityOfSingleTherapist = createAsyncThunk("availability/get-availablity", async (data) => {
    try {
        const response = await axios.post(`${backend}/availability/list`, data)
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

const availabilitySlice = createSlice({
    name: "availability",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAvailablityOfSingleTherapist.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getAvailablityOfSingleTherapist.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(getAvailablityOfSingleTherapist.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred";
            })
    }
})

export { getAvailablityOfSingleTherapist }
export default availabilitySlice.reducer