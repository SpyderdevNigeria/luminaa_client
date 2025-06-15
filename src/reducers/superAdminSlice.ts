import { createSlice } from '@reduxjs/toolkit';

// Initial State
const initialState = {
  admins: {
    data: [],
    page: 1,
    limit: 10,
    search: '',
    total: 0,
    loading: false,
    error: null,
  },
};

const superAdminSlice = createSlice({
  name: 'superAdmin',
  initialState,
  reducers: {
    // Admins
    setAdminsLoading(state, action) {
      state.admins.loading = action.payload;
    },
    setAdmins(state, action) {
      const { data, total } = action.payload;
      state.admins.data = data;
      state.admins.total = total;
    },
    setAdminsPagination(state, action) {
      state.admins.page = action.payload.page;
      state.admins.limit = action.payload.limit;
    },
    setAdminsSearch(state, action) {
      state.admins.search = action.payload;
    },
    setAdminsError(state, action) {
      state.admins.error = action.payload;
    },
  },
});

export const {
  setAdminsLoading,
  setAdmins,
  setAdminsPagination,
  setAdminsSearch,
  setAdminsError,
} = superAdminSlice.actions;

export default superAdminSlice.reducer;
