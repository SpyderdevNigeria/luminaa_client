import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import DoctorProfilePicForm from "./PharmacyProfilePicForm";
import PharmacistApi from "../../../../api/pharmacistApi";
import FeedbackMessage from "../../../../components/common/FeedbackMessage";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { updateUser } from "../../../../reducers/authSlice";
interface MedicalInfoFormProps {
  data: {
    firstName: string;
    lastName: string;
    licenseNumber: string;
    licenseExpiryDate: string;
    hireDate: string;
  };
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClose: () => void;
  userProfile: any;
}

const MedicalInfoForm: React.FC<MedicalInfoFormProps> = ({
  data,
  handleChange,
  handleClose,
  userProfile,
}) => {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ message: "", type: "" });
  const dispatch = useAppDispatch();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await PharmacistApi.updateProfile(data).then((res) => {
        if (res?.status) {
          setFeedback({
            type: "success",
            message: "Profile updated successfully!",
          });
          console.log(res);
          dispatch(
            updateUser({
              ...userProfile,
              ...res?.data,
              user: { ...userProfile?.user, ...res?.data },
            })
          );
        }
      });
    } catch (error) {

        setFeedback({
          type: "error",
          message:
           "Something went wrong. Try again.",
        });

    }
    setLoading(false);
  };
  console.log(userProfile);
  return (
    <main className="bg-white  rounded-lg border border-dashboard-gray max-w-6xl mx-auto">
      <div className="flex items-center justify-between p-4 border-b border-dashboard-gray">
        <h4 className="text-2xl 2xl:text-4xl">Update Medical Information</h4>
        <IoClose
          className="text-2xl 2xl:text-4xl text-dashboard-gray cursor-pointer"
          onClick={handleClose}
        />
      </div>

      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Info Fields */}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* First Name (Disabled) */}
          {feedback.message && (
            <FeedbackMessage type={feedback.type} message={feedback.message} />
          )}
          <div>
            <label
              htmlFor="firstName"
              className="form-label !text-base !font-light"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={data.firstName}
              disabled
              className="form-input bg-gray-100 text-gray-500 w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          {/* Last Name (Disabled) */}
          <div>
            <label
              htmlFor="lastName"
              className="form-label !text-base !font-light"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={data.lastName}
              disabled
              className="form-input bg-gray-100 text-gray-500 w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>


          {/* License Number */}
          <div>
            <label
              htmlFor="licenseNumber"
              className="form-label !text-base !font-light"
            >
              License Number
            </label>
            <input
              type="text"
              name="licenseNumber"
              id="licenseNumber"
              value={data.licenseNumber}
              onChange={handleChange}
              required
              className="form-input text-gray-700 w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          {/* License Expiry Date */}
          <div>
            <label
              htmlFor="licenseExpiryDate"
              className="form-label !text-base !font-light"
            >
              License Expiry Date
            </label>
            <input
              type="date"
              name="licenseExpiryDate"
              id="licenseExpiryDate"
              value={
                data.licenseExpiryDate
                  ? new Date(data?.licenseExpiryDate).toISOString().split("T")[0]
                  : ""
              }
              onChange={handleChange}
              required
              className="form-input text-gray-700 w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition"
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
