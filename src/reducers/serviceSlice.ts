// src/redux/slices/servicesSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import AdminApi from "../api/adminApi";
import PatientApi from "../api/PatientApi";


export interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  deleted?: boolean;
}

interface Filters {
  name?: string;
  category?: string;
  search?: string;
  page: number;
  limit: number;
  includeDeleted?: boolean |string;
}

interface ServicesState {
  data: Service[];
  total: number;
  loading: boolean;
  error: string | null;
  filters: Filters;
}

const initialState: ServicesState = {
  data: [],
  total: 0,
  loading: false,
  error: null,
  filters: {
    name: "",
    category: "",
    search: "",
    page: 1,
    limit: 10,
    includeDeleted: false,
  },
};

// --- Async Thunk to Fetch Services ---
export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { services: ServicesState };
      const { filters } = state.services;
      const params = {
        ...filters,
        includeDeleted: filters.includeDeleted === 'Yes' ? true : false,
      };
      const res = await AdminApi.getServices(params);
        return res;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to fetch services");
    }
  }
);
export const fetchServicesForPatient = createAsyncThunk(
  "services/fetchServicesForPatient",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { services: ServicesState };
      const { filters } = state.services;
      const params = {
        ...filters,
      };
      const res = await PatientApi.getServices(params);
        return res;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to fetch services");
    }
  }
);
const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    updateFilters(state, action: PayloadAction<Partial<Filters>>) {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload?.data?.data || [];
        state.total = action.payload?.data?.total || 0;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchServicesForPatient.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchServicesForPatient.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload?.data?.data || [];
        state.total = action.payload?.data?.total || 0;
      })
      .addCase(fetchServicesForPatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
  

});

export const { updateFilters } = servicesSlice.actions;
export default servicesSlice.reducer;
