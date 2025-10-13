import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { FiArrowLeft } from "react-icons/fi";
import AdminApi from "../../../../api/adminApi";
import FeedbackMessage from "../../../../components/common/FeedbackMessage";
import CommonFormField from "../../../../components/common/CommonFormField";
import { useToaster } from "../../../../components/common/ToasterContext";
import { adminDoctorSpecialties, labDepartmentOptions } from "../../../../utils/dashboardUtils";

type NurseUser = {
  firstName: string;
  lastName: string;
  email: string;
    id: string;
    phoneNumber: string;
};

export type Nurse = {
  id: string;
  user: NurseUser;
  phone: string;
  contactNumber: string;
  licenseNumber: string;
  specialization: string;
  department: string;
  licenseExpiryDate: string;
  hireDate: string;
  yearsOfExperience: number;
  isActive: boolean;
  isProfileVerified: boolean;
  isMatron: boolean;
};

type CreateFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  licenseNumber: string;
  specialization: string;
  department: string;
  licenseExpiryDate: string;
  hireDate: string;
  contactNumber: string;
  yearsOfExperience: number;
};

type EditFormData = {
  phone: string;
  licenseNumber: string;
  specialization: string;
  department: string;
  yearsOfExperience: number;
};

type Props = {
  nurse?: Nurse | null;
  onBack: () => void;
  onClose: () => void;
};

const AdminNursesCreate: React.FC<Props> = ({ nurse = null, onBack, onClose }) => {
  const [message, setMessage] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
    const [updatingMatron, setUpdatingMatron] = useState(false);
  const [status, setStatus] = useState<boolean>(nurse?.isActive ?? false);
  const [isMatron, setIsMatron] = useState<boolean>(nurse?.isMatron ?? false);

  const [formData, setFormData] = useState<CreateFormData | EditFormData>(
    nurse
      ? {
          phone: nurse.user?.phoneNumber || "",
          licenseNumber: nurse.licenseNumber || "",
          specialization: nurse.specialization || "",
          department: nurse.department || "",
          yearsOfExperience: nurse.yearsOfExperience || 0,
        }
      : {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          licenseNumber: "",
          specialization: "",
          department: "",
          licenseExpiryDate: "",
          hireDate: "",
          contactNumber: "",
          yearsOfExperience: 0,
        }
  );

  const { showToast } = useToaster();

  useEffect(() => {
    if (nurse) {
      setStatus(nurse.isActive);
      setIsMatron(nurse.isMatron);
    }
  }, [nurse]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]:
        name === "yearsOfExperience"
          ? parseInt(value) || 0
          : value,
    }));
  };
console.log(nurse)
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (nurse) {
        // EDIT nurse
        const payload: EditFormData = {
          phone: (formData as EditFormData).phone,
          licenseNumber: (formData as EditFormData).licenseNumber,
          specialization: (formData as EditFormData).specialization,
          department: (formData as EditFormData).department,
          yearsOfExperience: (formData as EditFormData).yearsOfExperience,
        };

        const response = await AdminApi.updateNurses(nurse.id, payload);
        showToast("Nurse updated successfully", "success");
        setMessage({
          message: response?.data?.message || "Nurse updated successfully",
          type: "success",
        });
      } else {
        // CREATE nurse
        const payload: CreateFormData = formData as CreateFormData;
        const response = await AdminApi.createNurses(payload);
        showToast("Nurse created successfully", "success");
        setMessage({
          message: response?.data?.message || "Nurse created successfully",
          type: "success",
        });
      }
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

  const handleToggleStatus = async () => {
    if (!nurse) return;
    setUpdating(true);
    try {
      await AdminApi.updateNursesStatus(nurse.id, { status: !status });
      setStatus(!status);
      showToast("Nurse status updated", "success");
    } catch (err) {
      console.error(err);
      showToast("Failed to update status", "error");
    }
    setUpdating(false);
  };

  const handleToggleMatron = async () => {
    if (!nurse) return;
    setUpdatingMatron(true);
    try {
      await AdminApi.updateNursesMatronStatus(nurse.id, { isMatron: !isMatron });
      setIsMatron(!isMatron);
      showToast("Matron status updated", "success");
    } catch (err) {
      console.error(err);
      showToast("Failed to update matron status", "error");
    }
    setUpdatingMatron(false);
  };

   const labDepartment = labDepartmentOptions.map((val) => ({
      label: val.charAt(0).toUpperCase() + val.slice(1),
      value: val,
    }));

  const createFields: {
    name: keyof CreateFormData | keyof EditFormData;
    label: string;
    type?: string;
    required?: boolean;
    options?: string[];
  }[] = [
    { name: "firstName", label: "First Name", required: true },
    { name: "lastName", label: "Last Name", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "phone", label: "Phone", required: true },
    { name: "licenseNumber", label: "License Number", required: true },
    { name: "specialization", label: "Specialization", type:"select", options:adminDoctorSpecialties,  required: true,},
    { name: "department", label: "Department", type:"select", options: labDepartment.map((dept) => dept.value), required: true,},
    { name: "licenseExpiryDate", label: "License Expiry Date", type: "date", required: true },
    { name: "hireDate", label: "Hire Date", type: "date", required: true },
    { name: "contactNumber", label: "Contact Number", required: true },
    { name: "yearsOfExperience", label: "Years of Experience", type: "number", required: true },
  ];

  const editFields = [
    { name: "phone", label: "Phone", required: true },
    { name: "licenseNumber", label: "License Number", required: true },
    { name: "specialization", label: "Specialization", type:"select", options:adminDoctorSpecialties,  required: true, },
    { name: "department", label: "Department", options: labDepartment.map((dept) => dept.value), required: true, },
    { name: "yearsOfExperience", label: "Years of Experience", type: "number", required: true },
  ];

  return (
    <main>
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-primary mb-4"
      >
        <FiArrowLeft /> Back to List
      </button>
      <div className="bg-white  p-6 rounded-lg max-w-6xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">
          {nurse ? "Edit Nurse" : "Add Nurse"}
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

          {(nurse ? editFields : createFields).map((field) => (
            <CommonFormField
              key={field.name}
              type={field.type || "text"}
              name={field.name as string}
              label={field.label}
              value={(formData as any)[field.name] || ""}
              required={field.required}
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
              {loading ? "Loading..." : nurse ? "Update Nurse" : "Create Nurse"}
            </button>
          </div>
        </form>

        {nurse && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-white p-4 rounded-xl border border-gray-300">
              <h3 className="font-semibold mb-2">Update Nurse Status</h3>
              <div className="flex items-center justify-between">
                <span>{status ? "Active" : "Inactive"}</span>
                <button
                  onClick={handleToggleStatus}
                  disabled={updating}
                  className="bg-primary text-white px-4 py-1 rounded disabled:bg-gray-400"
                >
                  {updating ? "Updating..." : "Toggle"}
                </button>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-300">
              <h3 className="font-semibold mb-2">Update Matron Status</h3>
              <div className="flex items-center justify-between">
                <span>{isMatron ? "Matron" : "Not Matron"}</span>
                <button
                  onClick={handleToggleMatron}
                  disabled={updatingMatron}
                  className="bg-primary text-white px-4 py-1 rounded disabled:bg-gray-400"
                >
                  {updatingMatron ? "Updating..." : "Toggle"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminNursesCreate;
