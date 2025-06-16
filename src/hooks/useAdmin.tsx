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
  setDoctorsStatus,
  setLabs,
  setLabsLoading,
  setLabsError,
  setLabsPagination,
  setLabsDepartment,
  setPharmacists,
  setPharmacistsLoading,
  setPharmacistsError,
  setPharmacistsPagination,
  setPharmacistsSearch,
  setMedications,
  setMedicationsLoading,
  setMedicationsError,
  setMedicationsPagination,
  setMedicationsSearch,
  setMedicationsCategory,
  setMedicationsDosageForm,
  setMedicationsStatus,
  setMedicationsRequiresPrescription,
  setMedicationsManufacturer,
} from "../reducers/adminSlice";
interface AdminApiInterface {
  getPatients: (
    query: string
  ) => Promise<{ data: { data: any[]; total?: number; page?: number } }>;
  getDoctors: (
    query: string
  ) => Promise<{ data: { data: any[]; total?: number; page?: number } }>;
  getLabs: (
    query: string
  ) => Promise<{ data: { data: any[]; total?: number; page?: number } }>;
  getPharmacists: (
    query: string
  ) => Promise<{ data: { data: any[]; total?: number; page?: number } }>;
  getMedications: (
    query: string
  ) => Promise<{ data: { data: any[]; total?: number; page?: number } }>;
}

function useAdmin(api: AdminApiInterface) {
  const dispatch = useDispatch<AppDispatch>();
  const { patients, doctors, labs, pharmacists, medications } = useSelector(
    (state: RootState) => state.admin
  );

  // Fetch Patients
  const getPatients = async () => {
    dispatch(setPatientsLoading(true));
    dispatch(setPatientsError(null));
    try {
      const params = new URLSearchParams();
      params.append("page", patients.page.toString());
      params.append("limit", patients.limit.toString());

      const res = await api.getPatients(`?${params.toString()}`);
      dispatch(
        setPatients({
          data: res.data.data,
          total: res.data.total ?? 0,
        })
      );
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
      if (doctors.status) params.append("status", doctors.status);
      const res = await api.getDoctors(`?${params.toString()}`);
      dispatch(
        setDoctors({
          data: res.data.data,
          total: res.data.total ?? 0,
        })
      );
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
      dispatch(
        setLabs({
          data: res.data.data,
          total: res.data.total ?? 0,
        })
      );
    } catch (err) {
      dispatch(setLabsError("Failed to fetch labs"));
    } finally {
      dispatch(setLabsLoading(false));
    }
  };

  // Fetch Pharmacists
  const getPharmacists = async () => {
    dispatch(setPharmacistsLoading(true));
    dispatch(setPharmacistsError(null));
    try {
      const params = new URLSearchParams();
      params.append("page", pharmacists.page.toString());
      params.append("limit", pharmacists.limit.toString());
      if (pharmacists.search) params.append("search", pharmacists.search);

      const res = await api.getPharmacists(`?${params.toString()}`);
      dispatch(
        setPharmacists({
          data: res.data.data,
          total: res.data.total ?? 0,
        })
      );
    } catch (err) {
      dispatch(setPharmacistsError("Failed to fetch pharmacists"));
    } finally {
      dispatch(setPharmacistsLoading(false));
    }
  };
  const getMedications = async () => {
    dispatch(setMedicationsLoading(true));
    dispatch(setMedicationsError(null));
    try {
      const params = new URLSearchParams();
      params.append("page", medications.page.toString());
      params.append("limit", medications.limit.toString());
      if (medications.search) params.append("search", medications.search);
      if (medications.category) params.append("category", medications.category);
      if (medications.dosageForm)
        params.append("dosageForm", medications.dosageForm);
      if (medications.status) params.append("status", medications.status);
      if (medications.requiresPrescription)
        params.append("requiresPrescription", medications.requiresPrescription);
      if (medications.manufacturer)
        params.append("manufacturer", medications.manufacturer);

      const res = await api.getMedications(`?${params.toString()}`);
      dispatch(
        setMedications({
          data: res.data.data,
          total: res.data.total ?? 0,
        })
      );
    } catch (err) {
      dispatch(setMedicationsError("Failed to fetch medications"));
    } finally {
      dispatch(setMedicationsLoading(false));
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
    doctorsStatus: doctors.status,
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
    setDoctorsStatus:(val:string) => dispatch(setDoctorsStatus(val)),
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

    // Pharmacists
    pharmacists: pharmacists.data,
    pharmacistsPage: pharmacists.page,
    pharmacistsLimit: pharmacists.limit,
    pharmacistsTotal: pharmacists.total,
    pharmacistsLoading: pharmacists.loading,
    pharmacistsError: pharmacists.error,
    pharmacistSearch: pharmacists.search,
    setPharmacistsPage: (val: number) =>
      dispatch(
        setPharmacistsPagination({ page: val, limit: pharmacists.limit })
      ),
    setPharmacistsLimit: (val: number) =>
      dispatch(
        setPharmacistsPagination({ page: pharmacists.page, limit: val })
      ),
    setPharmacistSearch: (val: string) => dispatch(setPharmacistsSearch(val)),
    getPharmacists,

    // Medications
    medications: medications.data,
    medicationsPage: medications.page,
    medicationsLimit: medications.limit,
    medicationsTotal: medications.total,
    medicationsLoading: medications.loading,
    medicationsError: medications.error,
    medicationSearch: medications.search,
    medicationCategory: medications.category,
    medicationDosageForm: medications.dosageForm,
    medicationStatus: medications.status,
    medicationRequiresPrescription: medications.requiresPrescription,
    medicationManufacturer: medications.manufacturer,

    setMedicationsPage: (val: number) =>
      dispatch(
        setMedicationsPagination({ page: val, limit: medications.limit })
      ),
    setMedicationsLimit: (val: number) =>
      dispatch(
        setMedicationsPagination({ page: medications.page, limit: val })
      ),
    setMedicationSearch: (val: string) => dispatch(setMedicationsSearch(val)),
    setMedicationCategory: (val: string) =>
      dispatch(setMedicationsCategory(val)),
    setMedicationDosageForm: (val: string) =>
      dispatch(setMedicationsDosageForm(val)),
    setMedicationStatus: (val: string) => dispatch(setMedicationsStatus(val)),
    setMedicationRequiresPrescription: (val: string) =>
      dispatch(setMedicationsRequiresPrescription(val)),
    setMedicationManufacturer: (val: string) =>
      dispatch(setMedicationsManufacturer(val)),

    getMedications,
  };
}

export default useAdmin;
