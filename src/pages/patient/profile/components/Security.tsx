import { useState } from "react";
import FeedbackMessage from "../../../../components/common/FeedbackMessage";
import { FiEye, FiEyeOff } from "react-icons/fi";
import AuthApi from "../../../../api/authApi";
function Security() {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [visibility, setVisibility] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ message: "", type: "" });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const toggleVisibility = (field: 'currentPassword' | 'newPassword' | 'confirmPassword') => {
    setVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);

    if (passwordData?.newPassword !== passwordData.confirmPassword) {
     setLoading(false);
      return setFeedback({
        type: "error",
        message: "New password and confirm password don't match",
      });
          
    }

    try {
       await AuthApi.updatePassword({
        oldPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      }).then((res) => {
        if (res?.status) {  
          setFeedback({ type: "success", message: "Password updated successfully!" });
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
        }
      });

    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      if (error?.response) {
        setFeedback({
          type: "error",
          message: error?.response?.data?.message || "Something went wrong. Try again.",
        });
      }
    }

    setLoading(false);
  };

  return (
    <section className="bg-white  rounded-lg p-6 text-gray-600 text-sm">
      <div className="max-w-xl my-10">
        <h1 className="text-2xl">Update Password</h1>
        <form onSubmit={handleSubmit} className="mt-6">
          {feedback.message && (
            <FeedbackMessage type={feedback.type} message={feedback.message} />
          )}

          {/* Current Password */}
          <div className="mb-6 relative">
            <input
              type={visibility.currentPassword ? "text" : "password"}
              name="currentPassword"
              placeholder="Current Password"
              value={passwordData.currentPassword}
              onChange={handleChange}
              required
              className="form-input"
            />
            <span
              onClick={() => toggleVisibility("currentPassword")}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
            >
              {visibility.currentPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>

          {/* New Password */}
          <div className="mb-6 relative">
            <input
              type={visibility.newPassword ? "text" : "password"}
              name="newPassword"
              placeholder="New Password"
              value={passwordData.newPassword}
              onChange={handleChange}
              required
              className="form-input"
            />
            <span
              onClick={() => toggleVisibility("newPassword")}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
            >
              {visibility.newPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="mb-6 relative">
            <input
              type={visibility.confirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={passwordData.confirmPassword}
              onChange={handleChange}
              required
              className="form-input"
            />
            <span
              onClick={() => toggleVisibility("confirmPassword")}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
            >
              {visibility.confirmPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="form-primary-button bg-primary mt-4"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Security;