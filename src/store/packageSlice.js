import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { ADMINTOKEN } from "@/utils/enum"

const backend = process.env.NEXT_PUBLIC_BACKEND_URL

const addPackage = createAsyncThunk("package/add-package", async (data) => {
    try {
        const response = await axios.post(`${backend}/package/new`, data, {
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

const listPackage = createAsyncThunk("package/list-package", async (data) => {
    try {
        const response = await axios.post(`${backend}/package/list`, data)
        return response.data
    } catch (error) {
        if (error.response) {
            throw error.response.data.data.message
        }
        throw error.message || "An unexpected error occurred"
    }
})

const updatePackage = createAsyncThunk("package/update-package", async (payload) => {
    try {
        const response = await axios.post(`${backend}/package/${payload.id}/update`, payload.data, {
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

const removePackage = createAsyncThunk("package/remove-package", async (id) => {
    try {
        const response = await axios.post(`${backend}/package/${id}/remove`, {}, {
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
    package: null,
    loading: false,
    error: null
}

const packageSlice = createSlice({
    name: "package",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addPackage.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(addPackage.fulfilled, (state, action) => {
                state.loading = false
                state.package = action.payload.data.package
            })
            .addCase(addPackage.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred";
            })
            .addCase(listPackage.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(listPackage.fulfilled, (state, action) => {
                state.loading = false
                state.package = action.payload.data.package
            })
            .addCase(listPackage.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred";
            })
            .addCase(updatePackage.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updatePackage.fulfilled, (state, action) => {
                state.loading = false
                state.package = action.payload.data.package
            })
            .addCase(updatePackage.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred";
            })
            .addCase(removePackage.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(removePackage.fulfilled, (state, action) => {
                state.loading = false
                state.package = action.payload.data.package
            })
            .addCase(removePackage.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred";
            })
    }
})

export { addPackage, listPackage, updatePackage, removePackage }
export default packageSlice.reducer