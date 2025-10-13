import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DoctorApi from "../../../api/doctorApi";
import Table, { Column } from "../Table";
import moment from "moment";
import MedicalReportModal from "../../modal/DiagnosisReportModal";

interface Diagnosis {
  id: string;
  primaryDiagnosis: string;
  symptoms: string;
  notes: string;
  severity: string;
  diagnosisCode: string;
  isConfirmed: boolean;
  additionalRecommendations: string;
  diagnosisDate: string;
  diagnosis?: string;
  diagnosingDoctor?: {
    name: string;
    specialization: string;
  };
}

function PatientDiagnosis() {
  const { id } = useParams<{ id: string }>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<Diagnosis | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const fetchDiagnoses = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (dateFrom) params.append("dateFrom", dateFrom);
      if (dateTo) params.append("dateTo", dateTo);
      const query = params.toString() ? `?${params.toString()}` : "";

      const data = await DoctorApi.getPatientsDiagnosesById(id, query);
      setDiagnoses(data?.data || []);
    } catch (err) {
      setError("Failed to fetch diagnoses.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiagnoses();
  }, [id, dateFrom, dateTo]);

  const columns: Column<Diagnosis>[] = [
    {
      key: "id",
      label: "ID",
      render: (item) => <span className="text-xs">#{item?.id?.slice(0, 8)}</span>,
    },
    {
      key: "primaryDiagnosis",
      label: "Reason for the Appointment",
      render: (item) => (
        <span className="capitalize text-sm">{item?.primaryDiagnosis}</span>
      ),
    },
    {
      key: "symptoms",
      label: "Patient Symptoms",
      render: (item) => <span className="capitalize text-sm">{item?.symptoms}</span>,
    },
    {
      key: "diagnosisDate",
      label: "Date",
      render: (item) => (
        <span className="text-sm">{moment(item?.diagnosisDate).format("LLL")}</span>
      ),
    },
    {
      key: "diagnosingDoctor",
      label: "Doctor",
      render: (item) => (
        <span className="text-sm">{item?.diagnosingDoctor?.name || "—"}</span>
      ),
    },
    {
      key: "action",
      label: "Action",
      render: (item) => (
        <button
          onClick={() => {
            setSelectedDiagnosis(item);
            setModalOpen(true);
          }}
          className="text-xs underline text-primary"
        >
          View
        </button>
      ),
    },
  ];

  return (
    <div className="">
      <h4 className="text-inactive text-base mb-4">Diagnosis History</h4>

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
        <Table<Diagnosis>
          data={diagnoses}
          columns={columns}
          limit={10}
          total={diagnoses.length}
          page={1}
          totalPages={1}
          setPage={() => {}}
        />
      )}

      {selectedDiagnosis && (
        <MedicalReportModal
          isModalOpen={isModalOpen}
          setModalOpen={setModalOpen}
          data={selectedDiagnosis}
          type="doctor"
        />
      )}
    </div>
  );
}

export default PatientDiagnosis;
