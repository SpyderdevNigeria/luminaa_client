import { useState } from "react";
import AdminApi from "../../../../api/adminApi";
import { useToaster } from "../../../../components/common/ToasterContext";

interface Props {
  service?: any;
  onClose: () => void;
  onBack?: () => void;
}

export default function AdminServicesCreate({ service, onClose, onBack }: Props) {
  const [formData, setFormData] = useState({
    name: service?.name || "",
    category: service?.category || "",
    description: service?.description || "",
    price: service?.price || "",
  });
  const [loading, setLoading] = useState(false);
  const { showToast } = useToaster();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (service?.id) {
        await AdminApi.updateService(service.id, formData);
        showToast("Service updated successfully", "success");
      } else {
        await AdminApi.createService(formData);
        showToast("Service created successfully", "success");
      }
      onClose();
    } catch (error) {
      console.error("Error saving service:", error);
      showToast("Error saving service", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md max-w-2xl mx-auto space-y-4">
      <h2 className="text-lg font-semibold">
        {service ? "Edit Service" : "Add Service"}
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
            placeholder="Enter service name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Category</label>
          <input
            type="text"
            name="category"
            className="w-full border rounded-md p-2  form-input"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter category"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Price</label>
          <input
            type="number"
            name="price"
            className="w-full border rounded-md p-2 form-input"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            className="w-full border rounded-md p-2 form-input"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter service description"
            rows={5}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={onBack}
          className="px-4 py-2 border border-primary text-primary rounded-md"
          disabled={loading}
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-primary text-white rounded-md disabled:opacity-60"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : service
            ? "Update Service"
            : "Create Service"}
        </button>
      </div>
    </div>
  );
}
