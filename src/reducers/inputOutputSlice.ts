// src/store/slices/inputOutputSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaginationState {
  page: number;
  limit: number;
}

export interface InputOutputFilters extends PaginationState {
  patientId?: string | null;
  procedureId?: string | null;
  type?: "input" | "output" | null | string;
  dateFrom?: string | null;
  dateTo?: string | null;
}

interface InputOutputState {
  data: any[];
  loading: boolean;
  error: string | null;
  total: number;
  filters: InputOutputFilters;
}

const initialState: InputOutputState = {
  data: [],
  loading: false,
  error: null,
  total: 0,
  filters: {
    page: 1,
    limit: 10,
    patientId: null,
    procedureId: null,
    type: null,
    dateFrom: null,
    dateTo: null,
  },
};

const inputOutputSlice = createSlice({
  name: "inputOutput",
  initialState,
  reducers: {
    setInputOutputLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setInputOutputError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setInputOutputData: (
      state,
      action: PayloadAction<{ data: any[]; total?: number }>
    ) => {
      state.data = action.payload.data;
      state.total = action.payload.total || 0;
    },
    setInputOutputFilters: (
      state,
      action: PayloadAction<Partial<InputOutputFilters>>
    ) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetInputOutput: () => initialState,
  },
});

export const {
  setInputOutputLoading,
  setInputOutputError,
  setInputOutputData,
  setInputOutputFilters,
  resetInputOutput,
} = inputOutputSlice.actions;

export default inputOutputSlice.reducer;
