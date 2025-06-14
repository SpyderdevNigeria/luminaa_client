import { PiNotepadDuotone } from "react-icons/pi";
import { useState } from "react";
import PatientInformation from "./components/PatientInformation";
import MedicalHistory from "./components/PatientMedicalHistory";
import AppointmentHistory from "./components/PatientAppointmentHistory";
import PatientPrescription from "./components/PatientPrescription";
import PatientDiagnosis from "./components/PatientDiagnosis";

function DoctorPatientsDetails() {
  const [activeTab, setActiveTab] = useState("Patient Information");
  const tab = [
    {
      label: "Patient Information",
      component: <PatientInformation />,
    },
    {
      label: "Medical History",
      component: <MedicalHistory />,
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
  return (
    <div>
      {/* Patient Info */}
      <main className=" bg-white rounded-lg ">
        <div className="flex flex-row items-center px-4 p-6 justify-between  rounded-lg ">
          <div className="flex items-center gap-2 ">
            <div className="w-15 h-15 2xl:w-22 2xl:h-22 overflow-hidden rounded-full">
              <img
                src="https://i.pravatar.cc/40"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1">
              <h4 className="text-base 2xl:text-2xl font-semibold">
                Ajayi Raymond
              </h4>
              <h4 className="text-xs 2xl:text-base text-inactive">
                Male | #123456
              </h4>
            </div>
          </div>
          <button className="px-8 py-2 rounded-sm bg-primary text-white text-xs 2xl:text-base flex items-center gap-2">
            <PiNotepadDuotone /> Book an appointment
          </button>
        </div>
      </main>

      <main className="container-bd rounded-lg mt-10 p-4">
        <div className="flex items-center gap-8 font-medium  text-sm md:text-base   overflow-x-scroll border-b border-dashboard-gray">
          {tab?.map((t) => (
            <div
              key={t.label}
              onClick={() => setActiveTab(t.label)}
              className={`cursor-pointer  whitespace-nowrap rounded-t-md transition-all duration-200 ${
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

export default DoctorPatientsDetails;
