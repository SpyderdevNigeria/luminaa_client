import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DoctorApi from "../../../api/doctorApi";
import PatientInformation from "../../../components/common/patientDetailsComponent/PatientInformation";
import MedicalHistory from "../../../components/common/patientDetailsComponent/PatientMedicalHistory";
import AppointmentHistory from "../../../components/common/patientDetailsComponent/PatientAppointmentHistory";
import PatientPrescription from "../../../components/common/patientDetailsComponent/PrescriptionsHistory";
import PatientDiagnosis from "../../../components/common/patientDetailsComponent/PatientDiagnosis";
import PatientAttendingDoctors from "../../../components/common/patientDetailsComponent/PatientAttendingDoctors";
import { IPatient } from "../../../types/Interfaces";
import UserImage from "../../../assets/images/patient/user.png";

// Define a type for the API response
interface IPatientStats {
  totalAppointments: number;
  lastAppointmentDate: string;
  activePrescriptions: number;
  totalDiagnoses: number;
  uniqueDoctors: number;
}

interface ICompletePatientProfile {
  patient: IPatient;
  statistics: IPatientStats;
}

function DoctorAllPatientsDetails() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("Patient Information");
  const [user, setUser] = useState<ICompletePatientProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await DoctorApi.getPatientsCompleteProfileById(id);
        setUser(response?.data);
      } catch (error) {
        console.error("Failed to fetch user", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchUser();
  }, [id]);

  const tab = [
    {
      label: "Patient Information",
      component: user ? <PatientInformation user={user.patient} /> : null,
    },
    {
      label: "Premobid Condition",
      component: user ? <MedicalHistory user={user.patient} /> : null,
    },
    {
      label: "Appointment History",
      component: <AppointmentHistory />,
    },
    {
      label: "Prescriptions",
      component: <PatientPrescription />,
    },
    {
      label: "Diagnosis",
      component: <PatientDiagnosis />,
    },
    {
      label: "Attending Doctors",
      component: <PatientAttendingDoctors />,
    },
  ];

  if (loading) return <p className="p-4">Loading patient details...</p>;
  if (!user) return <p className="p-4">Patient not found.</p>;
  return (
    <div>
      {/* Patient Info */}
      <main className="bg-white  rounded-lg">
        <div className="flex flex-row items-center px-4 p-6 justify-between rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-15 h-15 2xl:w-22 2xl:h-22 overflow-hidden rounded-full">
              <img
                src={user?.patient?.profilePicture?.url || UserImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1">
              <h4 className="text-base 2xl:text-2xl font-semibold capitalize">
                {user?.patient?.firstName} {user?.patient?.lastName}
              </h4>
              <h4 className="text-xs 2xl:text-base text-inactive">
                {user?.patient?.gender} | #{user?.patient?.id?.split("-")[0]}
              </h4>
            </div>
          </div>
        </div>
      </main>

      {/* Patient Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        <div className="bg-white  p-4 rounded shadow-sm text-center">
          <p className="text-xs text-inactive">Total Appointments</p>
          <p className="text-lg font-semibold">{user?.statistics.totalAppointments}</p>
        </div>
        <div className="bg-white  p-4 rounded shadow-sm text-center">
          <p className="text-xs text-inactive">Last Appointment</p>
          <p className="text-lg font-semibold">
            {new Date(user?.statistics?.lastAppointmentDate || "").toLocaleDateString()}
          </p>
        </div>
        <div className="bg-white  p-4 rounded shadow-sm text-center">
          <p className="text-xs text-inactive">Active Prescriptions</p>
          <p className="text-lg font-semibold">{user?.statistics.activePrescriptions}</p>
        </div>
        <div className="bg-white  p-4 rounded shadow-sm text-center">
          <p className="text-xs text-inactive">Total Diagnoses</p>
          <p className="text-lg font-semibold">{user?.statistics.totalDiagnoses}</p>
        </div>
        <div className="bg-white  p-4 rounded shadow-sm text-center col-span-2 md:col-span-1">
          <p className="text-xs text-inactive">Unique Doctors</p>
          <p className="text-lg font-semibold">{user?.statistics.uniqueDoctors}</p>
        </div>
      </div>

      {/* Tabs and Tab Content */}
      <main className="container-bd rounded-lg mt-10 p-4">
        <div className="flex items-center gap-8 font-medium text-sm md:text-base overflow-x-scroll border-b border-dashboard-gray">
          {tab.map((t) => (
            <div
              key={t.label}
              onClick={() => setActiveTab(t.label)}
              className={`cursor-pointer whitespace-nowrap rounded-t-md transition-all duration-200 ${
                activeTab === t.label
                  ? "text-primary font-semibold border-b-2 border-primary bg-white "
                  : "text-inactive hover:text-primary"
              }`}
            >
              {t.label}
            </div>
          ))}
        </div>

        <div className="mt-2">
          {tab.find((t) => t.label === activeTab)?.component}
        </div>
      </main>
    </div>
  );
}

export default DoctorAllPatientsDetails;
