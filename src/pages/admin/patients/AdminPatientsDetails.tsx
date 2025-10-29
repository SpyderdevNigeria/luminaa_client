import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminApi from "../../../api/adminApi";
import { format } from "date-fns";
import UserImage from "../../../assets/images/patient/user.png";
import { FiArrowLeft } from "react-icons/fi";
import AssignPartnerModal from "../../../components/modal/AssignPartnerModal";
import { useToaster } from "../../../components/common/ToasterContext";

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
  partner?: any;
};

function AdminPatientDetails() {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [hmoProvider, setHmoProvider] = useState("");
  const [selectedHmo, setSelectedHmo] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
   const { showToast } = useToaster();
  const hmoList = [
    "AXA Mansard",
    "Hygeia HMO",
    "Reliance HMO",
    "Leadway Health",
    "Redcare HMO",
    "Avon Healthcare",
    "MetroHealth HMO",
    "Novo Health Africa",
    "Liberty Health",
    "IHMS",
    "Prohealth HMO",
    "Greenbay HMO",
    "Total Health Trust (THT)",
    "Mediplan Healthcare",
    "Healthcare International",
  ];
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"assign" | "unassign">("assign");
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
    const provider = showCustomInput ? hmoProvider : selectedHmo;
    if (!provider) {
      setMessage({ text: "Please select or enter an HMO provider.", type: "error" });
      return;
    }

    try {
      setVerifying(true);
      setMessage({ text: "", type: "" });
      await AdminApi.verifyPaitentHmo(id as string, {hmoProvider : provider });
      setMessage({ text: "Patient HMO verified successfully!", type: "success" });
      setHmoProvider("");
      showToast("Patient HMO verified successfully", "success");
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
    const openAssignModal = () => {
    setModalType("assign");
    setModalOpen(true);
  };

  const openUnassignModal = () => {
    setModalType("unassign");
    setModalOpen(true);
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
      <section className="flex flex-row items-center justify-between">
        <div>
                <h4 className="text-lg font-medium mb-2">Profile Image</h4>
        <img
          src={user?.user?.profilePicture || UserImage}
          alt=""
          className="w-30 h-30 rounded-full object-cover"
        />
        </div>


              {user.partner ? (
          <button
            onClick={openUnassignModal}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Unassign Partner
          </button>
        ) : (
          <button
            onClick={openAssignModal}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            Assign Partner
          </button>
        )}
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

{user?.partner !== null && (
        <section>
                <h4 className="text-lg font-medium mb-2">Partner</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Partner Name:</strong> {user?.partner?.name || "N/A"}
          </div>
          <div>
            <strong>Partner Type:</strong> {user?.partner?.partnerType || "N/A"}
          </div>
          <div className="md:col-span-2">
            <strong>Partner Description:</strong> {user?.partner?.description || "N/A"}
          </div>
        </div>
      </section>
)}

      {/* Verify HMO Section */}
<section className="border-t border-gray-200 pt-4">
      <h4 className="text-lg font-medium mb-2">Verify HMO</h4>

      <div className="flex flex-col md:flex-row gap-3 items-center">
        {!showCustomInput ? (
          <select
            value={selectedHmo}
            onChange={(e) => setSelectedHmo(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full md:w-1/2"
          >
            <option value="">Select HMO Provider</option>
            {hmoList.map((hmo) => (
              <option key={hmo} value={hmo}>
                {hmo}
              </option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            placeholder="Enter HMO Provider"
            value={hmoProvider}
            onChange={(e) => setHmoProvider(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full md:w-1/2"
          />
        )}

        <div className="flex gap-2">
          {!showCustomInput && (
            <button
              onClick={() => {
                setShowCustomInput(true);
                setSelectedHmo("");
              }}
              className="border border-primary text-primary px-4 py-2 rounded-md"
            >
              Order
            </button>
          )}
          <button
            onClick={handleVerifyHMO}
            disabled={verifying}
            className="bg-primary text-white px-6 py-2 rounded-md disabled:bg-gray-400"
          >
            {verifying ? "Verifying..." : "Verify HMO"}
          </button>
        </div>
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


       <AssignPartnerModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        type={modalType}
        patientId={id || ""}
        onSuccess={fetchUser}
      />

    </div>
    </div>

  );
}

export default AdminPatientDetails;
