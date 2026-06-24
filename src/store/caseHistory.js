import { TOKEN } from "@/utils/enum"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const backend = process.env.NEXT_PUBLIC_BACKEND_URL

const addAndUpdateUserCaseHistory = createAsyncThunk("caseHistory/add-update-case-history", async (data) => {
    try {
        const response = await axios.post(`${backend}/userhistory/addAndUpdate`, data)
        return response.data
    } catch (error) {
        if (error.response) {
            throw error.response.data.data.message
        }
        throw error.message || "An unexpected error occurred"
    }
})

const getUserCaseHistory = createAsyncThunk("caseHistory/get-case-history", async () => {
    try {
        const response = await axios.get(`${backend}/userhistory/getUserHistoryData`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem(TOKEN))}`
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

const getUserCaseHistoryByUserId = createAsyncThunk("caseHistory/get-case-history-by-userId", async (id) => {
    try {
        const response = await axios.get(`${backend}/userhistory/getUserHistoryDataByUserId/${id}`)
        return response.data
    } catch (error) {
        if (error.response) {
            throw error.response.data.data.message
        }
        throw error.message || "An unexpected error occurred"
    }
})


const getUserCaseHistoryPercentage = createAsyncThunk("caseHistory/get-case-history-percentage", async (id) => {
    try {
        const response = await axios.get(`${backend}/userhistory/${id}/completion`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem(TOKEN))}`
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
    caseHistory: null,
    loading: false,
    error: null
}

const caseHistorySlice = createSlice({
    name: "caseHistory",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addAndUpdateUserCaseHistory.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(addAndUpdateUserCaseHistory.fulfilled, (state, action) => {
                state.loading = false
                state.caseHistory = action.payload.data.caseHistory
            })
            .addCase(addAndUpdateUserCaseHistory.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred";
            })
            .addCase(getUserCaseHistory.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getUserCaseHistory.fulfilled, (state, action) => {
                state.loading = false
                state.caseHistory = action.payload.data.caseHistory
            })
            .addCase(getUserCaseHistory.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred";
            })
            .addCase(getUserCaseHistoryByUserId.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getUserCaseHistoryByUserId.fulfilled, (state, action) => {
                state.loading = false
                state.caseHistory = action.payload.data.caseHistory
            })
            .addCase(getUserCaseHistoryByUserId.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred";
            })
            .addCase(getUserCaseHistoryPercentage.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getUserCaseHistoryPercentage.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(getUserCaseHistoryPercentage.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred";
            })
    }
})

export { addAndUpdateUserCaseHistory, getUserCaseHistory, getUserCaseHistoryPercentage, getUserCaseHistoryByUserId }
export default caseHistorySlice.reducer