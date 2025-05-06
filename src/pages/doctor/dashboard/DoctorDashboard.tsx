import { useState } from "react";
import DashboardCard from "../../../components/common/DashboardCard"
import HeaderTab from "../../../components/common/HeaderTab"
import Table, { Column } from "../../../components/common/Table"
import StatusBadge from "../../../components/common/StatusBadge";
import CustomCalendar from "../../../components/common/CustomCalendar";

function DoctorDashboard() {
  const allAppointment = new Array(4).fill(null).map((_, i) => ({
    id: `#12${500 + i}`,
    price: 50000.0,
    status: "paid",
  }));

  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedOrders = allAppointment.slice(startIndex, startIndex + pageSize);

  const pagination = {
    hasPrevPage: currentPage > 1,
    hasNextPage: currentPage < Math.ceil(allAppointment.length / pageSize),
    totalPages: Math.ceil(allAppointment.length / pageSize),
    totalDocs: allAppointment.length,
  };

  interface OrderType {
    id: string;
    price: number;
    status: string;
  }

  const appointmentColumns: Column<OrderType>[] = [
    { key: "id", label: "ID",  arrows:true, },
    {
      key: "patient name",
      label: "Patient Name ",
      render: () => (
        <div className="flex items-center gap-2">
          <img src="" alt="" className="w-5 h-5 rounded-full " />
          <h5 className="text-sm">Cody Fisher</h5>
        </div>
      ),
        arrows:true,
    },
    {
      key:'Location',
      label:'Location',
      render: () => (
        <h4>{'New York City, NY'}</h4>
      )
    },
    {
      key: "status",
      label: "Status",
      render: (appointment) => (
        <StatusBadge status={appointment.status} />
      ),
      arrows:true,
    },
  ];
  return (
    <div className="flex flex-col gap-4">
      <section className="flex flex-col gap-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4">
          <DashboardCard title="Total Appointments" count={100} />
          <DashboardCard title="Patients" count={50} />
          <DashboardCard title="Upcoming" count={30} />
          <DashboardCard title="Cancelled" count={20} />
        </div>

        <main className="flex items-center justify-between p-2 border-y border-dashboard-gray">
          <h5 className="text-text-primary font-semibold">Please Update your profile to verify your Account</h5>
          <button className="py-2 px-4 rounded-lg bg-red-800 text-white text-sm ">Complete Verification</button>
        </main>
      </section>
        <section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-2 border border-dashboard-gray p-2 rounded-lg">
            <HeaderTab title="Appointment" showSearch={false} showSort={true} />
            <div className="">
            <Table 
                    data={paginatedOrders}
                    columns={appointmentColumns}
                    pagination={pagination}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                    showPaginate={false}
              />
            </div>
            </div>
              <CustomCalendar/>
          </div>
        </section>
    </div>
  )
}

export default DoctorDashboard