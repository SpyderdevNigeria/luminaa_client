import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface PaymentVoucher {
  id: string;
  amount: number;
  status: string;
  createdAt: string;
 
}

interface PaymentVouchersState {
  vouchers: PaymentVoucher[];
  loading: boolean;
  error: string | null;
  page: number;
  limit: number;
  status: string;
  total: number;
}

// --- Initial State ---
const initialState: PaymentVouchersState = {
  vouchers: [],
  loading: false,
  error: null,
  page: 1,
  limit: 10,
  status: "",
  total: 0,
};




// --- Slice ---
const paymentVouchersSlice = createSlice({
  name: "paymentVouchers",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
    setStatus(state, action: PayloadAction<string>) {
      state.status = action.payload;
    },
  },

});

export const { setPage, setLimit, setStatus } = paymentVouchersSlice.actions;
export default paymentVouchersSlice.reducer;
