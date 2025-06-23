import { useEffect, useState } from "react";
import moment from "moment";
import PrescriptionDownloadModal from "../../../components/modal/PrescriptionDownloadModal";
import PaginationComponent from "../../../components/common/PaginationComponent";
import usePrescriptions from "../../../hooks/usePrescriptions";
import PatientApi from "../../../api/PatientApi";
import HeaderTab from "../../../components/common/HeaderTab";
import { IPrescription } from "../../../types/Interfaces";
import PrescriptionDetailsModal from "../../../components/modal/PrescriptionDetailsModal";
import PrescriptionCard from "../../../components/common/PrescriptionCard";
import DoctorImage from "../../../assets/images/doctor/doctor.png";
import { FaCalendarAlt } from "react-icons/fa";
function Prescriptions() {
  const [selectedPrescriptions, setSelectedPrescriptions] = useState<
    IPrescription[]
  >([]);
  const [isModalOpenPrescriptionDownload, setModalOpenPrescriptionDownload] =
    useState(false);
  const [expandedAppointmentId, setExpandedAppointmentId] = useState<
    string | null
  >(null);
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
  }, [search, appointmentId, status, patientId, isRefillable, page, limit]);

  const appointmentsMap = prescriptions.reduce(
    (acc, prescription) => {
      const apptId = prescription.appointment?.id;
      if (!apptId) return acc;

      if (!acc[apptId]) {
        acc[apptId] = {
          appointment: prescription.appointment,
          doctor: prescription.doctor,
          prescriptions: [],
        };
      }

      acc[apptId].prescriptions.push(prescription);
      return acc;
    },
    {} as Record<
      string,
      {
        appointment: IPrescription["appointment"];
        doctor: IPrescription["doctor"];
        prescriptions: IPrescription[];
      }
    >
  );

  const renderPrescriptionView = () => {
    const selectedData = appointmentsMap[expandedAppointmentId!];
    if (!selectedData) return null;

    const { appointment, doctor, prescriptions } = selectedData;

    return (
      <div className="space-y-6">
        <button
          onClick={() => setExpandedAppointmentId(null)}
          className="text-sm text-gray-600 underline mb-4"
        >
          ← Back to all appointments
        </button>

        <div className="bg-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {doctor
                  ? `Dr. ${doctor.firstName} ${doctor.lastName}`
                  : "Doctor"}
              </h3>
              <p className="text-sm text-gray-600">{doctor?.specialty}</p>
            </div>

            <button
              onClick={() => {
                setSelectedPrescriptions(prescriptions);
                setModalOpenPrescriptionDownload(true);
              }}
              className="bg-primary text-white px-4 py-1.5 text-sm rounded  transition"
            >
              Download Prescriptions 
            </button>
          </div>

          <div className="text-xs mt-3 text-gray-700 space-y-1">
            <p>
              <strong>Scheduled:</strong>{" "}
              {appointment?.scheduledDate
                ? moment(appointment.scheduledDate).format(
                    "MMMM D, YYYY h:mm A"
                  )
                : "N/A"}
            </p>
            <p>
              <strong>Prescriptions:</strong> {prescriptions.length}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
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
        </div>
      </div>
    );
  };

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
            options: ["all", "active", "inactive"],
            value: status || "",
            onChange: (value) =>
              setPrescriptionStatus(
                value?.toLowerCase() === "all" ? null : value?.toLowerCase()
              ),
          },
          {
            label: "Refillable?",
            options: ["all", "true", "false"],
            value: isRefillable || "",
            onChange: (value) =>
              setPrescriptionIsRefillable(
                value?.toLowerCase() === "all" ? null : value?.toLowerCase()
              ),
          },
        ]}
      />

      {loading ? (
        <div className="text-center py-10 text-gray-500">
          Loading prescriptions...
        </div>
      ) : Object.keys(appointmentsMap).length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No prescriptions found.
        </div>
      ) : expandedAppointmentId ? (
        renderPrescriptionView()
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Object.entries(appointmentsMap).map(
            ([appointmentId, { appointment, doctor, prescriptions }]) => (
              <div
                key={appointmentId}
                className="rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300  hover:shadow-md"
              >
                <div className="flex flex-col justify-between h-full gap-4">
                  {/* Doctor Info */}
                  <div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
                        <img
                          src={DoctorImage}
                          alt="Doctor"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">
                          {doctor
                            ? `Dr. ${doctor.firstName} ${doctor.lastName}`
                            : "Doctor"}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {doctor?.specialty}
                        </p>
                      </div>
                    </div>

                    {/* Date & Time */}
                    <div className="mt-5 bg-[#F9FAFB] rounded-lg p-4 flex items-center gap-3">
                      <div className="bg-primary/10 text-primary p-2 rounded-full">
                        <FaCalendarAlt className="text-sm" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase">
                          Scheduled Date
                        </p>
                        <p className="text-sm text-gray-800">
                          {appointment?.scheduledDate
                            ? moment(appointment.scheduledDate).format(
                                "MMMM D, YYYY h:mm A"
                              )
                            : "Not Available"}
                        </p>
                      </div>
                    </div>

                    {/* Prescription Summary */}
                    <div className="my-5">
                      <p className="text-xs font-semibold text-gray-500 uppercase">
                        Prescription Summary
                      </p>
                      <p className="text-sm text-gray-700">
                        {prescriptions.length}{" "}
                        {prescriptions.length === 1 ? "item" : "items"}{" "}
                        prescribed in this session.
                      </p>
                      <p className="text-xs mt-1 text-gray-500">
                        Includes medication and treatment recommendations
                        provided by the doctor.
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-auto">
                    <button
                      onClick={() => {
                        setSelectedPrescriptions(prescriptions);
                        setModalOpenPrescriptionDownload(true);
                      }}
                      className="bg-primary text-white px-4 py-1.5 text-sm rounded hover:bg-primary/90 transition"
                    >
                      Download
                    </button>
                    <button
                      onClick={() => setExpandedAppointmentId(appointmentId)}
                      className="border border-primary text-primary px-4 py-1.5 text-sm rounded  transition"
                    >
                      View Prescriptions
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}

      {/* Modals */}
      <PrescriptionDetailsModal
        data={selectedPrescription}
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
      />

      <PrescriptionDownloadModal
        isModalOpen={isModalOpenPrescriptionDownload}
        setModalOpen={setModalOpenPrescriptionDownload}
        prescriptions={selectedPrescriptions}
      />

      {/* Pagination */}
      {!expandedAppointmentId && totalPages > 1 && (
        <PaginationComponent
          page={page}
          total={total ?? 0}
          limit={limit}
          totalPages={totalPages ?? 1}
          onPageChange={(newPage: number) => setPage(newPage)}
        />
      )}
    </div>
  );
}

export default Prescriptions;
