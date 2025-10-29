import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import AdminApi from "../api/adminApi";


export interface ServicePrice {
  id: string;
  partnerId: string;
  serviceId: string;
  price: number;
  deleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface Filters {
  partnerId?: string;
  serviceId?: string;
  page: number;
  limit: number;
  includeDeleted?: boolean;
}

interface ServicePriceState {
  data: ServicePrice[];
  total: number;
  loading: boolean;
  error: string | null;
  filters: Filters;
}

const initialState: ServicePriceState = {
  data: [],
  total: 0,
  loading: false,
  error: null,
  filters: {
    partnerId: "",
    serviceId: "",
    page: 1,
    limit: 10,
    includeDeleted: false,
  },
};

// --- Async Thunk to Fetch Service Prices ---
export const fetchServicePrices = createAsyncThunk(
  "servicePrices/fetchServicePrices",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { servicePrices: ServicePriceState };
      const { filters } = state.servicePrices;

      // Remove null/empty filters
      const params = Object.fromEntries(
        Object.entries(filters).filter(
          ([, value]) =>
            value !== null &&
            value !== undefined &&
            value !== "" &&
            !(typeof value === "string" && value.trim() === "")
        )
      );

      const res = await AdminApi.getServicePrices(params);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to fetch service prices");
    }
  }
);

const servicePriceSlice = createSlice({
  name: "servicePrices",
  initialState,
  reducers: {
    updateFilters(state, action: PayloadAction<Partial<Filters>>) {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServicePrices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServicePrices.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload?.data?.data || [];
        state.total = action.payload?.data?.total || 0;
      })
      .addCase(fetchServicePrices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { updateFilters } = servicePriceSlice.actions;
export default servicePriceSlice.reducer;
