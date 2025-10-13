import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaginationState {
  page: number;
  limit: number;
  search?: string;
}

interface VitalFilters extends PaginationState {
  patientId?: string;
  appointmentId?: string;
  procedureId?: string;
  dateFrom?: string;
  dateTo?: string;
}

interface VitalState {
  data: any[];
  loading: boolean;
  error: string | null;
  total: number;
  filters: VitalFilters;
}

const initialState: VitalState = {
  data: [],
  loading: false,
  error: null,
  total: 0,
  filters: {
    page: 1,
    limit: 10,
  },
};

const vitalSlice = createSlice({
  name: "vital",
  initialState,
  reducers: {
    setVitalsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setVitalsError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setVitals: (state, action: PayloadAction<{ data: any[]; total?: number }>) => {
      state.data = action.payload.data;
      state.total = action.payload.total || 0;
    },
    setVitalsFilters: (state, action: PayloadAction<Partial<VitalFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetVitals: () => initialState,
  },
});

export const {
  setVitals,
  setVitalsLoading,
  setVitalsError,
  setVitalsFilters,
  resetVitals,
} = vitalSlice.actions;

export default vitalSlice.reducer;
