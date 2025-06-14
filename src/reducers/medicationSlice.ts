import { createSlice } from '@reduxjs/toolkit';

// Initial State
const initialState = {
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

const medicationSlice = createSlice({
  name: 'medications',
  initialState,
  reducers: {

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
} = medicationSlice.actions;

export default medicationSlice.reducer;
