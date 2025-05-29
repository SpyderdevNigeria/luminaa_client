import { useEffect } from "react";
import { Link } from "react-router-dom";
import Dropdown from "../../../components/dropdown/dropdown";
import DashboardCard from "../../../components/common/DashboardCard";
import PaginationComponent from "../../../components/common/PaginationComponent";
import doctorApi from "../../../api/doctorApi";
import useAppointments from "../../../hooks/useAppointments";

function DoctorAppointments() {
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
    setStatus,
    setDataFrom,
    setDateTo,
    getAppointments,
    handleSetPage,
  } = useAppointments(doctorApi);

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

  if (loadingAppointment) return <p>Loading...</p>;

  // --- Metrics Calculation ---
  const totalAppointments = appointments.length;
  const uniquePatients = new Set(
    appointments.map((a: any) => a.patient.id)
  ).size;
  const upcomingAppointments = appointments.filter(
    (a: any) => a.status !== "cancelled"
  ).length;
  const cancelledAppointments = appointments.filter(
    (a: any) => a.status === "cancelled"
  ).length;

  return (
    <div className="flex flex-col gap-4">
      {/* Filters and Actions */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center my-2">
        {/* Status Filter */}
        <Dropdown triggerLabel={`Status: ${status || "All"}`} showArrow>
          <ul className="space-y-2 text-sm">
            {["", "scheduled", "confirmed", "completed", "cancelled", "no_show"].map((s) => (
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

        {/* Date Range Filters */}
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
        </div>
      </div>

      {/* Dashboard Cards */}
      <main>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <DashboardCard title="Total Appointments" count={totalAppointments} />
          <DashboardCard title="Patients" count={uniquePatients} />
          <DashboardCard title="Upcoming" count={upcomingAppointments} />
          <DashboardCard title="Cancelled" count={cancelledAppointments} />
        </div>
      </main>

      {/* Appointment Cards */}
      <section className="border border-dashboard-gray p-2 rounded-lg">
        <div className="grid gap-4 py-4">
          {appointments.map((app: any) => {
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
                  <p><span className="font-semibold">Patient:</span> {app.patient.firstName} {app.patient.lastName}</p>
                  <p><span className="font-semibold">Status:</span> {app.status}</p>
                  <p><span className="font-semibold">Date:</span> {formattedDate}</p>
                  <p><span className="font-semibold">Time:</span> {formattedTime}</p>
                  <p><span className="font-semibold">Location:</span> {app.location}</p>
                </div>
                <div className="self-start md:self-center">
                  <Link
                    to={`/doctor/appointment/${app.id}`}
                    className="text-sm text-primary underline"
                  >
                    View
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <PaginationComponent
          page={page}
          total={total}
          limit={limit}
          totalPages={totalPages}
          onPageChange={(e: number) => handleSetPage(e)}
        />
      </section>
    </div>
  );
}

export default DoctorAppointments;
