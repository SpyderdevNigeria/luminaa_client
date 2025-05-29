import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../../store";
import { setAppointments } from "../../../reducers/appointmentSlice";

import AppointmentTab from "../../../components/common/AppointmentTab";
import HeaderTab from "../../../components/common/HeaderTab";
import PatientApi from "../../../api/PatientApi";

function Consultaion() {
  const dispatch = useDispatch<AppDispatch>();
  const appointments = useSelector((state: RootState) => state.appointments.appointments);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    if (appointments.length > 0) {
      setLoading(false)
      return
    }
    const fetchAppointments = async () => {
      try {
        const res = await PatientApi.getAppointments();
        const data = res?.data;
        if (data?.appointments) {
          dispatch(
            setAppointments(data.appointments)
          );
        }
      } catch (error) {
        console.error("Error fetching appointments", error);
        setError("Failed to fetch appointments. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [dispatch]);

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
