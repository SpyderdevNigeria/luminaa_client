import { createSlice } from '@reduxjs/toolkit';

// Initial State
const initialState = {
  patients: {
    data: [],
    page: 1,
    limit: 10,
    total: 0,
    loading: false,
    error: null,
  },
  doctors: {
    data: [],
    page: 1,
    limit: 10,
    specialty: '',
    total: 0,
    loading: false,
    error: null,
  },
  labs: {
    data: [],
    page: 1,
    limit: 10,
    department: '',
    total: 0,
    loading: false,
    error: null,
  },
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    // Patients
    setPatientsLoading(state, action) {
      state.patients.loading = action.payload;
    },
    setPatients(state, action) {
      const { data, total } = action.payload;
      state.patients.data = data;
      state.patients.total = total;
    },
    setPatientsPagination(state, action) {
      state.patients.page = action.payload.page;
      state.patients.limit = action.payload.limit;
    },
    setPatientsError(state, action) {
      state.patients.error = action.payload;
    },

    // Doctors
    setDoctorsLoading(state, action) {
      state.doctors.loading = action.payload;
    },
    setDoctors(state, action) {
      const { data, total } = action.payload;
      state.doctors.data = data;
      state.doctors.total = total;
    },
    setDoctorsPagination(state, action) {
      state.doctors.page = action.payload.page;
      state.doctors.limit = action.payload.limit;
    },
    setDoctorsSpecialty(state, action) {
      state.doctors.specialty = action.payload;
    },
    setDoctorsError(state, action) {
      state.doctors.error = action.payload;
    },

    // Labs
    setLabsLoading(state, action) {
      state.labs.loading = action.payload;
    },
    setLabs(state, action) {
      const { data, total } = action.payload;
      state.labs.data = data;
      state.labs.total = total;
    },
    setLabsPagination(state, action) {
      state.labs.page = action.payload.page;
      state.labs.limit = action.payload.limit;
    },
    setLabsDepartment(state, action) {
      state.labs.department = action.payload;
    },
    setLabsError(state, action) {
      state.labs.error = action.payload;
    },
  },
});

export const {
  // Patients
  setPatientsLoading,
  setPatients,
  setPatientsPagination,
  setPatientsError,

  // Doctors
  setDoctorsLoading,
  setDoctors,
  setDoctorsPagination,
  setDoctorsSpecialty,
  setDoctorsError,

  // Labs
  setLabsLoading,
  setLabs,
  setLabsPagination,
  setLabsDepartment,
  setLabsError,
} = adminSlice.actions;

export default adminSlice.reducer;
