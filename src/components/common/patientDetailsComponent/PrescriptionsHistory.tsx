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

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const data = await DoctorApi.getPatientsPrescriptionById(id);
        setPrescriptions(data?.data || []);
      } catch (err) {
        setError("Failed to fetch prescriptions.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, [id]);

  const columns: Column<Prescription>[] = [
    {
      key: "id",
      label: "ID",
      render: (item) => <span className="text-xs">#{item.id.slice(0, 8)}</span>,
    },
    {
      key: "medicationName",
      label: "Medication",
      render: (item) => <span className="capitalize text-sm">{item.medicationName}</span>,
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
      render: (item) => <span className="text-sm">{item.instructions || "—"}</span>,
    },
    {
      key: "prescribedDate",
      label: "Date",
      render: (item) => <span className="text-sm">{moment(item.prescribedDate).format("LLL")}</span>,
    },
    {
      key: "prescribingDoctor",
      label: "Doctor",
      render: (item) => <span className="text-sm">{item.prescribingDoctor?.name || "—"}</span>,
    },
  ];

  return (
    <div className="">
      <h4 className="text-inactive text-base mb-2">Prescriptions History</h4>

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
