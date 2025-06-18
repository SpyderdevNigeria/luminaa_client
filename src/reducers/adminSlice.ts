import { createSlice } from '@reduxjs/toolkit';

// Initial State
const initialState = {
  patients: {
    data: [],
    search:'',
    isdisabled: "",
    isactive: "",
    role:"",
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
    status:"",
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
  pharmacists: {
    data: [],
    page: 1,
    limit: 10,
    search: '',
    total: 0,
    loading: false,
    error: null,
  },
  medications: {
    data: [],
    page: 1,
    limit: 10,
    search: '',
    category: '',
    dosageForm: '',
    status: '',
    requiresPrescription: '',
    manufacturer: '',
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
    setPatientsSearch(state, action) {
      state.patients.search = action.payload;
    },
      setPatientsIsDisabled(state, action) {
      state.patients.isdisabled = action.payload;
    },

      setPatientsIsActive(state, action) {
      state.patients.isactive = action.payload;
    },
       setPatientsRole(state, action) {
      state.patients.role = action.payload;
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
       setDoctorsStatus(state, action) {
      state.doctors.status = action.payload;
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

    // Pharmacists
    setPharmacistsLoading(state, action) {
      state.pharmacists.loading = action.payload;
    },
    setPharmacists(state, action) {
      const { data, total } = action.payload;
      state.pharmacists.data = data;
      state.pharmacists.total = total;
    },
    setPharmacistsPagination(state, action) {
      state.pharmacists.page = action.payload.page;
      state.pharmacists.limit = action.payload.limit;
    },
    setPharmacistsSearch(state, action) {
      state.pharmacists.search = action.payload;
    },
    setPharmacistsError(state, action) {
      state.pharmacists.error = action.payload;
    },

    // Medications
    setMedicationsLoading(state, action) {
      state.medications.loading = action.payload;
    },
    setMedications(state, action) {
      const { data, total } = action.payload;
      state.medications.data = data;
      state.medications.total = total;
    },
    setMedicationsPagination(state, action) {
      state.medications.page = action.payload.page;
      state.medications.limit = action.payload.limit;
    },
    setMedicationsSearch(state, action) {
      state.medications.search = action.payload;
    },
    setMedicationsCategory(state, action) {
      state.medications.category = action.payload;
    },
    setMedicationsDosageForm(state, action) {
      state.medications.dosageForm = action.payload;
    },
    setMedicationsStatus(state, action) {
      state.medications.status = action.payload;
    },
    setMedicationsRequiresPrescription(state, action) {
      state.medications.requiresPrescription = action.payload;
    },
    setMedicationsManufacturer(state, action) {
      state.medications.manufacturer = action.payload;
    },
    setMedicationsError(state, action) {
      state.medications.error = action.payload;
    },
  },
});

export const {
  // Patients
  setPatientsLoading,
  setPatients,
  setPatientsPagination,
  setPatientsError,
  setPatientsSearch,
  setPatientsIsDisabled,
  setPatientsRole,
  setPatientsIsActive,
  // Doctors
  setDoctorsLoading,
  setDoctors,
  setDoctorsPagination,
  setDoctorsSpecialty,
  setDoctorsError,
  setDoctorsStatus,

  // Labs
  setLabsLoading,
  setLabs,
  setLabsPagination,
  setLabsDepartment,
  setLabsError,

  // Pharmacists
  setPharmacistsLoading,
  setPharmacists,
  setPharmacistsPagination,
  setPharmacistsSearch,
  setPharmacistsError,

  // Medications
  setMedicationsLoading,
  setMedications,
  setMedicationsPagination,
  setMedicationsSearch,
  setMedicationsCategory,
  setMedicationsDosageForm,
  setMedicationsStatus,
  setMedicationsRequiresPrescription,
  setMedicationsManufacturer,
  setMedicationsError,
} = adminSlice.actions;

export default adminSlice.reducer;
