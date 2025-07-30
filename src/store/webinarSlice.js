import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { ADMINTOKEN } from "@/utils/enum"

const backend = process.env.NEXT_PUBLIC_BACKEND_URL

const addWebinar = createAsyncThunk("webinar/add-webinar", async (data) => {
    try {
        const response = await axios.post(`${backend}/webinar/new`, data, {
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

const listWebinars = createAsyncThunk("webinar/list-webinar", async (data) => {
    try {
        const response = await axios.post(`${backend}/webinar/list`, data, {
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

const updateWebinar = createAsyncThunk("webinar/update-webinar", async (payload) => {
    try {
        const response = await axios.post(`${backend}/webinar/${payload.id}/update`, payload.data, {
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

const removeWebinar = createAsyncThunk("webinar/remove-webinar", async (id) => {
    try {
        const response = await axios.post(`${backend}/webinar/${id}/remove`, {}, {
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
    webinar: null,
    loading: false,
    error: null
}

const webinarSlice = createSlice({
    name: "webinar",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addWebinar.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(addWebinar.fulfilled, (state, action) => {
                state.loading = false
                state.webinar = action.payload.data.webinar
            })
            .addCase(addWebinar.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred";
            })
            .addCase(listWebinars.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(listWebinars.fulfilled, (state, action) => {
                state.loading = false
                state.webinar = action.payload.data.webinar
            })
            .addCase(listWebinars.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred";
            })
            .addCase(updateWebinar.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updateWebinar.fulfilled, (state, action) => {
                state.loading = false
                state.webinar = action.payload.data.webinar
            })
            .addCase(updateWebinar.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred";
            })
            .addCase(removeWebinar.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(removeWebinar.fulfilled, (state, action) => {
                state.loading = false
                state.webinar = action.payload.data.webinar
            })
            .addCase(removeWebinar.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred";
            })
    }
})

export { addWebinar, listWebinars, updateWebinar, removeWebinar }
export default webinarSlice.reducer