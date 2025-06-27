import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import {
  setInventory,
  setInventoryError,
  setInventoryLogs,
  setInventoryLogsFilters,
  setInventorySummary,
  setInventorySummaryFilters,
  setInventoryMedication,
  setInventoryMedicationFilters,
} from "../reducers/InventorySlice";
import { useState } from "react";

interface InventoryFilters {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  location?: string;
  supplier?: string;
  lowStockThreshold?: string;
  showExpired?: string;
  expiringInDays?: string;
}

interface InventoryLogFilters {
  page?: number;
  limit?: number;
  medicationId?: string;
  action?: string;
  performedBy?: string;
  search?: string;
  fromDate?: string;
  toDate?: string;
}

interface InventorySummaryFilters {
  page?: number;
  limit?: number;
  search?: string;
  medicationId?: string;
  sortBy?: string;
  sortOrder?: string;
}

function useInventory(api: any) {
  const dispatch = useDispatch<AppDispatch>();
  const {
    inventory,
    inventoryLogs,
    inventorySummary,
    inventoryMedication,
  } = useSelector((state: RootState) => state.inventory);
  const [inventoryLoading, setInventoryLoading] = useState(false);
  const [inventoryLogLoading, setInventoryLogsLoading] = useState(false)
  const [inventorySummaryLoading, setInventorySummaryLoading] = useState(false)
  const [inventoryMedicationLoading, setInventoryMedicationLoading] = useState(false)
  const {
    page: logsPage,
    limit: logsLimit,
    total: logsTotal,
    totalPages: logsTotalPages,
    loading: logsLoading,
    search: logSearch,
    action: logAction,
    performedBy: logPerformedBy,
    medicationId: logMedicationId,
    fromDate: logFromDate,
    toDate: logToDate,
  } = inventoryLogs;

  // ---------- GET INVENTORY ----------
  const getInventory = async (filters: InventoryFilters = {}) => {
   setInventoryLoading(true);
    dispatch(setInventoryError(null));
    try {
      const merged = { ...inventory, ...filters };
      dispatch(setInventory(merged));

      const params = new URLSearchParams();
      const {
        page,
        limit,
        search,
        status,
        location,
        supplier,
        lowStockThreshold,
        showExpired,
        expiringInDays,
      } = merged;

      params.append("page", page?.toString() || "1");
      params.append("limit", limit?.toString() || "10");
      if (search) params.append("search", search);
      if (status) params.append("status", status);
      if (location) params.append("location", location);
      if (supplier) params.append("supplier", supplier);
      if (lowStockThreshold) params.append("lowStockThreshold", lowStockThreshold);
      if (showExpired) params.append("showExpired", showExpired);
      if (expiringInDays) params.append("expiringInDays", expiringInDays);

      const res = await api.getInventory(`?${params.toString()}`);
      dispatch(setInventory({ ...res.data }));
    } catch {
      dispatch(setInventoryError("Failed to fetch inventory"));
    } finally {
      setInventoryLoading(false);
    }
  };

  // ---------- GET INVENTORY LOGS ----------
  const getInventoryLogs = async (filters: InventoryLogFilters = {}) => {
    setInventoryLogsLoading(true);
    console.log(true)
    dispatch(setInventoryError(null));
    try {
      const merged = { ...inventoryLogs, ...filters };
      dispatch(setInventoryLogsFilters(merged));

      const {
        page,
        limit,
        search,
        action,
        performedBy,
        medicationId,
        fromDate,
        toDate,
      } = merged;

      const params = new URLSearchParams();
      params.append("page", page?.toString() || "1");
      params.append("limit", limit?.toString() || "10");
      if (search) params.append("search", search);
      if (action) params.append("action", action);
      if (performedBy) params.append("performedBy", performedBy);
      if (medicationId) params.append("medicationId", medicationId);
      if (fromDate) params.append("fromDate", fromDate);
      if (toDate) params.append("toDate", toDate);

      const res = await api.getInventoryLogs(`?${params.toString()}`);
      dispatch(setInventoryLogs({ ...res.data }));
    } catch {
      dispatch(setInventoryError("Failed to fetch inventory logs"));
    } finally {
   setInventoryLogsLoading(false);
    }
  };

  // ---------- GET INVENTORY SUMMARY ----------
  const getInventorySummary = async (filters: InventorySummaryFilters = {}) => {
setInventorySummaryLoading(true);
    dispatch(setInventoryError(null));
    try {
      const merged = { ...inventorySummary, ...filters };
      dispatch(setInventorySummaryFilters(merged));

      const {
        page,
        limit,
        search,
        medicationId,
        sortBy,
        sortOrder,
      } = merged;

      const params = new URLSearchParams();
      params.append("page", page?.toString() || "1");
      params.append("limit", limit?.toString() || "10");
      if (search) params.append("search", search);
      if (medicationId) params.append("medicationId", medicationId);
      if (sortBy) params.append("sortBy", sortBy);
      if (sortOrder) params.append("sortOrder", sortOrder);

      const res = await api.getInventorySummary(`?${params.toString()}`);
      dispatch(setInventorySummary({ ...res.data }));
    } catch {
      dispatch(setInventoryError("Failed to fetch inventory summary"));
    } finally {
      setInventorySummaryLoading(false)
    }
  };

  // ---------- GET INVENTORY BY MEDICATION ID ----------
  const getInventoryByMedicationId = async (
    medicationId: string,
    filters: InventoryFilters = {}
  ) => {
    setInventoryMedicationLoading(true);
    dispatch(setInventoryError(null));
    try {
      const merged = { ...inventoryMedication, ...filters, medicationId };
      dispatch(setInventoryMedicationFilters(merged));

      const {
        page,
        limit,
        search,
        status,
        location,
        supplier,
      } = merged;

      const params = new URLSearchParams();
      params.append("page", page?.toString() || "1");
      params.append("limit", limit?.toString() || "10");
      if (search) params.append("search", search);
      if (status) params.append("status", status);
      if (location) params.append("location", location);
      if (supplier) params.append("supplier", supplier);

      const res = await api.getInventoryByMedicationId(
        medicationId,
        `?${params.toString()}`
      );
      dispatch(setInventoryMedication({ ...res.data }));
    } catch {
      dispatch(setInventoryError("Failed to fetch medication inventory"));
    } finally {
    setInventoryMedicationLoading(false);
    }
  };

  return {
    // Data
    inventory,
    inventoryLogs,
    inventorySummary,
    inventoryMedication,
    inventoryLogsList: inventoryLogs?.data,
    inventoryLoading,
    inventoryLogLoading,
    inventorySummaryLoading,
    inventoryMedicationLoading,
    // Fetchers
    getInventory,
    getInventoryLogs,
    getInventorySummary,
    getInventoryByMedicationId,

    // Inventory filters
    setInventoryPage: (page: number) =>
      dispatch(setInventory({ ...inventory, page })),
    setInventorySearch: (search: string) =>
      dispatch(setInventory({ ...inventory, search })),
    setInventoryStatus: (status: string) =>
      dispatch(setInventory({ ...inventory, status })),
    setInventoryLocation: (location: string) =>
      dispatch(setInventory({ ...inventory, location })),
    setInventorySupplier: (supplier: string) =>
      dispatch(setInventory({ ...inventory, supplier })),
    setInventoryLowStockThreshold: (lowStockThreshold: string) =>
      dispatch(setInventory({ ...inventory, lowStockThreshold })),
    setInventoryShowExpired: (showExpired: string) =>
      dispatch(setInventory({ ...inventory, showExpired })),
    setInventoryExpiringInDays: (expiringInDays: string) =>
      dispatch(setInventory({ ...inventory, expiringInDays })),

    // Inventory Logs filters
    logsPage,
    logsLimit,
    logsTotal,
    logsTotalPages,
    logsLoading,
    logSearch,
    logAction,
    logPerformedBy,
    logMedicationId,
    logFromDate,
    logToDate,

    setLogsPage: (page: number) =>
      dispatch(setInventoryLogsFilters({ ...inventoryLogs, page })),
    setLogSearch: (search: string) =>
      dispatch(setInventoryLogsFilters({ ...inventoryLogs, search })),
    setLogAction: (action: string) =>
      dispatch(setInventoryLogsFilters({ ...inventoryLogs, action })),
    setLogPerformedBy: (performedBy: string) =>
      dispatch(setInventoryLogsFilters({ ...inventoryLogs, performedBy })),
    setLogMedicationId: (medicationId: string) =>
      dispatch(setInventoryLogsFilters({ ...inventoryLogs, medicationId })),
    setLogFromDate: (fromDate: string) =>
      dispatch(setInventoryLogsFilters({ ...inventoryLogs, fromDate })),
    setLogToDate: (toDate: string) =>
      dispatch(setInventoryLogsFilters({ ...inventoryLogs, toDate })),

    // Inventory Summary filters
    setInventorySummaryPage: (page: number) =>
      dispatch(setInventorySummaryFilters({ ...inventorySummary, page })),
    setInventorySummarySearch: (search: string) =>
      dispatch(setInventorySummaryFilters({ ...inventorySummary, search })),
    setInventorySummaryMedicationId: (medicationId: string) =>
      dispatch(setInventorySummaryFilters({ ...inventorySummary, medicationId })),
    setInventorySummarySortBy: (sortBy: string) =>
      dispatch(setInventorySummaryFilters({ ...inventorySummary, sortBy })),
    setInventorySummarySortOrder: (sortOrder: string) =>
      dispatch(setInventorySummaryFilters({ ...inventorySummary, sortOrder })),

    // Inventory by Medication filters
    setInventoryMedicationPage: (page: number) =>
      dispatch(setInventoryMedicationFilters({ ...inventoryMedication, page })),
    setInventoryMedicationLimit: (limit: number) =>
      dispatch(setInventoryMedicationFilters({ ...inventoryMedication, limit })),
    setInventoryMedicationSearch: (search: string) =>
      dispatch(setInventoryMedicationFilters({ ...inventoryMedication, search })),
    setInventoryMedicationStatus: (status: string) =>
      dispatch(setInventoryMedicationFilters({ ...inventoryMedication, status })),
    setInventoryMedicationLocation: (location: string) =>
      dispatch(setInventoryMedicationFilters({ ...inventoryMedication, location })),
    setInventoryMedicationSupplier: (supplier: string) =>
      dispatch(setInventoryMedicationFilters({ ...inventoryMedication, supplier })),
  };
}

export default useInventory;
