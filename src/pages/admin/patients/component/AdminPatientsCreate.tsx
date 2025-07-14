import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { FiArrowLeft } from "react-icons/fi";
import AdminApi from "../../../../api/adminApi";
import FeedbackMessage from "../../../../components/common/FeedbackMessage";
import CommonFormField from "../../../../components/common/CommonFormField";
import { useToaster } from "../../../../components/common/ToasterContext";
import { formatDate, getMaxDateFor18YearsOld } from "../../../../utils/dashboardUtils";

type Patient = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string | undefined | null;
  dateOfBirth: string;
  gender: string;
  maritalStatus: string;
  religion: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  user?:{
      id: string;
  firstName: string;
  lastName: string;
  email: string;
  }
  phoneNumber?:string;
};

type FormData = Omit<Patient, "id"> & { [key: string]: string };

type Props = {
  patient?: Patient | null;
  onBack: () => void;
  onClose: () => void;
};

const AdminPatientsCreate: React.FC<Props> = ({ patient = null, onBack, onClose }) => {
  const [message, setMessage] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    dateOfBirth: "",
    gender: "",
    maritalStatus: "",
    religion: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
  });
   const { showToast } = useToaster();
  useEffect(() => {
    if (patient) {
      console.log(patient);
      setFormData({
        firstName: patient.user?.firstName || patient.firstName || "",
        lastName: patient.user?.lastName || patient.lastName || "",
        email: patient.user?.email || patient.email || "",
        contactNumber: patient.phoneNumber || patient.contactNumber || "",
        dateOfBirth: patient.dateOfBirth || "",
        gender: patient.gender || "",
        maritalStatus: patient.maritalStatus || "",
        religion: patient.religion || "",
        address: patient.address || "",
        city: patient.city || "",
        state: patient.state || "",
        country: patient.country || "",
        zipCode: patient.zipCode || "",
        emergencyContactName: patient.emergencyContactName || "",
        emergencyContactPhone: patient.emergencyContactPhone || "",
      });
    }
  }, [patient]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (patient) {
        const response = await AdminApi.updatePatient(patient?.id, formData);
        setMessage({ message: response?.data?.message || "Patient updated successfully", type: "success" });
      } else {
        const response = await AdminApi.createPatient(formData);
        setMessage({ message: response?.data?.message || "Patient created successfully", type: "success" });
        showToast('Patient created successfully', 'success');
      }
      onClose();
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
  }, [formData]);

  const fields = [
    { name: "firstName", label: "First Name", required: true },
    { name: "lastName", label: "Last Name", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "contactNumber", label: "Contact Number", required: true },
    { name: "dateOfBirth", label: "Date of Birth", type: "date", required: true },
    { name: "gender", label: "Gender", type: "select", required: true, options: ["Male", "Female", "Other"] },
    { name: "maritalStatus", label: "Marital Status", required: true, type: "select", options: ["Single", "Married", "Divorced"] },
    { name: "religion", label: "Religion", required: true, options: ["Christianity", "Islam", "Traditional", "Judaism", "Other"] },
    { name: "address", label: "Address", required: true },
    { name: "city", label: "City", required: true },
    { name: "state", label: "State", required: true },
    { name: "country", label: "Country", required: true },
    { name: "zipCode", label: "Zip Code", required: true },
    { name: "emergencyContactName", label: "Emergency Contact Name", required: true },
    { name: "emergencyContactPhone", label: "Emergency Contact Phone", required: true },
  ];

  return (
    <main>
      <button onClick={onBack} className="flex items-center gap-2 text-primary mb-4">
        <FiArrowLeft /> Back to List
      </button>
      <div className="bg-white p-6 rounded-lg max-w-6xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">{patient ? "Edit Patient" : "Add Patient"}</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            {message.message && <FeedbackMessage type={message.type} message={message.message} />}
          </div>

          {fields.map((field) => (
            <CommonFormField
              key={field.name}
              type={field.type || "text"}
              name={field.name}
              label={field.label}
              value={field.name === "dateOfBirth" ? formatDate(formData[field.name]) : formData[field.name] || ""}
              required={field.required}
              onChange={handleChange}
              max={field.name === "dateOfBirth" ? getMaxDateFor18YearsOld() : undefined}
              options={field.options?.map((opt) => ({ value: opt, label: opt })) || []}
            />
          ))}

          <div className="col-span-1 md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded-md mt-4"
              disabled={loading}
            >
              {loading ? "Loading..." : patient ? "Update Patient" : "Create Patient"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AdminPatientsCreate;
