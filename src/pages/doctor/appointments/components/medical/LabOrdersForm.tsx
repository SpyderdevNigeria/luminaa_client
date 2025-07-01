import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import doctorApi from "../../../../../api/doctorApi";
import FeedbackMessage from "../../../../../components/common/FeedbackMessage";
import CommonFormField from "../../../../../components/common/CommonFormField";
import { ILabOrder } from "../../../../../types/Interfaces"; 


interface LabOrdersFormProps {
  patientId: string;
  appointmentId: string;
  initialData?: ILabOrder;
  onSuccess?: () => void;
  setShowForm: () => void;
}

const defaultData: ILabOrder = {
  patientId: "",
  appointmentId: "",
  testName: "",
  notes: "",
  priority: "",
  id:"",
  createdAt:"",
};

const LabOrdersForm = ({
  patientId,
  appointmentId,
  initialData,
  onSuccess,
  setShowForm,
}: LabOrdersFormProps) => {
  const [formData, setFormData] = useState<ILabOrder>({
    ...defaultData,
    patientId,
    appointmentId,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ message: string; type: "success" | "error" | "" }>({
    message: "",
    type: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...defaultData,
        ...initialData,
        patientId: initialData.patientId ?? patientId,
        appointmentId: initialData.appointmentId ?? appointmentId,
      });
    }
  }, [initialData, patientId, appointmentId]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      let response;
      if (initialData?.id) {
        response = await doctorApi.updateLabOrder(initialData.id, formData);
      } else {
        response = await doctorApi.createLabOrder(formData);
      }
      setMessage({ message: response?.data?.message || "Request successful", type: "success" });
      if (onSuccess) onSuccess();
    } catch (error: any) {
      const { response } = error;
      setMessage({
        message: response?.data?.message || "An error occurred",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

const formFields = [
  {
    type: "text",
    name: "testName",
    label: "Test Name",
    required: true,
  },
  {
    type: "select",
    name: "priority",
    label: "Priority",
    required: true,
    options: [
      { value: "low", label: "Low" },
      { value: "medium", label: "Medium" },
      { value: "high", label: "High" },
    ] as { value: string; label: string }[],
  },
  {
    type: "textarea",
    name: "notes",
    label: "Notes",
    // required: true,
  },
] as const;


  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {message.message && (
        <div className="col-span-2">
          <FeedbackMessage type={message.type} message={message.message} />
        </div>
      )}

      {formFields.map((field) => (
        <div key={field.name} className={field.name === "notes" ? "col-span-2" : ""}>
          <CommonFormField
            {...field}
            value={formData[field.name as keyof ILabOrder]}
            onChange={handleChange}
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
          {loading ? "Saving..." : initialData ? "Update Lab Order" : "Add Lab Order"}
        </button>
      </div>
    </form>
  );
};

export default LabOrdersForm;
