import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import therapistReducer from "./therapistSlice.js";
import leadReducer from './leadSlice.js'
import adminReducer from './adminSlice.js'
import packageReducer from './packageSlice.js'
import companyReducer from './companySlice.js'
import webinarReducer from './webinarSlice.js'
import otpReducer from './otpSlice.js'
import appointmentReducer from './appoinment.js'

const store = configureStore({
    reducer: {
        user: userReducer,
        therapist: therapistReducer,
        lead: leadReducer,
        admin: adminReducer,
        package: packageReducer,
        company: companyReducer,
        webinar: webinarReducer,
        otp: otpReducer,
        appointment: appointmentReducer
    }
})

export default store