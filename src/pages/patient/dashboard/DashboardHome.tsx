import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import routeLinks from "../../../utils/routes";
import { navItemsPatient } from "../../../utils/dashboardUtils";
import AppointmentTab from "../../../components/common/AppointmentTab";
import AppointmentBookModal from "../../../components/modal/AppointmentBookModal";
import { useAppSelector } from "../../../hooks/reduxHooks";
import PatientApi from "../../../api/PatientApi";
import useAppointments from "../../../hooks/useAppointments";
import { AppointmentCardSkeleton } from "../../../components/skeleton/SkeletonCards";
function DashboardHome() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userProfile = useAppSelector((state) => state.auth.user);
  const {
    appointments,
    loadingAppointment,
    setLoadingAppointment,
    page,
    totalPages,
    status,
    dataFrom,
    limit,
    total,
    dateTo,
    errorAppoint,
    getAppointments,
    handleSetPage,
  } = useAppointments(PatientApi);

  useEffect(() => {
       if (appointments.length > 0 && status === "" && dataFrom === "" && dateTo === "" && page === 1 ) {
      setLoadingAppointment(false);
      return
    }
    getAppointments();
  }, [page, status, dataFrom, dateTo]);

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
      {
        icon: navItemsPatient.find(
          (item) => item.label.toLowerCase() === "medicalhistory"
        )?.icon,
        name: "View your Medical History",
        description:
          "Find a Doctor to give you a diagnosis and set you up for treatment",
        link: routeLinks?.patient?.medicalHistory,
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {links?.map((i) => (
          <Link
            to={i?.link}
            key={i?.name}
            onClick={() => {
              if (i?.name.toLowerCase() === "book a consultation") {
                setIsModalOpen(true);
              }
            }}
            className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col gap-6"
          >
            {/* Icon */}
            {i.icon && (
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary text-2xl">
                <i.icon />
              </div>
            )}

            {/* Content */}
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold text-gray-900">{i?.name}</h3>
              <p className="text-sm text-gray-600">{i?.description}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Appointment Booking Modal */}
      <AppointmentBookModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      />
      <div>
        {/* Appointments List */}
        <section className="bg-white rounded-lg p-4">
          {loadingAppointment ? (
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 w-full">
              {[...Array(4)].map((_, idx) => (
                <AppointmentCardSkeleton key={idx} />
              ))}
            </div>
          ) : errorAppoint ? (
            <div className="text-center text-red-500 py-10">{errorAppoint}</div>
          ) : appointments.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              No appointments found.
            </div>
          ) : (
            <AppointmentTab
              appointmentsData={appointments}
              page={page}
              total={total}
              limit={limit}
              totalPages={totalPages}
              setPage={(e) => {
                return handleSetPage(e);
              }}
            />
          )}
        </section>
      </div>
    </div>
  );
}

export default DashboardHome;
