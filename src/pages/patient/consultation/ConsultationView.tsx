import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa6";
import { TbLocation } from "react-icons/tb";
import { SiGooglemeet } from "react-icons/si";
import PatientApi from "../../../api/PatientApi";
import DoctorImage from "../../../assets/images/doctor/doctor.png";
import DiagnosisCard from "../../../components/common/DiagnosisCard";
import MedicalReportModal from "../../../components/modal/MedicalReportModal";
import PrescriptionCard from "../../../components/common/PrescriptionCard";
import PrescriptionDetailsModal from "../../../components/modal/PrescriptionDetailsModal";

interface Diagnosis {
  id?: string;
  primaryDiagnosis: string;
  symptoms: string;
  notes: string;
  severity: string;
  diagnosisCode: string;
  isConfirmed: boolean;
  additionalRecommendations: string;
  createdAt: string;
}

interface Prescription {
  id: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  createdAt: string;
  _id?: string;
  isRefillable: string;
}

const ConsultationView = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<
    "general" | "diagnosis" | "prescription"
  >("general");
  const [appointment, setAppointment] = useState<any>(null);
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<Diagnosis | null>(
    null
  );
  const [isModalOpen, setModalOpen] = useState(false);

  const [selectedPrescription, setSelectedPrescription] =
    useState<Prescription | null>(null);
  const [isModalOpenPrescription, setModalOpenPrescription] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appointmentRes, diagnosisRes, prescriptionRes] =
          await Promise.all([
            PatientApi.getAppointmentsById(id),
            PatientApi.getDiagnosesAppointmentbyId(id),
            PatientApi.getPrescriptionsAppointmentbyId(id),
          ]);

        if (appointmentRes?.data) setAppointment(appointmentRes.data);
        if (diagnosisRes?.data) setDiagnosis(diagnosisRes.data);
        if (prescriptionRes?.data) setPrescriptions(prescriptionRes.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load appointment data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!appointment)
    return <p className="text-center mt-10">No appointment found.</p>;

  const dateObj = new Date(appointment.scheduledDate);
  const formattedDate = dateObj.toLocaleDateString();
  const formattedTime = dateObj.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const doctor = appointment.doctor;
  const doctorUser = doctor?.user;

  return (
    <>
      <div className="border border-gray-200 rounded p-4 flex flex-col md:flex-row gap-6 mb-6 bg-white items-center ">
        <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden">
          <img
            src={doctorUser?.profilePicture?.url || DoctorImage}
            alt="Doctor"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 space-y-2 my-2">
          <p className="text-lg font-semibold">
            Dr. {doctorUser?.firstName} {doctorUser?.lastName}
          </p>
          <p className="text-sm text-gray-600">
            Specialty: {doctor?.specialty}
          </p>
          <p className="text-sm text-gray-600">
            License #: {doctor?.licenseNumber}
          </p>
          <div className="flex items-center gap-2 text-sm text-[#792CFF] bg-[#792CFF1A] px-3 py-1 w-fit rounded">
            <FaClock />
            {formattedDate} | {formattedTime}
          </div>
          <div className="flex flex-wrap gap-2 text-sm mt-2">
            <span className="flex items-center gap-1 bg-[#00B2FF1A] text-[#00B2FF] px-3 py-1 rounded-full">
              <TbLocation /> {appointment.location}
            </span>
            <span className="text-[#00B2FF] underline">View address</span>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6 bg-white shadow rounded">
        <h1 className="text-xl md:text-xl font-semibold mb-6">
          Appointment Details
        </h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          {["general", "diagnosis", "prescription"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`capitalize px-4 py-2  ${
                activeTab === tab
                  ? "border-b-2 border-primary text-primary"
                  : "text-inactive"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* GENERAL TAB */}
        {activeTab === "general" && (
          <>
            <main className="flex items-center justify-between py-4 px-2 border-b border-dashboard-gray">
              <h5 className="text-text-primary flex flex-row gap-2 text-sm">
                <SiGooglemeet className="text-2xl" />
                Meeting Details
              </h5>
              <button className="px-8 py-2 rounded-sm bg-primary text-white text-xs">
                Join Meeting
              </button>
            </main>

            <div className="pt-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Appointment Status
              </h3>
              <p className="text-sm capitalize">{appointment.status}</p>
              <h3 className="text-sm font-medium text-gray-500 mt-6 mb-2">
                Patient Note
              </h3>
              <p className="text-sm">
                {appointment.patientNote || "No note provided."}
              </p>
            </div>

            <div className="mt-4 border-t border-gray-200 pt-2">
              <h3 className="text-sm font-medium text-gray-500 mt-6 mb-2">
                Doctor Note
              </h3>
              <p className="text-sm">
                {appointment.doctorNote || "No note provided."}
              </p>
            </div>
          </>
        )}

        {/* DIAGNOSIS TAB */}
        {activeTab === "diagnosis" && (
          <>
            {diagnosis.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 my-4">
                {diagnosis.map((diagnosis) => (
                  <DiagnosisCard
                    diagnosis={diagnosis}
                    onView={() => {
                      setSelectedDiagnosis(diagnosis);
                      setModalOpen(true);
                    }}
                  />
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-gray-500">
                No diagnosis found for this appointment.
              </p>
            )}

            {/* Modal */}
            <MedicalReportModal
              data={selectedDiagnosis}
              isModalOpen={isModalOpen}
              setModalOpen={setModalOpen}
            />
          </>
        )}

        {/* PRESCRIPTION TAB */}
        {activeTab === "prescription" && (
          <>
            {prescriptions.length > 0 ? (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 my-4">
                  {prescriptions.map((prescription) => (
                    <PrescriptionCard
                      key={prescription.id}
                      prescription={prescription}
                      onView={() => {
                        setSelectedPrescription(prescription);
                        setModalOpenPrescription(true);
                      }}
                    />
                  ))}
                </div>
                {/* Details Modal */}
                <PrescriptionDetailsModal
                  data={selectedPrescription}
                  isModalOpen={isModalOpenPrescription}
                  setModalOpen={setModalOpenPrescription}
                />
              </div>
            ) : (
              <p className="mt-4 text-sm text-gray-500">
                No prescriptions found for this appointment.
              </p>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ConsultationView;
