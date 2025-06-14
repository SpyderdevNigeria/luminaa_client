import { combineReducers } from "redux";

import authSlice from "./authSlice";
import orderSlice from "./orderSlice";
import adminSlice from "./adminSlice";
import medicationSlice from "./medicationSlice";
import diagnosisSlice from "./DiagnosisSlice";
import appointmentSlice from "./appointmentSlice";
import prescriptionSlice from "./prescriptionSlice";
const rootReducer = combineReducers({
  auth: authSlice,
  admin: adminSlice,
  orders: orderSlice,
  diagnosis: diagnosisSlice,
  medications: medicationSlice,
  appointments: appointmentSlice,
  prescriptions: prescriptionSlice,
});

export default rootReducer;
