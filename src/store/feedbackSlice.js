import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const backend = process.env.NEXT_PUBLIC_BACKEND_URL

const addFeedback = createAsyncThunk("feedback/add-feedback", async (data) => {
    try {
        const response = await axios.post(`${backend}/feedback/new`, data)
        return response.data
    } catch (error) {
        if (error.response) {
            throw error.response.data.data.message
        }
        throw error.message || "An unexpected error occurred"
    }
})

const initialState = {
    feedback: null,
    loading: false,
    error: null
}

const feedbackSlice = createSlice({
    name: "feedback",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addFeedback.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(addFeedback.fulfilled, (state, action) => {
                state.loading = false
                state.lead = action.payload.data.feedback
            })
            .addCase(addFeedback.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred";
            })
    }
})

export { addFeedback }
export default feedbackSlice.reducer