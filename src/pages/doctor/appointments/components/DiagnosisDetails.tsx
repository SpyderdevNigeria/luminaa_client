import { useEffect, useState } from "react";
import moment from "moment";
import DiagnosisForm from "./medical/DiagnosisForm";
import doctorApi from "../../../../api/doctorApi";
import StatusBadge from "../../../../components/common/StatusBadge";
import MedicalReportModal from "../../../../components/modal/MedicalReportModal";
// import PaginationComponent from "../../../../components/common/PaginationComponent";
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

  const handleDelete = async (id: string) => {
    if (!id) return;
    if (window.confirm("Are you sure you want to delete this diagnosis?")) {
      try {
        await doctorApi.deleteDiagnosis(id);
        await fetchDiagnoses();
        setModalOpen(false);
        setSelectedDiagnosis(null);
      } catch (error) {
        console.error("Error deleting diagnosis:", error);
      }
    }
  };

  useEffect(() => {
    if (appointmentId) {
      fetchDiagnoses();
    } else {
      setLoading(false);
    }
  }, [appointmentId]);

  return (
    <div className="bg-white p-6">
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

          {!loading && diagnoses.length === 0 ? (
            <p className="text-gray-600 text-center mt-20">No diagnosis found for this appointment.</p>
          ) : (
            diagnoses.map((diagnosis) => (
              <div
                className="bg-white border rounded-lg flex flex-col md:flex-row md:items-center justify-between py-4 px-4 md:px-8 mb-4"
                key={diagnosis.id}
              >
                <div className="space-y-1 mb-2 md:mb-0 md:w-[300px] line-clamp-1">
                  <h3 className="text-sm md:text-base">{diagnosis.primaryDiagnosis}</h3>
                  <h4 className="text-xs font-[300]">
                    {moment(diagnosis.createdAt).format("MMMM D, YYYY")}
                  </h4>
                </div>

                <div className="text-xs font-[300] mb-2 md:mb-0  md:w-[300px] line-clamp-1">
                  {diagnosis.primaryDiagnosis || "Unknown"}
                </div>

                <div className="mb-2 md:mb-0">
                  <StatusBadge status={diagnosis.severity || "pending"} />
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    className="text-xs text-primary underline"
                    onClick={() => {
                      setSelectedDiagnosis(diagnosis);
                      setModalOpen(true);
                    }}
                  >
                    View
                  </button>
                  <button
                    className="text-xs text-yellow-600 underline"
                    onClick={() => {
                      setEditingDiagnosis(diagnosis);
                      setShowForm(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-xs text-red-600 underline"
                    onClick={() => handleDelete(diagnosis.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}

          {/* Modal */}
          {selectedDiagnosis && (
            <MedicalReportModal
              data={selectedDiagnosis}
              isModalOpen={isModalOpen}
              setModalOpen={setModalOpen}
            />
          )}

          {/* Optional Pagination if applicable */}
          {/* 
          <div className="mt-6">
            <PaginationComponent
              page={page}
              total={total ?? 0}
              limit={limit}
              totalPages={totalPages ?? 1}
              onPageChange={(newPage: number) => {
                if (setPage) setPage(newPage);
              }}
            />
          </div> 
          */}
        </>
      )}
    </div>
  );
};

export default DiagnosisDetails;
