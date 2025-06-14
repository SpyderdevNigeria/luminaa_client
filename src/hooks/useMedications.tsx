import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import {
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
} from "../reducers/medicationSlice";

function useMedications(api: any) {
  const dispatch = useDispatch<AppDispatch>();
  const { medications  } = useSelector((state: RootState) => state.medications);

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
      if (medications.requiresPrescription)
        params.append("requiresPrescription", medications.requiresPrescription);
      if (medications.manufacturer) params.append("manufacturer", medications.manufacturer);

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
      dispatch(setMedicationsPagination({ page: val, limit: medications.limit })),
    setMedicationsLimit: (val: number) =>
      dispatch(setMedicationsPagination({ page: medications.page, limit: val })),
    setMedicationSearch: (val: string) => dispatch(setMedicationsSearch(val)),
    setMedicationCategory: (val: string) => dispatch(setMedicationsCategory(val)),
    setMedicationDosageForm: (val: string) => dispatch(setMedicationsDosageForm(val)),
    setMedicationStatus: (val: string) => dispatch(setMedicationsStatus(val)),
    setMedicationRequiresPrescription: (val: string) =>
      dispatch(setMedicationsRequiresPrescription(val)),
    setMedicationManufacturer: (val: string) => dispatch(setMedicationsManufacturer(val)),

    getMedications,
  };
}

export default useMedications;
