import { useEffect, useState } from "react";
import PrescriptionsForm from "./medical/PrescriptionsForm";
import doctorApi from "../../../../api/doctorApi";
import PrescriptionReportModal from "../../../../components/modal/PrescriptionReportModal";
import { IPrescription, IMedication } from "../../../../types/Interfaces";
import PrescriptionCard from "../../../../components/common/PrescriptionCard";
import MedicationCard from "../../../../components/common/MedicationCard";
import HeaderTab from "../../../../components/common/HeaderTab";
import useMedications from "../../../../hooks/useMedications";
import {
  medicationCategoryOptions,
  medicationDosageFormOptions,
  medicationManufacturerOptions,
  medicationStatusOptions,
} from "../../../../utils/dashboardUtils";
import PaginationComponent from "../../../../components/common/PaginationComponent";

interface PrescriptionDetailsProps {
  appointmentId: string;
  handleBack: () => void;
}

const PrescriptionDetails = ({ appointmentId, handleBack }: PrescriptionDetailsProps) => {
  const [prescriptions, setPrescriptions] = useState<IPrescription[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingPrescription, setEditingPrescription] = useState<IPrescription | null>(null);
  const [selectedPrescription, setSelectedPrescription] = useState<IPrescription | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"prescriptions" | "medications">("prescriptions");
  const [selectedMedicationId, setSelectedMedicationId] = useState<string | null>(null);

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
  } = useMedications(doctorApi) as {
    medications: IMedication[];
    medicationsTotalPages: number;
    medicationsPage: number;
    medicationsLimit: number;
    medicationsTotal: number;
    medicationsLoading: boolean;
    medicationSearch: string;
    medicationCategory: string;
    medicationDosageForm: string;
    medicationStatus: string;
    medicationRequiresPrescription: string;
    medicationManufacturer: string;
    setMedicationsPage: (page: number) => void;
    setMedicationSearch: (search: string) => void;
    setMedicationCategory: (category: string) => void;
    setMedicationDosageForm: (dosageForm: string) => void;
    setMedicationStatus: (status: string) => void;
    setMedicationRequiresPrescription: (requires: string) => void;
    setMedicationManufacturer: (manufacturer: string) => void;
    getMedications: () => void;
  };

  const fetchPrescriptions = async () => {
    setLoading(true);
    try {
      const response = await doctorApi.getPrescriptionsAppointmentbyId(appointmentId);
      setPrescriptions(response?.data || []);
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
      setPrescriptions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!id) return;
    if (window.confirm("Are you sure you want to delete this prescription?")) {
      try {
        await doctorApi.deletePrescriptions(id);
        await fetchPrescriptions();
        setModalOpen(false);
        setSelectedPrescription(null);
      } catch (error) {
        console.error("Error deleting prescription:", error);
      }
    }
  };

  const handleSelectMedication = async (med: IMedication) => {
    const confirm = window.confirm(`Do you want to add ${med.name} as a prescription for the patient?`);
    if (!confirm) return;

    setSelectedMedicationId(med.id);
    setShowForm(true);
    setActiveTab("prescriptions");
  };

  useEffect(() => {
    if (appointmentId) {
      fetchPrescriptions();
    } else {
      setLoading(false);
    }
  }, [appointmentId]);

  useEffect(() => {
    if (activeTab === "medications") getMedications();
  }, [activeTab, medicationSearch, medicationsPage]);

  return (
    <div className="bg-white">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handleBack}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Back
        </button>
        <div className="flex gap-2">
          <button
            className={`px-4 py-2 rounded-md text-sm ${
              activeTab === "prescriptions" ? "bg-primary text-white" : "bg-gray-100"
            }`}
            onClick={() => {
              setActiveTab("prescriptions");
              setSelectedMedicationId(null);
            }}
          >
            Prescriptions
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm ${
              activeTab === "medications" ? "bg-primary text-white" : "bg-gray-100"
            }`}
            onClick={() => {
              setActiveTab("medications");
              setShowForm(false);
              setEditingPrescription(null);
              setSelectedMedicationId(null);
            }}
          >
            Add From Medications
          </button>
        </div>
      </div>

      {activeTab === "prescriptions" ? (
        showForm ? (
          <PrescriptionsForm
            appointmentId={appointmentId}
            initialData={
              editingPrescription
                ? {
                    ...editingPrescription,
                    isRefillable: (editingPrescription as any).isRefillable ?? false,
                  }
                : undefined
            }
            medicationId={!editingPrescription ? selectedMedicationId ?? undefined : undefined}
            onSuccess={() => {
              fetchPrescriptions();
              setShowForm(false);
              setEditingPrescription(null);
              setSelectedMedicationId(null);
            }}
            setShowForm={() => {
              setShowForm(false);
              setEditingPrescription(null);
              setSelectedMedicationId(null);
            }}
          />
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xl">Prescriptions</h4>
            </div>

            {loading ? (
              <p className="text-center text-gray-600 mt-20">Loading prescriptions...</p>
            ) : prescriptions.length === 0 ? (
              <p className="text-center text-gray-600 mt-20">No prescriptions found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                {prescriptions.map((prescription) => (
                  <PrescriptionCard
                    key={prescription._id}
                    prescription={prescription}
                    onView={() => {
                      setSelectedPrescription(prescription);
                      setModalOpen(true);
                    }}
                    onEdit={() => {
                      setEditingPrescription(prescription);
                      setShowForm(true);
                    }}
                    onDelete={() => handleDelete(prescription.id)}
                  />
                ))}
              </div>
            )}

            {selectedPrescription && (
              <PrescriptionReportModal
                data={selectedPrescription}
                isModalOpen={isModalOpen}
                setModalOpen={setModalOpen}
              />
            )}
          </>
        )
      ) : (
        <>
          <section>
            <HeaderTab
              title=""
              showSearch={true}
              onSearchChange={setMedicationSearch}
              dropdowns={[
                { label: "Status", options: medicationStatusOptions, value: medicationStatus, onChange: setMedicationStatus },
                { label: "Category", options: medicationCategoryOptions, value: medicationCategory, onChange: setMedicationCategory },
                { label: "Dosage Form", options: medicationDosageFormOptions, value: medicationDosageForm, onChange: setMedicationDosageForm },
                { label: "Requires Rx", options: ["true", "false"], value: medicationRequiresPrescription, onChange: setMedicationRequiresPrescription },
                { label: "Manufacturer", options: medicationManufacturerOptions, value: medicationManufacturer, onChange: setMedicationManufacturer },
              ]}
            />

            {medicationsLoading ? (
              <p className="text-center mt-10 text-gray-500">Loading medications...</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                {medications.map((med) => (
                  <MedicationCard
                    key={med?.id}
                    medication={med}
                    onAddPrescription={() => handleSelectMedication(med)}
                  />
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
          </section>
        </>
      )}
    </div>
  );
};

export default PrescriptionDetails;
