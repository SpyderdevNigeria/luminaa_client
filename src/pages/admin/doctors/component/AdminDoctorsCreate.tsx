import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { FiArrowLeft } from "react-icons/fi";
import AdminApi from "../../../../api/adminApi";
import FeedbackMessage from "../../../../components/common/FeedbackMessage";
type DoctorUser = {
  firstName: string;
  lastName: string;
  email: string;
};

export type Doctor = {
  id: string;
  user: DoctorUser;
  specialty: string;
  licenseNumber: string;
  contactNumber: string;
  gender: string;
  dateOfBirth: string;
  joinedDate: string;
};

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  specialty: string;
  licenseNumber: string;
  contactNumber: string;
  gender: string;
  dateOfBirth: string;
  joinedDate: string;
};

type Props = {
  doctor?: Doctor | null;
  onBack: () => void;
  onClose: () => void;
};

const AdminDoctorsCreate: React.FC<Props> = ({
  doctor = null,
  onBack,
  onClose,
}) => {
  const [message, setMessage] = useState({ message: "", type: "" });
    const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    specialty: "",
    licenseNumber: "",
    contactNumber: "",
    gender: "",
    dateOfBirth: "",
    joinedDate: "",
  });

  useEffect(() => {
    if (doctor) {
      setFormData({
        firstName: doctor.user.firstName || "",
        lastName: doctor.user.lastName || "",
        email: doctor.user.email || "",
        password: "",
        specialty: doctor.specialty || "",
        licenseNumber: doctor.licenseNumber || "",
        contactNumber: doctor.contactNumber || "",
        gender: doctor.gender || "",
        dateOfBirth: doctor.dateOfBirth?.slice(0, 10) || "",
        joinedDate: doctor.joinedDate?.slice(0, 10) || "",
      });
    }
  }, [doctor]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const payload = { ...formData };
    setLoading(true)
    // Remove password if editing and it's empty
    if (doctor && !payload.password) {
      delete payload.password;
    }
    try {
      if (doctor) {
        const response = await AdminApi.updateDoctors(payload);
        setMessage({
          message: response?.data?.message || "doctor updated successfully",
          type: "success",
        });
      } else {
        const response = await AdminApi.createDoctors(payload);
        setMessage({
          message: response?.data?.message || "doctor created successfully",
          type: "success",
        });
      }
      onClose();
    } catch (error) {
        console.error(error)
      setMessage({
        message: "An error occurred",
        type: "error",
      });
    }
    setLoading(false)
  };

  return (
    <main>
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-primary mb-4"
      >
        <FiArrowLeft /> Back to List
      </button>
      <div className="bg-white p-6 rounded-lg max-w-6xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">
          {doctor ? "Edit Doctor" : "Add Doctor"}
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
            { name: "firstName", label: "First Name" },
            { name: "lastName", label: "Last Name" },
            { name: "email", label: "Email", type: "email" },
            {
              name: "password",
              label: "Password",
              type: "text",
              required: !doctor,
            },
            { name: "specialty", label: "Specialty" },
            { name: "licenseNumber", label: "License Number" },
            { name: "contactNumber", label: "Contact Number" },
            {
              name: "gender",
              label: "Gender",
              type: "select",
              options: ["male", "female", "other"],
            },
            { name: "dateOfBirth", label: "Date of Birth", type: "date" },
            { name: "joinedDate", label: "Joined Date", type: "date" },
          ].map(({ name, label, type = "text", required, options }) => (
            <div key={name}>
              <label className="form-label !text-base !font-light">
                {label}
              </label>
              {type === "select" ? (
                <select
                  name={name}
                  value={(formData as any)[name]}
                  onChange={handleChange}
                  className="form-input focus:outline-primary text-gray-light resize-none"
                >
                  <option value="">Select {label}</option>
                  {options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={type}
                  name={name}
                  placeholder=""
                  value={(formData as any)[name]}
                  onChange={handleChange}
                  className="form-input focus:outline-primary text-gray-light resize-none"
                  required={required}
                />
              )}
            </div>
          ))}

          <div className="col-span-1 md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded-md mt-4"
            disabled={loading}
            >
              {loading ? "loading" : doctor ? "Update Doctor" : "Create Doctor"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AdminDoctorsCreate;
