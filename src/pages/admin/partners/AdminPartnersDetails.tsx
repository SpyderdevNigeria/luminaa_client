import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminApi from "../../../api/adminApi";
import Section from "../../../components/common/Section";
import Info from "../../../components/common/Info";
import AdminServicePrices from "./AdminServicePrices";
import { Tabs } from "../../../components/common/Tabs";

const AdminPartnersDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [partner, setPartner] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"details" | "patients" | "servicesPrices">("details");

  useEffect(() => {
    const fetchPartner = async () => {
      try {
        setLoading(true);
        const response = await AdminApi.getPartnerById(id!);
        setPartner(response?.data);
      } catch (err: any) {
        setError(err.message || "Failed to load partner details");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPartner();
  }, [id]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <span className="ml-3 text-gray-600 font-medium">
          Loading partner details...
        </span>
      </div>
    );

  if (error)
    return <p className="text-red-500 text-center mt-6">{error}</p>;

  if (!partner)
    return <p className="text-gray-600 text-center mt-6">No partner details found.</p>;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-primary/5 border border-primary/80 rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-primary">
          Partner Details
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Partner ID: {partner.id}
        </p>
      </div>

      {/* Tabs */}
      <div  className="bg-white ">
      <Tabs
        activeTab={activeTab}
        onChange={(tab) => setActiveTab(tab as any)}
        tabs={[
          { key: "details", label: "Details" },
          { key: "patients", label: "Patients" },
          { key: "servicesPrices", label: "Service Prices" },
        ]}
      />
</div>
      {/* Tab Content */}

        {activeTab === "details" && (
        <Section title="Basic Information">
          <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-4">
            <Info label="Name" value={partner.name || "—"} />
            <Info label="Type" value={partner.partnerType || "—"} />
            <Info label="Description" value={partner.description || "—"} />
            <Info
              label="Created At"
              value={
                partner.createdAt
                  ? new Date(partner.createdAt).toLocaleString()
                  : "—"
              }
            />
          </div>
        </Section>
      )}

      {activeTab === "patients" && (
        <div className="bg-white p-4 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Patients</h3>
          <p className="text-gray-600">List of patients assigned to this partner (to be implemented).</p>
        </div>
      )}

      {activeTab === "servicesPrices" && (
        <div className="bg-white   border border-gray-200">
          <AdminServicePrices partner={partner} />
        </div>
      )}
    </div>
  );
};

export default AdminPartnersDetails;
