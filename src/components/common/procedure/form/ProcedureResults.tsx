import { useEffect, useState } from "react";
import { useToaster } from "../../ToasterContext";
import DoctorApi from "../../../../api/doctorApi";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface ProcedureResultsProps {
  procedure: any;
  procedureId: string;
  fetchProcedure?: () => void;
}

const ProcedureResults = ({
  procedure,
  procedureId,
  fetchProcedure,
}: ProcedureResultsProps) => {
  const { showToast } = useToaster();

  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const [results, setResults] = useState({
    procedureType: "",
    anaesthesia: "",
    additionalTakes: [{ type: "", description: "" }],
    impression: "",
    comment: "",
  });

  const [openFindingIndex, setOpenFindingIndex] = useState<number | null>(null);

  // Initialize or load existing results
  useEffect(() => {
    if (!procedure?.procedureResults) {
      setEdit(true);
      setResults((prev) => ({
        ...prev,
        procedureType: procedure?.type || "",
        additionalTakes: prev.additionalTakes || [{ type: "", description: "" }],
      }));
    } else {
      setEdit(false);
      const existing = procedure.procedureResults;
      setResults({
        procedureType: procedure?.type || existing?.procedureType || "",
        anaesthesia: existing?.anaesthesia || "",
        additionalTakes:
          Array.isArray(existing?.additionalTakes) && existing.additionalTakes.length > 0
            ? existing.additionalTakes
            : [{ type: "", description: "" }],
        impression: existing?.impression || "",
        comment: existing?.comment || "",
      });
    }
  }, [procedure?.procedureResults, procedure?.type]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setResults((prev) => ({ ...prev, [name]: value }));
  };

  const handleFindingChange = (
    index: number,
    field: "type" | "description",
    value: string
  ) => {
    const updatedFindings = [...results.additionalTakes];
    updatedFindings[index][field] = value;
    setResults((prev) => ({ ...prev, additionalTakes: updatedFindings }));
  };

  const addFindingRow = () => {
    setResults((prev) => ({
      ...prev,
      additionalTakes: [...prev.additionalTakes, { type: "", description: "" }],
    }));
  };

  const removeFindingRow = (index: number) => {
    setResults((prev) => ({
      ...prev,
      additionalTakes: prev.additionalTakes.filter((_, i) => i !== index),
    }));
  };

  const toggleFinding = (index: number) => {
    setOpenFindingIndex(openFindingIndex === index ? null : index);
  };

  const handleSaveResults = async () => {
    setLoading(true);
    try {
      const payload = { ...results };

      await DoctorApi.createProcedureResults(procedureId, payload);

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
    <div className="flex flex-col gap-3 p-4 bg-white">
      {/* View Mode */}
      {!edit && procedure?.procedureResults && (
        <div>
          <div className="flex justify-between items-center">
            <h1 className="text-sm font-medium text-gray-700">Procedure Results</h1>
            <button
              onClick={() => setEdit(true)}
              className="text-primary hover:underline"
            >
              Edit
            </button>
          </div>

          <div className="text-sm text-gray-800 whitespace-pre-line bg-gray-50 p-3 rounded-md space-y-2">
            <p>
              <strong>Procedure Type:</strong> {results.procedureType}
            </p>
            <p>
              <strong>Anaesthesia:</strong> {results.anaesthesia || "N/A"}
            </p>

            <div>
              <strong>Findings:</strong>
              {results?.additionalTakes?.length > 0 ? (
                <ul className="list-disc ml-5">
                  {results?.additionalTakes?.map((f, idx) => (
                    <li key={idx}>
                      <strong>{f.type}:</strong> {f.description}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>N/A</p>
              )}
            </div>

            <p>
              <strong>Impression:</strong> {results.impression || "N/A"}
            </p>
            <p>
              <strong>Comment:</strong> {results.comment || "N/A"}
            </p>
          </div>
        </div>
      )}

      {/* Edit Mode */}
      {edit && (
        <>
          {/* Procedure Type */}
          <label className="text-sm text-gray-600">Procedure Type</label>
          <input
            type="text"
            name="procedureType"
            value={results.procedureType}
            readOnly
            className="form-input border border-gray-200 p-2 bg-gray-100"
          />

          {/* Anaesthesia */}
          <label className="text-sm text-gray-600">Anaesthesia</label>
          <input
            type="text"
            name="anaesthesia"
            value={results.anaesthesia}
            onChange={handleChange}
            className="form-input border border-gray-200 p-2"
            placeholder="Enter anaesthesia..."
          />

          {/* Accordion Additional Takes */}
          <div className="mt-3">
            <label className="text-sm text-gray-600">Additional Findings</label>

            {results.additionalTakes.map((finding, index) => (
              <div key={index} className="border border-gray-200 rounded-md mt-2">
                <button
                  type="button"
                  onClick={() => toggleFinding(index)}
                  className="flex justify-between items-center w-full px-3 py-2 bg-gray-100 text-left text-sm font-medium text-gray-700"
                >
                  <span>
                    Finding {index + 1}:{" "}
                    {finding.type ? finding.type : "(click to edit)"}
                  </span>
                  {openFindingIndex === index ? (
                    <FaChevronUp className="text-gray-500" />
                  ) : (
                    <FaChevronDown className="text-gray-500" />
                  )}
                </button>

                {openFindingIndex === index && (
                  <div className="p-3 space-y-2 bg-white border border-gray-200">
                    <input
                      type="text"
                      placeholder="Type"
                      value={finding.type}
                      onChange={(e) =>
                        handleFindingChange(index, "type", e.target.value)
                      }
                      className="form-input border border-gray-200 p-2 w-full"
                    />
                    <textarea
                      placeholder="Description"
                      value={finding.description}
                      onChange={(e) =>
                        handleFindingChange(index, "description", e.target.value)
                      }
                      className="form-input border border-gray-200 p-2 w-full"
                      rows={2}
                    />
                    {results.additionalTakes.length > 1 && (
                      <button
                        onClick={() => removeFindingRow(index)}
                        className="text-red-500 text-sm bg-red-50 w-full p-2 rounded-md hover:bg-red-100 transition"
                      >
                        Remove Finding {index + 1}
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}

            <button
              onClick={addFindingRow}
              className="text-primary text-sm mt-2 hover:underline"
            >
              + Add Finding
            </button>
          </div>

          {/* Impression */}
          <label className="text-sm text-gray-600 mt-2">Impression</label>
          <textarea
            name="impression"
            value={results.impression}
            onChange={handleChange}
            rows={2}
            className="form-input border border-gray-200 p-2"
            placeholder="Enter impression..."
          />

          {/* Comment */}
          <label className="text-sm text-gray-600 mt-2">Comment</label>
          <textarea
            name="comment"
            value={results.comment}
            onChange={handleChange}
            rows={2}
            className="form-input border border-gray-200 p-2"
            placeholder="Enter comment..."
          />

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
