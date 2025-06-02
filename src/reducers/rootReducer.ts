import { combineReducers } from 'redux';

import authSlice from './authSlice';
import appointmentSlice from './appointmentSlice';
import diagnosisSlice from './DiagnosisSlice'
const rootReducer = combineReducers({
  auth: authSlice,
  appointments: appointmentSlice,
   diagnosis: diagnosisSlice,
});

export default rootReducer;
