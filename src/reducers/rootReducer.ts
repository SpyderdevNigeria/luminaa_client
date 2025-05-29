import { combineReducers } from 'redux';

import authSlice from './authSlice';
import appointmentSlice from './appointmentSlice';
const rootReducer = combineReducers({
  auth: authSlice,
  appointments: appointmentSlice
});

export default rootReducer;
