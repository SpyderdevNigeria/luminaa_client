import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { FiArrowLeft } from "react-icons/fi";
import AdminApi from "../../../../api/adminApi";
import FeedbackMessage from "../../FeedbackMessage";
import CommonFormField from "../../CommonFormField";
import { useToaster } from "../../ToasterContext";
import DoctorApi from "../../../../api/doctorApi";
import { toDatetimeLocal } from "../../../../utils/dashboardUtils";

type InputOutputData = {
  id?: string;
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
};

type Props = {
  patientId: string;
  procedureId: string;
  item?: InputOutputData | null;
  type?: string | null;
  onBack: () => void;
  onClose: () => void;
};

const DoctorInputOutputCreate: React.FC<Props> = ({ patientId, procedureId, item = null, onBack, onClose, type }) => {
  const [message, setMessage] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);
  const { showToast } = useToaster();

  const [formData, setFormData] = useState<InputOutputData>({
    type: "input",
    patientId: patientId,
    procedureId: procedureId,
    drugType: "",
    amount: "",
    data: {
      route: "",
      flowRate: "",
    },
    remark: "",
    timestamp: "",
  });

  useEffect(() => {
    if (item) setFormData({
      ...item,
      timestamp : toDatetimeLocal(new Date(item.timestamp)) || "",
      patientId: patientId,
      procedureId: procedureId
    });
  }, [item, patientId, procedureId]);

  console.log(patientId, procedureId, formData)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "route" || name === "flowRate") {
      setFormData((prev) => ({
        ...prev,
        data: { ...prev.data, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
      try {
let response;

if (item) {
  if (type === "admin") {
    response = await AdminApi.updateInputOutput(item.id!, formData);
  } else {
    response = await DoctorApi.updateInputOutput(item.id!, formData);
  }
} else {
  if (type === "admin") {
    response = await AdminApi.createInputOutput(formData);
  } else {
    response = await DoctorApi.createInputOutput(formData);
  }
}

      showToast(response?.message || "Operation successful", "success");
      onClose();
    } catch (error: any) {
      console.error(error);
      setMessage({
        message: error?.response?.data?.message || "An error occurred",
        type: "error",
      });
    }

    setLoading(false);
  };

  const fields = [
    { name: "type", label: "Type", type: "select", options: ["input", "output"], required: true },
    { name: "drugType", label: "Drug Type", required: true },
    { name: "amount", label: "Amount", required: true },
    { name: "route", label: "Route", required: true },
    { name: "flowRate", label: "Flow Rate", required: true },
    { name: "remark", label: "Remark", type: "textarea", required: false },
    { name: "timestamp", label: "Timestamp", type: "datetime-local", required: true },
  ];

  return (
    <main>
      <button onClick={onBack} className="flex items-center gap-2 text-primary mb-4">
        <FiArrowLeft /> Back to List
      </button>

      <div className="bg-white p-6 rounded-lg max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">{item ? "Edit Record" : "Add Record"}</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {message.message && (
            <div className="md:col-span-2">
              <FeedbackMessage type={message.type} message={message.message} />
            </div>
          )}

          {fields.map((field) => (
            <CommonFormField
              key={field.name}
              type={field.type || "text"}
              name={field.name}
              label={field.label}
              value={
                field.name === "route" || field.name === "flowRate"
                  ? formData.data[field.name]
                  : (formData as any)[field.name]
              }
              required={field.required}
              onChange={handleChange}
              options={field.options?.map((opt) => ({ value: opt, label: opt })) || []}
            />
          ))}

          <div className="col-span-1 md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded-md mt-4"
              disabled={loading}
            >
              {loading ? "Loading..." : item ? "Update Record" : "Create Record"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default DoctorInputOutputCreate;
