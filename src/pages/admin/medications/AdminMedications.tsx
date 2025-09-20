import { useEffect, useState } from "react";
import { FiPlus, FiEye, FiEdit, FiTrash2, FiUpload } from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import useMedications from "../../../hooks/useMedications";
import AdminApi from "../../../api/adminApi";
import Table, { Column } from "../../../components/common/Table";
import HeaderTab from "../../../components/common/HeaderTab";
import Dropdown from "../../../components/dropdown/dropdown";
import StatusBadge from "../../../components/common/StatusBadge";
import { CiViewList } from "react-icons/ci";
import AdminMedicationsCreate from "./component/AdminMedicationsCreate";
import {
  medicationCategoryOptions,
  medicationStatusOptions,
  medicationDosageFormOptions,
  medicationManufacturerOptions,
} from "../../../utils/dashboardUtils";
import { useToaster } from "../../../components/common/ToasterContext";
import ConfirmModal from "../../../components/modal/ConfirmModal";
import { MdInventory } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import routeLinks from "../../../utils/routes";
import useAdminAuth from "../../../hooks/useAdminAuth";
import UploadCsvModal from "../../../components/modal/UploadCsvModal";
import UploadErrorModal from "../../../components/modal/UploadErrorModal";

function AdminMedications() {
  const {
    medications,
    medicationsPage,
    medicationsLimit,
    medicationsTotal,
    medicationsLoading,
    medicationSearch,
    medicationCategory,
    medicationDosageForm,
    medicationStatus,
    medicationRequiresPrescription,
    medicationManufacturer,
    setMedicationsPage,
    setMedicationSearch,
    setMedicationCategory,
    setMedicationDosageForm,
    setMedicationStatus,
    setMedicationRequiresPrescription,
    setMedicationManufacturer,
    getMedications,
  } = useMedications(AdminApi);
  
  const [showForm, setShowForm] = useState(false);
  const [editMedication, setEditMedication] = useState<any>(null);
  const [viewMedication, setViewMedication] = useState<any>(null);
  const { showToast } = useToaster();
    const [loadingUpload, setLoadingUpload] = useState(false)
  // ConfirmModal states
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [onConfirm, setOnConfirm] = useState<() => void>(() => { });
  const [confirmLoading, setConfirmLoading] = useState(false);
  const navigate = useNavigate();
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

      const [uploadErrors, setUploadErrors] = useState<{ row: number; error: string }[]>([]);
const [errorModalOpen, setErrorModalOpen] = useState(false);

  const { userProfile } = useAdminAuth();
  useEffect(() => {
    getMedications();
  }, [
    medicationsPage,
    medicationSearch,
    medicationCategory,
    medicationDosageForm,
    medicationStatus,
    medicationRequiresPrescription,
    medicationManufacturer,
  ]);

  const handleEdit = (medication: any) => {
    setEditMedication(medication);
    setShowForm(true);
  };

  const handleDelete = (medicationId: string, medication: any) => {
    setConfirmMessage(
      `Are you sure you want to delete the medication "${medication?.name}"?`
    );
    setOnConfirm(() => async () => {
      setConfirmLoading(true);
      try {
        await AdminApi.deleteMedication(medicationId);
        showToast(
          `Medication "${medication?.name}" deleted successfully`,
          "success"
        );
        getMedications();
      } catch (error) {
        console.error("Error deleting medication:", error);
        showToast(`Failed to delete "${medication?.name}"`, "error");
      } finally {
        setConfirmLoading(false);
        setConfirmOpen(false);
      }
    });
    setConfirmOpen(true);
  };

  const toggleVisibility = (id: string, medication: any) => {
    const action = medication?.isHidden
      ? "make this medication visible"
      : "hide this medication";
    setConfirmMessage(`Are you sure you want to ${action}?`);
    setOnConfirm(() => async () => {
      setConfirmLoading(true);
      try {
        await AdminApi.updateMedicationVisibility(id);
        showToast(
          `Medication "${medication.name}" updated successfully`,
          "success"
        );
        getMedications();
      } catch (err) {
        console.error("Error toggling visibility:", err);
        showToast(`Failed to update visibility`, "error");
      } finally {
        setConfirmLoading(false);
        setConfirmOpen(false);
      }
    });
    setConfirmOpen(true);
  };

  const handleUpload = async (file: File) => {
      setLoadingUpload(true)
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await AdminApi.uploadMedicationCSV(formData);
        if (res.status === false) {
      console.error("Upload errors:", res.data.errors);

      // Save errors in state
      setUploadErrors(res.data.errors || []);
      setErrorModalOpen(true);

      showToast(res.message || "Some rows failed to upload", "error");
    } else {
        await getMedications();
      setUploadModalOpen(false);
        showToast("Medications uploaded successfully", "success");
    }
    } catch (error) {
      console.error("Upload failed", error);
      showToast("Upload Failed.", "error");
    }finally{
      setLoadingUpload(false)
    }
  };

  const handleNavigate = (id: string) => {
    if (userProfile?.user?.role === "admin") {
      navigate(routeLinks?.admin?.adminInventory + '/medication/' + id)
    } else {
      navigate(routeLinks?.superAdmin?.adminInventory + '/medication/' + id)
    }
  };
  const columns: Column<any>[] = [
    {
      key: "image",
      label: "Image",
      render: (m) =>
        m.image?.url ? (
          <img
            src={m.image.url}
            alt={m.name}
            className="w-12 h-12 object-cover rounded-md "
          />
        ) : (
          <span className="text-gray-400 text-sm">No image</span>
        ),
    },
    { key: "name", label: "Name" },
    { key: "genericName", label: "Generic Name" },
    { key: "manufacturer", label: "Manufacturer" },
    { key: "dosageForm", label: "Dosage Form" },
    { key: "strength", label: "Strength" },
    { key: "category", label: "Category" },
    { key: "price", label: "Price", render: (m) => `₦${m.price || 0}` },
    {
      key: "requiresPrescription",
      label: "Requires Prescription",
      render: (m) => (m.requiresPrescription ? "Yes" : "No"),
    },
    {
      key: "status",
      label: "Status",
      render: (m) => <StatusBadge status={m.status} />,
    },
    {
      key: "isHidden",
      label: "Hidden",
      render: (m) => <p>{m.isHidden ? "Hidden" : "Visible"}</p>,
    },
    {
      key: "actions",
      label: "Actions",
      render: (medication) => (
        <Dropdown
          showArrow={false}
          triggerLabel=""
          triggerIcon={<HiOutlineDotsVertical />}
        >
          <ul className="space-y-2 text-sm">
            <li
              onClick={() => toggleVisibility(medication.id, medication)}
              className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2"
            >
              <FiEye /> {medication.isHidden ? "Make Visible" : "Hide"}
            </li>
            <li
              onClick={() => handleNavigate(medication.id)}
              className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2"
            >
              <MdInventory /> Inventory
            </li>
            <li
              onClick={() => setViewMedication(medication)}
              className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2"
            >
              <CiViewList /> View
            </li>
            <li
              onClick={() => handleEdit(medication)}
              className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2"
            >
              <FiEdit /> Edit
            </li>
            <li
              onClick={() => handleDelete(medication.id, medication)}
              className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2 text-red-600"
            >
              <FiTrash2 /> Delete
            </li>
          </ul>
        </Dropdown>
      ),
    },
  ];

  if (showForm) {
    return (
      <AdminMedicationsCreate
        medication={editMedication}
        onClose={() => {
          setShowForm(false);
          setEditMedication(null);
          getMedications();
        }}
        onBack={() => {
          setShowForm(false);
          setEditMedication(null);
        }}
      />
    );
  }

  if (viewMedication) {
    return (
      <div>
        <button
          onClick={() => setViewMedication(null)}
          className="text-sm px-4 py-2 rounded text-primary"
        >
          ← Back to Medications
        </button>
        <div className="space-y-4 container-bd">

          {viewMedication?.image?.url && (
            <div className="w-full md:w-64">
              <p className="text-sm text-gray-600 mb-2">Current Image:</p>
              <img
                src={viewMedication?.image?.url}
                alt={viewMedication?.name}
                className="rounded-lg border object-cover w-full h-40"
              />
            </div>
          )}
          <div className="mt-4 space-y-2">
            <h2 className="text-xl font-semibold">{viewMedication?.name}</h2>
            <p>
              <strong>Generic Name:</strong> {viewMedication?.genericName}
            </p>
            <p>
              <strong>Manufacturer:</strong> {viewMedication?.manufacturer}
            </p>
            <p>
              <strong>Dosage Form:</strong> {viewMedication?.dosageForm}
            </p>
            <p>
              <strong>Strength:</strong> {viewMedication?.strength}
            </p>
            <p>
              <strong>Category:</strong> {viewMedication?.category}
            </p>
            <p>
              <strong>Price:</strong> ₦{viewMedication?.price || 0}
            </p>
            <p>
              <strong>Prescription Required:</strong>{" "}
              {viewMedication?.requiresPrescription ? "Yes" : "No"}
            </p>
            <div>
              <strong>Status:</strong>{" "}
              <StatusBadge status={viewMedication?.status} />
            </div>
            <p>
              <strong>Visibility:</strong>{" "}
              {viewMedication?.isHidden ? "Hidden" : "Visible"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Medications</h1>
        <div className="flex items-center gap-4">
          <button
            className="bg-primary text-white px-6 py-2 text-sm rounded-md flex items-center gap-2"
            onClick={() => setShowForm(true)}
          >
            <FiPlus /> Add Medication
          </button>
          <button
          disabled={loadingUpload}
            className={` ${loadingUpload ? "opacity-50 cursor-not-allowed bg-primary" : "bg-primary"} text-white px-6 py-2 text-sm rounded-md flex items-center gap-2`}
            onClick={() => setUploadModalOpen(true)}
          >
            <FiUpload />  {loadingUpload ? " Uploading..." : "Upload Medications"}
          </button>
        </div>
      </div>

      <section>
        <HeaderTab
          title=""
          showSearch={true}
          onSearchChange={setMedicationSearch}
          dropdowns={[
            {
              label: "Status",
              options: medicationStatusOptions,
              value: medicationStatus,
              onChange: setMedicationStatus,
            },
            {
              label: "Category",
              options: medicationCategoryOptions,
              value: medicationCategory,
              onChange: setMedicationCategory,
            },
            {
              label: "Dosage Form",
              options: medicationDosageFormOptions,
              value: medicationDosageForm,
              onChange: setMedicationDosageForm,
            },
            {
              label: "Requires Prescription",
              options: ["true", "false"],
              value: medicationRequiresPrescription,
              onChange: setMedicationRequiresPrescription,
            },
            {
              label: "Manufacturer",
              options: medicationManufacturerOptions,
              value: medicationManufacturer,
              onChange: setMedicationManufacturer,
            },
          ]}
        />

        <div>
          {medicationsLoading ? (
            <p>Loading...</p>
          ) : medications.length === 0 ? (
            <p className="text-center mt-10 text-gray-500">No medications found.</p>
          ) : (
            <Table
              data={medications}
              columns={columns}
              page={medicationsPage}
              total={medicationsTotal}
              limit={medicationsLimit}
              totalPages={Math.ceil(medicationsTotal / medicationsLimit)}
              setPage={setMedicationsPage}
            />
          )}
        </div>

        <ConfirmModal
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          description={confirmMessage}
          confirmText="Yes, Confirm"
          onConfirm={onConfirm}
          loading={confirmLoading}
        />

        <UploadCsvModal
          isOpen={uploadModalOpen}
          onClose={() => setUploadModalOpen(false)}
          onUpload={handleUpload}
          loadingUpload={loadingUpload}
        />

        
      <UploadErrorModal
        open={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
        errors={uploadErrors}
      />
      </section>
    </div>
  );
}

export default AdminMedications;
