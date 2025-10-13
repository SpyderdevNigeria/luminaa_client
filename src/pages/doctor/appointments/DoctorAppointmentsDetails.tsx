import { SetStateAction, useEffect, useState } from "react";
import AppointmentDetails from "./components/AppointmentDetails";
import { useParams } from "react-router-dom";
import DiagnosisDetails from "./components/DiagnosisDetails"
import PrescriptionDetails from "./components/PrescriptionDetails";
import doctorApi from "../../../api/doctorApi";
import OrderDetails from "./components/OrderDetails";
import { useSearchParams } from "react-router-dom";
import ProcedureDetails from "./components/ProcedureDetails";

function DoctorAppointmentsDetails() {
  const [step, setStep] = useState('AppointmentDetails');
  const handleNext = (e: SetStateAction<string>) => setStep(e);
  const handleBack = () => setStep('AppointmentDetails');
  const [searchParams] = useSearchParams();
  const prescription = searchParams.get("prescription");
    const { id } = useParams<{ id: string }>();
    const [appointment, setAppointment] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {  
      fetchAppointment();
      if (prescription) {
        setStep("PrescriptionDetails");
      }
    }, [id]);
          const fetchAppointment = async () => {
        try {
          const data = await doctorApi.getAppointmentsById(id);
          if (data) {
            console.log(data?.patient?.id)
                setAppointment(data);
          }
        } catch (err) {
          console.error(err);
          setError("Failed to load appointment details.");
        } finally {
          setLoading(false);
        }
      };
    
  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!appointment) return <p className="text-center mt-10">No appointment found.</p>;
  
  return <div className="container-bd">
     {step === "AppointmentDetails" && (
      <AppointmentDetails fetchAppointment={() => fetchAppointment()} appointment={appointment} handleNext={(e)=>{handleNext(e)}}/>
     )}

      {step === "DiagnosisDetails" && (
      <DiagnosisDetails  appointmentId={id || ""}  handleBack={handleBack}/>
     )}

     
      {step === "PrescriptionDetails" && (
      <PrescriptionDetails  appointmentId={id || ""}  handleBack={handleBack}/>
     )}
      {
         step === "ProcedureDetails" && (
       <ProcedureDetails  appointment={appointment}  handleBack={handleBack}/>
     )
      }
         {step === "OrderDetails" && (
       <OrderDetails  appointmentId={id || ""} patientId={appointment?.patient?.id || ""}  handleBack={handleBack}/>
     )}
  </div>;
}

export default DoctorAppointmentsDetails;
