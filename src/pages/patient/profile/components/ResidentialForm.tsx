import React, { useState } from "react";
import PatientApi from "../../../../api/patientApi";
import { useNavigate } from "react-router-dom";
import routeLinks from "../../../../utils/routes";
import FeedbackMessage from "../../../../components/common/FeedbackMessage";

// Define the ResidentialData type
interface ResidentialData {
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

interface ResidentialFormProps {
  userProfile: {
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
    // add other fields if needed
  };
  updateUser?: (data: any) => void;
  dispatch?: React.Dispatch<any>;
}

function ResidentialForm({ userProfile, 
  updateUser,
  dispatch}: ResidentialFormProps) {
  const navigate = useNavigate();

  const initialData: ResidentialData = {
    address: userProfile?.address || "",
    city: userProfile?.city || "",
    state: userProfile?.state || "",
    country: userProfile?.country || "",
    zipCode: userProfile?.zipCode || "",
  };

  const [data, setData] = useState<ResidentialData>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState({ message: "", type: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const submitform = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setFeedback({ message: "", type: "" });

    try {
      const res = await PatientApi.updateBio(data);
      if (res) {
        setFeedback({
          message: "Residential information updated successfully.",
          type: "success",
        });
        if (dispatch && updateUser) {
          dispatch(updateUser({ ...userProfile, ...data }));
        }
        navigate(routeLinks?.patient?.profile);
      }
    } catch (error: any) {
      const msg = error?.response?.data?.message;
      setFeedback({
        message: msg || "An error occurred",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={submitform}>

        {feedback.message && (
          <FeedbackMessage type={feedback.type} message={feedback.message} />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Address */}
          <div className="col-span-2">
            <label htmlFor="address" className="form-label text-primary">
              Address
            </label>
            <input
              required
              type="text"
              name="address"
              id="address"
              onChange={handleChange}
              value={data.address}
              placeholder="Street Address"
              className="form-input focus:outline-primary border border-gray-light"
            />
          </div>

          {/* City */}
          <div>
            <label htmlFor="city" className="form-label text-primary">
              City
            </label>
            <input
              required
              type="text"
              name="city"
              id="city"
              onChange={handleChange}
              value={data.city}
              placeholder="City"
              className="form-input focus:outline-primary border border-gray-light"
            />
          </div>

          {/* State */}
          <div>
            <label htmlFor="state" className="form-label text-primary">
              State
            </label>
            <input
              required
              type="text"
              name="state"
              id="state"
              onChange={handleChange}
              value={data.state}
              placeholder="State"
              className="form-input focus:outline-primary border border-gray-light"
            />
          </div>

          {/* Country */}
          <div className="col-span-2">
            <label htmlFor="country" className="form-label text-primary">
              Country
            </label>
            <select
              required
              name="country"
              id="country"
              onChange={handleChange}
              value={data.country}
              className="form-input focus:outline-primary border border-gray-light"
            >
              <option value="" disabled>
                Select Country
              </option>
              <option value="Nigeria">Nigeria</option>
              <option value="Ghana">Ghana</option>
              <option value="Kenya">Kenya</option>
              <option value="South Africa">South Africa</option>
            </select>
          </div>

          {/* Zip Code */}
          <div className="col-span-2">
            <label htmlFor="zipCode" className="form-label text-primary">
              Zip Code
            </label>
            <input
              required
              type="text"
              name="zipCode"
              id="zipCode"
              onChange={handleChange}
              value={data.zipCode}
              placeholder="Zip Code"
              className="form-input focus:outline-primary border border-gray-light"
            />
          </div>
        </div>

        <button
          type="submit"
          className="text-base bg-primary text-white px-4 py-3 font-semibold w-full rounded-md my-4"
          disabled={isLoading}
        >
          {isLoading ? "updating..." : "update"}
        </button>
      </form>
    </div>
  );
}

export default ResidentialForm;
