import { useState } from "react";
import AdminApi from "../../../../api/adminApi";
import { useToaster } from "../../../../components/common/ToasterContext";


interface Props {
  partner?: any;
  onClose: () => void;
  onBack?: () => void;
}

const partnerTypes = [
  { label: "Corporate", value: "corporate" },
  { label: "Educational", value: "educational" },
  { label: "Healthcare", value: "healthcare" },
  { label: "Referral", value: "referral" },
];

export default function AdminPartnersCreate({ partner, onClose, onBack }: Props) {
  const [formData, setFormData] = useState({
    name: partner?.name || "",
    description: partner?.description || "",
    partnerType: partner?.partnerType || "",
  });
  const [loading, setLoading] = useState(false);
  const { showToast } = useToaster();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (partner?.id) {
        await AdminApi.updatePartner(partner.id, formData);
        showToast("Partner updated successfully", "success");
      } else {
        await AdminApi.createPartner(formData);
        showToast("Partner created successfully", "success");
      }
      onClose();
    } catch (error) {
      console.error("Error saving partner:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md max-w-2xl mx-auto space-y-4">
      <h2 className="text-lg font-semibold mb-4">
        {partner ? "Edit Partner" : "Add Partner"}
      </h2>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            className="w-full border rounded-md p-2 form-input"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter partner name"
          />
        </div>

        
        <div>
          <label className="block text-sm font-medium">Partner Type</label>
          <select
            name="partnerType"
            className="w-full border rounded-md p-2 form-input"
            value={formData.partnerType}
            onChange={handleChange}
          >
            <option value="">Select type</option>
            {partnerTypes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            className="w-full border rounded-md p-2 form-input"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter partner description"
            rows={7}
          />
        </div>

      </div>

      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={onBack}
          className="px-4 py-2 border border-primary  text-primary rounded-md hover:bg-primary hover:text-white"
          disabled={loading}
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-primary text-white rounded-md disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Saving..." : partner ? "Update Partner" : "Create Partner"}
        </button>
      </div>
    </div>
  );
}
