import { useState } from "react";
import AppointmentDetails from "./components/AppointmentDetails";
import Medical from "./components/medical/Medical";

function DoctorAppointmentsView() {
  const [step, setStep] = useState(0);
  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);
  return <div>
     {step === 0 && (
      <AppointmentDetails  handleNext={handleNext}/>
     )}
        {step === 1 && (
      <Medical  handleNext={handleNext} handleBack={handleBack}/>
     )}
  </div>;
}

export default DoctorAppointmentsView;
