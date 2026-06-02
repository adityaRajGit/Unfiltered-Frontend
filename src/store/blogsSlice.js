import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { ADMINTOKEN } from "@/utils/enum"

const backend = process.env.NEXT_PUBLIC_BACKEND_URL

const addBlog = createAsyncThunk("blogs/add-blog", async (data) => {
    try {
        const response = await axios.post(`${backend}/blog/new`, data, {
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

const listBlogs = createAsyncThunk("blogs/list-blog", async (data) => {
    try {
        const response = await axios.post(`${backend}/blog/list`, data)
        return response.data
    } catch (error) {
        if (error.response) {
            throw error.response.data.data.message
        }
        throw error.message || "An unexpected error occurred"
    }
})

const updateBlog = createAsyncThunk("blogs/update-blog", async (payload) => {
    try {
        const response = await axios.post(`${backend}/blog/${payload.id}/update`, payload.data, {
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

const removeBlog = createAsyncThunk("blogs/remove-blog", async (id) => {
    try {
        const response = await axios.post(`${backend}/blog/${id}/remove`, {}, {
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

const getSingleBlog = createAsyncThunk("blogs/single-blog", async (id) => {
    try {
        const response = await axios.get(`${backend}/blog/${id}`)
        return response.data
    } catch (error) {
        if (error.response) {
            throw error.response.data.data.message
        }
        throw error.message || "An unexpected error occurred"
    }
})


const initialState = {
    blog: null,
    loading: false,
    error: null
}

const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addBlog.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(addBlog.fulfilled, (state, action) => {
                state.loading = false
                state.blog = action.payload.data.blog
            })
            .addCase(addBlog.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred";
            })
            .addCase(listBlogs.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(listBlogs.fulfilled, (state, action) => {
                state.loading = false
                state.blog = action.payload.data.blog
            })
            .addCase(listBlogs.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred";
            })
            .addCase(updateBlog.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updateBlog.fulfilled, (state, action) => {
                state.loading = false
                state.blog = action.payload.data.blog
            })
            .addCase(updateBlog.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred";
            })
            .addCase(removeBlog.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(removeBlog.fulfilled, (state, action) => {
                state.loading = false
                state.blog = action.payload.data.blog
            })
            .addCase(removeBlog.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred";
            })
            .addCase(getSingleBlog.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getSingleBlog.fulfilled, (state, action) => {
                state.loading = false
                state.blog = action.payload.data.blog
            })
            .addCase(getSingleBlog.rejected, (state, action) => {
                state.loading = false
                state.error = action.error || "An error occurred";
            })
    }
})

export { addBlog, listBlogs, updateBlog, removeBlog, getSingleBlog }
export default blogSlice.reducer