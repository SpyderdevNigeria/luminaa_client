import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DoctorApi from "../../../api/doctorApi";
import Table, { Column } from "../Table";
import { IAppointment } from "../../../types/Interfaces";
import moment from "moment";

function PatientAppointmentHistory() {
  const { id } = useParams<{ id: string }>();
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");

  const fetchAppointments = async () => {
    if (!id) return;
    try {
      setLoading(true);

      const params = new URLSearchParams();
      if (dateFrom) params.append("dateFrom", dateFrom);
      if (dateTo) params.append("dateTo", dateTo);

      const query = params.toString() ? `?${params.toString()}` : "";

      const data = await DoctorApi.getPatientsAppointmentById(id, query);
      setAppointments(data?.data || []);
    } catch (err) {
      setError("Failed to fetch appointments.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [id, dateFrom, dateTo]);

  const columns: Column<IAppointment>[] = [
    {
      key: "id",
      label: "ID",
      render: (item) => (
        <span className="text-xs">#{item?.id?.slice(0, 8)}</span>
      ),
    },
    {
      key: "scheduledDate",
      label: "Date",
      render: (item) => (
        <span className="text-sm">
          {moment(item?.scheduledDate).format("ddd, MMM D, YYYY - h:mm A")}
        </span>
      ),
    },
    {
      key: "location",
      label: "Location",
      render: (item) => (
        <span className="text-sm capitalize">{item?.location}</span>
      ),
    },
    {
      key: "attendingDoctor",
      label: "Doctor",
      render: (item) => (
        <span className="text-sm">{item?.attendingDoctor?.name || "—"}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (item) => (
        <span className="text-sm capitalize">{item?.status}</span>
      ),
    },
    {
      key: "patientNote",
      label: "Patient Note",
      render: (item) => (
        <span className="text-sm">{item?.patientNote || "—"}</span>
      ),
    },
    {
      key: "onlineMeetingDetails",
      label: "Zoom Link",
      render: (item) =>
        item?.onlineMeetingDetails?.link ? (
          <a
            href={item.onlineMeetingDetails.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs underline text-primary"
          >
            Join
          </a>
        ) : (
          <span className="text-sm">—</span>
        ),
    },
  ];

  return (
    <div className="w-full">
      <h4 className="text-inactive text-base mb-4">Appointment History</h4>

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
      ) : appointments.length === 0 ? (
        <p className="text-gray-500">No appointments found.</p>
      ) : (
        <Table<IAppointment>
          data={appointments}
          columns={columns}
          limit={10}
          total={appointments.length}
          page={1}
          totalPages={1}
          setPage={() => {}}
        />
      )}
    </div>
  );
}

export default PatientAppointmentHistory;
