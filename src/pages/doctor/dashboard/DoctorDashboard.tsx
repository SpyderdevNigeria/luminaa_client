import { useEffect } from "react";
import doctorApi from "../../../api/doctorApi";

import DashboardCard from "../../../components/common/DashboardCard";
import HeaderTab from "../../../components/common/HeaderTab";
import Table, { Column } from "../../../components/common/Table";
import StatusBadge from "../../../components/common/StatusBadge";
import CustomCalendar from "../../../components/common/CustomCalendar";
import moment from "moment";
import useAppointments from "../../../hooks/useAppointments";

function DoctorDashboard() {
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
  } = useAppointments(doctorApi);
 
    useEffect(() => {
       if (appointments.length > 0 && status === "" && dataFrom === "" && dateTo === "" && page === 1 ) {
      setLoadingAppointment(false);
      return 
    }
    getAppointments();
  }, [page, status, dataFrom, dateTo]);

  const appointmentColumns: Column<any>[] = [
    { key: "id", label: "ID", arrows: true,
      render: (appointment) => <h4 className="max-w-[50px] line-clamp-1">{appointment?.id}</h4>,

     },
    {
      key: "patientName",
      label: "Patient Name",
      render: (appointment) => (
        <div className="flex items-center gap-2">
          <h5 className="text-sm">{appointment?.patient.firstName} {appointment?.patient.LastName}</h5>
        </div>
      ),
      arrows: true,
    },
    {
      key: "status",
      label: "Status",
      render: (appointment) => <StatusBadge status={appointment.status} />,
      arrows: true,
    },
        {
      key: "scheduledDate",
      label: "date",
      render: (appointment) => <h4>{moment(appointment.scheduledDate).format("YYYY-MM-DD HH:mm")}</h4>,
    },
  ];

    if (errorAppoint) return <p className="text-center mt-10 text-red-500">{errorAppoint}</p>;
  return (
    <div className="flex flex-col gap-4">
      <section className="flex flex-col gap-4">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardCard title="Total Appointments" count={appointments.length} />
          <DashboardCard title="Patients" count={50} />
          <DashboardCard title="Upcoming" count={30} />
          <DashboardCard title="Cancelled" count={20} />
        </div>

        <main className="flex items-center justify-between p-2 border-y border-dashboard-gray">
          <h5 className="text-text-primary font-semibold">
            Please Update your profile to verify your Account
          </h5>
          <button className="py-2 px-4 rounded-lg bg-red-800 text-white text-sm">
            Complete Verification
          </button>
        </main>
      </section>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="col-span-2 border border-dashboard-gray p-2 rounded-lg">
            <HeaderTab title="Appointment" showSearch={false} showSort={false} />
            <div>
              {loadingAppointment ? (
                <p>Loading...</p>
              ) : (
                <Table
                  data={appointments}
                  columns={appointmentColumns}
                  page={page}
                  total={total}
                  limit={limit} 
                 totalPages={totalPages}
                  setPage={(e) => {return  handleSetPage(e)}}
                  showPaginate={false}
                />
              )}
            </div>
          </div>
          <CustomCalendar />
        </div>
      </section>
    </div>
  );
}

export default DoctorDashboard;
