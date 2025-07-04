// src/hooks/useOrder.ts
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import {
  setOrders,
  setOrdersLoading,
  setOrdersError,
  setOrdersFilters,
  setResults,
  setResultsLoading,
  setResultsError,
  setResultsFilters,
} from "../reducers/orderSlice";


function useOrder(api: any) {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, results } = useSelector((state: RootState) => state.orders);

  // Orders
  const getOrders = async () => {
    dispatch(setOrdersLoading(true));
    dispatch(setOrdersError(null));
    try {
      const { page, limit, search, status, priority, patientId, appointmentId } = orders.filters;
      const params = new URLSearchParams();
      params.append("page", page.toString());
      params.append("limit", limit.toString());
      if (search) params.append("search", search);
      if (status) params.append("status", status.toUpperCase());
      if (priority) params.append("priority", priority);
      if (patientId) params.append("patientId", patientId);
      if (appointmentId) params.append("appointmentId", appointmentId);

      const res = await api.getLabOrders(`?${params.toString()}`);
      dispatch(setOrders({ data: res.data.data, total: res.data.total }));
    } catch (err) {
      dispatch(setOrdersError("Failed to fetch orders"));
    } finally {
      dispatch(setOrdersLoading(false));
    }
  };

  // Results
  const getResults = async () => {
    dispatch(setResultsLoading(true));
    dispatch(setResultsError(null));
    try {
      const { page, limit, search, startDate, endDate } = results.filters;
      const params = new URLSearchParams();
      params.append("page", page.toString());
      params.append("limit", limit.toString());
      if (search) params.append("search", search);
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);

      const res = await api.getResults(`?${params.toString()}`);
      dispatch(setResults({ data: res.data.data, total: res.data.total }));
    } catch (err) {
      dispatch(setResultsError("Failed to fetch results"));
    } finally {
      dispatch(setResultsLoading(false));
    }
  };

  return {
    // Orders
    orders: orders.data,
    status:orders.filters.status,
    search:orders?.filters.search,
    priority:orders.filters.priority,
    ordersPage: orders.filters.page,
    ordersLimit: orders.filters.limit,
    ordersTotal: orders.total,
    ordersLoading: orders.loading,
    ordersError: orders.error,
    setOrdersFilters: (val: Partial<typeof orders.filters>) =>
      dispatch(setOrdersFilters(val)),
    getOrders,

    // Results
    results: results.data,
    resultsPage: results.filters.page,
    resultsLimit: results.filters.limit,
    resultsTotal: results.total,
    resultsLoading: results.loading,
    resultsError: results.error,
    setResultsFilters: (val: Partial<typeof results.filters>) =>
      dispatch(setResultsFilters(val)),
    getResults,
  };
}

export default useOrder;
