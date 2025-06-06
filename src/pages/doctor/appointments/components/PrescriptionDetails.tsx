import { useEffect, useState } from "react";
import moment from "moment";
import PrescriptionsForm from "./medical/PrescriptionsForm";
import doctorApi from "../../../../api/doctorApi";
import StatusBadge from "../../../../components/common/StatusBadge";
import PrescriptionReportModal from "../../../../components/modal/PrescriptionReportModal";
import { IPrescription } from "../../../../types/Interfaces";
// import PaginationComponent from "../../../../components/common/PaginationComponent";


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

  useEffect(() => {
    if (appointmentId) {
      fetchPrescriptions();
    } else {
      setLoading(false);
    }
  }, [appointmentId]);

  return (
    <div className="bg-white p-6">
      {showForm ? (
        <>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            {editingPrescription ? "Edit Prescription" : "Add Prescription"}
          </h2>
          <PrescriptionsForm
            appointmentId={appointmentId}
            initialData={editingPrescription
              ? {
                  ...editingPrescription,
                  isRefillable: (editingPrescription as any).isRefillable ?? false,
                }
              : undefined}
            onSuccess={() => {
              fetchPrescriptions();
              setShowForm(false);
              setEditingPrescription(null);
            }}
            setShowForm={() => {
              setShowForm(false);
              setEditingPrescription(null);
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
                setEditingPrescription(null);
              }}
              className="px-4 py-2 bg-primary text-white rounded-md text-sm"
            >
              Add Prescription
            </button>
          </div>
          <h4 className="text-xl my-2">Prescriptions</h4>

          {loading ? (
            <p className="text-gray-600 text-center mt-20">Loading prescriptions...</p>
          ) : null}
          {!loading && prescriptions.length === 0 ? (
            <p className="text-gray-600 text-center mt-20">No prescriptions found for this appointment.</p>
          ) : (
            prescriptions.map((prescription) => (
              <div
                className="bg-white border rounded-lg flex flex-col md:flex-row md:items-center justify-between py-4 px-4 md:px-8 mb-4"
                key={prescription._id}
              >
                <div className="space-y-1 mb-2 md:mb-0 md:w-[300px] line-clamp-1">
                  <h3 className="text-sm md:text-base">{prescription.medicationName}</h3>
                  <h4 className="text-xs font-[300]">
                    {moment(prescription.createdAt).format("MMMM D, YYYY")}
                  </h4>
                </div>

                <div className="text-xs font-[300] mb-2 md:mb-0 md:w-[300px] line-clamp-1">
                  {prescription?.instructions || "Unknown"}
                </div>

                <div className="mb-2 md:mb-0">
                  <StatusBadge status={prescription.status || "pending"} />
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    className="text-xs text-primary underline"
                    onClick={() => {
                      setSelectedPrescription(prescription);
                      setModalOpen(true);
                    }}
                  >
                    View
                  </button>
                  <button
                    className="text-xs text-yellow-600 underline"
                    onClick={() => {
                      setEditingPrescription(prescription);
                      setShowForm(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-xs text-red-600 underline"
                    onClick={() => handleDelete(prescription.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}

          {selectedPrescription && (
            <PrescriptionReportModal
              data={selectedPrescription}
              isModalOpen={isModalOpen}
              setModalOpen={setModalOpen}
            />
          )}

          {/* Optional Pagination */}
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

export default PrescriptionDetails;
