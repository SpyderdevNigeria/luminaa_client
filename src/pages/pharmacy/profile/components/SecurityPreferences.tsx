import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import FeedbackMessage from "../../../../components/common/FeedbackMessage";
import AuthApi from "../../../../api/authApi";
interface NotificationSettingsFormProps {
  handleClose: () => void;
}

const NotificationSettingsForm = ({ handleClose }: NotificationSettingsFormProps) => {
  const [notificationType, setNotificationType] = useState<"sound" | "vibrations" | null>("sound");
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    retypePassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ message: "", type: "" });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    retype: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (form.newPassword !== form.retypePassword) {
      setLoading(false);
      return setFeedback({
        type: "error",
        message: "New password and confirm password don't match",
      });
    }

    try {
      // Replace AuthApi with actual API call
      await AuthApi.updatePassword({
        oldPassword: form.currentPassword,
        newPassword: form.newPassword,
      }).then((res) => {
        if (res?.status) {
          setFeedback({
            type: "success",
            message: "Password updated successfully!",
          });
          setForm({
            currentPassword: "",
            newPassword: "",
            retypePassword: "",
          });
        }
      });
    } catch (err) {
        console.log(err)
      const error = err as { response?: { data?: { message?: string } } };
      if (error?.response) {
        setFeedback({
          type: "error",
          message:
            error?.response?.data?.message || "Something went wrong. Try again.",
        });
      }
    }

    setLoading(false);
  };

  const toggleVisibility = (field: "current" | "new" | "retype") => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

      useEffect(() => {
          setFeedback({
            message: "",
            type: "",
          });
        }, [form])

  return (
    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto">
      {/* Notifications */}
      <div className="  flex flex-row gap-8 mb-6">
        <div>
          <h2 className="text-lg font-semibold">Notifications</h2>
          <p className="text-sm text-gray-500">This is where you’ll receive notifications</p>
        </div>
        <div className="space-y-4">
          <label className="flex items-start space-x-2 cursor-pointer">
            <input
              type="checkbox"
              name="notification"
              checked={notificationType === "sound"}
              onChange={() => setNotificationType("sound")}
              className="form-checkbox text-primary"
            />
            <div>
              <p className="font-medium">Sound</p>
              <p className="text-sm text-gray-500">Enable sound notifications</p>
            </div>
          </label>
          <label className="flex items-start space-x-2 cursor-pointer">
            <input
              type="checkbox"
              name="notification"
              checked={notificationType === "vibrations"}
              onChange={() => setNotificationType("vibrations")}
              className="form-checkbox text-primary"
            />
            <div>
              <p className="font-medium">Vibrations</p>
              <p className="text-sm text-gray-500">Enable vibrations effect</p>
            </div>
          </label>
        </div>
      </div>

      <hr className="border-t border-gray-300" />

      {/* Password Reset */}
      <div className="flex flex-col md:flex-row gap-8 my-8">
        <div>
          <h2 className="text-lg font-semibold">Reset your Password</h2>
          <p className="text-sm text-gray-500 whitespace-nowrap">
            This is where you’ll receive notifications
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 w-full">
          {feedback.message && (
            <FeedbackMessage type={feedback.type} message={feedback.message} />
          )}

          {/* Password Fields */}
          {[
            { label: "Current Password", name: "currentPassword", field: "current" },
            { label: "New Password", name: "newPassword", field: "new" },
            { label: "Retype New Password", name: "retypePassword", field: "retype" },
          ].map(({ label, name, field }) => (
            <div key={name} className="relative">
              <label className="form-label !text-base !font-light flex items-center gap-2">
                {label}
              </label>
              <input
                type={showPassword[field as keyof typeof showPassword] ? "text" : "password"}
                name={name}
                value={form[name as keyof typeof form]}
                onChange={handleChange}
                required
                placeholder={label}
                className="form-input focus:outline-primary text-gray-light w-full border border-gray-300 rounded-md px-3 py-2 pr-10"
              />
              <div
                onClick={() => toggleVisibility(field as keyof typeof showPassword)}
                className="absolute right-3 top-[42px] text-xl text-gray-500 cursor-pointer"
              >
                {showPassword[field as keyof typeof showPassword] ? (
                  <AiOutlineEyeInvisible />
                ) : (
                  <AiOutlineEye />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={handleClose}
          className="px-6 py-2 border border-primary text-primary rounded "
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-primary text-white border border-primary rounded-md hover:bg-primary transition"
        >
          {loading ? "Updating..." : "Save & Continue"}
        </button>
      </div>
    </form>
  );
};

export default NotificationSettingsForm;
