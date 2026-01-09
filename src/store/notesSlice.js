import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const backend = process.env.NEXT_PUBLIC_BACKEND_URL

const addNote = createAsyncThunk("note/add-note", async (data) => {
    try {
        const response = await axios.post(`${backend}/notes/new`, data)
        return response.data
    } catch (error) {
        if (error.response) {
            throw error.response.data.data.message
        }
        throw error.message || "An unexpected error occurred"
    }
})

const listNote = createAsyncThunk("note/list-note", async (data) => {
    try {
        const response = await axios.post(`${backend}/notes/list`, data)
        return response.data
    } catch (error) {
        if (error.response) {
            throw error.response.data.data.message
        }
        throw error.message || "An unexpected error occurred"
    }
})

const initialState = {
    notes: null,
    loading: false,
    error: null
}

const noteSlice = createSlice({
    name: "note",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addNote.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(addNote.fulfilled, (state, action) => {
                state.loading = false
                state.note = action.payload.data.note
            })
            .addCase(addNote.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred";
            })
            .addCase(listNote.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(listNote.fulfilled, (state, action) => {
                state.loading = false
                state.note = action.payload.data.note
            })
            .addCase(listNote.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred";
            })
    }
})

export { addNote, listNote }
export default noteSlice.reducer