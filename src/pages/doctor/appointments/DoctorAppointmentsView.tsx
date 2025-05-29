import { useEffect, useState } from "react";
import AppointmentDetails from "./components/AppointmentDetails";
import Medical from "./components/medical/Medical";
import { useParams } from "react-router-dom";
import doctorApi from "../../../api/doctorApi";

function DoctorAppointmentsView() {
  const [step, setStep] = useState(0);
  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

    const { id } = useParams<{ id: string }>();
    const [appointment, setAppointment] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchAppointment = async () => {
        try {
          const data = await doctorApi.getAppointmentsById(id);
          if (data?.data) {
                setAppointment(data?.data);
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
     {step === 0 && (
      <AppointmentDetails appointment={appointment} handleNext={handleNext}/>
     )}
        {step === 1 && (
      <Medical  handleNext={handleNext} handleBack={handleBack}/>
     )}
  </div>;
}

export default DoctorAppointmentsView;
