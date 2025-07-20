import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import therapistReducer from "./therapistSlice.js";
import leadReducer from './leadSlice.js'
import adminReducer from './adminSlice.js'
import packageReducer from './packageSlice.js'

const store = configureStore({
    reducer: {
        user: userReducer,
        therapist: therapistReducer,
        lead: leadReducer,
        admin: adminReducer,
        package: packageReducer
    }
})

export default store