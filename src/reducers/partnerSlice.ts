import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaginationState {
  page: number;
  limit: number;
  search?: string;
}

interface PartnerFilters extends PaginationState {
  name?: string;
  partnerType?: string;
}

interface PartnerState {
  data: any[];
  loading: boolean;
  error: string | null;
  total: number;
  filters: PartnerFilters;
}

const initialState: PartnerState = {
  data: [],
  loading: false,
  error: null,
  total: 0,
  filters: {
    page: 1,
    limit: 10,
    search: "",
    name: "",
    partnerType: "",
  },
};

const partnerSlice = createSlice({
  name: "partner",
  initialState,
  reducers: {
    setPartnersLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setPartnersError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setPartners: (
      state,
      action: PayloadAction<{ data: any[]; total?: number }>
    ) => {
      state.data = action.payload.data;
      state.total = action.payload.total || 0;
    },
    setPartnersFilters: (state, action: PayloadAction<Partial<PartnerFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetPartners: () => initialState,
  },
});

export const {
  setPartners,
  setPartnersLoading,
  setPartnersError,
  setPartnersFilters,
  resetPartners,
} = partnerSlice.actions;

export default partnerSlice.reducer;
