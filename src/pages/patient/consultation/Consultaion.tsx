import { useEffect } from "react";
import AppointmentTab from "../../../components/common/AppointmentTab";
import HeaderTab from "../../../components/common/HeaderTab";
import PatientApi from "../../../api/PatientApi";
import useAppointments from "../../../hooks/useAppointments";
import { AppointmentCardSkeleton } from "../../../components/skeleton/SkeletonCards";
import { Link } from "react-router-dom";
import routeLinks from "../../../utils/routes";

function Consultaion() {
  const {
    appointments,
    loadingAppointment,
    page,
    totalPages,
    status,
    dataFrom,
    setDataFrom,
    dateTo,
    setDateTo,
    limit,
    total,
    errorAppoint,
    getAppointments,
    handleSetPage,
  } = useAppointments(PatientApi);

  useEffect(() => {
    // if (
    //   appointments.length > 0 &&
    //   status === "" &&
    //   dataFrom === "" &&
    //   dateTo === "" &&
    //   page === 1
    // ) {
    //   setLoadingAppointment(false);
    //   return;
    // }
    getAppointments();
  }, [page, status, dataFrom, dateTo]);

  return (
    <div className="container-bd">
      <div className="flex justify-between items-center mb-8 ">
              <h1 className="text-2xl font-semibold">Consultations</h1>
              <Link
                className="bg-primary text-white px-6 py-2 text-sm rounded-md flex items-center gap-2"
                to={routeLinks?.patient?.appointment}
              >

                Book An Appointment
              </Link>
            </div>
      <HeaderTab
        title=""
        showSearch={false}
        dateFrom={dataFrom}
        onDateFromChange={setDataFrom}
        dateTo={dateTo}
        onDateToChange={setDateTo}
      />

      <section className="min-h-[200px]">
        {loadingAppointment ? (
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-4 w-full">
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
            setPage={(e) => handleSetPage(e)}
          />
        )}
      </section>
    </div>
  );
}

export default Consultaion;
