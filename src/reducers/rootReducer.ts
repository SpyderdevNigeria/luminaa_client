import { combineReducers } from 'redux';

import authSlice from './authSlice';
import appointmentSlice from './appointmentSlice';
import diagnosisSlice from './DiagnosisSlice'
import prescriptionSlice from './prescriptionSlice'
const rootReducer = combineReducers({
  auth: authSlice,
  appointments: appointmentSlice,
   diagnosis: diagnosisSlice,
   prescriptions: prescriptionSlice
});

export default rootReducer;
