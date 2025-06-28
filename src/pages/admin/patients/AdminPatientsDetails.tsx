import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminApi from "../../../api/adminApi"; 
import { format } from "date-fns";
import StatusBadge from "../../../components/common/StatusBadge";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isActive: boolean;
  isDisabled: boolean;
  phoneNumber: string | null;
  lastLogin: string;
  profilePicture?: any;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
};

function AdminPatientDetails() {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  const [role, setRole] = useState("");

  const fetchUser = async () => {
    try {
      setLoading(true);
      if (!id) return;
      const response = await AdminApi.getPatientById(id);
      setUser(response?.data);
      setRole(response?.data?.role);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async () => {
    try {
      setStatusLoading(true);
      
      if (user) {
        await AdminApi.toggleUserStatus(user.id, {isDisabled : !user.isDisabled  });
        await fetchUser();
      }
    } finally {
      setStatusLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  if (loading || !user) return <p>Loading patient...</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg p-6 space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Patient Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <strong>Name:</strong> {user.firstName} {user.lastName}
        </div>
        <div>
          <strong>Email:</strong> {user.email}
        </div>
        <div>
          <strong>Phone:</strong> {user.phoneNumber || "N/A"}
        </div>
        <div>
          <strong>Role:</strong> {user.role}
        </div>
        <div>
          <strong>Status:</strong>{" "}
        <StatusBadge status={user.isActive ? "Active" : "Inactive"}/>
        </div>
        <div>
          <strong>Disabled:</strong> {user.isDisabled ? "Yes" : "No"}
        </div>
        <div>
          <strong>Email Verified:</strong> {user.isEmailVerified ? "Yes" : "No"}
        </div>
        <div>
          <strong>Last Login:</strong>{" "}
          {user.lastLogin ? format(new Date(user.lastLogin), "PPPppp") : "N/A"}
        </div>
        <div>
          <strong>Created:</strong>{" "}
          {format(new Date(user.createdAt), "PPPppp")}
        </div>
      </div>

      {role!== "super_admin" && (
        <>
          <div className="flex justify-end">
            <button
              onClick={handleToggleStatus}
              className="bg-primary text-white px-6 py-2 rounded-md"
              disabled={statusLoading}
            >
              {statusLoading
                ? "Toggling..."
                : user.isActive
                ? "Deactivate"
                : "Activate"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default AdminPatientDetails;
