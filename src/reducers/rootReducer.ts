import { combineReducers } from "redux";

import authSlice from "./authSlice";
import userSlice from "./userSlice";
import orderSlice from "./orderSlice";
import cartSlice from './cartSlice';
import adminSlice from "./adminSlice";
import patientSlice from './patientSlice';
import inventorySlice from "./InventorySlice";
import diagnosisSlice from "./DiagnosisSlice";
import superAdminSlice from "./superAdminSlice";
import medicationSlice from "./medicationSlice";
import appointmentSlice from "./appointmentSlice";
import prescriptionSlice from "./prescriptionSlice";
import PrescriptionOrderSlice from './prescriptionOrderSlice';

// Combine all slices
const appReducer = combineReducers({
  cart: cartSlice,
  auth: authSlice,
  users: userSlice,
  admin: adminSlice,
  orders: orderSlice,
  patients: patientSlice,
  diagnosis: diagnosisSlice,
  inventory: inventorySlice,
  superAdmin: superAdminSlice,
  medications: medicationSlice,
  appointments: appointmentSlice,
  prescriptions: prescriptionSlice,
  prescriptionOrders: PrescriptionOrderSlice,
});

// Wrap the combined reducer to handle logout reset
const rootReducer = (state: any, action: any) => {
  if (action.type === "auth/logout") {
    console.log("Resetting state on logout");
    state = undefined; 
  }
  return appReducer(state, action);
};

export default rootReducer;
