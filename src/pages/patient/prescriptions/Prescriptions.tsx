import { useEffect, useState } from "react";
import PrescriptionDetailsModal from "../../../components/modal/PrescriptionDetailsModal";
import PaginationComponent from "../../../components/common/PaginationComponent";
import usePrescriptions from "../../../hooks/usePrescriptions";
import PatientApi from "../../../api/PatientApi";
import HeaderTab from "../../../components/common/HeaderTab";
import PrescriptionCard from "../../../components/common/PrescriptionCard";
// import useAppointments from "../../../hooks/useAppointments";
function Prescriptions() {
  const [selectedPrescription, setSelectedPrescription] = useState<any>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const {
    prescriptions,
    page,
    limit,
    total,
    totalPages,
    loading,
    search,
    appointmentId,
    status,
    patientId,
    isRefillable,
    setAppointmentId,
    setPrescriptionStatus,
    setPrescriptionIsRefillable,
    setPage,
    getPrescriptions,
  } = usePrescriptions(PatientApi);
  //  const {
  //   appointments,
  //   getAppointments
  // } = useAppointments(PatientApi);
  useEffect(() => {
    if (
      prescriptions.length > 0 &&
      status === "" &&
      isRefillable === "" &&
      appointmentId === "" &&
      page === 1
    ) {
      return;
    }
    getPrescriptions();
    // getAppointments();
  }, [search, appointmentId, status, patientId, isRefillable, page, limit]);

  return (
    <div className="space-y-6 container-bd">
      {/* Filter Controls */}
      <HeaderTab
        title="Prescriptions"
        showSearch={false}
        dropdowns={[
          {
            label: "Appointment ID",
            options: [], // e.g. ['APPT-001', 'APPT-002']
            value: appointmentId,
            onChange: setAppointmentId,
          },
          {
            label: "Status",
            options: ["active", "inactive"],
            value: status,
            onChange: setPrescriptionStatus,
          },
          {
            label: "Refillable?",
            options: ["true", "false"],
            value: isRefillable,
            onChange: setPrescriptionIsRefillable,
          },
        ]}
      />

      {/* Prescription List */}
   {loading ? (
  <div className="text-center py-10 text-gray-500">Loading prescriptions...</div>
) : prescriptions.length === 0 ? (
  <div className="text-center py-10 text-gray-500">No prescriptions found.</div>
) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 my-4">
          {prescriptions.map((prescription) => (
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


      {/* Pagination */}
      {totalPages > 1 && (
        <PaginationComponent
          page={page}
          total={total ?? 0}
          limit={limit}
          totalPages={totalPages ?? 1}
          onPageChange={(newPage: number) => setPage(newPage)}
        />
      )}

      {/* Details Modal */}
      <PrescriptionDetailsModal
        data={selectedPrescription}
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
      />
    </div>
  );
}

export default Prescriptions;
