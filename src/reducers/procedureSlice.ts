import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaginationState {
  page: number;
  limit: number;
  search?: string;
}

interface ProcedureFilters extends PaginationState {
  status?: string | null | undefined;
  type?: string | null | undefined;
  paymentStatus?: string | null | undefined;
  patientId?: string;
}

interface ProcedureState {
  data: any[];
  loading: boolean;
  error: string | null;
  total: number;
  filters: ProcedureFilters;
}

const initialState: ProcedureState = {
  data: [],
  loading: false,
  error: null,
  total: 0,
  filters: {
    page: 1,
    limit: 10,
  },
};

const procedureSlice = createSlice({
  name: "procedure",
  initialState,
  reducers: {
    setProceduresLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setProceduresError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setProcedures: (
      state,
      action: PayloadAction<{ data: any[]; total?: number }>
    ) => {
      state.data = action.payload.data;
      state.total = action.payload.total || 0;
    },
    setProceduresFilters: (state, action: PayloadAction<Partial<ProcedureFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetProcedures: () => initialState,
  },
});

export const {
  setProcedures,
  setProceduresLoading,
  setProceduresError,
  setProceduresFilters,
  resetProcedures,
} = procedureSlice.actions;

export default procedureSlice.reducer;
