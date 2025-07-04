import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminApi from "../../../api/adminApi";
import { format } from "date-fns";
import StatusBadge from "../../../components/common/StatusBadge";

type PharmacistUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isDisabled: boolean;
  phoneNumber: string | null;
  lastLogin: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
};

type Document = {
  id: string;
  url: string;
  type: string;
};

type Pharmacist = {
  id: string;
  licenseNumber: string;
  licenseExpiryDate: string;
  hireDate: string;
  isActive: boolean;
  isProfileVerified: boolean;
  user: PharmacistUser;
  licenseDocument?: Document;
};

function AdminPharmacistsDetails() {
  const { id } = useParams();
  const [pharmacist, setPharmacist] = useState<Pharmacist | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchPharmacist = async () => {
    try {
      setLoading(true);
      if (!id) return;
      const response = await AdminApi.getPharmacistById(id);
      setPharmacist(response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPharmacist();
  }, [id]);

  if (loading || !pharmacist) return <p>Loading pharmacist...</p>;

  const { user, licenseDocument } = pharmacist;

  const renderDocument = (doc: Document, label: string) => {
    const downloadUrl = doc?.url?.replace("/upload/", "/upload/fl_attachment/");
    return (
      <div className="space-y-2">
        <p className="font-medium">{label}</p>
        <div className="flex items-center gap-4">
          <img
            src={doc?.url}
            alt={label}
            className="w-[150px] h-[150px] object-cover border border-gray-300 rounded"
          />
          <div className="flex flex-col gap-2">
            <a
              href={doc?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1 rounded border border-primary bg-white text-primary text-sm text-center"
            >
              View
            </a>
            <a
              href={downloadUrl}
              download
              className="px-4 py-1 rounded bg-primary text-white text-sm text-center"
            >
              Download
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg p-6 space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Pharmacist Details</h2>

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
          <StatusBadge status={pharmacist.isActive ? "Active" : "Inactive"} />
        </div>
        <div>
          <strong>Email Verified:</strong> {user.isEmailVerified ? "Yes" : "No"}
        </div>
        <div>
          <strong>Profile Verified:</strong>{" "}
          {pharmacist.isProfileVerified ? "Yes" : "No"}
        </div>
        <div>
          <strong>License Number:</strong> {pharmacist.licenseNumber}
        </div>
        <div>
          <strong>License Expiry Date:</strong>{" "}
          {format(new Date(pharmacist.licenseExpiryDate), "PPP")}
        </div>
        <div>
          <strong>Hire Date:</strong>{" "}
          {format(new Date(pharmacist.hireDate), "PPP")}
        </div>
        <div>
          <strong>Last Login:</strong>{" "}
          {user.lastLogin ? format(new Date(user.lastLogin), "PPP") : "N/A"}
        </div>
      </div>

      {licenseDocument && renderDocument(licenseDocument, "License Document")}
    </div>
  );
}

export default AdminPharmacistsDetails;
