import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaginationState {
  page: number;
  limit: number;
  search?: string | null;
}

interface ReportFilters extends PaginationState {
  reportType?: string | null;
  nurseId?: string | null;
  month?: string | null;
  startDate?: string | null;
  endDate?: string | null;
}

interface ReportState {
  data: any[];
  loading: boolean;
  error: string | null;
  total: number;
  filters: ReportFilters;
}

const initialState: ReportState = {
  data: [],
  loading: false,
  error: null,
  total: 0,
  filters: {
    page: 1,
    limit: 10,
  },
};

const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    setReportsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setReportsError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setReports: (
      state,
      action: PayloadAction<{ data: any[]; total?: number }>
    ) => {
      state.data = action.payload.data;
      state.total = action.payload.total || 0;
    },
    setReportsFilters: (state, action: PayloadAction<Partial<ReportFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetReports: () => initialState,
  },
});

export const {
  setReports,
  setReportsLoading,
  setReportsError,
  setReportsFilters,
  resetReports,
} = reportsSlice.actions;

export default reportsSlice.reducer;
