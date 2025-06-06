import { SetStateAction, useEffect, useState } from "react";
import AppointmentDetails from "./components/AppointmentDetails";
import { useParams } from "react-router-dom";
import DiagnosisDetails from "./components/DiagnosisDetails"
import PrescriptionDetails from "./components/PrescriptionDetails";
import doctorApi from "../../../api/doctorApi";

function DoctorAppointmentsDetails() {
  const [step, setStep] = useState('AppointmentDetails');
  const handleNext = (e: SetStateAction<string>) => setStep(e);
  const handleBack = () => setStep('AppointmentDetails');

    const { id } = useParams<{ id: string }>();
    const [appointment, setAppointment] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchAppointment = async () => {
        try {
          const data = await doctorApi.getAppointmentsById(id);
          if (data) {
                setAppointment(data);
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

    
  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!appointment) return <p className="text-center mt-10">No appointment found.</p>;
  
  return <div>
     {step === "AppointmentDetails" && (
      <AppointmentDetails appointment={appointment} handleNext={(e)=>{handleNext(e)}}/>
     )}
        {/* {step === 1 && (
      <Medical  handleNext={handleNext} handleBack={handleBack}/>
     )} */}

      {step === "DiagnosisDetails" && (
      <DiagnosisDetails  appointmentId={id || ""}  handleBack={handleBack}/>
     )}

     
      {step === "PrescriptionDetails" && (
      <PrescriptionDetails  appointmentId={id || ""}  handleBack={handleBack}/>
     )}
  </div>;
}

export default DoctorAppointmentsDetails;
