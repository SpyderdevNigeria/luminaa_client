import { useEffect, useState } from "react";
import PrescriptionReportModal from "../../../components/modal/PrescriptionReportModal";
import PaginationComponent from "../../../components/common/PaginationComponent";
import usePrescriptions from "../../../hooks/usePrescriptions";
import DoctorApi from "../../../api/doctorApi";
import HeaderTab from "../../../components/common/HeaderTab";
// import useAppointments from "../../../hooks/useAppointments";
function DoctorPrescriptions() {
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
  } = usePrescriptions(DoctorApi);
  //  const {
  //   appointments,
  //   getAppointments
  // } = useAppointments(DoctorApi);
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
    <div className="space-y-6">
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
        <div className="text-center py-10">Loading prescriptions...</div>
      ) : prescriptions.length === 0 ? (
        <div className="text-center py-10">No prescriptions found.</div>
      ) : (
        <div className="space-y-4">
          {prescriptions.map((prescription) => (
            <div
              key={prescription._id}
              className="bg-white border border-dashboard-gray rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between py-4 md:px-8 space-y-3 md:space-y-0"
            >
              <div className="space-y-1">
                <h3 className="text-sm md:text-base">
                  {prescription.medicationName}
                </h3>
                <h4 className="text-xs font-[300]">
                  Prescribed on{" "}
                  {new Date(prescription.createdAt).toLocaleDateString()}
                </h4>
              </div>

              <div className="flex items-center space-x-2">
                <h3 className="text-sm md:text-base">
                  {prescription.duration}
                </h3>
                <h4 className="text-xs font-[300]">Duration</h4>
              </div>

              <div className="flex items-center space-x-2">
                <h3 className="text-sm md:text-base">
                  {prescription.frequency}
                </h3>
                <h4 className="text-xs font-[300]">Frequency</h4>
              </div>

              <button
                className="bg-gray-100 p-1 md:px-4 md:py-3 rounded-lg text-xs font-light text-primary"
                onClick={() => {
                  setSelectedPrescription(prescription);
                  setModalOpen(true);
                }}
              >
                View details
              </button>
            </div>
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
              {selectedPrescription && (
            <PrescriptionReportModal
              data={selectedPrescription}
              isModalOpen={isModalOpen}
              setModalOpen={setModalOpen}
            />
          )}
    </div>
  );
}

export default DoctorPrescriptions;
