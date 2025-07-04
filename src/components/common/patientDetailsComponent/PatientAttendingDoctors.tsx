import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DoctorApi from "../../../api/doctorApi";
import Table, { Column } from "../Table";
import moment from "moment";

interface AttendingDoctor {
  id: string;
  name: string;
  specialization: string;
  licenseNumber: string;
  contactNumber: string;
  totalAppointments: number;
  lastAppointmentDate: string;
  activePrescriptions: number;
}

function PatientAttendingDoctors() {
  const { id } = useParams<{ id: string }>();
  const [doctors, setDoctors] = useState<AttendingDoctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const fetchDoctors = async () => {
    if (!id) return;
    try {
      setLoading(true);

      const params = new URLSearchParams();
      if (dateFrom) params.append("dateFrom", dateFrom);
      if (dateTo) params.append("dateTo", dateTo);
      const query = params.toString() ? `?${params.toString()}` : "";

      const data = await DoctorApi.getPatientsAttendingDoctorById(id, query);
      setDoctors(data?.data || data || []);
    } catch (err) {
      setError("Failed to fetch attending doctors.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, [id, dateFrom, dateTo]);

  const columns: Column<AttendingDoctor>[] = [
    {
      key: "id",
      label: "ID",
      render: (item) => <span className="text-xs">#{item.id.slice(0, 8)}</span>,
    },
    {
      key: "name",
      label: "Name",
      render: (item) => <span className="capitalize text-sm">{item.name}</span>,
    },
    {
      key: "specialization",
      label: "Specialization",
      render: (item) => <span className="text-sm">{item.specialization}</span>,
    },
    {
      key: "licenseNumber",
      label: "License No.",
      render: (item) => <span className="text-sm">{item.licenseNumber}</span>,
    },
    {
      key: "contactNumber",
      label: "Contact",
      render: (item) => <span className="text-sm">{item.contactNumber}</span>,
    },
    {
      key: "totalAppointments",
      label: "Appointments",
      render: (item) => <span className="text-sm">{item.totalAppointments}</span>,
    },
    {
      key: "activePrescriptions",
      label: "Active Prescriptions",
      render: (item) => <span className="text-sm">{item.activePrescriptions}</span>,
    },
    {
      key: "lastAppointmentDate",
      label: "Last Appointment",
      render: (item) => (
        <span className="text-sm">
          {moment(item.lastAppointmentDate).format("LLL")}
        </span>
      ),
    },
  ];

  return (
    <div className="container-bd">
      <h4 className="text-inactive text-base mb-4">Attending Doctors</h4>

      {/* Date Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
        <div className="w-full sm:w-64">
          <label className="text-sm font-medium text-gray-700">From</label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
        </div>
        <div className="w-full sm:w-64">
          <label className="text-sm font-medium text-gray-700">To</label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <Table<AttendingDoctor>
          data={doctors}
          columns={columns}
          limit={10}
          total={doctors.length}
          page={1}
          totalPages={1}
          setPage={() => {}}
        />
      )}
    </div>
  );
}

export default PatientAttendingDoctors;
