import React, { FormEvent, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import DoctorProfilePicForm from "./DoctorProfilePicForm";
import CommonFormField from "../../../../components/common/CommonFormField";
import { adminDoctorSpecialties } from "../../../../utils/dashboardUtils";
import DoctorApi from "../../../../api/doctorApi";
import FeedbackMessage from "../../../../components/common/FeedbackMessage";
import { updateUser } from "../../../../reducers/authSlice";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
interface MedicalInfoFormProps {
  data: {
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    specialty: string;
    licenseNumber: string;
    contactNumber: string;
    gender: string;
  };
  handleChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  handleClose: () => void;
  userProfile: any;
}

const fields: {
  name: keyof MedicalInfoFormProps["data"];
  label: string;
  type?: string;
  required?: boolean;
  options?: string[];
}[] = [
  {
    name: "specialty",
    label: "Specialty",
    type: "select",
    options: adminDoctorSpecialties,
    required: true,
  },
  { name: "licenseNumber", label: "License Number", required: true },
  { name: "contactNumber", label: "Contact Number", required: true },
  {
    name: "gender",
    label: "Gender",
    type: "select",
    required: true,
    options: ["male", "female", "other"],
  },
  { name: "dateOfBirth", label: "Date of Birth", type: "date", required: true },
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
    const payload = { ...data };
    setLoading(true);
    try {
      const response = await DoctorApi.updateProfile(payload);
      setMessage({
        message: response?.data?.message || "Doctor  updated successfully",
        type: "success",
      });
      dispatch(
        updateUser({
          ...response.data,
        })
      );
      console.log(response);
    } catch (error) {
      console.error(error);
      setMessage({
        message: "An error occurred",
        type: "error",
      });
    }
    setLoading(false);
  };
  useEffect(() => {
    setMessage({
      message: "",
      type: "",
    });
  }, [data]);
  return (
    <main className="bg-white  rounded-lg border border-dashboard-gray max-w-6xl mx-auto">
      <div className="flex items-center justify-between p-4 border-b border-dashboard-gray">
        <h4 className="text-2xl 2xl:text-4xl">Update Medical Information</h4>
        <IoClose
          className="text-2xl 2xl:text-4xl text-dashboard-gray cursor-pointer"
          onClick={handleClose}
        />
      </div>

      <div className="p-4 grid grid-cols-2 gap-6">
        {/* Left: Form Section */}

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="md:col-span-2">
            {message.message && (
              <FeedbackMessage type={message.type} message={message.message} />
            )}
          </div>
             <div className="col-span-2">
            <label
              htmlFor="firstName"
              className="form-label !text-base !font-light flex items-center gap-2"
            >
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              disabled={true}
              value={data.firstName}
               className="form-input bg-gray-100 text-gray-500 w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          {/* Doctor name */}
          <div className="col-span-2">
            <label
              htmlFor="lastName"
              className="form-label !text-base !font-light flex items-center gap-2"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
             disabled={true}
              value={data.lastName}
               className="form-input bg-gray-100 text-gray-500 w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          {/* Doctor name */}
          <div className="col-span-2">
            <label
              htmlFor="lastName"
              className="form-label !text-base !font-light flex items-center gap-2"
            >
              Email
            </label>
            <input
              type="text"
              name="email"
              id="emal"
             disabled={true}
              value={data.email}
               className="form-input bg-gray-100 text-gray-500 w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

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
                  field.options?.map((opt) => ({ value: opt, label: opt })) ||
                  []
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

        {/* Right: Upload Image */}
        <div className="flex items-start justify-center">
          <DoctorProfilePicForm userProfile={userProfile} />
        </div>
      </div>
    </main>
  );
};

export default MedicalInfoForm;
