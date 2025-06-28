import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { FiArrowLeft } from "react-icons/fi";
import AdminApi from "../../../../api/adminApi";
import FeedbackMessage from "../../../../components/common/FeedbackMessage";
import CommonFormField from "../../../../components/common/CommonFormField";
import { IMedication } from "../../../../types/Interfaces";
import {
  medicationCategoryOptions,
  medicationStatusOptions,
  medicationDosageFormOptions,
  medicationManufacturerOptions,
} from "../../../../utils/dashboardUtils";
import { useToaster } from "../../../../components/common/ToasterContext";
import FileDropzone from "../../../../components/common/FileDropzone";

type FormData = {
  name: string;
  genericName: string;
  manufacturer: string;
  dosageForm: string;
  strength: string;
  category: string;
  description: string;
  price: number;
  requiresPrescription: boolean;
  status: string;
};

type Props = {
  medication?: IMedication | null;
  onBack: () => void;
  onClose: () => void;
};

const AdminMedicationsCreate: React.FC<Props> = ({ medication = null, onBack, onClose }) => {
  const [message, setMessage] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { showToast } = useToaster();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    genericName: "",
    manufacturer: "",
    dosageForm: "",
    strength: "",
    category: "",
    description: "",
    price: 0,
    requiresPrescription: false,
    status: "active",
  });

  useEffect(() => {
    if (medication) {
      setFormData({
        name: medication.name || "",
        genericName: medication.genericName || "",
        manufacturer: medication.manufacturer || "",
        dosageForm: medication.dosageForm || "",
        strength: medication.strength || "",
        category: medication.category || "",
        description: medication.description || "",
        price: parseInt(medication.price.toString()) || 0,
        requiresPrescription: medication.requiresPrescription || false,
        status: medication.status || "active",
      });
    }
  }, [medication]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : name === "requiresPrescription"
          ? value === "true"
          : type === "number"
          ? parseInt(value)
          : value,
    }));
  };

  useEffect(() => {
    setMessage({ message: "", type: "" });
  }, [formData]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (medication) {
        const response = await AdminApi.updateMedication(medication.id, {
          ...formData,
          price: formData?.price,
        });
        setMessage({
          message: response?.data?.message || "Medication updated successfully",
          type: "success",
        });
      } else {
        const response = await AdminApi.createMedication({
          ...formData,
          price: formData?.price,
        });
        setMessage({
          message: response?.data?.message || "Medication created successfully",
          type: "success",
        });
      }
      onClose();
    } catch (error) {
      setMessage({
        message: "An error occurred",
        type: "error",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!selectedImage || !medication) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", selectedImage);

    try {
      await AdminApi.createMedicationImage(medication.id, formData);
      showToast("Image uploaded successfully", "success");
      setSelectedImage(null);
    } catch (err) {
      showToast("Image upload failed", "error");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const dosageFormOptions = medicationDosageFormOptions.map((val) => ({
    label: val.charAt(0).toUpperCase() + val.slice(1),
    value: val,
  }));

  const categoryOptions = medicationCategoryOptions.map((val) => ({
    label: val
      .split("_")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" "),
    value: val,
  }));

  const statusOptions = medicationStatusOptions.map((val) => ({
    label: val.charAt(0).toUpperCase() + val.slice(1),
    value: val,
  }));

  const manufacturerOptions = medicationManufacturerOptions.map((val) => ({
    label: val.charAt(0).toUpperCase() + val.slice(1),
    value: val,
  }));

  const prescriptionOptions = [
    { label: "Yes", value: "true" },
    { label: "No", value: "false" },
  ];

  return (
    <main>
      <button onClick={onBack} className="flex items-center gap-2 text-primary mb-4">
        <FiArrowLeft /> Back to List
      </button>

      <div className="bg-white p-6 rounded-lg max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">
          {medication ? "Edit Medication" : "Add Medication"}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            {message.message && (
              <FeedbackMessage type={message.type} message={message.message} />
            )}
          </div>

          {[
            { name: "name", label: "Name", type: "text", required: true },
            { name: "genericName", label: "Generic Name", type: "text", required: true },
            {
              name: "manufacturer",
              label: "Manufacturer",
              type: "select",
              options: manufacturerOptions,
              required: true,
            },
            {
              name: "dosageForm",
              label: "Dosage Form",
              type: "select",
              options: dosageFormOptions,
              required: true,
            },
            { name: "strength", label: "Strength", type: "text", required: true },
            {
              name: "category",
              label: "Category",
              type: "select",
              options: categoryOptions,
              required: true,
            },
            { name: "price", label: "Price", type: "number", required: true },
            {
              name: "requiresPrescription",
              label: "Requires Prescription",
              type: "select",
              options: prescriptionOptions,
              required: true,
            },
            {
              name: "status",
              label: "Status",
              type: "select",
              options: statusOptions,
              required: true,
            },
            { name: "description", label: "Description", type: "textarea", required: true },
          ].map((field) => (
            <CommonFormField
              key={field.name}
              {...field}
              value={
                field.name === "requiresPrescription"
                  ? formData.requiresPrescription.toString()
                  : formData[field.name as keyof FormData]
              }
              onChange={handleChange}
            />
          ))}

          <div className="col-span-1 md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded-md mt-4"
              disabled={loading}
            >
              {loading
                ? "Loading..."
                : medication
                ? "Update Medication"
                : "Create Medication"}
            </button>
          </div>
        </form>

        {/* Upload Section */}
        {medication && (
          <form className="mt-6 space-y-3" onSubmit={handleImageUpload}>
            {medication?.image?.url && (
              <div className="w-full md:w-64">
                <p className="text-sm text-gray-600 mb-2">Current Image:</p>
                <img
                  src={medication?.image?.url}
                  alt={medication.name}
                  className="rounded-lg border object-cover w-full h-40"
                />
              </div>
            )}

            <FileDropzone
              label="Upload Medication Image"
              onDrop={setSelectedImage}
              file={selectedImage}
              accept="image/*"
              allowedExtensions={[".jpg", ".jpeg", ".png", ".webp"]}
            />

            <button
              type="submit"
              disabled={!selectedImage || uploading}
              className="bg-primary text-white px-4 py-2 rounded transition"
            >
              {uploading ? "Uploading..." : "Upload Image"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
};

export default AdminMedicationsCreate;
