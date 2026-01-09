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
import availabilityReducer from './availability.js'
import employeeReducer from './employeeSlice.js'
import paymentReducer from './paymentSlice.js'
import feedbackReducer from './feedbackSlice.js'
import individualFormReducer from './individualForm.js'
import notesReducer from './notesSlice.js'
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
        appointment: appointmentReducer,
        availability: availabilityReducer,
        employee: employeeReducer,
        payment: paymentReducer,
        feedback: feedbackReducer,
        individualFormReducer: individualFormReducer,
        note: notesReducer
    }
})

export default store