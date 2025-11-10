import { useState, useEffect } from "react";
import { FiEye, FiTrash2, FiPlus, FiEdit } from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";

import Table, { Column } from "../../../components/common/Table";
import Dropdown from "../../../components/dropdown/dropdown";
import ConfirmModal from "../../../components/modal/ConfirmModal";
import { useToaster } from "../../../components/common/ToasterContext";

import { Hmo, useHmo } from "../../../hooks/useHmos";
import HmoFormModal from "../../../components/modal/HmoFormModal";
import HmoPatientsTable from "./component/HmoPatientsTable";

function AdminPatientHmos() {
  const {
    hmos,
    patients,
    loading,
    error,
    getHmos,
    deleteHmo,
    getHmoPatients,
  } = useHmo();

  const { showToast } = useToaster();

  const [showHmoForm, setShowHmoForm] = useState(false);
  const [editHmo, setEditHmo] = useState<Hmo | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [selectedHmoId, setSelectedHmoId] = useState<string | null>(null);
  const [patientsModalOpen, setPatientsModalOpen] = useState(false);

  useEffect(() => {
    getHmos();
  }, []);

  const handleDelete = (id: string) => {
    setSelectedHmoId(id);
    setConfirmMessage("Are you sure you want to delete this HMO?");
    setConfirmOpen(true);
  };

  const onConfirmDelete = async () => {
    if (!selectedHmoId) return;
    setConfirmLoading(true);
    try {
      await deleteHmo(selectedHmoId);
      showToast("HMO deleted successfully", "success");
    } catch (err) {
      showToast("Failed to delete HMO", "error");
    } finally {
      setConfirmOpen(false);
      setConfirmLoading(false);
      setSelectedHmoId(null);
    }
  };

  const handleEdit = (hmo: Hmo) => {
    setEditHmo(hmo);
    setShowHmoForm(true);
  };

  const handleViewPatients = async (hmo: Hmo) => {
    await getHmoPatients(hmo.id!);
    setEditHmo(hmo); // set the selected HMO for the table header
    setPatientsModalOpen(true);
  };

  const columns: Column<Hmo>[] = [
    { key: "name", label: "Name", render: (h) => h.name },
    { key: "description", label: "Description", render: (h) => h.description || "N/A" },
    { key: "contactEmail", label: "Email", render: (h) => h.contactEmail || "N/A" },
    { key: "contactPhone", label: "Phone", render: (h) => h.contactPhone || "N/A" },
    { key: "patientCount", label: "Patients", render: (h) => h.patientCount || 0 },
    { key: "isActive", label: "Active", render: (h) => (h.isActive ? "YES" : "NO") },
    {
      key: "actions",
      label: "Actions",
      render: (h) => (
        <Dropdown showArrow={false} triggerLabel="" triggerIcon={<HiOutlineDotsVertical />}>
          <ul className="space-y-2 text-sm">
            <li
              className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2"
              onClick={() => handleViewPatients(h)}
            >
              <FiEye /> View Patients
            </li>
            <li
              className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2"
              onClick={() => handleEdit(h)}
            >
              <FiEdit /> Edit
            </li>
            <li
              className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2 text-red-600"
              onClick={() => handleDelete(h.id!)}
            >
              <FiTrash2 /> Delete
            </li>
          </ul>
        </Dropdown>
      ),
    },
  ];

  if (patientsModalOpen && editHmo) {
    return (
         <div className="">
          <div className="bg-white w-full  p-6 rounded shadow-lg overflow-y-auto ">
            <HmoPatientsTable
              patients={Array.isArray(patients) ? patients : []}
              hmo={editHmo}
            />
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-200 px-4 py-2 rounded"
                onClick={() => setPatientsModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
    )
  }
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">HMO Providers</h1>
        <button
          className="bg-primary text-white px-6 py-2 text-sm rounded-md flex items-center gap-2"
          onClick={() => setShowHmoForm(true)}
        >
          <FiPlus /> Add HMO
        </button>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      {loading ? (
        <p>Loading HMOs...</p>
      ) : (
        <Table data={hmos} columns={columns} page={1} total={hmos.length} limit={10} setPage={() => {}} />
      )}

      {/* HMO Create/Edit Modal */}
      {showHmoForm && (
        <HmoFormModal
          hmo={editHmo}
          onClose={() => {
            setShowHmoForm(false);
            setEditHmo(null);
          }}
          onSuccess={async () => {
            setShowHmoForm(false);
            setEditHmo(null);
            await getHmos();
          }}
        />
      )}

      {/* Confirm Delete */}
      <ConfirmModal
        open={confirmOpen}
        description={confirmMessage}
        onConfirm={onConfirmDelete}
        onClose={() => {
          setConfirmOpen(false);
          setConfirmLoading(false);
          setSelectedHmoId(null);
        }}
        loading={confirmLoading}
      />

   
    </div>
  );
}

export default AdminPatientHmos;
