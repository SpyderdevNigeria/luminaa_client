import { useEffect } from "react";
import AppointmentTab from "../../../components/common/AppointmentTab";
import HeaderTab from "../../../components/common/HeaderTab";
import PatientApi from "../../../api/PatientApi";
import useAppointments from "../../../hooks/useAppointments";
import { AppointmentCardSkeleton } from "../../../components/skeleton/SkeletonCards";

function Consultaion() {
  const {
    appointments,
    loadingAppointment,
    setLoadingAppointment,
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
    if (
      appointments.length > 0 &&
      status === "" &&
      dataFrom === "" &&
      dateTo === "" &&
      page === 1
    ) {
      setLoadingAppointment(false);
      return;
    }
    getAppointments();
  }, [page, status, dataFrom, dateTo]);

  return (
    <div>
      <HeaderTab
        title="Appointment"
        showSearch={false}
        dateFrom={dataFrom}
        onDateFromChange={setDataFrom}
        dateTo={dateTo}
        onDateToChange={setDateTo}
      />

      <section className="bg-white rounded-lg p-4 min-h-[200px]">
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
            setPage={(e) => handleSetPage(e)}
          />
        )}
      </section>
    </div>
  );
}

export default Consultaion;
