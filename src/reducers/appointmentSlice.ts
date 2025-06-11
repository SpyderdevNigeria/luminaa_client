import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAppointment } from '../types/Interfaces';

interface AppointmentState {
  appointments: IAppointment[];
  error: string | null;
  total: number;
  limit: number;
  totalPages: number;
  page: number;
}

const initialState: AppointmentState = {
  appointments: [],
  total: 0,
  limit: 10,
  totalPages: 0,
  page: 1,
  error: null,
};

// Payload type for full appointment response
interface AppointmentResponsePayload {
  data: IAppointment[];
  total: number;
  limit: number;
  totalPages: number;
  page: number;
}

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    addAppointment: (state, action: PayloadAction<IAppointment>) => {
      state.appointments.push(action.payload);
    },
    updateAppointment: (state, action: PayloadAction<IAppointment>) => {
      const index = state.appointments.findIndex(a => a.id === action.payload.id);
      if (index !== -1) {
        state.appointments[index] = action.payload;
      }
    },
    deleteAppointment: (state, action: PayloadAction<string>) => {
      state.appointments = state.appointments.filter(a => a.id !== action.payload);
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setAppointments: (state, action: PayloadAction<IAppointment[]>) => {
      state.appointments = action.payload;
    },
    setAllAppointments: (state, action: PayloadAction<AppointmentResponsePayload>) => {
      state.appointments = action.payload.data;
      state.total = action.payload.total;
      state.limit = action.payload.limit;
      state.totalPages = action.payload.totalPages;
      state.page = action.payload.page;
    },
       setAppointmentPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  }
});

export const {
  addAppointment,
  updateAppointment,
  deleteAppointment,
  setError,
  clearError,
  setAppointments,
  setAllAppointments,
  setAppointmentPage,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;
