import React, { useState, useEffect } from "react";
import PatientApi from "../../../../api/PatientApi";
import FeedbackMessage from "../../../../components/common/FeedbackMessage";
import { states } from "../../../../utils/dashboardUtils";

type BioDataForm = {
  dateOfBirth: string;
  gender: string;
  maritalStatus: string;
  religion: string;
  phoneNumber: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  stateOfOrigin:string;
};


interface PersonalFormProps {
  userProfile: Partial<BioDataForm>;
  updateUser?: (data: BioDataForm) => void;
  dispatch?: React.Dispatch<any>;
}

function PersonalForm({ userProfile, updateUser, dispatch }: PersonalFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ message: "", type: "" });

  const initialFormData: BioDataForm = {
    dateOfBirth: userProfile?.dateOfBirth || "",
    gender: userProfile?.gender || "",
    maritalStatus: userProfile?.maritalStatus || "",
    religion: userProfile?.religion || "",
    phoneNumber: userProfile?.phoneNumber || "",
    stateOfOrigin : userProfile?.stateOfOrigin || "",
    emergencyContactName: userProfile?.emergencyContactName || "",
    emergencyContactPhone: userProfile?.emergencyContactPhone || "",
  };

  const [data, setData] = useState<BioDataForm>(initialFormData);

  // Optional: update state if userProfile updates dynamically
  useEffect(() => {
    setData(initialFormData);
  }, [userProfile]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback({ message: "", type: "" });

    try {
      const res = await PatientApi.updateBio(data);
      if (res) {
        setFeedback({ message: "Bio updated successfully", type: "success" });
           if (dispatch && updateUser) {
          dispatch(updateUser({ ...userProfile, ...data }));
        }
      }
    } catch (error: any) {
      const msg = error?.response?.data?.message;
      setFeedback({
        message: msg || "An error occurred",
        type: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {feedback.message && (
          <FeedbackMessage type={feedback.type} message={feedback.message} />
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Date of Birth */}
          <div >
            <label htmlFor="dateOfBirth" className="form-label text-primary">
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              id="dateOfBirth"
              onChange={handleChange}
              value={data.dateOfBirth}
              required
             className="form-input focus:outline-primary border border-gray-light"
            />
          </div>

          {/* Gender */}
          <div >
            <label htmlFor="gender" className="form-label text-primary">
              Gender
            </label>
            <select
              name="gender"
              id="gender"
              onChange={handleChange}
              value={data.gender}
              required
             className="form-input focus:outline-primary border border-gray-light"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Marital Status */}
          <div >
            <label htmlFor="maritalStatus" className="form-label text-primary">
              Marital Status
            </label>
            <select
              name="maritalStatus"
              id="maritalStatus"
              onChange={handleChange}
              value={data.maritalStatus}
              required
             className="form-input focus:outline-primary border border-gray-light"
            >
              <option value="">Select Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
            </select>
          </div>

          {/* Religion */}
          <div >
            <label htmlFor="religion" className="form-label text-primary">
              Religion
            </label>
            <select
              name="religion"
              id="religion"
              onChange={handleChange}
              value={data.religion}
              required
             className="form-input focus:outline-primary border border-gray-light"
            >
              <option value="">Select Religion</option>
              <option value="Christianity">Christianity</option>
              <option value="Islam">Islam</option>
              <option value="Traditional">Traditional</option>
              <option value="Other">Other</option>
            </select>
          </div>
        {/* State of Origin */}
        <div className="col-span-2">
          <label htmlFor="stateOfOrigin" className="form-label text-primary">
            State of Origin
          </label>
          <select
            name="stateOfOrigin"
            id="stateOfOrigin"
            onChange={handleChange}
            value={data.stateOfOrigin}
            required
            className="form-input focus:outline-primary border border-gray-light"
          >
            <option value="">Select state</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        
          {/* Phone Number */}
          <div className="col-span-2">
            <label htmlFor="phoneNumber" className="form-label text-primary">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              onChange={handleChange}
              value={data.phoneNumber}
              required
              placeholder="Enter phone number"
             className="form-input focus:outline-primary border border-gray-light"
            />
          </div>

          {/* Emergency Contact Name */}
          <div className="col-span-2">
            <label htmlFor="emergencyContactName" className="form-label text-primary">
              Emergency Contact Name
            </label>
            <input
              type="text"
              name="emergencyContactName"
              id="emergencyContactName"
              onChange={handleChange}
              value={data.emergencyContactName}
              required
              placeholder="Full name"
             className="form-input focus:outline-primary border border-gray-light"
            />
          </div>

          {/* Emergency Contact Phone */}
          <div className="col-span-2">
            <label htmlFor="emergencyContactPhone" className="form-label text-primary">
              Emergency Contact Phone
            </label>
            <input
              type="tel"
              name="emergencyContactPhone"
              id="emergencyContactPhone"
              onChange={handleChange}
              value={data.emergencyContactPhone}
              required
              placeholder="Phone number"
             className="form-input focus:outline-primary border border-gray-light"
            />
          </div>
        </div>

        <button
          type="submit"
          className="text-base bg-primary text-white px-4 py-3 mb-10 font-semibold w-full rounded-md mt-4"
          disabled={submitting}
        >
          {submitting ? "updating..." : "update"}
        </button>
      </form>
    </div>
  );
}

export default PersonalForm;
