import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { IPrescription } from "../types/Interfaces";
import {
  setPrescriptions,
  setPrescriptionPage,
  setPrescriptionLimit,
  setPrescriptionTotal,
  setPrescriptionTotalPages,
  setPrescriptionLoading,
  setPrescriptionError,
  setPrescriptionAppointmentId,
  setPrescriptionSearch,
  setPrescriptionPatientId,
  setPrescriptionIsRefillable,
  setPrescriptionStatus,
} from "../reducers/prescriptionSlice";

interface ApiInterface {
  getPrescriptions: (query: string) => Promise<{
    data: {
      data: IPrescription[];
      total?: number;
      totalPages?: number;
      page?: number;
    };
  }>;
}



function usePrescriptions(api: ApiInterface) {
  const dispatch = useDispatch<AppDispatch>();

  const {
    prescriptions,
    page,
    limit,
    total,
    totalPages,
    loading,
    error,
    appointmentId,
    status,
    patientId,
    isRefillable,
    search,
  } = useSelector((state: RootState) => state.prescriptions);

  const getPrescriptions = async () => {
    dispatch(setPrescriptionLoading(true));
    dispatch(setPrescriptionError(""));

    try {
      const params = new URLSearchParams();
      if (appointmentId) params.append("appointmentId", appointmentId);
      if (search) params.append("search", search);
      if (patientId) params.append("patientId", patientId);
       if (isRefillable) params.append("isRefillable", isRefillable);
       if (status) params.append("status", status);
      params.append("page", page.toString());
      params.append("limit", limit.toString());

      const query = `?${params.toString()}`;
      const res = await api.getPrescriptions(query);

      if (res?.data?.data) {
        dispatch(setPrescriptions(res.data.data));
        dispatch(setPrescriptionTotal(res.data.total ?? 0));
        dispatch(setPrescriptionTotalPages(res.data.totalPages ?? 1));
        dispatch(setPrescriptionPage(res.data.page ?? 1));
      }
    } catch (err) {
      console.error("Error fetching prescriptions:", err);
      dispatch(setPrescriptionError("Failed to fetch prescriptions"));
    } finally {
      dispatch(setPrescriptionLoading(false));
    }
  };

  return {
    prescriptions,
    page,
    limit,
    total,
    totalPages,
    loading,
    error,
    appointmentId,
    search,
       status,
    patientId,
    isRefillable,
    setPage: (val: number) => dispatch(setPrescriptionPage(val)),
    setLimit: (val: number) => dispatch(setPrescriptionLimit(val)),
    setAppointmentId: (val: string) => dispatch(setPrescriptionAppointmentId(val)),
    setPrescriptionIsRefillable: (val: string | null ) => dispatch(setPrescriptionIsRefillable(val)),
    setPrescriptionPatientId: (val: string) => dispatch(setPrescriptionPatientId(val)),
    setPrescriptionStatus: (val: string | null) => dispatch(setPrescriptionStatus(val)),
    setSearch: (val: string) => dispatch(setPrescriptionSearch(val)),

    getPrescriptions,
  };
}

export default usePrescriptions;
