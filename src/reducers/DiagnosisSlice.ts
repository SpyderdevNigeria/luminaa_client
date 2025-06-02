import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DiagnosisState {
  diagnoses: any[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  loading: boolean;
  error: string;
  appointmentId: string;
  search: string;
  severity: string;
  isConfirmed: boolean;
}

const initialState: DiagnosisState = {
  diagnoses: [],
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 1,
  loading: false,
  error: "",
  appointmentId: "",
  search: "",
  severity: "",
  isConfirmed: false,
};

const diagnosisSlice = createSlice({
  name: "diagnosis",
  initialState,
  reducers: {
    setDiagnoses(state, action: PayloadAction<any[]>) {
      state.diagnoses = action.payload;
    },
    setDiagnosisPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setDiagnosisLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
    setDiagnosisTotal(state, action: PayloadAction<number>) {
      state.total = action.payload;
    },
    setDiagnosisTotalPages(state, action: PayloadAction<number>) {
      state.totalPages = action.payload;
    },
    setDiagnosisLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setDiagnosisError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    setAppointmentId(state, action: PayloadAction<string>) {
      state.appointmentId = action.payload;
    },
    setDiagnosisSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setDiagnosisSeverity(state, action: PayloadAction<string>) {
      state.severity = action.payload;
    },
    setDiagnosisIsConfirmed(state, action: PayloadAction<boolean>) {
      state.isConfirmed = action.payload;
    },
  },
});

export const {
  setDiagnoses,
  setDiagnosisPage,
  setDiagnosisLimit,
  setDiagnosisTotal,
  setDiagnosisTotalPages,
  setDiagnosisLoading,
  setDiagnosisError,
  setAppointmentId,
  setDiagnosisSearch,
  setDiagnosisSeverity,
  setDiagnosisIsConfirmed,
} = diagnosisSlice.actions;

export default diagnosisSlice.reducer;
