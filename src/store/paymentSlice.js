import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { ADMINTOKEN } from "@/utils/enum"

const backend = process.env.NEXT_PUBLIC_BACKEND_URL

// book package
const bookPackage = createAsyncThunk("payment/book-package", async (data) => {
    try {
        const response = await axios.post(`${backend}/package/buy-package`, data, {
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

// verify payment
const verifyPayment = createAsyncThunk("payment/verify-payment", async (data) => {
    try {
        const response = await axios.post(`${backend}/package/verify-payment`, data, {
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
    payment: null,
    loading: false,
    error: null
}

const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(bookPackage.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(bookPackage.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(bookPackage.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred";
            })
            .addCase(verifyPayment.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(verifyPayment.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(verifyPayment.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred";
            })
    }
})

export { bookPackage , verifyPayment}
export default paymentSlice.reducer