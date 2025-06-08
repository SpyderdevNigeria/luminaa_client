import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import {
  setPatients,
  setPatientsLoading,
  setPatientsError,
  setPatientsPagination,

  setDoctors,
  setDoctorsLoading,
  setDoctorsError,
  setDoctorsPagination,
  setDoctorsSpecialty,

  setLabs,
  setLabsLoading,
  setLabsError,
  setLabsPagination,
  setLabsDepartment,
} from "../reducers/adminSlice";

interface AdminApiInterface {
  getPatients: (query: string) => Promise<{
    data: { data: any[]; total?: number; page?: number };
  }>;
  getDoctors: (query: string) => Promise<{
    data: { data: any[]; total?: number; page?: number };
  }>;
  getLabs: (query: string) => Promise<{
    data: { data: any[]; total?: number; page?: number };
  }>;
}

function useAdmin(api: AdminApiInterface) {
  const dispatch = useDispatch<AppDispatch>();
  const {
    patients,
    doctors,
    labs,
  } = useSelector((state: RootState) => state.admin);

  // Fetch Patients
  const getPatients = async () => {
    dispatch(setPatientsLoading(true));
    dispatch(setPatientsError(null));
    try {
      const params = new URLSearchParams();
      params.append("page", patients.page.toString());
      params.append("limit", patients.limit.toString());

      const res = await api.getPatients(`?${params.toString()}`);
      dispatch(setPatients({
        data: res.data.data,
        total: res.data.total ?? 0,
      }));
    } catch (err) {
      dispatch(setPatientsError("Failed to fetch patients"));
    } finally {
      dispatch(setPatientsLoading(false));
    }
  };

  // Fetch Doctors
  const getDoctors = async () => {
    dispatch(setDoctorsLoading(true));
    dispatch(setDoctorsError(null));
    try {
      const params = new URLSearchParams();
      params.append("page", doctors.page.toString());
      params.append("limit", doctors.limit.toString());
      if (doctors.specialty) params.append("specialty", doctors.specialty);

      const res = await api.getDoctors(`?${params.toString()}`);
      dispatch(setDoctors({
        data: res.data.data,
        total: res.data.total ?? 0,
      }));
    } catch (err) {
      dispatch(setDoctorsError("Failed to fetch doctors"));
    } finally {
      dispatch(setDoctorsLoading(false));
    }
  };

  // Fetch Labs
  const getLabs = async () => {
    dispatch(setLabsLoading(true));
    dispatch(setLabsError(null));
    try {
      const params = new URLSearchParams();
      params.append("page", labs.page.toString());
      params.append("limit", labs.limit.toString());
      if (labs.department) params.append("department", labs.department);

      const res = await api.getLabs(`?${params.toString()}`);
      dispatch(setLabs({
        data: res.data.data,
        total: res.data.total ?? 0,
      }));
    } catch (err) {
      dispatch(setLabsError("Failed to fetch labs"));
    } finally {
      dispatch(setLabsLoading(false));
    }
  };

  return {
    // Patients
    patients: patients.data,
    patientsPage: patients.page,
    patientsLimit: patients.limit,
    patientsTotal: patients.total,
    patientsLoading: patients.loading,
    patientsError: patients.error,
    setPatientsPage: (val: number) =>
      dispatch(setPatientsPagination({ page: val, limit: patients.limit })),
    setPatientsLimit: (val: number) =>
      dispatch(setPatientsPagination({ page: patients.page, limit: val })),
    getPatients,

    // Doctors
    doctors: doctors.data,
    doctorsPage: doctors.page,
    doctorsLimit: doctors.limit,
    doctorsTotal: doctors.total,
    doctorsLoading: doctors.loading,
    doctorsError: doctors.error,
    doctorSpecialty: doctors.specialty,
    setDoctorsPage: (val: number) =>
      dispatch(setDoctorsPagination({ page: val, limit: doctors.limit })),
    setDoctorsLimit: (val: number) =>
      dispatch(setDoctorsPagination({ page: doctors.page, limit: val })),
    setDoctorSpecialty: (val: string) => dispatch(setDoctorsSpecialty(val)),
    getDoctors,

    // Labs
    labs: labs.data,
    labsPage: labs.page,
    labsLimit: labs.limit,
    labsTotal: labs.total,
    labsLoading: labs.loading,
    labsError: labs.error,
    labDepartment: labs.department,
    setLabsPage: (val: number) =>
      dispatch(setLabsPagination({ page: val, limit: labs.limit })),
    setLabsLimit: (val: number) =>
      dispatch(setLabsPagination({ page: labs.page, limit: val })),
    setLabDepartment: (val: string) => dispatch(setLabsDepartment(val)),
    getLabs,
  };
}

export default useAdmin;
