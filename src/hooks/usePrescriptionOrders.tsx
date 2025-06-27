import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import {
  setOrders,
  setFilters,
  setPage,
  setPaginationMeta,
} from "../reducers/prescriptionOrderSlice";

function usePrescriptionOrders(api: any) {
  const dispatch = useDispatch<AppDispatch>();
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [errorOrders, setErrorOrders] = useState("");

  type FilterType = {
    page?: number;
    limit?: number;
    status?: string;
    paymentStatus?: string;
    paymentMethod?: string;
    orderType?: string;
    dateFrom?: string;
    dateTo?: string;
    search?: string;
    patientId?: string;
    total?: number;
    totalPages?: number;
  };

  const {
    data: orders,
    filters: {
      page,
      limit = 10,
      status,
      paymentStatus,
      paymentMethod,
      orderType,
      dateFrom,
      dateTo,
      search,
      patientId,
      total,
      totalPages,
    },

  } = useSelector((state: RootState) => state.prescriptionOrders);

  const setFilter = (filter: Partial<FilterType>) => {
    dispatch(setFilters(filter));
  };

  const handleSetPage = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  const getPrescriptionOrders = async () => {
    setLoadingOrders(true);
    setErrorOrders("");

    try {
      const params = new URLSearchParams();
      if (status) params.append("status", status);
      if (paymentStatus) params.append("paymentStatus", paymentStatus);
      if (paymentMethod) params.append("paymentMethod", paymentMethod);
      if (orderType) params.append("orderType", orderType);
      if (dateFrom) params.append("dateFrom", dateFrom);
      if (dateTo) params.append("dateTo", dateTo);
      if (search) params.append("search", search);
      if (patientId) params.append("patientId", patientId);
      if (page) params.append("page", page.toString());
      if (limit) params.append("limit", limit.toString());

      const query = `?${params.toString()}`;
      const res = await api.getPrescriptionOrders(query);

      if (res?.data?.data) {
        dispatch(setOrders(res?.data?.data));
        dispatch(
          setPaginationMeta({
            total: res.data.total || 0,
            limit: res.data.limit || 10,
            totalPages: res.data.totalPages || 1,
            page: res.data.page || 1,
          })
        );
      }else {
             dispatch(setOrders(res.data));
        dispatch(
          setPaginationMeta({
            total: res.data.total || 0,
            limit: res.data.limit || 10,
            totalPages: res.data.totalPages || 1,
            page: res.data.page || 1,
          })
        );
      }
    } catch (error) {
      console.error("Error fetching prescription orders:", error);
      setErrorOrders("Failed to fetch prescription orders");
    } finally {
      setLoadingOrders(false);
    }
  };

  return {
    orders,
    loadingOrders,
    errorOrders,
    page,
    total,
    limit,
    totalPages,
    setFilter,
    handleSetPage,
    getPrescriptionOrders,
  };
}

export default usePrescriptionOrders;
