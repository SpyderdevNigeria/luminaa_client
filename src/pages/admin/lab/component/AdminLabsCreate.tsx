import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { FiArrowLeft } from "react-icons/fi";
import AdminApi from "../../../../api/adminApi";
import FeedbackMessage from "../../../../components/common/FeedbackMessage";
import CommonFormField from "../../../../components/common/CommonFormField";
import { labDepartmentOptions } from "../../../../utils/dashboardUtils";

type LabUser = {
  firstName: string;
  lastName: string;
  email: string;
};

export type Lab = {
  id: string;
  user: LabUser;
  department: string;
  licenseNumber: string;
  licenseExpiryDate: string;
  hireDate: string;
};

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  department: string;
  licenseNumber: string;
  licenseExpiryDate: string;
  hireDate: string;
};

type Props = {
  lab?: Lab | null;
  onBack: () => void;
  onClose: () => void;
};

const AdminLabsCreate: React.FC<Props> = ({ lab = null, onBack, onClose }) => {
  const [message, setMessage] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    department: "",
    licenseNumber: "",
    licenseExpiryDate: "",
    hireDate: "",
  });

  useEffect(() => {
    if (lab) {
      setFormData({
        firstName: lab.user.firstName || "",
        lastName: lab.user.lastName || "",
        email: lab.user.email || "",
        password: "",
        department: lab.department || "",
        licenseNumber: lab.licenseNumber || "",
        licenseExpiryDate: lab.licenseExpiryDate?.slice(0, 10) || "",
        hireDate: lab.hireDate?.slice(0, 10) || "",
      });
    }
  }, [lab]);

const handleChange = (
  e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
) => {
  const target = e.target;
  const { name, value } = target;

  if (target instanceof HTMLInputElement && target.type === "checkbox") {
    setFormData((prev) => ({
      ...prev,
      [name]: target.checked,
    }));
  } else {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const payload = { ...formData };
    setLoading(true);

    if (lab && !payload.password) {
      delete payload.password;
    }

    try {
      if (lab) {
        const response = await AdminApi.updateLabs(payload);
        setMessage({
          message: response?.data?.message || "Lab updated successfully",
          type: "success",
        });
      } else {
        const response = await AdminApi.createLabs(payload);
        setMessage({
          message: response?.data?.message || "Lab created successfully",
          type: "success",
        });
      }
      onClose();
    } catch (error) {
      setMessage({
        message: "An error occurred",
        type: "error",
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const labDepartment = labDepartmentOptions.map((val) => ({
    label: val.charAt(0).toUpperCase() + val.slice(1),
    value: val,
  }));
  return (
    <main>
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-primary mb-4"
      >
        <FiArrowLeft /> Back to List
      </button>
      <div className="bg-white p-6 rounded-lg max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">
          {lab ? "Edit Lab Technician" : "Add Lab Technician"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="md:col-span-2">
            {message.message && (
              <FeedbackMessage type={message.type} message={message.message} />
            )}
          </div>

          {[
            { name: "firstName", label: "First Name", required: true, type: "text" },
            { name: "lastName", label: "Last Name", required: true, type: "text" },
            { name: "email", label: "Email", type: "email", required: true },
            {
              name: "password",
              label: "Password",
              type: "text",
              required: !lab,
            },
            { name: "department", label: "Department", type:"select", options:labDepartment, required: true,},
            { name: "licenseNumber", label: "License Number", required: true, type: "text" },
            {
              name: "licenseExpiryDate",
              label: "License Expiry Date",
              type: "date",
              required: true,
            },
            {
              name: "hireDate",
              label: "Hire Date",
              type: "date",
              required: true,
            },
          ].map((field) => (
            <CommonFormField
              key={field.name}
              {...field}
              value={formData[field.name as keyof FormData]}
              onChange={handleChange}
            />
          ))}

          <div className="col-span-1 md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded-md mt-4"
              disabled={loading}
            >
              {loading ? "Loading..." : lab ? "Update Lab" : "Create Lab"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AdminLabsCreate;
