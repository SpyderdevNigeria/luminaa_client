import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminApi from "../../../api/adminApi";
import { useToaster } from "../../../components/common/ToasterContext";


interface ServiceDetails {
  id: string;
  name: string;
  category: string;
  description?: string;
  price: number;
  deleted?: boolean;
  deletedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function AdminServicesDetails() {
  const { id } = useParams<{ id: string }>();
  const { showToast } = useToaster();

  const [service, setService] = useState<ServiceDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- Fetch single service details ---
  useEffect(() => {
    const fetchService = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const res = await AdminApi.getServiceById(id);
        setService(res?.data);
      } catch (err: any) {
        console.error(err);
        showToast("Failed to load service details", "error");
        setError(err.message || "Failed to load service details");
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  if (loading) return <p className="p-4">Loading service details...</p>;
  if (error)
    return <p className="text-red-500 p-4">Error: {error}</p>;
  if (!service)
    return <p className="p-4">No service found.</p>;

  return (
    <div className="p-4 bg-white rounded-md shadow-sm space-y-6">
      {/* Back Button */}
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-semibold">Service Details</h1>
      </div>

      {/* Details Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div>
            <p className="text-gray-500 text-sm">Name</p>
            <p className="text-lg font-medium">{service.name}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Category</p>
            <p className="text-lg font-medium">{service.category}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Price</p>
            <p className="text-lg font-medium">₦{service.price}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-gray-500 text-sm">Status</p>
            <p
              className={`text-lg font-medium ${
                service.deletedAt ? "text-red-600" : "text-green-600"
              }`}
            >
              {service.deletedAt ? "Deleted" : "Active"}
            </p>
          </div>

          {service.createdAt && (
            <div>
              <p className="text-gray-500 text-sm">Created At</p>
              <p className="text-lg font-medium">
                {new Date(service.createdAt).toLocaleString()}
              </p>
            </div>
          )}

          {service.updatedAt && (
            <div>
              <p className="text-gray-500 text-sm">Last Updated</p>
              <p className="text-lg font-medium">
                {new Date(service.updatedAt).toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <div>
        <p className="text-gray-500 text-sm mb-1">Description</p>
        <p className="text-base whitespace-pre-line">
          {service.description || "No description provided."}
        </p>
      </div>
    </div>
  );
}
