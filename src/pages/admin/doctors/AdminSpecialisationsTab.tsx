import { useState } from "react";
import AdminSpecialisations from "./AdminSpecialisations";
import AdminDoctorsSpecialties from "./AdminDoctorsSpecialties";

function AdminSpecialisationsTab() {
  const [activeTab, setActiveTab] = useState<"specialisations" | "doctorSpecialties">(
    "specialisations"
  );

  return (
    <div className="space-y-6">
      {/* Tabs Header */}
      <div className="flex gap-4 border-b border-gray-200 bg-white pt-2">
        <button
          onClick={() => setActiveTab("specialisations")}
          className={`pb-2 px-4 font-medium text-sm border-b-2 ${
            activeTab === "specialisations"
              ? "border-primary text-primary"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Specialisations
        </button>

        <button
          onClick={() => setActiveTab("doctorSpecialties")}
          className={`pb-2 px-4 font-medium text-sm border-b-2 ${
            activeTab === "doctorSpecialties"
              ? "border-primary text-primary"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Doctor Specialties
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === "specialisations" && <AdminSpecialisations />}
        {activeTab === "doctorSpecialties" && <AdminDoctorsSpecialties />}
      </div>
    </div>
  );
}

export default AdminSpecialisationsTab;
