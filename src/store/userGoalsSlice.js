import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const backend = process.env.NEXT_PUBLIC_BACKEND_URL

const AddandUpdateUserGoal = createAsyncThunk("user-goal/update-goal", async (data) => {
    try {
        const response = await axios.post(`${backend}/usercompletedgoals/addAndUpdateUserGoals`, data)
        return response.data
    } catch (error) {
        if (error.response) {
            throw error.response.data.data.message
        }
        throw error.message || "An unexpected error occurred"
    }
})

const initialState = {
    userGoals: null,
    loading: false,
    error: null
}

const userGoalsSlice = createSlice({
    name: "userGoals",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AddandUpdateUserGoal.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(AddandUpdateUserGoal.fulfilled, (state, action) => {
                state.loading = false
                state.userGoals = action.payload.data.goals
            })
            .addCase(AddandUpdateUserGoal.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred";
            })
    }
})

export { AddandUpdateUserGoal }
export default userGoalsSlice.reducer