import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DoctorApi from "../../../api/doctorApi";
import Table, { Column } from "../Table";
import moment from "moment";

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

  useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const data = await DoctorApi.getPatientsDiagnosesById(id);
        setDiagnoses(data?.data || []);
      } catch (err) {
        setError("Failed to fetch diagnoses.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDiagnoses();
  }, [id]);

  const columns: Column<Diagnosis>[] = [
    {
      key: "id",
      label: "ID",
      render: (item) => <span className="text-xs">#{item?.id?.slice(0, 8)}</span>,
    },
    {
      key: "primaryDiagnosis",
      label: "Diagnosis",
      render: (item) => <span className="capitalize text-sm">{item?.primaryDiagnosis}</span>,
    },
    {
      key: "severity",
      label: "Severity",
      render: (item) => <span className="capitalize text-sm">{item?.severity}</span>,
    },
    {
      key: "diagnosisDate",
      label: "Date",
      render: (item) => <span className="text-sm">{moment(item?.diagnosisDate).format("LLL")}</span>,
    },
    {
      key: "diagnosingDoctor",
      label: "Doctor",
      render: (item) => <span className="text-sm">{item?.diagnosingDoctor?.name || "—"}</span>,
    },
    {
      key: "notes",
      label: "Doctor's Note",
      render: (item) => <span className="text-sm">{item?.notes || "—"}</span>,
    },
    {
      key: "additionalRecommendations",
      label: "Recommendation",
      render: (item) => <span className="text-sm">{item?.additionalRecommendations || "—"}</span>,
    },
  ];

  return (
    <div className="">
      <h4 className="text-inactive text-base mb-2">Diagnosis History</h4>

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
    </div>
  );
}

export default PatientDiagnosis;
