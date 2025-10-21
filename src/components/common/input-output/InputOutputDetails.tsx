import { useEffect, useState } from "react";
import { useParams,  } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import AdminApi from "../../../api/adminApi";
import { useToaster } from "../ToasterContext";
import DoctorApi from "../../../api/doctorApi";


interface InputOutputDetails {
  id: string;
  patientId: string;
  procedureId: string;
  type: "input" | "output";
  drugType: string;
  amount: string;
  data: {
    route: string;
    flowRate: string;
  };
  remark: string;
  timestamp: string;
  createdAt: string;
  updatedAt: string;
  patient?: {
    id: string;
    user?: {
      firstName: string;
      lastName: string;
      email: string;
    };
  };
  procedure?: {
    id: string;
    name: string;
    type: string;
  };
}

const InputOutputDetails = ({type, onBack} :any) => {
  const { id } = useParams<{ id: string }>();
  const { showToast } = useToaster();

  const [details, setDetails] = useState<InputOutputDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

const fetchDetails = async () => {
  if (!id) return;
  setLoading(true);
  try {
    const res = await (type === 'admin'
      ? AdminApi.getInputOutputById(id)
      : DoctorApi.getInputOutputById(id));
      
    setDetails(res.data);
  } catch (error) {
    console.error("Error fetching details:", error);
    showToast("Failed to load input/output details", "error");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!details) return <p>No details found.</p>;

  return (
    <main className="p-4 space-y-4">
      <button
        onClick={() => onBack()}
        className="flex items-center gap-2 text-primary"
      >
        <FiArrowLeft /> Back
      </button>

      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Input/Output Details</h2>

        {details ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Info label="Patient Name" value={`${details?.patient?.user?.firstName || "N/A"} ${details?.patient?.user?.lastName || ""}`} />
            <Info label="Patient Email" value={details?.patient?.user?.email || "N/A"} />
            <Info label="Procedure Name" value={details?.procedure?.name || "N/A"} />
            <Info label="Procedure Type" value={details?.procedure?.type || "N/A"} />
            <Info label="Type" value={details?.type?.toUpperCase()} />
            <Info label="Drug Type" value={details?.drugType || "N/A"} />
            <Info label="Amount" value={details?.amount || "N/A"} />
            <Info label="Route" value={details?.data?.route || "N/A"} />
            <Info label="Flow Rate" value={details?.data?.flowRate || "N/A"} />
            <Info label="Remark" value={details?.remark || "N/A"} />
            <Info label="Timestamp" value={new Date(details?.timestamp).toLocaleString()} />
            <Info label="Created At" value={new Date(details?.createdAt).toLocaleString()} />
            <Info label="Updated At" value={new Date(details?.updatedAt).toLocaleString()} />
          </div>
        ) : (
          <p>No details found for this record.</p>
        )}
      </div>
    </main>
  );
};

const Info = ({ label, value }: { label: string; value: string }) => (
  <div className="border rounded-md p-3 bg-gray-50">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium text-gray-800">{value || "N/A"}</p>
  </div>
);

export default InputOutputDetails;
