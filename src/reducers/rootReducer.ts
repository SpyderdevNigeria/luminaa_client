import { combineReducers } from "redux";

import authSlice from "./authSlice";
import userSlice from "./userSlice";
import orderSlice from "./orderSlice";
import adminSlice from "./adminSlice";
import diagnosisSlice from "./DiagnosisSlice";
import superAdminSlice from "./superAdminSlice"
import medicationSlice from "./medicationSlice";
import appointmentSlice from "./appointmentSlice";
import prescriptionSlice from "./prescriptionSlice";
const rootReducer = combineReducers({
  auth: authSlice,
  users: userSlice, 
  admin: adminSlice,
  orders: orderSlice,
  diagnosis: diagnosisSlice,
  superAdmin: superAdminSlice,
  medications: medicationSlice,
  appointments: appointmentSlice,
  prescriptions: prescriptionSlice,
});

export default rootReducer;
