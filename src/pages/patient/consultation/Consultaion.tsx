import { useEffect, useState } from "react";
import AppointmentTab from "../../../components/common/AppointmentTab";
import HeaderTab from "../../../components/common/HeaderTab";
import PatientApi from "../../../api/patientApi";

function Consultaion() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await PatientApi.getAppointments();
        setAppointments(res?.data?.appointments || []);
      } catch (error) {
        console.error("Error fetching appointments", error);
        setError("Failed to fetch appointments. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div>
      <HeaderTab title="Appointment" />
      <section className="bg-white rounded-lg p-4 min-h-[200px]">
        {loading ? (
          <div className="text-center text-gray-500 py-10">Loading appointments...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : appointments.length === 0 ? (
          <div className="text-center text-gray-500 py-10">No appointments found.</div>
        ) : (
          <AppointmentTab appointmentsData={appointments} />
        )}
      </section>
    </div>
  );
}

export default Consultaion;
