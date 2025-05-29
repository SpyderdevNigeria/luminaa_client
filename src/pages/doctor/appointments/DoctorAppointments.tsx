import { useEffect } from "react";
import Dropdown from "../../../components/dropdown/dropdown";
import DashboardCard from "../../../components/common/DashboardCard";

import PaginationComponent from "../../../components/common/PaginationComponent";
import doctorApi from "../../../api/doctorApi";
import useAppointments from "../../../hooks/useAppointments";
import { Link } from "react-router-dom";
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
        if (appointments.length > 0 && status === "" && dataFrom === "" && dateTo === "" && page === 1 ) {
      setLoadingAppointment(false);
      return 
    }
    getAppointments();
  }, [page, status, dataFrom, dateTo]);

    if (loadingAppointment) return <p>Loading...</p>;

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
            handleSetPage(1); // Reset page on filter change
          }}
          className="cursor-pointer hover:bg-gray-100 p-1 rounded"
        >
          {s === "" ? "All" : s}
        </li>
      ))}
    </ul>
  </Dropdown>

  {/* Date From/To */}
  <div className="flex items-center">
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
          <DashboardCard title="Total Appointments" count={100} />
          <DashboardCard title="Patients" count={50} />
          <DashboardCard title="Upcoming" count={30} />
          <DashboardCard title="Cancelled" count={20} />
        </div>
      </main>

      {/* Appointments List */}
      <section className="border border-dashboard-gray p-2 rounded-lg">
        {/* <HeaderTab title="Appointments" showSearch={false} showSort={true} /> */}

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
                className="border-l-4 border-primary bg-[#F9F9F9] p-4 rounded-md flex justify-between items-center"
              >
                <div>
                  <h3 className="font-medium text-sm">
                    Patient: {app.patient.firstName} {app.patient.lastName}
                  </h3>
                  <p className="text-xs text-gray-600">Status: {app.status}</p>
                  <p className="text-xs text-gray-600">
                    Date: {formattedDate} | Time: {formattedTime}
                  </p>
                  <p className="text-xs text-gray-600">Location: {app.location}</p>
                </div>
                <div>
                  <Link to={`/doctor/appointment/${app.id}`} className="text-sm text-primary underline">View</Link>
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
