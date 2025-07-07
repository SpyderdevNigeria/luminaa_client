import { useState, useEffect } from "react";
import { FiEye, FiEdit, FiTrash2, FiUpload } from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";

import useAdmin from "../../../hooks/useAdmin";
import AdminApi from "../../../api/adminApi";

import Table, { Column } from "../../../components/common/Table";
import HeaderTab from "../../../components/common/HeaderTab";
import Dropdown from "../../../components/dropdown/dropdown";
import AdminNavigate from "../../../components/common/AdminNavigate";
import AdminPatientsCreate from "./component/AdminPatientsCreate";
import ConfirmModal from "../../../components/modal/ConfirmModal";
import { useToaster } from "../../../components/common/ToasterContext";
import UploadCsvModal from "../../../components/modal/UploadCsvModal";

function AdminPatients() {
  const {
    patients,
    patientsPage,
    patientsLimit,
    patientsTotal,
    patientsLoading,
    patientsSearch,
    patientsGender,
    patientsCity,
    isBioDataCompleted,
    isMedicalHistoryCompleted,
    getPatients,
    setPatientsPage,
    setPatientsSearch,
    setPatientsGender,
    setPatientsCity,
    // setPatientsIsBioDataCompleted,
    // setPatientsIsMedicalHistoryCompleted,
  } = useAdmin(AdminApi);

  const { showToast } = useToaster();

  const [showForm, setShowForm] = useState(false);
  const [editPatient, setEditPatient] = useState<any>(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  useEffect(() => {
    getPatients();
  }, [
    patientsPage,
    patientsSearch,
    patientsGender,
    patientsCity,
    isBioDataCompleted,
    isMedicalHistoryCompleted,
  ]);

  const handleEdit = (patient: any) => {
    setEditPatient(patient);
    setShowForm(true);
  };

  const confirmDelete = (patientId: string) => {
    setSelectedPatientId(patientId);
    setConfirmMessage("Are you sure you want to delete this patient?");
    setConfirmOpen(true);
  };

  const onConfirmDelete = async () => {
    if (!selectedPatientId) return;
    setConfirmLoading(true);
    try {
      await AdminApi.deletePatient(selectedPatientId);
      showToast("Patient deleted successfully", "success");
      getPatients();
    } catch (error) {
      console.error("Delete error:", error);
      showToast("Failed to delete patient", "error");
    } finally {
      setConfirmOpen(false);
      setConfirmLoading(false);
      setSelectedPatientId(null);
    }
  };

  const columns: Column<any>[] = [
    {
      key: "name",
      label: "Name",
      render: (patient) => (
        <span>{patient?.user?.firstName && patient?.user?.lastName ? `${patient?.user?.firstName} ${patient?.user?.lastName}` : "N/A"}</span>
      ),
    },
    {
      key: "email",
      label: "Email",
      render: (patient) => <span>{patient?.user?.email || "N/A"}</span>,
    },
    {
      key: "gender",
      label: "Gender",
      render: (patient) => <span>{patient?.gender || "N/A"}</span>,
    },
    {
      key: "city",
      label: "City",
      render: (patient) => <span>{patient?.city || "N/A"}</span>,
    },
    {
      key: "isBioDataCompleted",
      label: "BioData Completed",
      render: (patient) => (
        <span>{patient?.isBioDataCompleted ? "YES" : "NO"}</span>
      ),
    },
    {
      key: "isMedicalHistoryCompleted",
      label: "MedicalHistoryCompleted",
      render: (patient) => (
        <span>{patient?.isMedicalHistoryCompleted ? "YES" : "NO"}</span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (patient) => (
        <Dropdown showArrow={false} triggerLabel="" triggerIcon={<HiOutlineDotsVertical />}>
          <ul className="space-y-2 text-sm">
            <AdminNavigate role={"patient"} id={patient?.id} type="true">
              <FiEye /> View
            </AdminNavigate>
            <li
              onClick={() => handleEdit(patient)}
              className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2"
            >
              <FiEdit /> Edit
            </li>
            <li
              onClick={() => confirmDelete(patient?.id)}
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
      <AdminPatientsCreate
        patient={editPatient}
        onClose={() => {
          setShowForm(false);
          setEditPatient(null);
          getPatients();
        }}
        onBack={() => {
          setShowForm(false);
          setEditPatient(null);
        }}
      />
    );
  }
  const handleUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("csv", file);
    } catch (error) {
      console.error("Upload failed", error);
      showToast("Upload Failed.", "error");
    }
  };
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Patients</h1>
        <div className="flex items-center gap-4">
          <button
            className="bg-primary text-white px-6 py-2 text-sm rounded-md flex items-center gap-2"
            onClick={() => setShowForm(true)}
          >
            Add Patient
          </button>
          <button
            className="bg-primary text-white px-6 py-2 text-sm rounded-md flex items-center gap-2"
            onClick={() => setUploadModalOpen(true)}
          >
            <FiUpload /> Upload Patients
          </button>
        </div>
      </div>

      <HeaderTab
        title=""
        showSearch={true}
        searchPlaceholder="Search by Name"
        onSearchChange={(val) => setPatientsSearch(val)}
        dropdowns={[
          {
            label: "Gender",
            options: ["male", "female"],
            value: patientsGender,
            onChange: (val) => setPatientsGender(val),
          },
          {
            label: "City",
            options: ["Lagos", "Abuja", "Port Harcourt"],
            value: patientsCity,
            onChange: (val) => setPatientsCity(val),
          },
          // {
          //   label: "Bio Data Completed",
          //   options: ["true", "false"],
          //   value: isBioDataCompleted,
          //   onChange: (val) => setPatientsIsBioDataCompleted(val),
          // },
          // {
          //   label: "Medical History Completed",
          //   options: ["true", "false"],
          //   value: isMedicalHistoryCompleted,
          //   onChange: (val) => setPatientsIsMedicalHistoryCompleted(val),
          // },
        ]}
      />

      <ConfirmModal
        open={confirmOpen}
        description={confirmMessage}
        onConfirm={onConfirmDelete}
        onClose={() => {
          setConfirmOpen(false);
          setConfirmLoading(false);
          setSelectedPatientId(null);
        }}
        loading={confirmLoading}
      />

      <div>
        {patientsLoading ? (
          <p>Loading...</p>
        ) : (
          <Table
            data={patients}
            columns={columns}
            page={patientsPage}
            total={patientsTotal}
            limit={patientsLimit}
            setPage={setPatientsPage}
          />
        )}
      </div>
      <UploadCsvModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onUpload={handleUpload}
      />
    </div>
  );
}

export default AdminPatients;
