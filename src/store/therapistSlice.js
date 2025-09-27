import { TOKEN } from "@/utils/enum"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const backend = process.env.NEXT_PUBLIC_BACKEND_URL


const signupTherapist = createAsyncThunk("therapist/signup", async (data) => {
    try {
        const response = await axios.post(`${backend}/therapist/signup`, data)
        return response.data
    } catch (error) {
        if (error.response) {
            throw error.response.data.data.message
        }
        throw error.message || "An unexpected error occurred"
    }
})

const loginTherapist = createAsyncThunk("therapist/login", async (data) => {
    try {
        const response = await axios.post(`${backend}/therapist/login`, data)
        return response.data
    } catch (error) {
        if (error.response) {
            throw error.response.data.data.message
        }
        throw error.message || "An unexpected error occurred"
    }
})

const getTherapistDetails = createAsyncThunk("therapist/details", async (id) => {
    try {
        const response = await axios.get(`${backend}/therapist/${id}`, {
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

const updateTherapistDetails = createAsyncThunk('therapist/update-details', async (payload) => {
    try {
        const token = JSON.parse(localStorage.getItem(TOKEN) || '""');
        const response = await axios.post(`${backend}/therapist/${payload.id}/update`, payload.formData, {
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

const therapistProfileStatus = createAsyncThunk('therapist/profile-status', async (id) => {
    try {
        const token = JSON.parse(localStorage.getItem(TOKEN) || '""');
        const response = await axios.get(`${backend}/therapist/${id}/profile-completion`, {
            headers: {
                Authorization: `Bearer ${token}`,
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

const getTherapistSpecialisationAndTiming = createAsyncThunk('therapist/get-therapist-specialisation-and-timing', async () => {
    try {
        const response = await axios.get(`${backend}/therapist/timelineandspecializations`);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw error.response.data.data.message
        }
        throw error.message || "An unexpected error occurred"
    }
}
);

const recommendTherapist = createAsyncThunk('therapist/recommend-therapist', async (data) => {
    try {
        const response = await axios.post(`${backend}/therapist/recommend`, data);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw error.response.data.data.message
        }
        throw error.message || "An unexpected error occurred"
    }
}
);

const setAvailabilityForTherapist = createAsyncThunk('therapist/set-therapist-availability', async (data) => {
    try {
        const response = await axios.post(`${backend}/availability/new`, data);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw error.response.data.data.message
        }
        throw error.message || "An unexpected error occurred"
    }
}
);

const getAvailabilityForTherapist = createAsyncThunk('therapist/get-therapist-availability', async (id) => {
    try {
        const response = await axios.get(`${backend}/availability/get-by-therapist/${id}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw error.response.data.data.message
        }
        throw error.message || "An unexpected error occurred"
    }
}
);

const updateAvailabilityForTherapist = createAsyncThunk('therapist/update-therapist-availability', async (payload) => {
    try {
        const response = await axios.post(`${backend}/availability/${payload.id}/update`, payload.data);
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
    therapist: null,
    loading: false,
    error: null
}

const therapistSlice = createSlice({
    name: "therapist",
    initialState,
    reducers: {
        logoutTherapist: (state) => {
            state.therapist = null;
            state.error = null;
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signupTherapist.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(signupTherapist.fulfilled, (state, action) => {
                state.loading = false
                state.therapist = action.payload.data.therapist
                localStorage.setItem(TOKEN, JSON.stringify(action.payload.data.token));
            })
            .addCase(signupTherapist.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred";
            })
            .addCase(loginTherapist.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginTherapist.fulfilled, (state, action) => {
                state.loading = false
                state.therapist = action.payload.data.therapist
                localStorage.setItem(TOKEN, JSON.stringify(action.payload.data.token));
            })
            .addCase(loginTherapist.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred";
            })
            .addCase(getTherapistDetails.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getTherapistDetails.fulfilled, (state, action) => {
                state.loading = false
                state.therapist = action.payload.data.therapist
            })
            .addCase(getTherapistDetails.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred"
            })
            .addCase(updateTherapistDetails.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updateTherapistDetails.fulfilled, (state, action) => {
                state.loading = false
                state.therapist = action.payload.data.therapist
            })
            .addCase(updateTherapistDetails.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred"
            })
            .addCase(therapistProfileStatus.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(therapistProfileStatus.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(therapistProfileStatus.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred"
            })
            .addCase(getTherapistSpecialisationAndTiming.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getTherapistSpecialisationAndTiming.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(getTherapistSpecialisationAndTiming.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred"
            })
            .addCase(recommendTherapist.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(recommendTherapist.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(recommendTherapist.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred"
            })
            .addCase(setAvailabilityForTherapist.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(setAvailabilityForTherapist.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(setAvailabilityForTherapist.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred"
            })
            .addCase(getAvailabilityForTherapist.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getAvailabilityForTherapist.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(getAvailabilityForTherapist.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred"
            })
            .addCase(updateAvailabilityForTherapist.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updateAvailabilityForTherapist.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(updateAvailabilityForTherapist.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred"
            })
    }
})

export const { logoutTherapist } = therapistSlice.actions;
export { signupTherapist, loginTherapist, getTherapistDetails, updateTherapistDetails, therapistProfileStatus, getTherapistSpecialisationAndTiming, recommendTherapist, setAvailabilityForTherapist, getAvailabilityForTherapist, updateAvailabilityForTherapist }
export default therapistSlice.reducer