import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const backend = process.env.NEXT_PUBLIC_BACKEND_URL

const addLead = createAsyncThunk("lead/add-lead", async (data) => {
    try {
        const response = await axios.post(`${backend}/lead/add-lead`, data)
        return response.data
    } catch (error) {
        if (error.response) {
            throw error.response.data.data.message
        }
        throw error.message || "An unexpected error occurred"
    }
})

const initialState = {
    lead: null,
    loading: false,
    error: null
}

const leadSlice = createSlice({
    name: "lead",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addLead.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(addLead.fulfilled, (state, action) => {
                state.loading = false
                state.lead = action.payload.data.lead
            })
            .addCase(addLead.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred";
            })
    }
})

export { addLead}
export default leadSlice.reducer