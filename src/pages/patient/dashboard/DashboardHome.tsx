import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import routeLinks from "../../../utils/routes";
import { navItemsPatient } from "../../../utils/dashboardUtils";
import AppointmentTab from "../../../components/common/AppointmentTab";
import AppointmentBookModal from "../../../components/modal/AppointmentBookModal";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { useDispatch, useSelector } from "react-redux";
import PatientApi from "../../../api/PatientApi";
import { setAppointments } from "../../../reducers/appointmentSlice";
import { AppDispatch, RootState } from "../../../store";
function DashboardHome() {
  const [isModalOpen, setIsModalOpen] = useState(false)
const userProfile = useAppSelector((state) => state.auth.user);
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
    
  const links = useMemo(
    () => [
      {
        icon: navItemsPatient.find(
          (item) => item.label.toLowerCase() === "consultations"
        )?.icon,
        name: "Book a Consultation",
        description:
          "Find a Doctor to give you a diagnosis and set you up for treatment",
        link: routeLinks?.patient?.appointment,
      },
      {
        icon: navItemsPatient.find(
          (item) => item.label.toLowerCase() === "orders"
        )?.icon,
        name: "Buy Drugs",
        description:
          "Find a Doctor to give you a diagnosis and set you up for treatment",
        link: routeLinks?.patient?.pharmacy,
      },
      {
        icon: navItemsPatient.find(
          (item) => item.label.toLowerCase() === "lab/radiology"
        )?.icon,
        name: "Visit a Lab",
        description:
          "Find a Doctor to give you a diagnosis and set you up for treatment",
        link: routeLinks?.patient?.lab,
      },
    ],
    [navItemsPatient, routeLinks?.patient]
  );
  return (
    <div>
      <h2 className="text-sm italic text-gray-500 mb-1">Welcome</h2>
      <h1 className="text-2xl md:text-4xl font-medium text-black mb-4">
        {userProfile?.user?.firstName + " " + userProfile?.user?.lastName}
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {links?.map((i) => (
          <Link
            to={i?.link}
            className="bg-white rounded-lg p-4 2xl:p-8 shadow-sm "
            key={i?.name}
            onClick={()=>{
              if (i?.name.toLowerCase() === "book a consultation") {
                setIsModalOpen(true)
              }
            }}
          >
            {i.icon && <i.icon className="text-3xl text-secondary" />}
            <div className="md:max-w-[230px] 2xl:max-w-sm mt-8">
              <h3 className="text-base md:text-lg 2xl:text-2xl font-medium mb-1 text-text-primary">
                {i?.name}
              </h3>
              <p className="text-sm md:text-base 2xl:text-lg text-text-secondary">
                {i?.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Appointment Booking Modal */}
      <AppointmentBookModal open={isModalOpen} onClose={()=>{setIsModalOpen(false)}}/>
      <div>
        {/* Appointments List */}
           <section className="bg-white rounded-lg p-4">
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
    </div>
  );
}

export default DashboardHome;
