import { combineReducers } from "redux";

import authSlice from "./authSlice";
import appointmentSlice from "./appointmentSlice";
import diagnosisSlice from "./DiagnosisSlice";
import prescriptionSlice from "./prescriptionSlice";
import adminSlice from "./adminSlice";
const rootReducer = combineReducers({
  auth: authSlice,
  appointments: appointmentSlice,
  diagnosis: diagnosisSlice,
  prescriptions: prescriptionSlice,
  admin: adminSlice,
});

export default rootReducer;
