import { useState,  } from "react";
import { FiPlus, FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Table, { Column } from "../../../components/common/Table";
import HeaderTab from "../../../components/common/HeaderTab";
import Dropdown from "../../../components/dropdown/dropdown";
import { useToaster } from "../../../components/common/ToasterContext";
import { useSpecialisations, Specialisation } from "../../../hooks/useSpecialisations";
import AdminSpecialisationForm from "./component/AdminSpecialisationForm";
import AdminSpecialisationViewModal from "./component/AdminSpecialisationViewModal";
import ConfirmModal from "../../../components/modal/ConfirmModal";


function AdminSpecialisations() {
  const {
    specialisations,
    loading,
    createSpecialisation,
    updateSpecialisation,
    deleteSpecialisation,
    refetch,
  } = useSpecialisations();

  const { showToast } = useToaster();
  const [showForm, setShowForm] = useState(false);
  const [editSpecialisation, setEditSpecialisation] = useState<Specialisation | null>(null);
  const [viewSpecialisation, setViewSpecialisation] = useState<Specialisation | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [selectedSpecialisationId, setSelectedSpecialisationId] = useState<string | null>(null);
  const handleView = (spec: Specialisation) => {
  setViewSpecialisation(spec);
};

  // Handle edit click
  const handleEdit = (spec: Specialisation) => {
    setEditSpecialisation(spec);
    setShowForm(true);
  };

  // Handle delete
  const handleDelete = async (id?: string) => {
    if (!id) return;
    setSelectedSpecialisationId(id);
    setConfirmMessage("Are you sure you want to delete this specialisation?");
    setConfirmOpen(true);
  };
    const onConfirmDelete = async () => {
      if (!selectedSpecialisationId) return;
      setConfirmLoading(true);
      try {
        await deleteSpecialisation(selectedSpecialisationId);
        showToast("Specialisation deleted successfully", "success");
        refetch();
      } catch (error) {
        console.error("Delete error:", error);
        showToast("Failed to delete specialisation", "error");
      } finally {
        setConfirmOpen(false);
        setConfirmLoading(false);
        setSelectedSpecialisationId(null);
      }
    };
  

  // Table columns
  const columns: Column<Specialisation>[] = [
    {
      key: "name",
      label: "Name",
      render: (item) => <span>{item.name}</span>,
    },
    {
      key: "description",
      label: "Description",
      render: (item) => <span>{item.description || "-"}</span>,
    },
    {
      key: "consultationPrice",
      label: "Consultation Price",
      render: (item) => <span>₦{item.consultationPrice?.toLocaleString()}</span>,
    },
    {
      key: "additionalInfo",
      label: "Additional Info",
      render: (item) => <span>{item.additionalInfo || "-"}</span>,
    },
    {
      key: "actions",
      label: "Actions",
      render: (item) => (
        <Dropdown showArrow={false} triggerLabel="" triggerIcon={<HiOutlineDotsVertical />}>
          <ul className="space-y-2 text-sm">
      <li
        onClick={() => handleView(item)}
        className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2"
      >
        <FiEye /> View
      </li>

            <li
              onClick={() => handleEdit(item)}
              className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2"
            >
              <FiEdit /> Edit
            </li>
            <li
              onClick={() => handleDelete(item.id)}
              className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2 text-red-600"
            >
              <FiTrash2 /> Delete
            </li>
          </ul>
        </Dropdown>
      ),
    },
  ];

  // Show form modal (create/edit)
  if (showForm) {
    return (
      <AdminSpecialisationForm
        specialisation={editSpecialisation}
        onClose={() => {
          setShowForm(false);
          setEditSpecialisation(null);
          refetch();
        }}
        onBack={() => {
          setShowForm(false);
          setEditSpecialisation(null);
        }}
        onSubmit={async (data: Specialisation, id?: string) => {
          try {
            if (id) {
              await updateSpecialisation(id, data);
              showToast("Specialisation updated successfully", "success");
            } else {
              await createSpecialisation(data);
              showToast("Specialisation created successfully", "success");
            }
            setShowForm(false);
            setEditSpecialisation(null);
          } catch {
            showToast("Action failed. Please try again.", "error");
          }
        }}
      />
    );
  }

  return (
    <div className="space-y-4 bg-white p-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Specialisations</h1>
        <div className="flex items-center gap-4">
          <button
            className="bg-primary text-white px-6 py-2 text-sm rounded-md flex items-center gap-2"
            onClick={() => setShowForm(true)}
          >
            <FiPlus />
            Add Specialisation
          </button>
        </div>
      </div>

      {/* Search / Filter header (if needed later) */}
      <HeaderTab
        title=""
        searchPlaceholder="Search specialisations..."
        onSearchChange={() => {}}
        dropdowns={[]}
      />

      {/* Table */}
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Table data={specialisations} columns={columns} page={0} limit={0} />
        )}
      </div>

      {viewSpecialisation && (
  <AdminSpecialisationViewModal
    specialisation={viewSpecialisation}
    onClose={() => setViewSpecialisation(null)}
  />
)}
      <ConfirmModal
        open={confirmOpen}
        description={confirmMessage}
        onConfirm={onConfirmDelete}
        onClose={() => {
          setConfirmOpen(false);
          setConfirmLoading(false);
          setSelectedSpecialisationId(null);
        }}
        loading={confirmLoading}
      />

    </div>
  );
}

export default AdminSpecialisations;
