import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminApi from "../../../api/adminApi";
import { format } from "date-fns";
import UserImage from "../../../assets/images/patient/user.png";
import { FiArrowLeft } from "react-icons/fi";

type User = {
  id: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    profilePicture: string;
  };
  role: string;
  isActive: boolean;
  isDisabled: boolean;
  phoneNumber: string | null;
  lastLogin: string;
  profilePicture?: any;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  hmoStatus?: string;
  // Biodata fields
  dateOfBirth?: string;
  gender?: string;
  maritalStatus?: string;
  religion?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
  hmoNumber?: string;
  hmoProvider?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  isBioDataCompleted?: boolean;
  isMedicalHistoryCompleted?: boolean;
};

function AdminPatientDetails() {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [hmoProvider, setHmoProvider] = useState("");
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" | "" }>({
    text: "",
    type: "",
  });

  const fetchUser = async () => {
    try {
      setLoading(true);
      if (!id) return;
      const response = await AdminApi.getPatientById(id);
      setUser(response?.data);
      setHmoProvider(response?.data?.hmoProvider || "");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyHMO = async () => {
    if (!hmoProvider.trim()) {
      setMessage({ text: "Please enter an HMO Provider", type: "error" });
      return;
    }

    try {
      setVerifying(true);
      setMessage({ text: "", type: "" });
      await AdminApi.verifyPaitentHmo(id as string, { hmoProvider });
      setMessage({ text: "Patient HMO verified successfully!", type: "success" });
      setHmoProvider("");
      await fetchUser();
    } catch (error: any) {
      console.error(error);
      setMessage({
        text: error?.response?.data?.message || "Failed to verify HMO",
        type: "error",
      });
    } finally {
      setVerifying(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  if (loading || !user) return <p>Loading patient...</p>;
  if (!user) return <p>Patient not found</p>;

  return (
    <div>
          <button
              onClick={()=> window.history.back()}
              className="flex items-center gap-2 text-primary mb-4"
            >
              <FiArrowLeft /> Back
              </button>
        <div className="max-w-4xl mx-auto bg-white rounded-lg p-6 space-y-8">
      <h2 className="text-2xl font-semibold mb-2">Patient Details</h2>

      {/* Profile Image */}
      <section>
        <h4 className="text-lg font-medium mb-2">Profile Image</h4>
        <img
          src={user?.user?.profilePicture || UserImage}
          alt=""
          className="w-30 h-30 rounded-full object-cover"
        />
      </section>

      {/* Account Info */}
      <section>
        <h4 className="text-lg font-medium mb-2">Account Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Name:</strong> {user?.user?.firstName} {user?.user?.lastName}
          </div>
          <div>
            <strong>Email:</strong> {user?.user?.email}
          </div>
          <div>
            <strong>Phone:</strong> {user?.phoneNumber || "N/A"}
          </div>
          <div>
            <strong>Email Verified:</strong> {user?.isEmailVerified ? "Yes" : "No"}
          </div>
          <div>
            <strong>Last Login:</strong>{" "}
            {user?.lastLogin ? format(new Date(user.lastLogin), "PPPppp") : "N/A"}
          </div>
          <div>
            <strong>Created:</strong> {format(new Date(user?.createdAt), "PPPppp")}
          </div>
        </div>
      </section>
      {/* Hmo details */}
      <section>
        <h4 className="text-lg font-medium mb-2">HMO Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <strong>HMO Number:</strong> {user.hmoNumber || "N/A"}
          </div>
          <div>
            <strong>HMO Provider:</strong> {user.hmoProvider || "N/A"}
          </div>
          <div>
            <strong>HMO Status:</strong> {user.hmoStatus || "N/A"}
          </div>
        </div>
      </section>

      {/* Biodata */}
      <section>
        <h4 className="text-lg font-medium mb-2">Biodata</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Date of Birth:</strong> {user.dateOfBirth || "N/A"}
          </div>
          <div>
            <strong>Gender:</strong> {user.gender || "N/A"}
          </div>
          <div>
            <strong>Marital Status:</strong> {user.maritalStatus || "N/A"}
          </div>
          <div>
            <strong>Religion:</strong> {user.religion || "N/A"}
          </div>
          <div>
            <strong>Address:</strong> {user.address || "N/A"}
          </div>
          <div>
            <strong>City:</strong> {user.city || "N/A"}
          </div>
          <div>
            <strong>State:</strong> {user.state || "N/A"}
          </div>
          <div>
            <strong>Country:</strong> {user.country || "N/A"}
          </div>
          <div>
            <strong>Zip Code:</strong> {user.zipCode || "N/A"}
          </div>
          <div>
            <strong>Emergency Contact:</strong> {user.emergencyContactName || "N/A"}
          </div>
          <div>
            <strong>Emergency Phone:</strong> {user.emergencyContactPhone || "N/A"}
          </div>
          <div>
            <strong>Biodata Completed:</strong> {user.isBioDataCompleted ? "Yes" : "No"}
          </div>
          <div>
            <strong>Medical History Completed:</strong>{" "}
            {user.isMedicalHistoryCompleted ? "Yes" : "No"}
          </div>
        </div>
      </section>

      {/* Verify HMO Section */}
      <section className="border-t border-gray-200 pt-4">
        <h4 className="text-lg font-medium mb-2">Verify HMO</h4>
        <div className="flex flex-col md:flex-row gap-3 items-center">
          <input
            type="text"
            placeholder="Enter HMO Provider"
            value={hmoProvider}
            onChange={(e) => setHmoProvider(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full md:w-1/2"
          />
          <button
            onClick={handleVerifyHMO}
            disabled={verifying}
            className="bg-primary text-white px-6 py-2 rounded-md disabled:bg-gray-400"
          >
            {verifying ? "Verifying..." : "Verify HMO"}
          </button>
        </div>

        {message.text && (
          <p
            className={`mt-2 text-sm ${
              message.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message.text}
          </p>
        )}
      </section>
    </div>
    </div>

  );
}

export default AdminPatientDetails;
