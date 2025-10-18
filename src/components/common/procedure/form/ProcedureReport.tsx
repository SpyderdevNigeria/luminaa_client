import { useEffect, useState } from "react";
import { useToaster } from "../../ToasterContext";
import AdminApi from "../../../../api/adminApi";

interface ProcedureReportProps {
  procedure: any;
  procedureId: string;
  fetchProcedure?: () => void; 
}

const ProcedureReport = ({ procedure, procedureId, fetchProcedure }: ProcedureReportProps) => {
  const { showToast } = useToaster();

  const [edit, setEdit] = useState(false);
  const [reportText, setReportText] = useState(procedure?.procedureReport || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!procedure?.procedureReport) {
      setEdit(true);
    } else {
      setEdit(false);
      setReportText(procedure?.procedureReport);
    }
  }, [procedure?.procedureReport]);

  const handleSaveReport = async () => {
    if (!reportText.trim()) {
      showToast("Please enter a report before submitting", "error");
      return;
    }

    setLoading(true);
    try {
      await AdminApi.createProcedureReport(procedureId, { procedureReport: reportText });
      showToast("Procedure report saved successfully", "success");
      setEdit(false);
      fetchProcedure?.();
    } catch (error) {
      console.error("Error saving procedure report:", error);
      showToast("Failed to save report", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {procedure?.procedureReport && !edit && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-sm font-medium text-gray-700">Procedure Report</h1>
            <button onClick={() => setEdit(true)} className="text-primary hover:underline">
              Edit
            </button>
          </div>
          <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-800 whitespace-pre-line">
            {procedure?.procedureReport}
          </div>
        </div>
      )}

      {edit && (
        <div className="flex flex-col gap-3">
          <label className="text-sm text-gray-600">Procedure Report</label>
          <textarea
            rows={5}
            value={reportText}
            onChange={(e) => setReportText(e.target.value)}
            className="w-full form-input rounded p-2 border border-gray-300"
            placeholder="Enter detailed procedure report..."
          />
          <button
            onClick={handleSaveReport}
            className="mt-2 px-4 py-2 bg-primary text-white rounded w-full"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Report"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProcedureReport;
