import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const backend = process.env.NEXT_PUBLIC_BACKEND_URL

const addIndividualForm = createAsyncThunk("individualForm/add-individualForm", async (data) => {
    try {
        const response = await axios.post(`${backend}/individualtherapyform/new`, data)
        return response.data
    } catch (error) {
        if (error.response) {
            throw error.response.data.data.message
        }
        throw error.message || "An unexpected error occurred"
    }
})

const initialState = {
    individualForm: null,
    loading: false,
    error: null
}

const individualFormSlice = createSlice({
    name: "individualForm",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addIndividualForm.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(addIndividualForm.fulfilled, (state, action) => {
                state.loading = false
                state.lead = action.payload.data.individualtherapyform
            })
            .addCase(addIndividualForm.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred";
            })
    }
})

export { addIndividualForm }
export default individualFormSlice.reducer