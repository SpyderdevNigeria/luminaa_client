import { combineReducers } from "redux";

import authSlice from "./authSlice";
import userSlice from "./userSlice";
import orderSlice from "./orderSlice";
import cartSlice from './cartSlice';
import adminSlice from "./adminSlice";
import inventorySlice from "./InventorySlice";
import diagnosisSlice from "./DiagnosisSlice";
import superAdminSlice from "./superAdminSlice"
import medicationSlice from "./medicationSlice";
import appointmentSlice from "./appointmentSlice";
import prescriptionSlice from "./prescriptionSlice";
import PrescriptionOrderSlice from './prescriptionOrderSlice'
const rootReducer = combineReducers({
  cart:cartSlice,
  auth: authSlice,
  users: userSlice, 
  admin: adminSlice,
  orders: orderSlice,
  diagnosis: diagnosisSlice,
  inventory:inventorySlice,
  superAdmin: superAdminSlice,
  medications: medicationSlice,
  appointments: appointmentSlice,
  prescriptions: prescriptionSlice,
  prescriptionOrders:PrescriptionOrderSlice,
});

export default rootReducer;
