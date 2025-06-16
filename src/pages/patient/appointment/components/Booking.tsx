import { useState, useMemo } from "react";
import BookingType from "./steps/BookingType";
import BookingSymptoms from "./steps/BookingSymptoms";
import BookingDoctorList from "./steps/BookingDoctorList";


const StepPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState({
    type: "",
    selectedDoctor: "",
    scheduledDate: "",
    patientNote : "",
    location : ""
  });
const steps = useMemo(() =>  [
  { id: 1, title: "AppointmentType" },
  { id: 2, title: "Personal Info" },
  { id: 3, title: "Review & Submit" },
], []);
  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <BookingType nextStep={nextStep} setData={setData} data={data} />;
      case 2:
        return <BookingDoctorList nextStep={nextStep} setData={setData} data={data} prevStep={prevStep} />;
      case 3:
        return <BookingSymptoms setData={setData} data={data} prevStep={prevStep} />;
      default:
        return null;
    }
  };

  return (
    <div className={`${currentStep === 2  ? 'max-w-7xl ' : 'max-w-2xl'} w-full mx-auto p-2 md:p-4 rounded-lg `}>
      <h5 className={`text-center  text-secondary-text text-xl md:text-2xl`}>
        Appointment Booking
     </h5>


      {/* Step Content */}
      <div className="">{renderStepContent()}</div>
    </div>
  );
};

export default StepPage;
