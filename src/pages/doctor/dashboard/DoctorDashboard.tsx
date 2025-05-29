import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../../store";
import { setAppointments } from "../../../reducers/appointmentSlice";
import doctorApi from "../../../api/doctorApi";

import DashboardCard from "../../../components/common/DashboardCard";
import HeaderTab from "../../../components/common/HeaderTab";
import Table, { Column } from "../../../components/common/Table";
import StatusBadge from "../../../components/common/StatusBadge";
import CustomCalendar from "../../../components/common/CustomCalendar";

function DoctorDashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const appointments = useSelector((state: RootState) => state.appointments.appointments);

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const getAppointments = async () => {
    setLoading(true);
    try {
      const response = await doctorApi.getAppointments();
      console.log(response)
      if (response?.data) {
        dispatch(setAppointments(response.data));
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (appointments.length > 0) {
      setLoading(false);
      return 
    }
    getAppointments();
  }, []);

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedOrders = appointments.slice(startIndex, startIndex + pageSize);

  const pagination = {
    hasPrevPage: currentPage > 1,
    hasNextPage: currentPage < Math.ceil(appointments.length / pageSize),
    totalPages: Math.ceil(appointments.length / pageSize),
    totalDocs: appointments.length,
  };

  const appointmentColumns: Column<any>[] = [
    { key: "id", label: "ID", arrows: true },
    {
      key: "patientName",
      label: "Patient Name",
      render: (item) => (
        <div className="flex items-center gap-2">
          <img src="" alt="" className="w-5 h-5 rounded-full" />
          <h5 className="text-sm">{item.patientName}</h5>
        </div>
      ),
      arrows: true,
    },
    {
      key: "location",
      label: "Location",
      render: (item) => <h4>{item.location}</h4>,
    },
    {
      key: "status",
      label: "Status",
      render: (item) => <StatusBadge status={item.status} />,
      arrows: true,
    },
  ];

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
            <HeaderTab title="Appointment" showSearch={false} showSort={true} />
            <div>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <Table
                  data={paginatedOrders}
                  columns={appointmentColumns}
                  pagination={pagination}
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
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
