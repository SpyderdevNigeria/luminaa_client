import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import doctorApi from "../../../../../api/doctorApi";
import FeedbackMessage from "../../../../../components/common/FeedbackMessage";
import CommonFormField from "../../../../../components/common/CommonFormField";

interface DiagnosisData {
  primaryDiagnosis: string;
  symptoms: string;
  notes: string;
  severity: string;
  diagnosisCode: string;
  isConfirmed: boolean;
  additionalRecommendations: string;
  diagnosis: string;
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
  diagnosis: "",
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

const fields = [
  {
    name: "primaryDiagnosis",
    label: "Reason for the Appointment",
    type: "text",
    required: true,
  },
  {
    name: "symptoms",
    label: "Patient Symptoms",
    type: "text",
    required: true,
  },
  {
    name: "notes",
    label: "Notes",
    type: "textarea",
    required: true,
  },
  {
    name: "severity",
    label: "Severity",
    type: "select",
    required: true,
    options: [
      { value: "", label: "Select" },
      { value: "mild", label: "Mild" },
      { value: "moderate", label: "Moderate" },
      { value: "severe", label: "Severe" },
    ],
  },
  // {
  //   name: "diagnosisCode",
  //   label: "Diagnosis Code",
  //   type: "text",
  //   optional: true,
  // },
  // {
  //   name: "isConfirmed",
  //   label: "Confirmed Diagnosis",
  //   type: "checkbox",
  // },
  {
    name: "additionalRecommendations",
    label: " Examination Findings",
    type: "textarea",

  },

    {
    name: "diagnosis",
    label: "Diagnosis",
    type: "textarea",

  },
];


  return (
<form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div className="col-span-2">
    {message.message && <FeedbackMessage type={message.type} message={message.message} />}
  </div>

  {fields.map((field) => (
    <div
      key={field.name}
      className={
        field.name === "notes" ||
        field.name === "symptoms" ||
        field.name === "severity" ||
        field.name === "primaryDiagnosis" ||
        field.name === "diagnosis" ||
        field.name === "additionalRecommendations"
          ? "col-span-2"
          : "col-span-2 md:col-span-1"
      }
    >
      <CommonFormField
        label={field.label}
        name={field.name}
        value={(formData as any)[field.name]}
        onChange={handleChange}
        type={field.type as any}
        required={field.required}
        // options={field.options}
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
