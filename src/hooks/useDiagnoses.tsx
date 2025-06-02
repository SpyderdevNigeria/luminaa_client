import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import {
  setDiagnoses,
  setDiagnosisPage,
  setDiagnosisLimit,
  setDiagnosisTotal,
  setDiagnosisTotalPages,
  setDiagnosisLoading,
  setDiagnosisError,
  setAppointmentId,
  setDiagnosisSearch,
  setDiagnosisSeverity,
  setDiagnosisIsConfirmed,
} from "../reducers/DiagnosisSlice";

interface ApiInterface {
  getDiagnoses: (query: string) => Promise<{
    data: {
      data: Diagnosis[];
      total?: number;
      totalPages?: number;
      page?: number;
    };
  }>;
}

interface Diagnosis {
  _id: string;
  primaryDiagnosis: string;
  createdAt: string;
  severity: string;
  isConfirmed: boolean;
  appointment?: {
    doctor?: {
      user?: {
        firstName: string;
        lastName: string;
      };
    };
  };
}

function useDiagnoses(api: ApiInterface) {
  const dispatch = useDispatch<AppDispatch>();

  const {
    diagnoses,
    page,
    limit,
    total,
    totalPages,
    loading,
    error,
    appointmentId,
    search,
    severity,
    isConfirmed,
  } = useSelector((state: RootState) => state.diagnosis);

  const getDiagnoses = async (): Promise<void> => {
    dispatch(setDiagnosisLoading(true));
    dispatch(setDiagnosisError(""));

    try {
      const params = new URLSearchParams();
      if (appointmentId) params.append("appointmentId", appointmentId);
      if (search) params.append("search", search);
      if (severity) params.append("severity", severity);
      if (typeof isConfirmed === "boolean" && isConfirmed) {
        params.append("isConfirmed", isConfirmed.toString());
      }
      params.append("page", page.toString());
      params.append("limit", limit.toString());

      const query = `?${params.toString()}`;
      const res = await api.getDiagnoses(query);

      if (res?.data?.data) {
        dispatch(setDiagnoses(res.data.data));
        dispatch(setDiagnosisTotal(res.data.total ?? 0));
        dispatch(setDiagnosisTotalPages(res.data.totalPages ?? 1));
        dispatch(setDiagnosisPage(res.data.page ?? 1));
      }
    } catch (err) {
      console.error("Error fetching diagnoses:", err);
      dispatch(setDiagnosisError("Failed to fetch diagnoses"));
    } finally {
      dispatch(setDiagnosisLoading(false));
    }
  };

  return {
    diagnoses,
    page,
    limit,
    total,
    totalPages,
    loading,
    error,
    appointmentId,
    search,
    severity,
    isConfirmed,

    setPage: (val: number) => dispatch(setDiagnosisPage(val)),
    setLimit: (val: number) => dispatch(setDiagnosisLimit(val)),
    setAppointmentId: (val: string) => dispatch(setAppointmentId(val)),
    setSearch: (val: string) => dispatch(setDiagnosisSearch(val)),
    setSeverity: (val: string) => dispatch(setDiagnosisSeverity(val)),
    setIsConfirmed: (val: boolean) => dispatch(setDiagnosisIsConfirmed(val)),

    getDiagnoses,
  };
}

export default useDiagnoses;
