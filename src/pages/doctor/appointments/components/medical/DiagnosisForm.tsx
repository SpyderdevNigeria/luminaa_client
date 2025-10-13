import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import doctorApi from "../../../../../api/doctorApi";
import FeedbackMessage from "../../../../../components/common/FeedbackMessage";
import CommonFormField from "../../../../../components/common/CommonFormField";

interface DiagnosisData {
  primaryDiagnosis: string;
  symptoms: string;
  notes: string;
  diagnosisCode: string;
  appointmentId?: string;
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
  diagnosisCode: "",
};

const DiagnosisForm = ({
  appointmentId,
  initialData = null,
  onSuccess,
  setShowForm,
}: DiagnosisFormProps) => {
  const [formData, setFormData] = useState<DiagnosisData>({
    ...defaultData,
    appointmentId,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ message: string; type: "success" | "error" | "" }>({
    message: "",
    type: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData, appointmentId });
    }
  }, [initialData, appointmentId]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
        message: response?.data?.message || "Diagnosis saved successfully",
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

  const fields = [
    {
      name: "primaryDiagnosis",
      label: "Primary Diagnosis",
      type: "text",
      required: true,
    },
        {
      name: "diagnosisCode",
      label: "Diagnosis Code",
      type: "text",
      required: true,
    },
    {
      name: "symptoms",
      label: "Symptoms",
      type: "textarea",
      required: true,
    },
    {
      name: "notes",
      label: "Notes",
      type: "textarea",
      required: false,
    },

  ];

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input type="hidden" name="appointmentId" value={appointmentId} />

      <div className="col-span-2">
        {message.message && <FeedbackMessage type={message.type} message={message.message} />}
      </div>

      {fields.map((field) => (
        <div
          key={field.name}
          className={
            field.type === "textarea" ? "md:col-span-2" : " md:col-span-1"
          }
        >
          <CommonFormField
            label={field.label}
            name={field.name}
            value={(formData as any)[field.name]}
            onChange={handleChange}
            type={field.type as any}
            required={field.required}
          />
        </div>
      ))}

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
