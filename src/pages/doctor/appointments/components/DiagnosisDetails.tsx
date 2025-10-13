import { useEffect, useState } from "react";
import DiagnosisForm from "./medical/DiagnosisForm";
import doctorApi from "../../../../api/doctorApi";
import MedicalReportModal from "../../../../components/modal/DiagnosisReportModal";
import DiagnosisCard from "../../../../components/common/DiagnosisCard";
import ConfirmModal from "../../../../components/modal/ConfirmModal";

interface Diagnosis {
  id: string;
  primaryDiagnosis: string;
  symptoms: string;
  notes: string;
  severity: string;
  diagnosisCode: string;
  isConfirmed: boolean;
  additionalRecommendations: string;
  createdAt: string;
  diagnosis:string;
}

interface DiagnosisDetailsProps {
  appointmentId: string;
  handleBack: () => void;
}

const DiagnosisDetails = ({ appointmentId, handleBack }: DiagnosisDetailsProps) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingDiagnosis, setEditingDiagnosis] = useState<Diagnosis | null>(null);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<Diagnosis | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  // Confirm modal state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [onConfirm, setOnConfirm] = useState<() => void>(() => {});
  const [confirmLoading, setConfirmLoading] = useState(false);

  const fetchDiagnoses = async () => {
    setLoading(true);
    try {
      const response = await doctorApi.getDiagnosesAppointmentbyId(appointmentId);
      setDiagnoses(response?.data || []);
    } catch (error) {
      console.error("Error fetching diagnoses:", error);
      setDiagnoses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    setConfirmMessage("Are you sure you want to delete this diagnosis?");
    setOnConfirm(() => async () => {
      setConfirmLoading(true);
      try {
        await doctorApi.deleteDiagnosis(id);
        await fetchDiagnoses();
        setSelectedDiagnosis(null);
        setModalOpen(false);
      } catch (error) {
        console.error("Error deleting diagnosis:", error);
      } finally {
        setConfirmLoading(false);
        setConfirmOpen(false);
      }
    });
    setConfirmOpen(true);
  };

  useEffect(() => {
    if (appointmentId) {
      fetchDiagnoses();
    } else {
      setLoading(false);
    }
  }, [appointmentId]);

  return (
    <div className="bg-white  p-6">
      {showForm ? (
        <>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            {editingDiagnosis ? "Edit Diagnosis" : "Add Diagnosis"}
          </h2>
          <DiagnosisForm
            appointmentId={appointmentId}
            initialData={editingDiagnosis ?? undefined}
            onSuccess={() => {
              fetchDiagnoses();
              setShowForm(false);
              setEditingDiagnosis(null);
            }}
            setShowForm={() => {
              setShowForm(false);
              setEditingDiagnosis(null);
            }}
          />
        </>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={handleBack}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              ← Back
            </button>
            <button
              onClick={() => {
                setShowForm(true);
                setEditingDiagnosis(null);
              }}
              className="px-4 py-2 bg-primary text-white rounded-md text-sm"
            >
              Add Diagnosis
            </button>
          </div>
          <h4 className="text-xl my-2">Diagnoses</h4>

          {loading && (
            <p className="text-gray-600 text-center mt-20">
              Loading diagnoses...
            </p>
          )}

          {!loading && diagnoses.length === 0 ? (
            <p className="text-gray-600 text-center mt-20">
              No diagnosis found for this appointment.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-6 my-4">
              {diagnoses.map((diagnosis) => (
                <DiagnosisCard
                  key={diagnosis.id}
                  diagnosis={diagnosis}
                  onView={() => {
                    setSelectedDiagnosis(diagnosis);
                    setModalOpen(true);
                    console.log(diagnosis)
                  }}
                  onEdit={() => {
                    setEditingDiagnosis(diagnosis);
                    setShowForm(true);
                  }}
                  onDelete={() => handleDelete(diagnosis.id)}
                />
              ))}
            </div>
          )}

          {selectedDiagnosis && (
            <MedicalReportModal
              data={selectedDiagnosis}
              isModalOpen={isModalOpen}
              setModalOpen={setModalOpen}
            />
          )}

          <ConfirmModal
            open={confirmOpen}
            onClose={() => setConfirmOpen(false)}
            description={confirmMessage}
            onConfirm={onConfirm}
            loading={confirmLoading}
            confirmText="Yes, Delete"
          />
        </>
      )}
    </div>
  );
};

export default DiagnosisDetails;
