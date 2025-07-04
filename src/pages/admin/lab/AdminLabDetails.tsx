import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminApi from "../../../api/adminApi";
import { format } from "date-fns";
import StatusBadge from "../../../components/common/StatusBadge";

type LabUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

type LabData = {
  id: string;
  user: LabUser;
  department: string;
  licenseNumber: string;
  licenseExpiryDate: string;
  hireDate: string;
  isActive: boolean;
  isProfileVerified: boolean;
};

function AdminLabDetails() {
  const { id } = useParams();
  const [lab, setLab] = useState<LabData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    try {
      setLoading(true);
      if (!id) return;
      const response = await AdminApi.getLabById(id);
      setLab(response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  if (loading || !lab) return <p>Loading lab technician...</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg p-6 space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Laboratory Technician Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <strong>Name:</strong> {lab.user.firstName} {lab.user.lastName}
        </div>
        <div>
          <strong>Email:</strong> {lab.user.email}
        </div>
        <div>
          <strong>Department:</strong> {lab.department}
        </div>
        <div>
          <strong>License Number:</strong> {lab.licenseNumber}
        </div>
        <div>
          <strong>License Expiry Date:</strong>{" "}
          {lab.licenseExpiryDate ? format(new Date(lab.licenseExpiryDate), "PPP") : "N/A"}
        </div>
        <div>
          <strong>Hire Date:</strong>{" "}
          {lab.hireDate ? format(new Date(lab.hireDate), "PPP") : "N/A"}
        </div>
        <div>
          <strong>Status:</strong>{" "}
          <StatusBadge status={lab.isActive ? "Active" : "Inactive"} />
        </div>
        <div>
          <strong>Profile Verified:</strong> {lab.isProfileVerified ? "Yes" : "No"}
        </div>
      </div>
    </div>
  );
}

export default AdminLabDetails;
