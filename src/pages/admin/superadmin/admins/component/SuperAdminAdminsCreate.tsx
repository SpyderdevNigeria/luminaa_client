import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { FiArrowLeft } from "react-icons/fi";
import SuperAdminApi from "../../../../../api/superAdminApi";
import FeedbackMessage from "../../../../../components/common/FeedbackMessage";
import CommonFormField from "../../../../../components/common/CommonFormField";
import { ISuperAdmin } from "../../../../../types/Interfaces";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
};

type Props = {
  admin?: ISuperAdmin | null;
  onBack: () => void;
  onClose: () => void;
};

const SuperAdminAdminsCreate: React.FC<Props> = ({ admin = null, onBack, onClose }) => {
  const [message, setMessage] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [roleLoading, setRoleLoading] = useState(false);
  const [role, setRole] = useState(admin?.user?.role || "admin");

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
  });

  useEffect(() => {
    if (admin) {
      setFormData({
        firstName: admin.user.firstName || "",
        lastName: admin.user.lastName || "",
        email: admin.user.email || "",
        contactNumber: admin.contactNumber || "",
      });
      setRole(admin.user.role || "admin");
    }
  }, [admin]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ message: "", type: "" });

    try {
      if (admin) {
        const response = await SuperAdminApi.updateAdmin(admin.id, formData);
        setMessage({
          message: response?.data?.message || "Admin updated successfully",
          type: "success",
        });
      } else {
        const response = await SuperAdminApi.createAdmin(formData);
        setMessage({
          message: response?.data?.message || "Admin created successfully",
          type: "success",
        });
        onClose();
      }
    } catch (error) {
      setMessage({
        message: "An error occurred",
        type: "error",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!admin) return;

    setRoleLoading(true);
    setMessage({ message: "", type: "" });

    try {
      const response = await SuperAdminApi.updateAdminRole(admin.id, { role });
      setMessage({
        message: response?.data?.message || "Role updated successfully",
        type: "success",
      });
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      setMessage({ message: "Failed to update role", type: "error" });
      console.error(error);
    } finally {
      setRoleLoading(false);
    }
  };

  return (
    <main>
      <button onClick={onBack} className="flex items-center gap-2 text-primary mb-4">
        <FiArrowLeft /> Back to List
      </button>

      <div className="bg-white p-6 rounded-lg max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">
          {admin ? "Edit Admin" : "Add Admin"}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            {message.message && (
              <FeedbackMessage type={message.type} message={message.message} />
            )}
          </div>

          {[
            { name: "firstName", label: "First Name", required: true, type: "text" },
            { name: "lastName", label: "Last Name", required: true, type: "text" },
            { name: "email", label: "Email", required: true, type: "email" },
            { name: "contactNumber", label: "Contact Number", required: true, type: "text" },
          ].map((field) => (
            <CommonFormField
              key={field.name}
              {...field}
              value={formData[field.name as keyof FormData]}
              onChange={handleChange}
            />
          ))}

          <div className="col-span-1 md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded-md mt-4"
              disabled={loading}
            >
              {loading ? "Loading..." : admin ? "Update Admin" : "Create Admin"}
            </button>
          </div>
        </form>

        {/* Role update form */}
        {admin && (
          <form onSubmit={handleRoleSubmit} className="mt-8 pt-6">
            <h3 className="text-lg font-medium mb-3">Update Role</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
              <div>
                <label className="block mb-1 font-medium text-sm">Role</label>
                <select
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full border-gray-300 rounded-md"
                >
                  <option value="admin">Admin</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-primary text-white px-6 py-2 rounded-md"
                  disabled={roleLoading}
                >
                  {roleLoading ? "Updating..." : "Update Role"}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </main>
  );
};

export default SuperAdminAdminsCreate;
