import Dropdown from "../../../components/dropdown/dropdown";
import { IoCalendarClearOutline } from "react-icons/io5";
import { PiExport } from "react-icons/pi";
import { FiPlus } from "react-icons/fi";
import DashboardCard from "../../../components/common/DashboardCard";
import HeaderTab from "../../../components/common/HeaderTab";
import Table, { Column } from "../../../components/common/Table";
import { useState } from "react";
import { Link } from "react-router-dom";
import routeLinks from "../../../utils/routes";
function DoctorAppointments() {
  const allAppointment = new Array(40).fill(null).map((_, i) => ({
    id: `12${500 + i}`,
    patientName: "Chukwuemeka Enyinnia",
    email: "emekaenyinnia@gmail.com",
    phone: "8107401049",
    Age: "34",
    location: "Ago palace way isolo",
    gender: "male",
    action: "",
  }));

  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * pageSize;
  const pgAppoint = allAppointment.slice(startIndex, startIndex + pageSize);

  const pagination = {
    hasPrevPage: currentPage > 1,
    hasNextPage: currentPage < Math.ceil(allAppointment.length / pageSize),
    totalPages: Math.ceil(allAppointment.length / pageSize),
    totalDocs: allAppointment.length,
  };

  interface appointmentType {
    id: string;
    patientName: string;
    email: string;
    phone: string;
    Age: string;
    location: string;
    gender: string;
    action: string;
  }

  const appointmentColumns: Column<appointmentType>[] = [
    { key: "id", label: "ID", arrows: true, render: (pgAppoint) =>
    (
      <h5 className="text-sm">#{pgAppoint?.id}</h5>
    )
    },
    {
      key: "patientName",
      label: "Patient Name",
      render: (pgAppoint) => (
        <div className="flex items-center gap-2">
          <img
            src="https://via.placeholder.com/20"
            alt={pgAppoint.patientName}
            className="w-5 h-5 rounded-full"
          />
          <h5 className="text-sm">{pgAppoint?.patientName}</h5>
        </div>
      ),
      arrows: true,
    },
    {
      key: "email",
      label: "Email",
      render: (pgAppoint) => <a href="mailto:" className="text-sm underline">{pgAppoint.email}</a>,
    },
    {
      key: "phone",
      label: "Phone",
      render: (pgAppoint) => <p className="text-sm">{pgAppoint.phone}</p>,
    },
    {
      key: "Age",
      label: "Age",
      render: (pgAppoint) => <span className="text-sm">{pgAppoint.Age}</span>,
    },
    {
      key: "gender",
      label: "Gender",
      render: (pgAppoint) => (
        <span className="capitalize text-sm">{pgAppoint.gender}</span>
      ),
    },
    {
      key: "location",
      label: "Location",
      render: (pgAppoint) => <p className="text-sm">{pgAppoint.location}</p>,
    },
    {
      key: "action",
      label: "Action",
      render: (pgAppoint) => (
        <Link to={routeLinks?.doctor?.appointment+'/'+pgAppoint?.id} className="text-primary underline text-xs">View</Link>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between my-2">
        <Dropdown
          triggerLabel="Date range : This Week"
          showArrow
          triggerIcon={<IoCalendarClearOutline />}
        >
          <ul className="space-y-2 text-sm">
            <li className="cursor-pointer hover:bg-gray-100 p-1 rounded">
              Day
            </li>
            <li className="cursor-pointer hover:bg-gray-100 p-1 rounded">
              Week
            </li>
            <li className="cursor-pointer hover:bg-gray-100 p-1 rounded">
              Month
            </li>
          </ul>
        </Dropdown>
        <div className="flex flex-row items-center gap-3">
          <button className="cursor-pointer inline-flex items-center gap-2 text-sm py-2 px-3 border border-dashboard-gray rounded-sm">
            <PiExport />
            Export Csv
          </button>

          <button className="bg-primary text-white px-6 py-2  text-sm rounded-md flex items-center gap-2">
            <FiPlus />
            Add Doctor
          </button>
        </div>
      </div>
      <main>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4">
          <DashboardCard title="Total Appointments" count={100} />
          <DashboardCard title="Patients" count={50} />
          <DashboardCard title="Upcoming" count={30} />
          <DashboardCard title="Cancelled" count={20} />
        </div>
      </main>

      <section className="border border-dashboard-gray p-2 rounded-lg">
        <HeaderTab title="Appointment" showSearch={false} showSort={true} />
        <div className="">
          <Table
            data={pgAppoint}
            columns={appointmentColumns}
            pagination={pagination}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            showPaginate={false}
          />
        </div>
      </section>
    </div>
  );
}

export default DoctorAppointments;
