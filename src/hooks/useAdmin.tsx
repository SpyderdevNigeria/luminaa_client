import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import {
  setUsers,
  setUsersLoading,
  setUsersError,
  setUsersPagination,
  setUsersSearch,
  setUsersIsActive,
  setUsersIsDisabled,
  setUsersRole,

  setPatients,
  setPatientsLoading,
  setPatientsError,
  setPatientsPagination,
  setPatientsSearch,
  setPatientsGender,
  setPatientsCity,
  setPatientsIsBioDataCompleted,
  setPatientsIsMedicalHistoryCompleted,

  setDoctors,
  setDoctorsLoading,
  setDoctorsError,
  setDoctorsPagination,
  setDoctorsSpecialty,
  setDoctorsStatus,
  setDoctorsSearch,
  setLabs,
  setLabsLoading,
  setLabsError,
  setLabsPagination,
  setLabsDepartment,
  setLabsSearch,
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



function useAdmin(api: any) {
  const dispatch = useDispatch<AppDispatch>();
  const { users, patients, doctors, labs, pharmacists, medications } = useSelector(
    (state: RootState) => state.admin
  );

  // Fetch Users
  const getUsers = async () => {
    dispatch(setUsersLoading(true));
    dispatch(setUsersError(null));
    try {
      const params = new URLSearchParams();
      params.append("page", users.page.toString());
      params.append("limit", users.limit.toString());
      if (users.role) params.append("role", users.role);
      if (users.isactive) params.append("isActive", users.isactive);
      if (users.isdisabled) params.append("isDisabled", users.isdisabled);
      if (users.search) params.append("search", users.search);

      const res = await api.getUsers(`?${params.toString()}`);
      dispatch(setUsers({ data: res.data, total: res.total ?? 0 }));
    } catch (err) {
      dispatch(setUsersError("Failed to fetch users"));
    } finally {
      dispatch(setUsersLoading(false));
    }
  };

  // Fetch Patients
  const getPatients = async () => {
    dispatch(setPatientsLoading(true));
    dispatch(setPatientsError(null));
    try {
      const params = new URLSearchParams();
      params.append("page", patients.page.toString());
      params.append("limit", patients.limit.toString());
      if (patients.search) params.append("search", patients.search);
      if (patients.gender) params.append("gender", patients.gender);
      if (patients.city) params.append("city", patients.city);
      if (patients.isBioDataCompleted) params.append("isBioDataCompleted", patients.isBioDataCompleted);
      if (patients.isMedicalHistoryCompleted) params.append("isMedicalHistoryCompleted", patients.isMedicalHistoryCompleted);

      const res = await api.getPatients(`?${params.toString()}`);
      dispatch(setPatients({ data: res.data.data, total: res.data.total ?? 0 }));
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
      if (doctors.search) params.append("search", doctors.search);
      if (doctors.specialty) params.append("specialty", doctors.specialty);
      if (doctors.status) params.append("status", doctors.status);

      const res = await api.getDoctors(`?${params.toString()}`);
      dispatch(setDoctors({ data: res.data.data, total: res.data.total ?? 0 }));
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
      if (labs.search) params.append("search", labs.search);
      if (labs.department) params.append("department", labs.department);

      const res = await api.getLabs(`?${params.toString()}`);
      dispatch(setLabs({ data: res.data.data, total: res.data.total ?? 0 }));
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
      dispatch(setPharmacists({ data: res.data.data, total: res.data.total ?? 0 }));
    } catch (err) {
      dispatch(setPharmacistsError("Failed to fetch pharmacists"));
    } finally {
      dispatch(setPharmacistsLoading(false));
    }
  };

  // Fetch Medications
  const getMedications = async () => {
    dispatch(setMedicationsLoading(true));
    dispatch(setMedicationsError(null));
    try {
      const params = new URLSearchParams();
      params.append("page", medications.page.toString());
      params.append("limit", medications.limit.toString());
      if (medications.search) params.append("search", medications.search);
      if (medications.category) params.append("category", medications.category);
      if (medications.dosageForm) params.append("dosageForm", medications.dosageForm);
      if (medications.status) params.append("status", medications.status);
      if (medications.requiresPrescription) params.append("requiresPrescription", medications.requiresPrescription);
      if (medications.manufacturer) params.append("manufacturer", medications.manufacturer);

      const res = await api.getMedications(`?${params.toString()}`);
      dispatch(setMedications({ data: res.data.data, total: res.data.total ?? 0 }));
    } catch (err) {
      dispatch(setMedicationsError("Failed to fetch medications"));
    } finally {
      dispatch(setMedicationsLoading(false));
    }
  };

  return {
    // Users
    users: users.data,
    usersPage: users.page,
    usersLimit: users.limit,
    usersTotal: users.total,
    usersLoading: users.loading,
    usersError: users.error,
    usersSearch: users.search,
    usersRole: users.role,
    usersIsDisabled: users.isdisabled,
    usersIsActive: users.isactive,
    setUsersPage: (val: number) => dispatch(setUsersPagination({ page: val, limit: users.limit })),
    setUsersLimit: (val: number) => dispatch(setUsersPagination({ page: users.page, limit: val })),
    getUsers,
    setUsersSearch: (val: string) => dispatch(setUsersSearch(val)),
    setUsersIsDisabled: (val: string) => dispatch(setUsersIsDisabled(val)),
    setUsersIsActive: (val: string) => dispatch(setUsersIsActive(val)),
    setUsersRole: (val: string) => dispatch(setUsersRole(val)),

    // Patients
    patients: patients.data,
    patientsPage: patients.page,
    patientsLimit: patients.limit,
    patientsTotal: patients.total,
    patientsLoading: patients.loading,
    patientsError: patients.error,
    patientsSearch: patients.search,
    patientsGender: patients.gender,
    patientsCity: patients.city,
    isBioDataCompleted: patients.isBioDataCompleted,
    isMedicalHistoryCompleted: patients.isMedicalHistoryCompleted,
    setPatientsPage: (val: number) => dispatch(setPatientsPagination({ page: val, limit: patients.limit })),
    setPatientsLimit: (val: number) => dispatch(setPatientsPagination({ page: patients.page, limit: val })),
    setPatientsSearch: (val: string) => dispatch(setPatientsSearch(val)),
    setPatientsGender: (val: string) => dispatch(setPatientsGender(val)),
    setPatientsCity: (val: string) => dispatch(setPatientsCity(val)),
    setPatientsIsBioDataCompleted: (val: string) => dispatch(setPatientsIsBioDataCompleted(val)),
    setPatientsIsMedicalHistoryCompleted: (val: string) => dispatch(setPatientsIsMedicalHistoryCompleted(val)),
    getPatients,

    // Doctors
    doctors: doctors.data,
    doctorsPage: doctors.page,
    doctorsLimit: doctors.limit,
    doctorsTotal: doctors.total,
    doctorsLoading: doctors.loading,
    doctorsError: doctors.error,
    doctorsSpecialty: doctors.specialty,
    doctorsStatus: doctors.status,
    doctorsSearch: doctors.search,
    setDoctorsSearch: (val: string) => dispatch(setDoctorsSearch(val)),
    setDoctorsPage: (val: number) => dispatch(setDoctorsPagination({ page: val, limit: doctors.limit })),
    setDoctorsLimit: (val: number) => dispatch(setDoctorsPagination({ page: doctors.page, limit: val })),
    setDoctorsSpecialty: (val: string) => dispatch(setDoctorsSpecialty(val)),
    setDoctorsStatus: (val: string) => dispatch(setDoctorsStatus(val)),
    getDoctors,

    // Labs
    labs: labs.data,
    labsPage: labs.page,
    labsLimit: labs.limit,
    labsTotal: labs.total,
    labsLoading: labs.loading,
    labsError: labs.error,
    labsDepartment: labs.department,
    labsSearch: labs.search,
    setLabsSearch: (val: string) => dispatch(setLabsSearch(val)),
    setLabsPage: (val: number) => dispatch(setLabsPagination({ page: val, limit: labs.limit })),
    setLabsLimit: (val: number) => dispatch(setLabsPagination({ page: labs.page, limit: val })),
    setLabsDepartment: (val: string) => dispatch(setLabsDepartment(val)),
    getLabs,

    // Pharmacists
    pharmacists: pharmacists.data,
    pharmacistsPage: pharmacists.page,
    pharmacistsLimit: pharmacists.limit,
    pharmacistsTotal: pharmacists.total,
    pharmacistsLoading: pharmacists.loading,
    pharmacistsError: pharmacists.error,
    pharmacistsSearch: pharmacists.search,
    setPharmacistsPage: (val: number) => dispatch(setPharmacistsPagination({ page: val, limit: pharmacists.limit })),
    setPharmacistsLimit: (val: number) => dispatch(setPharmacistsPagination({ page: pharmacists.page, limit: val })),
    setPharmacistsSearch: (val: string) => dispatch(setPharmacistsSearch(val)),
    getPharmacists,

    // Medications
    medications: medications.data,
    medicationsPage: medications.page,
    medicationsLimit: medications.limit,
    medicationsTotal: medications.total,
    medicationsLoading: medications.loading,
    medicationsError: medications.error,
    medicationsSearch: medications.search,
    medicationsCategory: medications.category,
    medicationsDosageForm: medications.dosageForm,
    medicationsStatus: medications.status,
    medicationsRequiresPrescription: medications.requiresPrescription,
    medicationsManufacturer: medications.manufacturer,
    setMedicationsPage: (val: number) => dispatch(setMedicationsPagination({ page: val, limit: medications.limit })),
    setMedicationsLimit: (val: number) => dispatch(setMedicationsPagination({ page: medications.page, limit: val })),
    setMedicationsSearch: (val: string) => dispatch(setMedicationsSearch(val)),
    setMedicationsCategory: (val: string) => dispatch(setMedicationsCategory(val)),
    setMedicationsDosageForm: (val: string) => dispatch(setMedicationsDosageForm(val)),
    setMedicationsStatus: (val: string) => dispatch(setMedicationsStatus(val)),
    setMedicationsRequiresPrescription: (val: string) => dispatch(setMedicationsRequiresPrescription(val)),
    setMedicationsManufacturer: (val: string) => dispatch(setMedicationsManufacturer(val)),
    getMedications,
  };
}

export default useAdmin;
