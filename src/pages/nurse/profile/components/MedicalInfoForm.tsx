import React, { FormEvent, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import DoctorProfilePicForm from "./DoctorProfilePicForm";
import CommonFormField from "../../../../components/common/CommonFormField";
import NurseApi from "../../../../api/nurseApi";
import FeedbackMessage from "../../../../components/common/FeedbackMessage";
import { updateUser } from "../../../../reducers/authSlice";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { adminDoctorSpecialties, labDepartmentOptions } from "../../../../utils/dashboardUtils";

interface MedicalInfoFormProps {
  data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    licenseNumber: string;
    specialization: string;
    department: string;
    yearsOfExperience: number;
  };
  handleChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  handleClose: () => void;
  userProfile: any;
}
   const labDepartment = labDepartmentOptions.map((val) => ({
      label: val.charAt(0).toUpperCase() + val.slice(1),
      value: val,
    }));
const fields: {
  name: keyof MedicalInfoFormProps["data"];
  label: string;
  type?: string;
  required?: boolean;
  options?: string[];
}[] = [
  { name: "phone", label: "Phone", required: true },
  { name: "licenseNumber", label: "License Number", required: true },
  { name: "specialization", label: "Specialization", type:"select", options:adminDoctorSpecialties,  required: true, },
  { name: "department", label: "Department", type:"select", options: labDepartment.map((dept) => dept.value), required: true,},
  { name: "yearsOfExperience", label: "Years of Experience", type: "number", required: true },
];

const MedicalInfoForm: React.FC<MedicalInfoFormProps> = ({
  data,
  handleChange,
  handleClose,
  userProfile,
}) => {
  const [message, setMessage] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // only send the allowed nurse fields
    const payload = {
      phone: data?.phone,
      licenseNumber: data.licenseNumber,
      specialization: data.specialization,
      department: data.department,
      yearsOfExperience: Number(data.yearsOfExperience || "0"),
    };
    
    setLoading(true);
    try {
      const response = await NurseApi.updateProfile(payload);
      setMessage({
        message: response?.data?.message || "Nurse updated successfully",
        type: "success",
      });
      dispatch(updateUser({ ...response.data }));
    } catch (error:any) {
      console.error(error);
      setMessage({
        message: error?.response?.data?.message || "An error occurred",
        type: "error",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    setMessage({ message: "", type: "" });
  }, [data]);

  return (
    <main className="bg-white rounded-lg border border-dashboard-gray max-w-6xl mx-auto">
      <div className="flex items-center justify-between p-4 border-b border-dashboard-gray">
        <h4 className="text-2xl 2xl:text-4xl">Update Medical Information</h4>
        <IoClose
          className="text-2xl 2xl:text-4xl text-dashboard-gray cursor-pointer"
          onClick={handleClose}
        />
      </div>

      <div className="p-4 flex flex-col-reverse md:flex-row gap-6 md:gap-24">
        {/* Left: Form Section */}
        <form onSubmit={handleSubmit} className="grid grid-col-1 md:grid-cols-2 gap-4 w-full">
          <div className="md:col-span-2">
            {message.message && (
              <FeedbackMessage type={message.type} message={message.message} />
            )}
          </div>

          {/* Locked fields */}
          <div className="col-span-2">
            <label className="form-label">First Name</label>
            <input
              type="text"
              value={data.firstName}
              disabled
              className="form-input bg-gray-100 text-gray-500"
            />
          </div>
          <div className="col-span-2">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              value={data.lastName}
              disabled
              className="form-input bg-gray-100 text-gray-500"
            />
          </div>
          <div className="col-span-2">
            <label className="form-label">Email</label>
            <input
              type="text"
              value={data.email}
              disabled
              className="form-input bg-gray-100 text-gray-500"
            />
          </div>

          {/* Editable fields */}
          {fields.map((field) => (
            <div className="col-span-2" key={field.name}>
              <CommonFormField
                type={field.type || "text"}
                name={field.name}
                label={field.label}
                value={data[field.name] || ""}
                required={field.required}
                onChange={handleChange}
                  options={
                field.options?.map((opt) => ({ value: opt, label: opt })) || []
              }
              />
            </div>
          ))}

          <div className="col-span-2 mt-4">
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary transition"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Information"}
            </button>
          </div>
        </form>

        {/* Right: Upload Profile Image */}
        <div className="flex items-start justify-center">
          <DoctorProfilePicForm userProfile={userProfile} />
        </div>
      </div>
    </main>
  );
};

export default MedicalInfoForm;
