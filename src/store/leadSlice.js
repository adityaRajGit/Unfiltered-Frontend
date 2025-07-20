import { ADMINTOKEN } from "@/utils/enum"
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

const listLead = createAsyncThunk("lead/list-lead", async (data) => {
    try {
        const response = await axios.post(`${backend}/lead/list`, data, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem(ADMINTOKEN))}`
            },
        })
        return response.data
    } catch (error) {
        if (error.response) {
            throw error.response.data.data.message
        }
        throw error.message || "An unexpected error occurred"
    }
})

const updateLead = createAsyncThunk("lead/update-lead", async (payload) => {
    try {
        const response = await axios.post(`${backend}/lead/${payload.id}/update-status`, payload.data, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem(ADMINTOKEN))}`
            },
        })
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
            .addCase(listLead.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(listLead.fulfilled, (state, action) => {
                state.loading = false
                state.lead = action.payload.data.lead
            })
            .addCase(listLead.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred";
            })
            .addCase(updateLead.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updateLead.fulfilled, (state, action) => {
                state.loading = false
                state.lead = action.payload.data.lead
            })
            .addCase(updateLead.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred";
            })
    }
})

export { addLead, listLead, updateLead }
export default leadSlice.reducer