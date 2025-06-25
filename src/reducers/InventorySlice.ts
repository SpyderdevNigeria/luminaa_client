import { createSlice } from '@reduxjs/toolkit';
import { IInventoryItem, IInventoryLog, IInventorySummary } from '../types/Interfaces';

interface InventoryState {
  inventory: {
    data: IInventoryItem[];
    total: number;
    limit: number;
    totalPages: number;
    page: number;
    search: string;
    status: string;
    location: string;
    supplier: string;
    lowStockThreshold: string;
    showExpired: string;
    expiringInDays: string;
    loading: boolean;
    error: string | null;
  };
  inventoryLogs: {
    data: IInventoryLog[];
    total: number;
    limit: number;
    totalPages: number;
    page: number;
    medicationId: string;
    action: string;
    performedBy: string;
    search: string;
    fromDate: string;
    toDate: string;
    loading: boolean;
    error: string | null;
  };
  inventorySummary: {
    data: IInventorySummary[];
    total: number;
    limit: number;
    totalPages: number;
    page: number;
    search: string;
    medicationId: string;
    sortBy: string;
    sortOrder: string;
    loading: boolean;
    error: string | null;
  };
  inventoryMedication: {
    data: IInventoryItem[];
    medicationId: string;
    total: number;
    limit: number;
    totalPages: number;
    page: number;
    search: string;
    status: string;
    location: string;
    supplier: string;
    lowStockThreshold: string;
    showExpired: string;
    expiringInDays: string;
    loading: boolean;
    error: string | null;
  };
}

const initialState: InventoryState = {
  inventory: {
    data: [],
    total: 0,
    limit: 10,
    totalPages: 0,
    page: 1,
    search: '',
    status: '',
    location: '',
    supplier: '',
    lowStockThreshold: '',
    showExpired: '',
    expiringInDays: '',
    loading: false,
    error: null,
  },
  inventoryLogs: {
    data: [],
    total: 0,
    limit: 10,
    totalPages: 0,
    page: 1,
    medicationId: '',
    action: '',
    performedBy: '',
    search: '',
    fromDate: '',
    toDate: '',
    loading: false,
    error: null,
  },
  inventorySummary: {
    data: [],
    total: 0,
    limit: 10,
    totalPages: 0,
    page: 1,
    search: '',
    medicationId: '',
    sortBy: '',
    sortOrder: '',
    loading: false,
    error: null,
  },
  inventoryMedication: {
    data: [],
    medicationId: '',
    total: 0,
    limit: 10,
    totalPages: 0,
    page: 1,
    search: '',
    status: '',
    location: '',
    supplier: '',
    lowStockThreshold: '',
    showExpired: '',
    expiringInDays: '',
    loading: false,
    error: null,
  },
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    // Inventory
    setInventoryLoading(state, action) {
      state.inventory.loading = action.payload;
    },
    setInventory(state, action) {
      Object.assign(state.inventory, action.payload);
    },
    setInventoryFilters(state, action) {
      Object.assign(state.inventory, action.payload);
    },
    setInventoryError(state, action) {
      state.inventory.error = action.payload;
    },

    // Inventory Logs
    setInventoryLogsLoading(state, action) {
      state.inventoryLogs.loading = action.payload;
    },
    setInventoryLogs(state, action) {
      Object.assign(state.inventoryLogs, action.payload);
    },
    setInventoryLogsFilters(state, action) {
      Object.assign(state.inventoryLogs, action.payload);
    },

    // Inventory Summary
    setInventorySummaryLoading(state, action) {
      state.inventorySummary.loading = action.payload;
    },
    setInventorySummary(state, action) {
      Object.assign(state.inventorySummary, action.payload);
    },
    setInventorySummaryFilters(state, action) {
      Object.assign(state.inventorySummary, action.payload);
    },

    // Inventory Medication
    setInventoryMedicationLoading(state, action) {
      state.inventoryMedication.loading = action.payload;
    },
    setInventoryMedication(state, action) {
      Object.assign(state.inventoryMedication, action.payload);
    },
    setInventoryMedicationFilters(state, action) {
      Object.assign(state.inventoryMedication, action.payload);
    },
  },
});

export const {
  setInventoryLoading,
  setInventory,
  setInventoryFilters,
  setInventoryError,
  setInventoryLogsLoading,
  setInventoryLogs,
  setInventoryLogsFilters,
  setInventorySummaryLoading,
  setInventorySummary,
  setInventorySummaryFilters,
  setInventoryMedicationLoading,
  setInventoryMedication,
  setInventoryMedicationFilters,
} = inventorySlice.actions;

export default inventorySlice.reducer;
