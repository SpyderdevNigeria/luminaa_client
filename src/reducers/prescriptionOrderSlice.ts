import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PrescriptionOrderItem {
  id: string;
  medication: any;
  prescription: any;
  quantity: number;
  price: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

interface PrescriptionOrder {
  id: string;
  orderNo: string;
  orderType: string;
  deliveryAddress: string;
  status: string;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  notes: string;
  reference: string;
  items: PrescriptionOrderItem[];
  processedBy: any;
  createdAt: string;
  updatedAt: string;
}

interface PrescriptionOrderState {
  data: PrescriptionOrder[];
  filters: {
    page: number;
    total: number;
    totalPages: number;
    limit: number;
    status?: string;
    paymentStatus?: string;
    paymentMethod?: string;
    orderType?: string;
    dateFrom?: string;
    dateTo?: string;
    search?: string;
    patientId?: string;
  };
}

const initialState: PrescriptionOrderState = {
  data: [],
  filters: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  },
};

const prescriptionOrderSlice = createSlice({
  name: "prescriptionOrders",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<PrescriptionOrder[]>) => {
      state.data = action.payload;
    },
    clearOrders: (state) => {
      state.data = [];
    },
    setFilters: (
      state,
      action: PayloadAction<Partial<PrescriptionOrderState["filters"]>>
    ) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
    clearFilters: (state) => {
      state.filters = {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 1,
      };
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.filters.page = action.payload;
    },
    setPaginationMeta: (
      state,
      action: PayloadAction<{
        total: number;
        totalPages: number;
        limit: number;
        page: number;
      }>
    ) => {
      state.filters.total = action.payload.total;
      state.filters.limit = action.payload.limit;
      state.filters.totalPages = action.payload.totalPages;
      state.filters.page = action.payload.page;
    },
  },
});

export const {
  setOrders,
  clearOrders,
  setFilters,
  clearFilters,
  setPage,
  setPaginationMeta,
} = prescriptionOrderSlice.actions;

export default prescriptionOrderSlice.reducer;
