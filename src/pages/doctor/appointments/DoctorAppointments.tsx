import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "../../../components/dropdown/dropdown";
import PaginationComponent from "../../../components/common/PaginationComponent";
import doctorApi from "../../../api/doctorApi";
import useAppointments from "../../../hooks/useAppointments";
import routeLinks from "../../../utils/routes";
import { HiOutlineStatusOnline } from "react-icons/hi";
import AppointmentCalendar from "../../../components/common/AppointmentCalendar";
import { FaCalendarAlt, FaList, FaHospital } from "react-icons/fa";
import PatientImage from "../../../assets/images/patient/user.png";
import {AppointmentCardSkeleton} from "../../../components/skeleton/SkeletonCards";
import { getFormattedDateTime } from "../../../utils/dashboardUtils";
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

  const [calendarView, setCalendarView] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    getAppointments();
  }, [page, status, dataFrom, dateTo]);

  const calendarAppointments = appointments.map((app: any) => (
    {
    id: app?.id,
    title: `${app?.patient?.firstName} ${app?.patient?.lastName} - ${app?.status}`,
    scheduledDate: app?.scheduledDate,
    ...app,
  }));

  const listAppointments = appointments.map((app: any) => {
    const { formattedDate, formattedTime } = getFormattedDateTime(app.scheduledDate);
    return {
      ...app,
      date : formattedDate,
      time : formattedTime
    };
  });

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
               <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-4 w-full">
               {[...Array(4)].map((_, idx) => (
                  <AppointmentCardSkeleton key={idx} />
                ))}
              </div>
            ) : listAppointments.length === 0 ? (
              <p className="text-center">No appointments for this month.</p>
            ) : (
              <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-4 w-full">
                {listAppointments.map((app, index) => (
                  <div
                    key={index}
                    className="bg-white  border border-[#E5E7EB] rounded-xl p-6 shadow-sm"
                  >
                    {/* Title & Doctor */}
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full overflow-hidden ">
                        <img
                          src={PatientImage}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>{" "}
                      {app.patient.firstName} {app.patient.lastName}
                    </div>

                    {/* Location */}
                    <div>
                      <p className="mt-2 text-xs font-medium text-gray-500 uppercase flex items-center gap-2">
                        Meeting Venue
                      </p>
                      <p className="text-xs text-gray-800 mt-1">
                        <span className="flex items-center text-primary gap-2">
                          {app.location === "online" ? (
                            <FaHospital />
                          ) : (
                            <HiOutlineStatusOnline />
                          )}{" "}
                          {app.location}
                        </span>
                      </p>
                    </div>

                    {/* Date and Time Box */}
                    <div className="mt-4 bg-[#F9FAFB] rounded-lg p-4 flex items-center space-x-3">
                      <div className="bg-primary/10 text-primary p-2 rounded-full">
                        <FaCalendarAlt />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase">
                          Date & Time
                        </p>
                        <p className="text-xs text-gray-800">
                          {app.date} •{" "} {app.time}
                        </p>
                      </div>
                    </div>
                    <div className="my-4">
                      <p className="text-xs font-medium text-gray-500 uppercase">
                        Symptons
                      </p>
                      <p className="text-sm text-gray-800 line-clamp-2">
                        {app?.patientNote}
                      </p>
                    </div>

                    <div className="mt-5">
                      <Link
                        to={routeLinks?.doctor?.appointment + "/" + app.id}
                        className="mt-4 px-4 py-2 border border-primary text-primary text-sm rounded-md hover:bg-primary hover:text-white transition"
                      >
                        View Appointment
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
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
