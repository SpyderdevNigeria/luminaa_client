import React, { useState } from "react";
import { Specialisation } from "../../../../hooks/useSpecialisations";
import { FiArrowLeft } from "react-icons/fi";

type Props = {
  specialisation?: Specialisation | null;
  onClose: () => void;
  onBack: () => void;
  onSubmit: (data: Specialisation, id?: string) => Promise<void>;
};

const AdminSpecialisationForm: React.FC<Props> = ({ specialisation, onClose, onBack, onSubmit }) => {
  const [formData, setFormData] = useState<Specialisation>({
    name: specialisation?.name || "",
    description: specialisation?.description || "",
    additionalInfo: specialisation?.additionalInfo || "",
    consultationPrice: parseInt((specialisation?.consultationPrice || 0).toString(), 10),
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "consultationPrice" ? Number(value) : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(formData, specialisation?.id);
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-md shadow">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-500 mb-4">
        <FiArrowLeft /> Back
      </button>
      <h2 className="text-xl font-semibold mb-4">
        {specialisation ? "Edit Specialisation" : "Add Specialisation"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-md p-2 mt-1 form-input"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-md p-2 mt-1 form-input"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Additional Info</label>
          <textarea
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
            className="w-full border rounded-md p-2 mt-1 form-input"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Consultation Price</label>
          <input
            type="number"
            name="consultationPrice"
            required
            value={formData.consultationPrice}
            onChange={handleChange}
            className="w-full border rounded-md p-2 mt-1 form-input"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-primary text-white rounded-md disabled:opacity-50"
          >
            {loading ? "Saving..." : specialisation ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSpecialisationForm;
