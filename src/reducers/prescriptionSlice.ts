import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPrescription } from "../types/Interfaces";


interface PrescriptionState {
  prescriptions: IPrescription[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  loading: boolean;
  error: string;
  appointmentId: string;
  patientId: string;
  status: string;
  isRefillable: string;
  search: string;
}

const initialState: PrescriptionState = {
  prescriptions: [],
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 1,
  loading: false,
  error: "",
  appointmentId: "",
  patientId: "",
  status: "",
  isRefillable: "",
  search: "",
};

const prescriptionSlice = createSlice({
  name: "prescription",
  initialState,
  reducers: {
    setPrescriptions(state, action: PayloadAction<IPrescription[]>) {
      state.prescriptions = action.payload;
    },
    setPrescriptionPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setPrescriptionLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
    setPrescriptionTotal(state, action: PayloadAction<number>) {
      state.total = action.payload;
    },
    setPrescriptionTotalPages(state, action: PayloadAction<number>) {
      state.totalPages = action.payload;
    },
    setPrescriptionLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setPrescriptionError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    setPrescriptionAppointmentId(state, action: PayloadAction<string>) {
      state.appointmentId = action.payload;
    },
        setPrescriptionIsRefillable(state, action: PayloadAction<string>) {
      state.isRefillable = action.payload;
    },
        setPrescriptionStatus(state, action: PayloadAction<string>) {
      state.status = action.payload;
    },
           setPrescriptionPatientId(state, action: PayloadAction<string>) {
      state.patientId = action.payload;
    },
    setPrescriptionSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
  },
});

export const {
  setPrescriptions,
  setPrescriptionPage,
  setPrescriptionLimit,
  setPrescriptionTotal,
  setPrescriptionTotalPages,
  setPrescriptionLoading,
  setPrescriptionError,
  setPrescriptionAppointmentId,
  setPrescriptionIsRefillable,
  setPrescriptionPatientId,
  setPrescriptionStatus,
  setPrescriptionSearch,
} = prescriptionSlice.actions;

export default prescriptionSlice.reducer;
