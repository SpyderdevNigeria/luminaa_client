import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { FiArrowLeft } from "react-icons/fi";
import AdminApi from "../../../../api/adminApi";
import FeedbackMessage from "../../../../components/common/FeedbackMessage";
import CommonFormField from "../../../../components/common/CommonFormField";
import {IPharmacist} from "../../../../types/Interfaces"
type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  licenseNumber: string;
  status:string;
  licenseExpiryDate: string;
  hireDate: string;

};

type Props = {
  pharmacist?: IPharmacist | null;
  onBack: () => void;
  onClose: () => void;
};

const AdminPharmacistsCreate: React.FC<Props> = ({ pharmacist = null, onBack, onClose }) => {
  const [message, setMessage] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    licenseNumber: "",
    licenseExpiryDate: "",
    hireDate: "",
    status:""
  });

  useEffect(() => {
    if (pharmacist) {
      setFormData({
        firstName: pharmacist.user.firstName || "",
        lastName: pharmacist.user.lastName || "",
        email: pharmacist.user.email || "",
        licenseNumber: pharmacist.licenseNumber || "",
        licenseExpiryDate: pharmacist.licenseExpiryDate?.slice(0, 10) || "",
        hireDate: pharmacist.hireDate?.slice(0, 10) || "",
        status:pharmacist?.status || ''
      });
    }
  }, [pharmacist]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;
    const { name, value } = target;

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: target.checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const payload = { ...formData };
    setLoading(true);

    if (pharmacist && !payload.password) {
      delete payload.password;
    }

    try {
      if (pharmacist) {
        const response = await AdminApi.updatePharmacist(payload);
        setMessage({
          message: response?.data?.message || "Pharmacist updated successfully",
          type: "success",
        });
      } else {
        const response = await AdminApi.createPharmacist(payload);
        setMessage({
          message: response?.data?.message || "Pharmacist created successfully",
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

  return (
    <main>
      <button onClick={onBack} className="flex items-center gap-2 text-primary mb-4">
        <FiArrowLeft /> Back to List
      </button>
      <div className="bg-white p-6 rounded-lg max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">
          {pharmacist ? "Edit Pharmacist" : "Add Pharmacist"}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            {message.message && (
              <FeedbackMessage type={message.type} message={message.message} />
            )}
          </div>

          {[
            { name: "firstName", label: "First Name", required: true, type: "text" },
            { name: "lastName", label: "Last Name", required: true, type: "text" },
            { name: "email", label: "Email", type: "email", required: true },
            { name: "licenseNumber", label: "License Number", required: true, type: "text" },
            { name: "licenseExpiryDate", label: "License Expiry Date", type: "date", required: true },
            { name: "hireDate", label: "Hire Date", type: "date", required: true },
            { name: "Status", label: "Status", type: "select", required: true, options: ['active', 'inactive'] },
          ].map((field) => (
            <CommonFormField
              key={field.name}
              {...field}
              value={formData[field.name as keyof FormData]}
              onChange={handleChange}
              options={
                field.options?.map((opt) => ({ value: opt, label: opt })) || []
              }

            />
          ))}

          <div className="col-span-1 md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded-md mt-4"
              disabled={loading}
            >
              {loading ? "Loading..." : pharmacist ? "Update Pharmacist" : "Create Pharmacist"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AdminPharmacistsCreate;
