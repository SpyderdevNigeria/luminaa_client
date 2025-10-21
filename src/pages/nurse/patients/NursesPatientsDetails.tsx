import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NurseApi from "../../../api/nurseApi";
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


  const fetchUser = async () => {
    try {
      setLoading(true);
      if (!id) return;
      const response = await NurseApi.getPatientById(id);
      setUser(response?.data);
      
    } finally {
      setLoading(false);
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


    </div>
    </div>

  );
}

export default AdminPatientDetails;
