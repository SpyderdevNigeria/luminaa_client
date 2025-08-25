import { useEffect, useState } from "react";
import moment from "moment";
import { IPrescription } from "../../types/Interfaces";
import PatientApi from "../../api/PatientApi";
import PrescriptionCard from "./PrescriptionCard";
import useCart from "../../hooks/useCart";
import ConfirmModal from "../modal/ConfirmModal"; 

interface PrescriptionAppointmentViewProps {
  appointmentId: string;
  doctor: IPrescription["doctor"];
  appointment: IPrescription["appointment"];
  onBack: () => void;
  setModalOpenPrescriptionDownload: (value: boolean) => void;
  setSelectedPrescription: (prescription: IPrescription) => void;
  setModalOpen: (value: boolean) => void;
}

const PrescriptionAppointmentView: React.FC<PrescriptionAppointmentViewProps> = ({
  appointmentId,
  doctor,
  appointment,
  onBack,
  setModalOpenPrescriptionDownload,
  setSelectedPrescription,
  setModalOpen,
}) => {
  const [selectedPrescriptions, setSelectedPrescriptions] = useState<IPrescription[]>([]);
  const [loading, setLoading] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false); 

  useEffect(() => {
    const fetchPrescriptions = async () => {
      setLoading(true);
      const response = await PatientApi.getPrescriptionsAppointmentbyId(appointmentId);
      if (response?.data) {
        setSelectedPrescriptions(response.data);
      }
      setLoading(false);
    };
    fetchPrescriptions();
  }, [appointmentId]);

  const {items, addBulk, cartItemLoading } = useCart();

  const handleBulkAdd = () => {
    const medsToAdd = selectedPrescriptions.map((prescription) => {
      const { medication } = prescription;
      return {
        ...medication,
        quantity: 1,
      };
    });

    addBulk(medsToAdd);
    setIsConfirmOpen(false); 
  };
    const allMedsInCart = selectedPrescriptions.every((prescription) =>
    items.some((item) => item.id === prescription?.medication?.id)
  );
  return (
    <div className="space-y-6">
      <button onClick={onBack} className="text-sm text-gray-600 underline mb-4">
        ← Back to all appointments
      </button>

      <div className="bg-white ">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              {doctor ? `Dr. ${doctor.firstName} ${doctor.lastName}` : "Doctor"}
            </h3>
            <p className="text-sm text-gray-600">{doctor?.specialty}</p>
          </div>
   {selectedPrescriptions?.length > 0 && (
  <div className="flex flex-row items-center gap-4">
    <button
      onClick={() => setIsConfirmOpen(true)}
      disabled={cartItemLoading || allMedsInCart}
      className={`px-4 py-1.5 text-sm rounded transition border ${
        allMedsInCart
          ? "bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed"
          : "bg-white  text-primary border-primary"
      }`}
    >
      {allMedsInCart
        ? "Already in Cart"
        : cartItemLoading
        ? "Adding to Cart..."
        : "Buy Prescriptions"}
    </button>

    <button
      onClick={() => setModalOpenPrescriptionDownload(true)}
      className="bg-primary text-white px-4 py-1.5 text-sm rounded transition"
    >
      Download Prescriptions
    </button>
  </div>
)}


        </div>

        <div className="text-xs mt-3 text-gray-700 space-y-1">
          <p>
            <strong>Scheduled:</strong>{" "}
            {appointment?.scheduledDate
              ? moment(appointment.scheduledDate).format("MMMM D, YYYY h:mm A")
              : "N/A"}
          </p>
          <p>
            <strong>Prescriptions:</strong> {selectedPrescriptions.length}
          </p>
        </div>

        {loading ? (
          <p>Loading prescriptions...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            {selectedPrescriptions.map((prescription) => (
              <PrescriptionCard
                key={prescription._id}
                prescription={prescription}
                onView={() => {
                  setSelectedPrescription(prescription);
                  setModalOpen(true);
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Confirm Modal */}
      <ConfirmModal
        open={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleBulkAdd}
        confirmText="Add All to Cart"
        loading={cartItemLoading}
        title="Add all prescriptions to cart?"
        description="This will add all medications in this appointment to your cart."
      />
    </div>
  );
};

export default PrescriptionAppointmentView;
