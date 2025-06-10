import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "../../../components/dropdown/dropdown";
import PaginationComponent from "../../../components/common/PaginationComponent";
import doctorApi from "../../../api/doctorApi";
import useAppointments from "../../../hooks/useAppointments";
import routeLinks from "../../../utils/routes";
import AppointmentCalendar from "../../../components/common/AppointmentCalendar";
import { FaCalendarAlt, FaList } from "react-icons/fa";
function DoctorAppointments() {
  const {
    appointments,
    loadingAppointment,
    page,
    totalPages,
    status,
    dataFrom,
    limit,
    total,
    dateTo,
    setStatus,
    setDataFrom,
    setDateTo,
    getAppointments,
    handleSetPage,
  } = useAppointments(doctorApi);

  const [calendarView, setCalendarView] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    getAppointments();
  }, [page, status, dataFrom, dateTo]);

  const calendarAppointments = appointments.map((app: any) => ({
    id: app?.id,
    title: `${app?.patient?.firstName} ${app?.patient?.lastName} - ${app?.status}`,
    scheduledDate: app?.scheduledDate,
    ...app
  }));

  // const listAppointments = appointments.filter((app: any) => {
  //   const appDate = new Date(app.scheduledDate);
  //   return (
  //     appDate.getFullYear() === selectedDate.getFullYear() &&
  //     appDate.getMonth() === selectedDate.getMonth()
  //   );
  // });

  return (
    <div className="flex flex-col gap-4">
      {/* Calendar or List View */}
      {calendarView ? (
        <div className="container-bd">
          <div className="flex gap-2 justify-end">
             <button
              onClick={() => setCalendarView(true)}
              className={`${
                calendarView ? "text-primary" : "text-black"
              } text-xl`}
            >
              <FaCalendarAlt />
            </button>
                        <button
              onClick={() => setCalendarView(false)}
              className={`${
                !calendarView ? "text-primary" : "text-black"
              } text-xl`}
            >
              <FaList />
            </button>
          </div>
          {loadingAppointment ? (
            <p className="text-center mt-4">Loading appointments...</p>
          ) : (
            <AppointmentCalendar
              appointments={calendarAppointments}
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
              link={routeLinks?.doctor?.appointment}
            />
          )}
        </div>
      ) : (
        <section className="container-bd">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center my-2">
            <Dropdown triggerLabel={`Status: ${status || "All"}`} showArrow>
              <ul className="space-y-2 text-sm">
                {[
                  "",
                  "scheduled",
                  "confirmed",
                  "completed",
                  "cancelled",
                  "no_show",
                ].map((s) => (
                  <li
                    key={s}
                    onClick={() => {
                      setStatus(s);
                      handleSetPage(1);
                    }}
                    className="cursor-pointer hover:bg-gray-100 p-1 rounded"
                  >
                    {s === "" ? "All" : s}
                  </li>
                ))}
              </ul>
            </Dropdown>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm">
                From:
                <input
                  type="date"
                  className="border border-gray-300 rounded p-1 text-sm"
                  value={dataFrom}
                  onChange={(e) => {
                    setDataFrom(e.target.value);
                    handleSetPage(1);
                  }}
                />
              </label>

              <label className="flex items-center gap-2 text-sm">
                To:
                <input
                  type="date"
                  className="border border-gray-300 rounded p-1 text-sm"
                  value={dateTo}
                  onChange={(e) => {
                    setDateTo(e.target.value);
                    handleSetPage(1);
                  }}
                />
              </label>
                  <div className="flex gap-2 justify-end">
             <button
              onClick={() => setCalendarView(true)}
              className={`${
                calendarView ? "text-primary" : "text-black"
              } text-xl`}
            >
              <FaCalendarAlt />
            </button>
                        <button
              onClick={() => setCalendarView(false)}
              className={`${
                !calendarView ? "text-primary" : "text-black"
              } text-xl`}
            >
              <FaList />
            </button>
          </div>
            </div>

          </div>
          <div className="grid gap-4 py-4">
            {loadingAppointment ? (
              <p>Loading...</p>
            ) : appointments.length === 0 ? (
              <p className="text-center">No appointments for this month.</p>
            ) : (
              appointments.map((app: any) => {
                const dateObj = new Date(app.scheduledDate);
                const formattedDate = dateObj.toLocaleDateString();
                const formattedTime = dateObj.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <div
                    key={app.id}
                    className="bg-white shadow rounded-lg p-4 border-l-4 border-primary flex flex-col md:flex-row justify-between gap-4"
                  >
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-semibold">Patient:</span>{" "}
                        {app.patient.firstName} {app.patient.lastName}
                      </p>
                      <p>
                        <span className="font-semibold">Status:</span>{" "}
                        {app.status}
                      </p>
                      <p>
                        <span className="font-semibold">Date:</span>{" "}
                        {formattedDate}
                      </p>
                      <p>
                        <span className="font-semibold">Time:</span>{" "}
                        {formattedTime}
                      </p>
                      <p>
                        <span className="font-semibold">Location:</span>{" "}
                        {app.location}
                      </p>
                    </div>
                    <div className="self-start md:self-center">
                      <Link
                        to={`${routeLinks?.doctor?.appointment}/${app.id}`}
                        className="text-sm text-primary underline"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <PaginationComponent
            page={page}
            total={total}
            limit={limit}
            totalPages={totalPages}
            onPageChange={handleSetPage}
          />
        </section>
      )}
    </div>
  );
}

export default DoctorAppointments;
