import { TOKEN } from "@/utils/enum";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const backend = process.env.NEXT_PUBLIC_BACKEND_URL;

function authHeaders() {
    return {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem(TOKEN))}`,
    };
}

const getUnseenBadges = createAsyncThunk("badge/unseen", async (userId) => {
    try {
        const response = await axios.get(`${backend}/badge/user/${userId}/unseen`, {
            headers: authHeaders(),
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw error.response.data?.data?.message || error.response.data?.message;
        }
        throw error.message || "An unexpected error occurred";
    }
});

const getUserBadges = createAsyncThunk("badge/list", async (userId) => {
    try {
        const response = await axios.post(
            `${backend}/badge/list`,
            {
                pageNum: 1,
                pageSize: 50,
                filters: {
                    userId,
                    is_deleted: false,
                },
            },
            {
                headers: authHeaders(),
            }
        );
        return response.data;
    } catch (error) {
        if (error.response) {
            throw error.response.data?.data?.message || error.response.data?.message;
        }
        throw error.message || "An unexpected error occurred";
    }
});

const markBadgesSeen = createAsyncThunk("badge/mark-seen", async (badgeIds) => {
    try {
        const response = await axios.post(
            `${backend}/badge/markSeen`,
            { badgeIds },
            {
                headers: authHeaders(),
            }
        );
        return response.data;
    } catch (error) {
        if (error.response) {
            throw error.response.data?.data?.message || error.response.data?.message;
        }
        throw error.message || "An unexpected error occurred";
    }
});

const initialState = {
    unseenBadges: [],
    earnedBadges: [],
    loading: false,
    error: null,
};

const badgeSlice = createSlice({
    name: "badge",
    initialState,
    reducers: {
        clearUnseenBadges: (state) => {
            state.unseenBadges = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUnseenBadges.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUnseenBadges.fulfilled, (state, action) => {
                state.loading = false;
                state.unseenBadges = action.payload?.data?.badges || [];
            })
            .addCase(getUnseenBadges.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error?.message || "An error occurred";
            })
            .addCase(getUserBadges.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserBadges.fulfilled, (state, action) => {
                state.loading = false;
                state.earnedBadges = action.payload?.data?.badgeList || [];
            })
            .addCase(getUserBadges.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error?.message || "An error occurred";
            })
            .addCase(markBadgesSeen.fulfilled, (state, action) => {
                const markedIds = action.meta?.arg || [];
                if (markedIds.length > 0) {
                    state.unseenBadges = state.unseenBadges.filter(
                        (badge) => !markedIds.includes(badge._id)
                    );
                    state.earnedBadges = state.earnedBadges.map((badge) =>
                        markedIds.includes(badge._id) ? { ...badge, is_seen: true } : badge
                    );
                } else {
                    state.unseenBadges = [];
                    state.earnedBadges = state.earnedBadges.map((badge) => ({
                        ...badge,
                        is_seen: true,
                    }));
                }
            });
    },
});

export { getUnseenBadges, getUserBadges, markBadgesSeen };
export const { clearUnseenBadges } = badgeSlice.actions;
export default badgeSlice.reducer;
