import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa6";
import { TbLocation } from "react-icons/tb";
import { SiGooglemeet } from "react-icons/si";
import PatientApi from "../../../api/PatientApi";
import DoctorImage from "../../../assets/images/doctor/doctor.png";

interface Diagnosis {
  id?: string; // assuming each diagnosis has an ID
  primaryDiagnosis: string;
  symptoms: string;
  notes: string;
  severity: string;
  diagnosisCode: string;
  isConfirmed: boolean;
  additionalRecommendations: string;
}

const ConsultationView = () => {
  const { id } = useParams<{ id: string }>();
  const [appointment, setAppointment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showDiagnosis, setShowDiagnosis] = useState(false);
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);
  const [diagnosisLoading, setDiagnosisLoading] = useState(false);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const data = await PatientApi.getAppointmentsById(id);
        if (data?.data) {
          setAppointment(data.data);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load appointment details.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [id]);

  const handleViewDiagnosis = async () => {
    setDiagnosisLoading(true);
    try {
      const res = await PatientApi.getDiagnosesAppointmentbyId(id);
      if (res?.data) {
        setDiagnosis(res.data);
        setShowDiagnosis(true);
      }
    } catch (err) {
      console.error("Failed to load diagnosis", err);
    } finally {
      setDiagnosisLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!appointment) return <p className="text-center mt-10">No appointment found.</p>;

  const dateObj = new Date(appointment.scheduledDate);
  const formattedDate = dateObj.toLocaleDateString();
  const formattedTime = dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const doctor = appointment.doctor;
  const doctorUser = doctor?.user;

  return (
    <div className="p-4 md:p-6 bg-white shadow rounded">
      <h1 className="text-xl md:text-2xl font-semibold mb-6">Appointment Details</h1>

      <div className="border border-gray-200 rounded p-4 flex flex-col md:flex-row gap-6">
        {/* Doctor Info */}
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
          <p className="text-sm text-gray-600">Specialty: {doctor?.specialty}</p>
          <p className="text-sm text-gray-600">License #: {doctor?.licenseNumber}</p>

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

      {/* Meeting */}
      <main className="flex items-center justify-between py-4 px-2 border-b border-dashboard-gray">
        <h5 className="text-text-primary flex flex-row gap-2 text-sm">
          <SiGooglemeet className="text-2xl" />
          Meeting Details
        </h5>
        <div className="flex items-center gap-2">
          <button className="px-8 py-2 rounded-sm bg-primary text-white text-xs">
            Join Meeting
          </button>
        </div>
      </main>

      {/* Appointment Notes */}
      <div className="pt-4">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Appointment Status</h3>
        <p className="text-sm capitalize">{appointment.status}</p>

        <h3 className="text-sm font-medium text-gray-500 mt-6 mb-2">Patient Note</h3>
        <p className="text-sm">{appointment.patientNote || "No note provided."}</p>
      </div>

      {/* Doctor Note */}
      <div className="mt-4 border-t border-gray-200 pt-2">
        <h3 className="text-sm font-medium text-gray-500 mt-6 mb-2">Doctor Note</h3>
        <p className="text-sm">{appointment.doctorNote || "No note provided."}</p>
      </div>

      {/* View Diagnosis Button */}
      <div className="mt-6">
        <button
          onClick={handleViewDiagnosis}
          disabled={diagnosisLoading}
          className="px-6 py-2 bg-primary text-white text-sm rounded"
        >
          {diagnosisLoading ? "Loading Diagnosis..." : "View Diagnosis"}
        </button>
      </div>

      {/* Diagnosis Section */}
      {showDiagnosis && diagnosis.length > 0 && diagnosis.map((d) => (
        <div className="mt-6 bg-gray-50 border border-dashboard-gray rounded-md p-4" key={d.id || d.diagnosisCode}>
          <h3 className="text-lg font-semibold mb-4">Diagnosis Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Primary Diagnosis:</strong>
              <p>{d.primaryDiagnosis}</p>
            </div>
            <div>
              <strong>Symptoms:</strong>
              <p>{d.symptoms}</p>
            </div>
            <div>
              <strong>Notes:</strong>
              <p>{d.notes}</p>
            </div>
            <div>
              <strong>Severity:</strong>
              <p>{d.severity}</p>
            </div>
            <div>
              <strong>Diagnosis Code:</strong>
              <p>{d.diagnosisCode}</p>
            </div>
            <div>
              <strong>Confirmed:</strong>
              <p>{d.isConfirmed ? "Yes" : "No"}</p>
            </div>
            <div className="md:col-span-2">
              <strong>Additional Recommendations:</strong>
              <p>{d.additionalRecommendations}</p>
            </div>
          </div>
        </div>
      ))}

      {showDiagnosis && diagnosis.length === 0 && (
        <p className="mt-4 text-sm text-gray-500">No diagnosis found for this appointment.</p>
      )}
    </div>
  );
};

export default ConsultationView;
