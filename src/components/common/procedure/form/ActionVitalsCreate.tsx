import { useState, useEffect } from "react";
import { useToaster } from "../../ToasterContext";
import AdminApi from "../../../../api/adminApi";

interface Props {
  vital?: any;
  patientId?: string;
  appointmentId?: string;
  procedureId?: string;
  onClose: () => void;
  onBack?: () => void;
  back?: boolean;
}

function AdminVitalsCreate({
  vital,
  patientId,
  appointmentId,
  procedureId,
  onClose,
  onBack,
  back = true,
}: Props) {
  const { showToast } = useToaster();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    patientId: vital?.patientId || patientId || "",
    appointmentId: vital?.appointmentId || appointmentId || "",
    procedureId: vital?.procedureId || procedureId || "",
    systolicBP: vital?.systolicBP || "",
    diastolicBP: vital?.diastolicBP || "",
    pulse: vital?.pulse || "",
    weight: vital?.weight || "",
    height: vital?.height || "",
    respiratoryRate: vital?.respiratoryRate || "",
    spO2: vital?.spO2 || "",
    bmi: vital?.bmi || "",
    notes: vital?.notes || "",
    recordedAt: vital?.recordedAt || new Date().toISOString(),
  });

  /** Automatically calculate BMI */
  useEffect(() => {
    const weight = parseFloat(form.weight);
    const heightCm = parseFloat(form.height);

    if (weight && heightCm) {
      const heightM = heightCm / 100;
      const bmi = (weight / (heightM * heightM)).toFixed(2);
      setForm((prev) => ({ ...prev, bmi }));
    }
  }, [form.weight, form.height]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.patientId || !form.appointmentId || !form.procedureId) {
      showToast("Missing required reference IDs", "error");
      return;
    }
    if (
      !form.systolicBP ||
      !form.diastolicBP ||
      !form.pulse ||
      !form.weight ||
      !form.height ||
      !form.respiratoryRate ||
      !form.spO2
    ) {
      showToast("Missing required fields", "error");
      return;
    } 
    setLoading(true);
    try {
      if (vital) {
        await AdminApi.updateVital(vital.id, form);
        showToast("Vital updated successfully", "success");
      } else {
        await AdminApi.createVital(form);
        showToast("Vital created successfully", "success");
      }
      onClose();
    } catch (error:any) {
      showToast( error?.response?.message || error?.response?.data?.message || "Failed to save vital", "error");
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">
        {vital ? "Edit Vital" : "Add Vital"}
      </h2>

      {/* Hidden Reference IDs */}
      <input type="hidden" name="patientId" value={form.patientId} />
      <input type="hidden" name="appointmentId" value={form.appointmentId} />
      <input type="hidden" name="procedureId" value={form.procedureId} />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-600">Systolic BP</label>
          <input
            name="systolicBP"
            value={form.systolicBP}
            onChange={handleChange}
            placeholder="Enter systolic BP"
            className="form-input w-full p-2 rounded border"
            required
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Diastolic BP</label>
          <input
            name="diastolicBP"
            value={form.diastolicBP}
            onChange={handleChange}
            placeholder="Enter diastolic BP"
            className="form-input w-full p-2 rounded border"
            required
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Pulse</label>
          <input
            name="pulse"
            value={form.pulse}
            onChange={handleChange}
            placeholder="Enter pulse rate"
            className="form-input w-full p-2 rounded border"
            required
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Weight (kg)</label>
          <input
            name="weight"
            value={form.weight}
            onChange={handleChange}
            placeholder="Enter weight"
            className="form-input w-full p-2 rounded border"
            required
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Height (cm)</label>
          <input
            name="height"
            value={form.height}
            onChange={handleChange}
            placeholder="Enter height"
            className="form-input w-full p-2 rounded border"
            required
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Respiratory Rate</label>
          <input
            name="respiratoryRate"
            value={form.respiratoryRate}
            onChange={handleChange}
            placeholder="Enter respiratory rate"
            className="form-input w-full p-2 rounded border"
            required
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">SpO₂ (%)</label>
          <input
            name="spO2"
            value={form.spO2}
            onChange={handleChange}
            placeholder="Enter SpO₂"
            className="form-input w-full p-2 rounded border"
            required
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">BMI (auto-calculated)</label>
          <input
            name="bmi"
            value={form.bmi}
            readOnly
            placeholder="BMI auto-calculated"
            className="form-input w-full p-2 rounded border bg-gray-100"
            required
          />
        </div>
      </div>

      <div>
        <label className="text-sm text-gray-600">Notes</label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Enter additional notes"
          className="form-input w-full p-2 rounded border"
          required
        />
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleSubmit}
          className={` ${
            !back
              ? "mt-3 px-4 py-2 bg-primary text-white rounded w-full"
              : "bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
          }`}
          disabled={loading}
        >
          { loading ? "Saving..." : vital ? "Update" : "Create"}
        </button>
        {back && (
          <button
            onClick={onBack}
            className="border px-4 py-2 rounded hover:bg-gray-50"
          >
            Back
          </button>
        )}
      </div>
    </div>
  );
}

export default AdminVitalsCreate;
