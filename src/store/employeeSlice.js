import { TOKEN } from "@/utils/enum"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const backend = process.env.NEXT_PUBLIC_BACKEND_URL

const employeeSignup = createAsyncThunk("employee/signup", async (data) => {
    try {
        const response = await axios.post(`${backend}/user/signup-employee`, { userData: data })
        return response.data
    } catch (error) {
        if (error.response) {
            throw error.response.data.data.message
        }
        throw error.message || "An unexpected error occurred"
    }
})

// const getUserDetails = createAsyncThunk("user/details", async (id) => {
//     try {
//         const response = await axios.get(`${backend}/user/${id}`, {
//             headers: {
//                 Authorization: `Bearer ${JSON.parse(localStorage.getItem(TOKEN))}`
//             }
//         })
//         return response.data
//     } catch (error) {
//         if (error.response) {
//             throw error.response.data.data.message
//         }
//         throw error.message || "An unexpected error occurred"
//     }
// })

// const getUserTherapist = createAsyncThunk("user/user-therapist", async (id) => {
//     try {
//         const response = await axios.get(`${backend}/user/${id}/therapists`, {
//             headers: {
//                 Authorization: `Bearer ${JSON.parse(localStorage.getItem(TOKEN))}`
//             }
//         })
//         return response.data
//     } catch (error) {
//         if (error.response) {
//             throw error.response.data.data.message
//         }
//         throw error.message || "An unexpected error occurred"
//     }
// })

// const updateUserDetails = createAsyncThunk(
//     'user/update-details',
//     async (payload) => {
//         // payload should be an object: { id: string, formData: FormData }
//         try {
//             const token = JSON.parse(localStorage.getItem(TOKEN) || '""');
//             const response = await axios.post(
//                 `${backend}/user/${payload.id}/update`,
//                 payload.formData,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                         'Content-Type': 'multipart/form-data',
//                     },
//                 }
//             );
//             return response.data;
//         } catch (error) {
//             if (error.response) {
//                 throw error.response.data.data.message
//             }
//             throw error.message || "An unexpected error occurred"
//         }
//     }
// );


const initialState = {
    employee: null,
    loading: false,
    error: null
}

const employeeSlice = createSlice({
    name: "employee",
    initialState,
    reducers: {
        logoutEmployee: (state) => {
            state.user = null;
            state.error = null;
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(employeeSignup.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(employeeSignup.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.data.user
                localStorage.setItem(TOKEN, JSON.stringify(action.payload.data.token));
            })
            .addCase(employeeSignup.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred";
            })
        // .addCase(getUserDetails.pending, (state) => {
        //     state.loading = true
        //     state.error = null
        // })
        // .addCase(getUserDetails.fulfilled, (state, action) => {
        //     state.loading = false
        //     state.user = action.payload.data.user
        // })
        // .addCase(getUserDetails.rejected, (state, action) => {
        //     state.loading = false
        //     state.error = action.error || "An error occurred"
        // })
        // .addCase(updateUserDetails.pending, (state) => {
        //     state.loading = true
        //     state.error = null
        // })
        // .addCase(updateUserDetails.fulfilled, (state, action) => {
        //     state.loading = false
        //     state.user = action.payload.data.user
        // })
        // .addCase(updateUserDetails.rejected, (state, action) => {
        //     state.loading = false
        //     state.error = action.error || "An error occurred"
        // })
        // .addCase(getUserTherapist.pending, (state) => {
        //     state.loading = true
        //     state.error = null
        // })
        // .addCase(getUserTherapist.fulfilled, (state) => {
        //     state.loading = false
        // })
        // .addCase(getUserTherapist.rejected, (state, action) => {
        //     state.loading = false
        //     state.error = action.error || "An error occurred"
        // })
    }
})

export const { logoutEmployee } = employeeSlice.actions;
export { employeeSignup }
export default employeeSlice.reducer