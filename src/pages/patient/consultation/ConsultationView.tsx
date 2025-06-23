import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { TbLocation } from "react-icons/tb";
import { SiGooglemeet } from "react-icons/si";
import PatientApi from "../../../api/PatientApi";
import DoctorImage from "../../../assets/images/doctor/doctor.png";
import DiagnosisCard from "../../../components/common/DiagnosisCard";
import MedicalReportModal from "../../../components/modal/DiagnosisReportModal";
import PrescriptionCard from "../../../components/common/PrescriptionCard";
import PrescriptionDetailsModal from "../../../components/modal/PrescriptionDetailsModal";
import { getFormattedDateTime } from "../../../utils/dashboardUtils";
import { IPrescription } from "../../../types/Interfaces";
import PrescriptionDownloadModal from "../../../components/modal/PrescriptionDownloadModal";
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


const ConsultationView = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<"general" | "diagnosis" | "prescription">("general");
  const [appointment, setAppointment] = useState<any>(null);
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);
  const [prescriptions, setPrescriptions] = useState<IPrescription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<Diagnosis | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState<IPrescription | null>(null);
  const [isModalOpenPrescription, setModalOpenPrescription] = useState(false);
  const [isModalOpenPrescriptionDownload, setModalOpenPrescriptionDownload] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appointmentRes, diagnosisRes, prescriptionRes] = await Promise.all([
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
  if (!appointment) return <p className="text-center mt-10">No appointment found.</p>;

const { formattedDate, formattedTime } = getFormattedDateTime(appointment?.scheduledDate);

  const doctor = appointment.doctor;
  const doctorUser = doctor?.user;

  return (
    <>
      {/* Doctor and Appointment Details Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Doctor Details (left side, smaller) */}
        <div className="md:col-span-1 bg-white p-6 border  flex flex-col items-center justify-center  max-h-[400px] border-gray-200 rounded-lg shadow">
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="w-32 h-32 2xl:w-40 2xl:h-40 rounded-full overflow-hidden border-2 border-primary">
              <img
                src={doctorUser?.profilePicture?.url || DoctorImage}
                alt="Doctor"
                className="w-full h-full object-cover"
              />
            </div>
            <div className=" text-center ">
              <p className="text-xl font-semibold text-gray-800 text-wrap">
                Dr. {doctorUser?.firstName} {doctorUser?.lastName}
              </p>
              <p className="text-sm text-gray-600 text-center">Specialty: {doctor?.specialty}</p>

              <div className="flex flex-wrap gap-2 mt-4 text-sm justify-center md:justify-start">
                <span className="flex items-center gap-1 bg-[#00B2FF1A] text-primary  px-3 py-1 rounded-full">
                 Meeting Venue : <TbLocation /> {appointment.location}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Appointment Details (right side, larger) */}
        <div className="md:col-span-3 bg-white p-6 border border-gray-200 rounded-lg shadow">
          <h1 className="text-xl font-semibold mb-6">Appointment Details</h1>

          {/* Tabs */}
          <div className="flex gap-4 mb-6 border-b border-gray-200">
            {["general", "diagnosis", "prescription"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`capitalize px-4 py-2 -mb-px ${
                  activeTab === tab
                    ? "border-b-2 border-primary text-primary font-medium"
                    : "text-gray-500"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* GENERAL TAB */}
          {activeTab === "general" && (
            <>
              <section className="border-b border-gray-200 py-4">
                <div className="flex items-center justify-between">
                  <h5 className="flex items-center gap-2 text-sm font-medium text-text-primary">
                    <SiGooglemeet className="text-2xl" />
                    Meeting Details
                  </h5>
                  <button className="px-6 py-2 rounded bg-primary text-white text-xs hover:bg-primary-dark">
                    Join Meeting
                  </button>
                </div>
              </section>

              <section className="pt-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Appointment Status</h3>
                <p className="text-sm capitalize">{appointment.status}</p>
                <h3 className="text-sm font-medium text-gray-500 mt-6 mb-2">Scheduled Date & Time</h3>
                <p className="text-sm">
                  {formattedDate} at {formattedTime}
                </p>
                <h3 className="text-sm font-medium text-gray-500 mt-6 mb-2">Patient Note</h3>
                <p className="text-sm">{appointment.patientNote || "No note provided."}</p>

                <h3 className="text-sm font-medium text-gray-500 mt-6 mb-2">Doctor Note</h3>
                <p className="text-sm">{appointment.doctorNote || "No note provided."}</p>
              </section>
            </>
          )}

          {/* DIAGNOSIS TAB */}
          {activeTab === "diagnosis" && (
            <>
              {diagnosis.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-6 my-4">
                  {diagnosis.map((diagnosis) => (
                    <DiagnosisCard
                      key={diagnosis.id}
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
                  <div className="flex justify-end">
                    <button className="px-6 py-2 rounded bg-primary text-white text-xs hover:bg-primary-dark"
                    onClick={()=>{setModalOpenPrescriptionDownload(true)}}
                    >Download Prescription</button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-6 my-4">
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
                  <PrescriptionDetailsModal
                    data={selectedPrescription}
                    isModalOpen={isModalOpenPrescription}
                    setModalOpen={setModalOpenPrescription}
                  />
                  <PrescriptionDownloadModal
                    isModalOpen={isModalOpenPrescriptionDownload}
                    setModalOpen={setModalOpenPrescriptionDownload}
                    prescriptions={prescriptions}
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
      </div>
    </>
  );
};

export default ConsultationView;
