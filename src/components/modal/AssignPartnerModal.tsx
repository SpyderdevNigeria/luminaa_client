import { useEffect, useState } from "react";

import AdminApi from "../../api/adminApi";
import Modal from "./modal";
import { usePartners } from "../../hooks/usePartners";
import { FaCircleCheck } from "react-icons/fa6";
import { useToaster } from "../common/ToasterContext";

interface AssignPartnerModalProps {
  open: boolean;
  onClose: () => void;
  type: "assign" | "unassign";
  patientId: string;
  onSuccess?: () => void;
}

const AssignPartnerModal = ({
  open,
  onClose,
  type,
  patientId,
  onSuccess,
}: AssignPartnerModalProps) => {
  const [selectedPartner, setSelectedPartner] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { data: partners, fetchPartners, updateFilters, filters, loading: partnersLoading } =
    usePartners(AdminApi);
 const { showToast } = useToaster();
  // Fetch partners when assigning
  useEffect(() => {
    if (type === "assign" && open) {
      fetchPartners();
    }
  }, [open, type, fetchPartners]);

  const handleAssign = async () => {
    if (!selectedPartner) return;
    try {
      setLoading(true);
      await AdminApi.assignPartnerToPatient({
        patientId,
        partnerId: selectedPartner.id,
      });
      onSuccess?.();
      onClose();
      showToast("Patient assigned successfully", "success");
    } catch (err: any) {
      console.error("Failed to assign partner:", err);
      showToast("Failed to assign partner", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleUnassign = async () => {
    try {
      setLoading(true);
      await AdminApi.unassignPartnerFromPatient(patientId);
      onSuccess?.();
      onClose();
     showToast("Patient unassign successfully", "success");
    } catch (err: any) {
      console.error("Failed to unassign partner:", err);
      showToast("Failed to unassign partner", "error");
    } finally {
      setLoading(false);
    }
  };

  // --- ASSIGN VIEW ---
  if (type === "assign") {
    return (
      <Modal
        open={open}
        onClose={onClose}
        title="Assign Partner to Patient"
        handleSubmit={handleAssign}
        buttonText={`${loading ? "Assigning..." : "Assign Partner"}`}
        loading={loading}
      >
        <div className="space-y-4">
          {/* Search Input */}
          <input
            type="text"
            value={filters.search || ""}
            onChange={(e) => updateFilters({ search: e.target.value })}
            placeholder="Search for a partner..."
            className="w-full form-input px-3 py-2 text-sm outline-none"
          />

          {/* Partner List */}
          <div className="border border-gray-200 rounded-md max-h-[300px] overflow-y-auto divide-y">
            {partnersLoading ? (
              <p className="p-3 text-sm text-gray-500">Loading partners...</p>
            ) : partners.length === 0 ? (
              <p className="p-3 text-sm text-gray-500">No partners found.</p>
            ) : (
              partners.map((partner: any) => (
                <div
                  key={partner.id}
                  className={`p-3 cursor-pointer flex flex-row items-center justify-between hover:bg-primary/10 ${
                    selectedPartner?.id === partner.id ? "bg-primary/10 border-l-4 border-primary" : ""
                  }`}
                  onClick={() => setSelectedPartner(partner)}
                >
                    <div>
                      <p className="font-medium text-gray-800">{partner.name}</p>
                      <p className="text-xs text-gray-500">{partner.partnerType}</p>
                    </div>
                   {
                     selectedPartner?.id === partner.id && (
                       <div className="">
                         <FaCircleCheck className="text-primary text-xl" />
                       </div>
                     )
                   }
                </div>
              ))
            )}
          </div>
        </div>
      </Modal>
    );
  }

  // --- UNASSIGN VIEW ---
  if (type === "unassign") {
    return (
      <Modal
        open={open}
        onClose={onClose}
        title="Unassign Partner"
        handleSubmit={handleUnassign}
        buttonText={`${loading ? "Unassigning..." : "Unassign Partner"}`}
        loading={loading}
      >
        <div className="text-center py-4">
          <p className="text-gray-700">
            Are you sure you want to unassign this patient from their current partner?
          </p>
        </div>
      </Modal>
    );
  }

  return null;
};

export default AssignPartnerModal;
