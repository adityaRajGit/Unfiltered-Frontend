import { ADMINTOKEN } from "@/utils/enum"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const backend = process.env.NEXT_PUBLIC_BACKEND_URL

const loginAdmin = createAsyncThunk("admin/login", async (data) => {
    try {
        const response = await axios.post(`${backend}/admin/admin-login`, data)
        return response.data
    } catch (error) {
        if (error.response) {
            throw error.response.data.data.message
        }
        throw error.message || "An unexpected error occurred"
    }
})

const initialState = {
    admin: null,
    loading: false,
    error: null
}

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        logoutAdmin: (state) => {
            state.admin = null;
            state.error = null;
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAdmin.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginAdmin.fulfilled, (state, action) => {
                state.loading = false
                state.admin = action.payload.data.admin
                localStorage.setItem(ADMINTOKEN, JSON.stringify(action.payload.data.token));
            })
            .addCase(loginAdmin.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred";
            })
    }
})

export const { logoutAdmin } = adminSlice.actions;
export { loginAdmin }
export default adminSlice.reducer