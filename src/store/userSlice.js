import { TOKEN } from "@/utils/enum"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const backend = process.env.NEXT_PUBLIC_BACKEND_URL

const signup = createAsyncThunk("user/signup", async (data) => {
    try {
        const response = await axios.post(`${backend}/auth/signup`, data)
        return response.data
    } catch (error) {
        if (error.response) {
            throw error.response.data.data.message
        }
        throw error.message || "An unexpected error occurred"
    }
})

const login = createAsyncThunk("user/login", async (data) => {
    try {
        const response = await axios.post(`${backend}/auth/login`, data)
        return response.data
    } catch (error) {
        if (error.response) {
            throw error.response.data.data.message
        }
        throw error.message || "An unexpected error occurred"
    }
})

const googleSignup = createAsyncThunk("user/googleSignup", async (data) => {
    try {
        const response = await axios.post(`${backend}/auth/google-auth`, { idToken: data.idToken, role: data.role });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw error.response.data.data.message
        }
        throw error.message || "An unexpected error occurred"
    }
});

const googleLogin = createAsyncThunk("user/googleLogin", async (data) => {
    try {
        const response = await axios.post(`${backend}/auth/google-auth-sigin`, { idToken: data.idToken, role: data.role });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw error.response.data.data.message
        }
        throw error.message || "An unexpected error occurred"
    }
});

const getUserDetails = createAsyncThunk("user/details", async (id) => {
    try {
        const response = await axios.get(`${backend}/user/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem(TOKEN))}`
            }
        })
        return response.data
    } catch (error) {
        if (error.response) {
            throw error.response.data.data.message
        }
        throw error.message || "An unexpected error occurred"
    }
})

const updateUserDetails = createAsyncThunk(
    'user/update-details',
    async (payload) => {
        // payload should be an object: { id: string, formData: FormData }
        try {
            const token = JSON.parse(localStorage.getItem(TOKEN) || '""');
            const response = await axios.post(
                `${backend}/user/${payload.id}/update`,
                payload.formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            return response.data;
        } catch (error) {
            if (error.response) {
                throw error.response.data.data.message
            }
            throw error.message || "An unexpected error occurred"
        }
    }
);


const initialState = {
    user: null,
    loading: false,
    error: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.user = null;
            state.error = null;
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signup.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.data.user
                localStorage.setItem(TOKEN, JSON.stringify(action.payload.data.token));
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred";
            })
            .addCase(login.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.data.user
                localStorage.setItem(TOKEN, JSON.stringify(action.payload.data.token));
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred";
            })
            .addCase(googleSignup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(googleSignup.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data.user;
                localStorage.setItem(TOKEN, JSON.stringify(action.payload.data.token));
            })
            .addCase(googleSignup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error || "Google signup failed";
            })

            .addCase(googleLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(googleLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data.user;
                localStorage.setItem(TOKEN, JSON.stringify(action.payload.data.token));
            })
            .addCase(googleLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error || "Google login failed";
            })
            .addCase(getUserDetails.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getUserDetails.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.data.user
            })
            .addCase(getUserDetails.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred"
            })
            .addCase(updateUserDetails.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updateUserDetails.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.data.user
            })
            .addCase(updateUserDetails.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred"
            })
    }
})

export const { logoutUser } = userSlice.actions;
export { signup, login, googleSignup, googleLogin, getUserDetails, updateUserDetails }
export default userSlice.reducer