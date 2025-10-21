import { useEffect, useState } from "react";
import { useToaster } from "../../ToasterContext";
import AdminApi from "../../../../api/adminApi";

interface ProcedureResultsProps {
  procedure: any;
  procedureId: string;
  fetchProcedure?: () => void;
}

const ProcedureResults = ({ procedure, procedureId, fetchProcedure }: ProcedureResultsProps) => {
  const { showToast } = useToaster();

  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState({
    findings: "",
    recommendations: "",
    biopsyTaken: false,
    complications: "",
  });

  useEffect(() => {
    if (!procedure?.procedureResults) {
      setEdit(true);
    } else {
      setEdit(false);
      setResults(procedure.procedureResults);
    }
  }, [procedure?.procedureResults]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setResults((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSaveResults = async () => {
    setLoading(true);
    try {
      await AdminApi.createProcedureResults(procedureId, { procedureResults: results });
      showToast("Procedure results saved successfully", "success");
      setEdit(false);
      fetchProcedure?.();
    } catch (error) {
      console.error("Error saving procedure results:", error);
      showToast("Failed to save procedure results", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {!edit && procedure?.procedureResults && (
        <div>
          <div className="flex justify-between items-center">
            <h1 className="text-sm font-medium text-gray-700">Procedure Results</h1>
            <button onClick={() => setEdit(true)} className="text-primary hover:underline">Edit</button>
          </div>
          <div className="text-sm text-gray-800 whitespace-pre-line bg-gray-50 p-3 rounded-md">
            <p><strong>Findings:</strong> {results.findings}</p>
            <p><strong>Recommendations:</strong> {results.recommendations}</p>
            <p><strong>Biopsy Taken:</strong> {results.biopsyTaken ? "Yes" : "No"}</p>
            <p><strong>Complications:</strong> {results.complications}</p>
          </div>
        </div>
      )}

      {edit && (
        <>
          <label className="text-sm text-gray-600">Findings</label>
          <textarea
            name="findings"
            value={results.findings}
            onChange={handleChange}
            rows={3}
            className="form-input border p-2"
            placeholder="Enter findings..."
          />
          <label className="text-sm text-gray-600">Recommendations</label>
          <textarea
            name="recommendations"
            value={results.recommendations}
            onChange={handleChange}
            rows={2}
            className="form-input border p-2"
            placeholder="Enter recommendations..."
          />
          <label className="text-sm text-gray-600">Complications</label>
          <textarea
            name="complications"
            value={results.complications}
            onChange={handleChange}
            rows={2}
            className="form-input border p-2"
            placeholder="Enter complications..."
          />
          <label className="flex items-center gap-2 mt-2 text-sm">
            <input
              type="checkbox"
              name="biopsyTaken"
              checked={results.biopsyTaken}
              onChange={handleChange}
            />
            Biopsy Taken
          </label>
          <button
            onClick={handleSaveResults}
            className="mt-3 px-4 py-2 bg-primary text-white rounded"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Results"}
          </button>
        </>
      )}
    </div>
  );
};

export default ProcedureResults;
