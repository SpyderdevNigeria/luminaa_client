import { createSlice } from '@reduxjs/toolkit';
import { IMedication } from '../types/Interfaces';
// Initial State
interface MedicationState {
  medications: {
    data: IMedication[],
    error: string | null;
  total: number;
  limit: number;
  totalPages: number;
  page: number;
  search:string;
  category:string;
  dosageForm:string;
  status:string;
  requiresPrescription:string;
  manufacturer:string;
  maxPrice:number;
  minPrice:number;
  loading:boolean;
  }
}
const initialState: MedicationState = {
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
    totalPages: 0,
    maxPrice:0,
    minPrice:0,
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
      state.medications.data = action.payload?.data;
      state.medications.total = action.payload.total;
      state.medications.limit = action.payload.limit;
      state.medications.totalPages = action.payload.totalPages;
      state.medications.page = action.payload.page;
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
      setMedicationMaxPrice(state, action) {
      state.medications.maxPrice = action.payload;
    },
      setMedicationMinPrice(state, action) {
      state.medications.minPrice = action.payload;
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
  setMedicationMaxPrice,
  setMedicationMinPrice,
  setMedicationsError,
} = medicationSlice.actions;

export default medicationSlice.reducer;
