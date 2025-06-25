import { useEffect } from "react";
import PharmacistApi from "../../../api/pharmacistApi";
import MedicationCard from "../../../components/common/MedicationCard";
import HeaderTab from "../../../components/common/HeaderTab";
import PaginationComponent from "../../../components/common/PaginationComponent";
import useMedications from "../../../hooks/useMedications";
import {
  medicationCategoryOptions,
  medicationDosageFormOptions,
  medicationManufacturerOptions,
  medicationStatusOptions,
} from "../../../utils/dashboardUtils";
import routeLinks from "../../../utils/routes";
import { useNavigate } from "react-router-dom";

const PharmacistMedications = () => {
  const {
    medications,
    medicationsTotalPages,
    medicationsPage,
    medicationsLimit,
    medicationsTotal,
    medicationsLoading,
    medicationSearch,
    medicationCategory,
    medicationDosageForm,
    medicationStatus,
    medicationRequiresPrescription,
    medicationManufacturer,
    setMedicationsPage,
    setMedicationSearch,
    setMedicationCategory,
    setMedicationDosageForm,
    setMedicationStatus,
    setMedicationRequiresPrescription,
    setMedicationManufacturer,
    getMedications,
  } = useMedications(PharmacistApi);
  const navigate = useNavigate()
  useEffect(() => {
    getMedications();
  }, [
    medicationSearch,
    medicationCategory,
    medicationDosageForm,
    medicationStatus,
    medicationRequiresPrescription,
    medicationManufacturer,
    medicationsPage,
  ]);

  return (
    <div className="bg-white p-6 min-h-screen">
      <h2 className="text-xl font-semibold mb-4">All Medications</h2>

      <HeaderTab
        title=""
        showSearch={true}
        onSearchChange={setMedicationSearch}
        dropdowns={[
          {
            label: "Status",
            options: medicationStatusOptions,
            value: medicationStatus,
            onChange: setMedicationStatus,
          },
          {
            label: "Category",
            options: medicationCategoryOptions,
            value: medicationCategory,
            onChange: setMedicationCategory,
          },
          {
            label: "Dosage Form",
            options: medicationDosageFormOptions,
            value: medicationDosageForm,
            onChange: setMedicationDosageForm,
          },
          {
            label: "Requires Rx",
            options: ["true", "false"],
            value: medicationRequiresPrescription,
            onChange: setMedicationRequiresPrescription,
          },
          {
            label: "Manufacturer",
            options: medicationManufacturerOptions,
            value: medicationManufacturer,
            onChange: setMedicationManufacturer,
          },
        ]}
      />

      {medicationsLoading ? (
        <p className="text-center mt-10 text-gray-500">Loading medications...</p>
      ) : medications.length === 0 ? (
        <p className="text-center mt-10 text-gray-500">No medications found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 mt-6">
          {medications.map((med) => (
            <MedicationCard key={med.id} medication={med} buttonText={'View Inventory'}onAddPrescription={()=>{navigate(routeLinks?.pharmacist?.pharmacistInventory+'/medication/'+med.id)}}   />
          ))}
        </div>
      )}

      <PaginationComponent
        page={medicationsPage}
        total={medicationsTotal}
        limit={medicationsLimit}
        totalPages={medicationsTotalPages ?? 1}
        onPageChange={setMedicationsPage}
      />
    </div>
  );
};

export default PharmacistMedications;
