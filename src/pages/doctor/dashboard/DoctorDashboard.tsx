import { useEffect } from "react";
import doctorApi from "../../../api/doctorApi";

import DashboardCard from "../../../components/common/DashboardCard";
import HeaderTab from "../../../components/common/HeaderTab";
import Table, { Column } from "../../../components/common/Table";
import StatusBadge from "../../../components/common/StatusBadge";
import CustomCalendar from "../../../components/common/CustomCalendar";
import moment from "moment";
import useAppointments from "../../../hooks/useAppointments";
import routeLinks from "../../../utils/routes";
import { Link } from "react-router-dom";
import useUsers from "../../../hooks/useUsers";

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

    const {
    users,
    getUsers,
  } = useUsers(doctorApi);
 
    useEffect(() => {
       if (appointments.length > 0 && status === "" && dataFrom === "" && dateTo === "" && page === 1 ) {
      setLoadingAppointment(false);
      return 
    }
    getUsers();
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
          <h5 className="text-sm">{appointment?.patient?.firstName} {appointment?.patient?.LastName}</h5>
        </div>
      ),
      arrows: true,
    },
    {
      key: "status",
      label: "Status",
      render: (appointment) => <StatusBadge status={appointment?.status} />,
      arrows: true,
    },
        {
      key: "scheduledDate",
      label: "date",
      render: (appointment) => <h4>{moment(appointment?.scheduledDate).format("YYYY-MM-DD HH:mm")}</h4>,
    },
         {
      key: "Action",
      label: "view",
      render: (appointment) => <Link to={routeLinks?.doctor?.appointment+'/'+appointment?.id} className="underline text-primary">view</Link>,
    },
  ];

  const now = new Date();

    const upcomingAppointments = appointments.filter(
    (app) => new Date(app.scheduledDate) > now || app.status !== "completed"
  );
  const pastAppointments = appointments.filter(
    (app) => app.status === "completed"
  );

    if (errorAppoint) return <p className="text-center mt-10 text-red-500">{errorAppoint}</p>;
  return (
    <div className="flex flex-col gap-4">
      <section className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <DashboardCard title="Appointments" count={appointments.length} />
          <DashboardCard title="Patients" count={users?.length || 0} />
          <DashboardCard title="Upcoming" count={upcomingAppointments?.length} />
          <DashboardCard title="Completed" count={pastAppointments?.length} />
        </div>
      </section>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="md:col-span-2 border border-dashboard-gray p-2 lg:p-4 rounded-lg bg-white ">
            <HeaderTab title="Appointment" showSearch={false} />
            <div>
              {loadingAppointment ? (
                <p>Loading...</p>
              ) : appointments.length > 0 ? (
                <Table
                  data={appointments?.slice(0, 5)}
                  columns={appointmentColumns}
                  page={page}
                  total={total}
                  limit={limit} 
                 totalPages={totalPages}
                  setPage={(e) => {return  handleSetPage(e)}}
                  showPaginate={false}
                />
              ) :  
              <p className="text-center my-24">
                  you dont have any appointment
              </p>
              }
            </div>
          </div>
          <CustomCalendar />
        </div>
      </section>
    </div>
  );
}

export default DoctorDashboard;
