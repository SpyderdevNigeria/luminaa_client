import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPatient } from '../types/Interfaces';

interface PatientState {
  patients: IPatient[];
  error: string | null;
  total: number;
  limit: number;
  totalPages: number;
  page: number;
}

const initialState: PatientState = {
  patients: [],
  error: null,
  total: 0,
  limit: 10,
  totalPages: 0,
  page: 1,
};

interface PatientResponsePayload {
  data: IPatient[];
  total: number;
  limit: number;
  totalPages: number;
  page: number;
}

const patientSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    addPatient: (state, action: PayloadAction<IPatient>) => {
      state.patients.push(action.payload);
    },
    updatePatient: (state, action: PayloadAction<IPatient>) => {
      const index = state.patients.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.patients[index] = action.payload;
      }
    },
    deletePatient: (state, action: PayloadAction<string>) => {
      state.patients = state.patients.filter(p => p.id !== action.payload);
    },
    setPatientError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearPatientError: (state) => {
      state.error = null;
    },
    setPatients: (state, action: PayloadAction<IPatient[]>) => {
      state.patients = action.payload;
    },
    setAllPatients: (state, action: PayloadAction<PatientResponsePayload>) => {
      state.patients = action.payload.data;
      state.total = action.payload.total;
      state.limit = action.payload.limit;
      state.totalPages = action.payload.totalPages;
      state.page = action.payload.page;
    },
    setPatientPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

export const {
  addPatient,
  updatePatient,
  deletePatient,
  setPatientError,
  clearPatientError,
  setPatients,
  setAllPatients,
  setPatientPage,
} = patientSlice.actions;

export default patientSlice.reducer;
