import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DoctorApi from "../../../api/doctorApi";
import Table, { Column } from "../Table";
import moment from "moment";

interface Prescription {
  id: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  prescribedDate: string;
  prescribingDoctor?: {
    name: string;
    specialization: string;
  };
}

function PrescriptionsHistory() {
  const { id } = useParams<{ id: string }>();
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const fetchPrescriptions = async () => {
    if (!id) return;
    try {
      setLoading(true);

      const params = new URLSearchParams();
      if (dateFrom) params.append("dateFrom", dateFrom);
      if (dateTo) params.append("dateTo", dateTo);
      const query = params.toString() ? `?${params.toString()}` : "";

      const data = await DoctorApi.getPatientsPrescriptionById(id, query);
      setPrescriptions(data?.data || []);
    } catch (err) {
      setError("Failed to fetch prescriptions.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, [id, dateFrom, dateTo]);

  const columns: Column<Prescription>[] = [
    {
      key: "id",
      label: "ID",
      render: (item) => <span className="text-xs">#{item.id.slice(0, 8)}</span>,
    },
    {
      key: "medicationName",
      label: "Medication",
      render: (item) => (
        <span className="capitalize text-sm">{item.medicationName}</span>
      ),
    },
    {
      key: "dosage",
      label: "Dosage",
      render: (item) => <span className="text-sm">{item.dosage}</span>,
    },
    {
      key: "frequency",
      label: "Frequency",
      render: (item) => <span className="text-sm">{item.frequency}</span>,
    },
    {
      key: "duration",
      label: "Duration",
      render: (item) => <span className="text-sm">{item.duration}</span>,
    },
    {
      key: "instructions",
      label: "Instructions",
      render: (item) => (
        <span className="text-sm">{item.instructions || "—"}</span>
      ),
    },
    {
      key: "prescribedDate",
      label: "Date",
      render: (item) => (
        <span className="text-sm">
          {moment(item.prescribedDate).format("LLL")}
        </span>
      ),
    },
    {
      key: "prescribingDoctor",
      label: "Doctor",
      render: (item) => (
        <span className="text-sm">{item.prescribingDoctor?.name || "—"}</span>
      ),
    },
  ];

  return (
    <div className="">
      <h4 className="text-inactive text-base mb-4">Prescriptions History</h4>

      {/* Date Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
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
        <Table<Prescription>
          data={prescriptions}
          columns={columns}
          limit={10}
          total={prescriptions.length}
          page={1}
          totalPages={1}
          setPage={() => {}}
        />
      )}
    </div>
  );
}

export default PrescriptionsHistory;
