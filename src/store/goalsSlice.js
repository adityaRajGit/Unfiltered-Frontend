import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const backend = process.env.NEXT_PUBLIC_BACKEND_URL

const addGoal = createAsyncThunk("goal/add-goal", async (data) => {
    try {
        const response = await axios.post(`${backend}/goals/new`, data)
        return response.data
    } catch (error) {
        if (error.response) {
            throw error.response.data.data.message
        }
        throw error.message || "An unexpected error occurred"
    }
})

const listGoals = createAsyncThunk("goal/list-goal", async (data) => {
    try {
        const response = await axios.post(`${backend}/goals/list`, data)
        return response.data
    } catch (error) {
        if (error.response) {
            throw error.response.data.data.message
        }
        throw error.message || "An unexpected error occurred"
    }
})

const initialState = {
    goals: null,
    loading: false,
    error: null
}

const goalsSlice = createSlice({
    name: "goals",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addGoal.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(addGoal.fulfilled, (state, action) => {
                state.loading = false
                state.goals = action.payload.data.goals
            })
            .addCase(addGoal.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred";
            })
            .addCase(listGoals.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(listGoals.fulfilled, (state, action) => {
                state.loading = false
                state.goals = action.payload.data.goalsList
            })
            .addCase(listGoals.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred";
            })
    }
})

export { addGoal, listGoals }
export default goalsSlice.reducer