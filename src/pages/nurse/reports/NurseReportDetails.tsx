import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NurseApi from "../../../api/nurseApi";
import { FiArrowLeft } from "react-icons/fi";
import moment from "moment";

function NurseReportDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReport = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await NurseApi.getReportById(id);
      setReport(res?.data || res); 
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError("Failed to load report details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10">Loading report details...</p>;
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-500">
        <p>{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-primary underline"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!report) {
    return <p className="text-center mt-10">No report found.</p>;
  }

  return (
    <div className="p-4 md:p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-700 hover:text-primary"
        >
          <FiArrowLeft /> Back
        </button>
        <h1 className="text-xl font-semibold text-gray-800">
          Nurse Report Details
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-sm text-gray-500">Report Type</p>
          <p className="text-base font-medium text-gray-900">
            {report?.reportType || "N/A"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Month</p>
          <p className="text-base font-medium text-gray-900">
            {report?.month || "N/A"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Created Date</p>
          <p className="text-base font-medium text-gray-900">
            {moment(report?.createdAt).format("YYYY-MM-DD HH:mm")}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Nurse Name</p>
          <p className="text-base font-medium text-gray-900">
            {report?.nurse?.firstName
              ? `${report?.nurse?.firstName} ${report?.nurse?.lastName}`
              : "N/A"}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-sm text-gray-500 mb-2">Report Content</p>
        <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
          <p className="text-gray-800 whitespace-pre-line">
            {report?.content || "No content available."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default NurseReportDetails;
