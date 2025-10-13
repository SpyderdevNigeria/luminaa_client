import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminApi from "../../../api/adminApi";
import { format } from "date-fns";
import StatusBadge from "../../../components/common/StatusBadge";
import { FiArrowLeft } from "react-icons/fi";

function AdminDoctorsDetails() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchDoctor = async () => {
    try {
      setLoading(true);
      if (!id) return;
      const response = await AdminApi.getDoctorById(id);
      setDoctor(response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctor();
  }, [id]);

  if (loading || !doctor) return <p>Loading doctor...</p>;

  const { user, specialty, availability, licenseDocument, graduationCertificate } = doctor;

  const renderDocument = (doc: any, label: string) => (
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
            className="px-4 py-1 rounded border border-primary bg-white  text-primary text-sm text-center"
          >
            View
          </a>
          <a
            href={doc?.url}
            download
            className="px-4 py-1 rounded  bg-primary text-white text-sm text-center"
          >
            Download
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <button
        onClick={() => window.history.back()}
        className="flex items-center gap-2 text-primary mb-4"
      >
        <FiArrowLeft /> Back
      </button>

      <div className="max-w-4xl mx-auto bg-white  rounded-lg p-6 space-y-6">
        <h2 className="text-2xl font-semibold mb-4">Doctor Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Name:</strong> {user.firstName} {user.lastName}
          </div>
          <div>
            <strong>Email:</strong> {user.email}
          </div>
          <div>
            <strong>Specialty:</strong> {specialty}
          </div>
          <div>
            <strong>Status:</strong>{" "}
            <StatusBadge status={doctor.isActive ? "Active" : "Inactive"} />
          </div>
          <div>
            <strong>Disabled:</strong>{" "}
            <StatusBadge status={user.isDisabled ? "Disabled" : "Enabled"} />
          </div>
          <div>
            <strong>Email Verified:</strong> {user.isEmailVerified ? "Yes" : "No"}
          </div>
          <div>
            <strong>Last Login:</strong>{" "}
            {user.lastLogin ? format(new Date(user.lastLogin), "PPPppp") : "N/A"}
          </div>
          <div>
            <strong>Profile Created:</strong>{" "}
            {user.createdAt ? format(new Date(user.createdAt), "PPPppp") : "N/A"}
          </div>
          <div className="col-span-2">
            <strong>Availability:</strong>
            <ul className="list-disc list-inside">
              {availability?.data?.length > 0 ? (
                availability.data.map((slot: any, index: number) => (
                  <li key={index}>
                    {slot.dayOfWeek}: {slot.startTime} - {slot.endTime}
                  </li>
                ))
              ) : (
                <p>No availability set</p>
              )}
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          {licenseDocument && renderDocument(licenseDocument, "License Document")}
          {graduationCertificate &&
            renderDocument(graduationCertificate, "Graduation Certificate")}
        </div>
      </div>
    </div>

  );
}

export default AdminDoctorsDetails;
