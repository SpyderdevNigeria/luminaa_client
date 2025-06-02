import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import doctorApi from "../../../../../api/doctorApi";
import FeedbackMessage from "../../../../../components/common/FeedbackMessage";

interface DiagnosisData {
  primaryDiagnosis: string;
  symptoms: string;
  notes: string;
  severity: string;
  diagnosisCode: string;
  isConfirmed: boolean;
  additionalRecommendations: string;
  id?: string;
}

interface DiagnosisFormProps {
  appointmentId: string;
  initialData?: DiagnosisData | null;
  onSuccess?: () => void;
  setShowForm: () => void;
}

const defaultData: DiagnosisData = {
  primaryDiagnosis: "",
  symptoms: "",
  notes: "",
  severity: "",
  diagnosisCode: "",
  isConfirmed: false,
  additionalRecommendations: "",
};

const DiagnosisForm = ({
  appointmentId,
  initialData = null,
  onSuccess,
  setShowForm,
}: DiagnosisFormProps) => {
  const [formData, setFormData] = useState<DiagnosisData>(defaultData);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ message: string; type: "success" | "error" | "" }>({
    message: "",
    type: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      let response;
      if (initialData?.id) {
        response = await doctorApi.updateDiagnosis(initialData.id, formData);
      } else {
        response = await doctorApi.createDiagnosis({ ...formData, appointmentId });
      }
      setMessage({
        message: response?.data?.message || "Request successful",
        type: "success",
      });
      if (onSuccess) onSuccess();
    } catch (error: any) {
      const { response } = error;
      console.error("Failed to submit diagnosis", error);
      setMessage({
        message: response?.data?.message || "An error occurred",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="col-span-2">
        {message.message && (
          <FeedbackMessage type={message.type} message={message.message} />
        )}
      </div>

      <div className="col-span-2">
        <label className="form-label !text-base !font-light">Primary Diagnosis</label>
        <input
          type="text"
          name="primaryDiagnosis"
          value={formData.primaryDiagnosis}
          onChange={handleChange}
          required
          className="form-input focus:outline-primary text-gray-light"
        />
      </div>

      <div className="col-span-2">
        <label className="form-label !text-base !font-light">Symptoms</label>
        <input
          type="text"
          name="symptoms"
          value={formData.symptoms}
          onChange={handleChange}
          required
          className="form-input focus:outline-primary text-gray-light"
        />
      </div>

      <div className="col-span-2">
        <label className="form-label !text-base !font-light">Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          required
          rows={3}
          className="form-input focus:outline-primary text-gray-light resize-none"
        />
      </div>

      <div className="col-span-2 md:col-span-1">
        <label className="form-label !text-base !font-light">Severity</label>
        <select
          name="severity"
          value={formData.severity}
          onChange={handleChange}
          required
          className="form-input focus:outline-primary text-gray-light"
        >
          <option value="">Select</option>
          <option value="mild">Mild</option>
          <option value="moderate">Moderate</option>
          <option value="severe">Severe</option>
        </select>
      </div>

      <div className="col-span-2 md:col-span-1">
        <label className="form-label !text-base !font-light">Diagnosis Code <span className="text-xs">(optional)</span></label>
        <input
          type="text"
          name="diagnosisCode"
          value={formData.diagnosisCode}
          onChange={handleChange}
          className="form-input focus:outline-primary text-gray-light"
        />
      </div>

      <div className="col-span-2">
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            name="isConfirmed"
            checked={formData.isConfirmed}
            onChange={handleChange}
          />
          Confirmed Diagnosis
        </label>
      </div>

      <div className="col-span-2">
        <label className="form-label !text-base !font-light">Additional Recommendations</label>
        <textarea
          name="additionalRecommendations"
          value={formData.additionalRecommendations}
          onChange={handleChange}
          required
          rows={3}
          className="form-input focus:outline-primary text-gray-light resize-none"
        />
      </div>

      <div className="col-span-2 flex justify-end gap-4 mt-6">
        <button
          type="button"
          onClick={setShowForm}
          className="px-5 py-2 border-[1.5px] border-primary text-primary rounded-md text-sm"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2 bg-primary border-[1.5px] border-primary text-white rounded-md text-sm"
        >
          {loading ? "Saving..." : initialData ? "Update Diagnosis" : "Add Diagnosis"}
        </button>
      </div>
    </form>
  );
};

export default DiagnosisForm;
