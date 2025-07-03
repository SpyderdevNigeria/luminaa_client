
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DoctorApi from "../../../api/doctorApi";
import AppointmentHistory from "../../../components/common/patientDetailsComponent/PatientAppointmentHistory";
import PatientPrescription from "../../../components/common/patientDetailsComponent/PrescriptionsHistory";
import PatientDiagnosis from "../../../components/common/patientDetailsComponent/PatientDiagnosis";
import { IPatient } from "../../../types/Interfaces";
import UserImage from "../../../assets/images/patient/user.png"
import PatientInformation from "../../../components/common/patientDetailsComponent/PatientInformation";
import MedicalHistory from "../../../components/common/patientDetailsComponent/PatientMedicalHistory";
function DoctorPatientsDetails() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("Patient Information");
  const [user, setUser] = useState<IPatient | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await DoctorApi.getUserById(id);
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
      component: user ? <PatientInformation user={user} /> : null,
    },
    {
      label: "Premobid Condition",
      component: user ? <MedicalHistory user={user} /> : null,
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
  ];
  if (loading) return <p className="p-4">Loading patient details...</p>;
  if (!user) return <p className="p-4">Patient not found.</p>;
  return (
    <div>
      {/* Patient Info */}
      <main className="bg-white rounded-lg">
        <div className="flex flex-row items-center px-4 p-6 justify-between rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-15 h-15 2xl:w-22 2xl:h-22 overflow-hidden rounded-full">
              <img
                src={user?.profilePicture?.url || UserImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1">
              <h4 className="text-base 2xl:text-2xl font-semibold  capitalize">
                {user?.firstName} {user?.lastName}
              </h4>
              <h4 className="text-xs 2xl:text-base text-inactive">
                {user?.gender} | #{user?.id?.split("-")[0]}
              </h4>
            </div>
          </div>
          {/* <Link to={routeLinks?.doctor?.allPatients + '/' + id} className="px-8 py-2 rounded-sm bg-primary text-white text-xs 2xl:text-base flex items-center gap-2">
            <PiNotepadDuotone /> View More Details
          </Link> */}
        </div>
      </main>

      <main className="container-bd rounded-lg mt-10 p-4">
        <div className="flex items-center gap-8 font-medium text-sm md:text-base overflow-x-scroll border-b border-dashboard-gray">
          {tab.map((t) => (
            <div
              key={t.label}
              onClick={() => setActiveTab(t.label)}
              className={`cursor-pointer whitespace-nowrap rounded-t-md transition-all duration-200 ${
                activeTab === t.label
                  ? "text-primary font-semibold border-b-2 border-primary bg-white"
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

export default DoctorPatientsDetails;
