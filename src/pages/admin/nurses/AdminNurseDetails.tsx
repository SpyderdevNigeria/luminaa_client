import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminApi from "../../../api/adminApi";
import { format } from "date-fns";
import StatusBadge from "../../../components/common/StatusBadge";
import { FiArrowLeft } from "react-icons/fi";

function AdminNurseDetails() {
  const { id } = useParams();
  const [nurse, setNurse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchNurse = async () => {
    try {
      setLoading(true);
      if (!id) return;
      const response = await AdminApi.getNurseById(id);
      if (response) {
        setNurse(response);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNurse();
  }, [id]);
  console.log(nurse)
  if (loading || !nurse) return <p>Loading nurse...</p>;

  return (

    <div>
      <button
        onClick={() => window.history.back()}
        className="flex items-center gap-2 text-primary mb-4"
      >
        <FiArrowLeft /> Back
      </button>

      <div className="max-w-4xl mx-auto bg-white rounded-lg p-6 space-y-6">
        <h2 className="text-2xl font-semibold mb-4">Nurse Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Name:</strong> {nurse.user?.firstName} {nurse.lastName}
          </div>
          <div>
            <strong>Email:</strong> {nurse.user?.email}
          </div>
          <div>
            <strong>Phone:</strong> {nurse.user?.phoneNumber}
          </div>
          <div>
            <strong>License Number:</strong> {nurse.licenseNumber}
          </div>
          <div>
            <strong>Specialization:</strong> {nurse.specialization}
          </div>
          <div>
            <strong>Department:</strong> {nurse.department}
          </div>
          <div>
            <strong>Years of Experience:</strong> {nurse.yearsOfExperience}
          </div>
          <div>
            <strong>Hire Date:</strong>{" "}
            {nurse.hireDate ? format(new Date(nurse.hireDate), "PPP") : "N/A"}
          </div>
          <div>
            <strong>Status:</strong>{" "}
            <StatusBadge status={nurse.isActive ? "Active" : "Inactive"} />
          </div>
          {/* <div>
          <strong>Profile Created:</strong>{" "}
          {nurse.createdAt ? format(new Date(nurse.createdAt), "PPPppp") : "N/A"}
        </div>
        <div>
          <strong>Last Updated:</strong>{" "}
          {nurse.updatedAt ? format(new Date(nurse.updatedAt), "PPPppp") : "N/A"}
        </div> */}
          <div>
            <strong>Profile Verified:</strong>{" "}
            <span className={nurse.isProfileVerified ? "text-green-600" : "text-red-600"}>
              {nurse.isProfileVerified ? "Yes" : "No"}
            </span>
          </div>
        </div>
      </div>
    </div>

  );
}

export default AdminNurseDetails;
