import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { ADMINTOKEN } from "@/utils/enum"

const backend = process.env.NEXT_PUBLIC_BACKEND_URL

const addCompany = createAsyncThunk("company/add-company", async (data) => {
    try {
        const response = await axios.post(`${backend}/company/new`, data, {
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

const listCompanies = createAsyncThunk("company/list-companies", async (data) => {
    try {
        const response = await axios.post(`${backend}/company/list`, data, {
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

const updateCompany = createAsyncThunk("company/update-company", async (payload) => {
    try {
        const response = await axios.post(`${backend}/company/${payload.id}/update`, payload.data, {
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

const removeCompany = createAsyncThunk("company/remove-company", async (id) => {
    try {
        const response = await axios.post(`${backend}/company/${id}/remove`, {}, {
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
    company: null,
    loading: false,
    error: null
}

const companySlice = createSlice({
    name: "company",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addCompany.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(addCompany.fulfilled, (state, action) => {
                state.loading = false
                state.company = action.payload.data.company
            })
            .addCase(addCompany.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred";
            })
            .addCase(listCompanies.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(listCompanies.fulfilled, (state, action) => {
                state.loading = false
                state.company = action.payload.data.company
            })
            .addCase(listCompanies.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred";
            })
            .addCase(updateCompany.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updateCompany.fulfilled, (state, action) => {
                state.loading = false
                state.company = action.payload.data.company
            })
            .addCase(updateCompany.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred";
            })
            .addCase(removeCompany.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(removeCompany.fulfilled, (state, action) => {
                state.loading = false
                state.company = action.payload.data.company
            })
            .addCase(removeCompany.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred";
            })
    }
})

export { addCompany, listCompanies, updateCompany, removeCompany }
export default companySlice.reducer