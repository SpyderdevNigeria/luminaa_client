import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import doctorApi from "../../../../../api/doctorApi";
import FeedbackMessage from "../../../../../components/common/FeedbackMessage";
import { IPrescription } from "../../../../../types/Interfaces";

interface PrescriptionsFormProps {
  appointmentId: string;
  medicationId?:string;
  initialData?: IPrescription | null;
  onSuccess?: () => void;
  setShowForm: () => void;
}

const defaultData: IPrescription = {
  medicationName: "",
  medicationId: "",
  dosage: "",
  frequency: "",
  duration: "",
  instructions: "",
  isRefillable: 'false',
  status: "active",
  _id:'',
  id:'',
  createdAt:'',
};

const PrescriptionsForm = ({
  appointmentId,
  initialData = null,
  medicationId,
  onSuccess,
  setShowForm,
}: PrescriptionsFormProps) => {
  const [formData, setFormData] = useState<IPrescription>(defaultData);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ message: string; type: "success" | "error" | "" }>({
    message: "",
    type: "",
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    console.log(checked)
    setFormData((prev:any) => ({
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
        response = await doctorApi.updatePrescriptions(initialData.id, formData);
      } else {
        response = await doctorApi.createPrescriptions({ ...formData, appointmentId, medicationId, isRefillable : formData.isRefillable == 'true' ? true : false });
      }
      setMessage({ message: response?.data?.message || "Request successful", type: "success" });
      if (onSuccess) onSuccess();
    } catch (error: any) {
      const { response } = error;
      console.error("Failed to submit prescription", error);
      setMessage({
        message: response?.data?.message || "An error occurred",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  function stringToBoolean(value: string) {
  if (value === "true") return true;
  if (value === "false") return false;
}
  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="col-span-2">
        {message.message && (
          <FeedbackMessage type={message.type} message={message.message} />
        )}
      </div>

      <div className="col-span-2">
        <label className="form-label !text-base !font-light">Medication Name</label>
        <input
          type="text"
          name="medicationName"
          value={formData.medicationName}
          onChange={handleChange}
          required
          placeholder="eg .. Lisinopril"
          className="form-input focus:outline-primary text-gray-light"
        />
      </div>

      <div>
        <label className="form-label !text-base !font-light">Dosage</label>
        <input
          type="text"
          name="dosage"
          value={formData.dosage}
          onChange={handleChange}
          required
           placeholder="eg .. 10mg"
          className="form-input focus:outline-primary text-gray-light"
        />
      </div>

      <div>
        <label className="form-label !text-base !font-light">Frequency</label>
        <input
          type="text"
          name="frequency"
          value={formData.frequency}
          onChange={handleChange}
          required
          placeholder="eg .. Once daily"
          className="form-input focus:outline-primary text-gray-light"
        />
      </div>

      <div>
        <label className="form-label !text-base !font-light">Duration</label>
        <input
          type="text"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          required
           placeholder="eg .. 30 days"
          className="form-input focus:outline-primary text-gray-light"
        />
      </div>

  

      <div>
        <label className="form-label !text-base !font-light">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
          className="form-input focus:outline-primary text-gray-light"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="col-span-2">
        <label className="form-label !text-base !font-light">Instructions</label>
        <textarea
          name="instructions"
          value={formData.instructions}
          onChange={handleChange}
          rows={3}
          required
          className="form-input focus:outline-primary text-gray-light resize-none"
        />
      </div>
    <div>
        <label className="form-label !text-base !font-light">Refillable</label>
        <div className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            name="isRefillable"
            checked={stringToBoolean(formData.isRefillable)}
            onChange={handleChange}
          />
          <span className="text-sm">Is Refillable</span>
        </div>
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
          {loading ? "Saving..." : initialData ? "Update Prescription" : "Add Prescription"}
        </button>
      </div>
    </form>
  );
};

export default PrescriptionsForm;
