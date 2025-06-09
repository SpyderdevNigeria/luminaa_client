// src/reducers/orderSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaginationState {
  page: number;
  limit: number;
  search?: string;
}

interface OrderFilters extends PaginationState {
  status?: string;
  priority?: string;
  patientId?: string;
  appointmentId?: string;
}

interface ResultFilters extends PaginationState {
  startDate?: string;
  endDate?: string;
}

interface OrderState {
  orders: {
    data: any[];
    loading: boolean;
    error: string | null;
    total: number;
    filters: OrderFilters;
  };
  results: {
    data: any[];
    loading: boolean;
    error: string | null;
    total: number;
    filters: ResultFilters;
  };
}

const initialState: OrderState = {
  orders: {
    data: [],
    loading: false,
    error: null,
    total: 0,
    filters: {
      page: 1,
      limit: 10,
    },
  },
  results: {
    data: [],
    loading: false,
    error: null,
    total: 0,
    filters: {
      page: 1,
      limit: 10,
    },
  },
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    // Orders
    setOrdersLoading: (state, action: PayloadAction<boolean>) => {
      state.orders.loading = action.payload;
    },
    setOrdersError: (state, action: PayloadAction<string | null>) => {
      state.orders.error = action.payload;
    },
    setOrders: (
      state,
      action: PayloadAction<{ data: any[]; total?: number }>
    ) => {
      state.orders.data = action.payload.data;
      state.orders.total = action.payload.total || 0;
    },
    setOrdersFilters: (state, action: PayloadAction<Partial<OrderFilters>>) => {
      state.orders.filters = { ...state.orders.filters, ...action.payload };
    },

    // Results
    setResultsLoading: (state, action: PayloadAction<boolean>) => {
      state.results.loading = action.payload;
    },
    setResultsError: (state, action: PayloadAction<string | null>) => {
      state.results.error = action.payload;
    },
    setResults: (
      state,
      action: PayloadAction<{ data: any[]; total?: number }>
    ) => {
      state.results.data = action.payload.data;
      state.results.total = action.payload.total || 0;
    },
    setResultsFilters: (
      state,
      action: PayloadAction<Partial<ResultFilters>>
    ) => {
      state.results.filters = { ...state.results.filters, ...action.payload };
    },
  },
});

export const {
  setOrders,
  setOrdersLoading,
  setOrdersError,
  setOrdersFilters,

  setResults,
  setResultsLoading,
  setResultsError,
  setResultsFilters,
} = orderSlice.actions;

export default orderSlice.reducer;
