import { combineReducers } from "redux";

import authSlice from "./authSlice";
import userSlice from "./userSlice";
import orderSlice from "./orderSlice";
import cartSlice from './cartSlice';
import adminSlice from "./adminSlice";
import vitalSlice from "./vitalSlice";
import reportSlice from "./reportSlice";
import patientSlice from './patientSlice';
import partnerSlice from './partnerSlice';
import serviceSlice from "./serviceSlice";
import inventorySlice from "./InventorySlice";
import diagnosisSlice from "./DiagnosisSlice";
import procedureSlice from "./procedureSlice";
import superAdminSlice from "./superAdminSlice";
import medicationSlice from "./medicationSlice";
import appointmentSlice from "./appointmentSlice";
import inputOutputSlice from "./inputOutputSlice";
import servicePriceSlice from "./servicePriceSlice";
import prescriptionSlice from "./prescriptionSlice";
import PrescriptionOrderSlice from './prescriptionOrderSlice';

// Combine all slices
const appReducer = combineReducers({
  cart: cartSlice,
  auth: authSlice,
  users: userSlice,
  admin: adminSlice,
  orders: orderSlice,
  vitals : vitalSlice,
  reports: reportSlice,
  services: serviceSlice,
  partners: partnerSlice,
  patients: patientSlice,
  diagnosis: diagnosisSlice,
  inventory: inventorySlice,
  procedures: procedureSlice,
  superAdmin: superAdminSlice,
  medications: medicationSlice,
  inputOutput: inputOutputSlice,
  appointments: appointmentSlice,
  servicePrices: servicePriceSlice,
  prescriptions: prescriptionSlice,
  prescriptionOrders: PrescriptionOrderSlice,
});

// Wrap the combined reducer to handle logout reset
const rootReducer = (state: any, action: any) => {
  if (action.type === "auth/logout") {
    state = undefined; 
  }
  return appReducer(state, action);
};

export default rootReducer;
