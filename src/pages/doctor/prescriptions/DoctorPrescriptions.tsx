import { useEffect, useState } from "react";
import PrescriptionReportModal from "../../../components/modal/PrescriptionReportModal";
import usePrescriptions from "../../../hooks/usePrescriptions";
import DoctorApi from "../../../api/doctorApi";
import HeaderTab from "../../../components/common/HeaderTab";
import Table from "../../../components/common/Table"; // Ensure this is your reusable Table component

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

  useEffect(() => {
    getPrescriptions();
  }, [search, appointmentId, status, patientId, isRefillable, page, limit]);

  const columns = [
    {
      label: "Patient Name",
      key: "patient",
      render: (row: any) => `${row.patient?.firstName || ""} ${row.patient?.lastName || ""}`,
    },
    {
      label: "Medication",
      key: "medicationName",
      render: (row: any) =>
        row.medicationName || row.medication?.name || "N/A",
    },
    {
      label: "Price",
      key: "price",
      render: (row: any) =>
        row.medication?.price ? `₦${parseFloat(row.medication.price).toLocaleString()}` : "N/A",
    },
    {
      label: "Dosage",
      key: "dosage",
    },
    {
      label: "Frequency",
      key: "frequency",
    },
    {
      label: "Duration",
      key: "duration",
    },
    {
      label: "Refillable",
      key: "isRefillable",
      render: (row: any) => (row.isRefillable ? "Yes" : "No"),
    },
    {
      label: "Status",
      key: "status",
      render: (row: any) => (
        <span
          className={`text-sm px-2 py-1 rounded-full ${
            row.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      label: "Actions",
      key: "actions",
      render: (row: any) => (
        <button
          onClick={() => {
            setSelectedPrescription(row);
            setModalOpen(true);
          }}
          className="text-primary whitespace-nowrap underline"
        >
          View Details
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6 container-bd">
      <HeaderTab
        title="Prescriptions"
        showSearch={false}
        dropdowns={[
          {
            label: "Appointment ID",
            options: [],
            value: appointmentId,
            onChange: setAppointmentId,
          },
          {
            label: "Status",
            options: ["active", "inactive"],
            value: status || "",
            onChange: (value) =>
              setPrescriptionStatus(value?.toLowerCase() === "all" ? null : value?.toLowerCase()),
          },
          {
            label: "Refillable?",
            options: ["true", "false"],
            value: isRefillable || "",
            onChange: (value) =>
              setPrescriptionIsRefillable(value?.toLowerCase() === "all" ? null : value?.toLowerCase()),
          },
        ]}
      />

      {loading ? (
        <div className="text-center py-10">Loading prescriptions...</div>
      ) : prescriptions.length === 0 ? (
        <div className="text-center py-10">No prescriptions found.</div>
      ) : (
        <Table
          data={prescriptions}
          columns={columns}
          page={page}
          total={total}
          limit={limit}
          totalPages={totalPages}
          setPage={setPage}
        />
      )}

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
