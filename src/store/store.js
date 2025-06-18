import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import therapistReducer from "./therapistSlice.js";

const store = configureStore({
    reducer: {
        user: userReducer,
        therapist: therapistReducer
    }
})

export default store