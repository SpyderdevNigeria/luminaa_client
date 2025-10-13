import { useState, useEffect } from "react";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";

import useAdmin from "../../../hooks/useAdmin";
import AdminApi from "../../../api/adminApi";

import Table, { Column } from "../../../components/common/Table";
import HeaderTab from "../../../components/common/HeaderTab";
import Dropdown from "../../../components/dropdown/dropdown";
import AdminNavigate from "../../../components/common/AdminNavigate";
import AdminNursesCreate from "./component/AdminNursesCreate";
import ConfirmModal from "../../../components/modal/ConfirmModal";
import { useToaster } from "../../../components/common/ToasterContext";
import { adminDoctorSpecialties, labDepartmentOptions } from "../../../utils/dashboardUtils";

function AdminNurses() {
  const {
    nurses,
    nursesPage,
    nursesLimit,
    nursesTotal,
    nursesLoading,
    nursesError,
    nursesDepartment,
    nursesSpecialization,
    nursesStatus,
    nursesSearch,
    setNursesSearch,
    setNursesPage,
    setNursesDepartment,
    setNursesSpecialization,
    setNursesStatus,
    getNurses,
  } = useAdmin(AdminApi);

  const { showToast } = useToaster();

  const [showForm, setShowForm] = useState(false);
  const [editNurse, setEditNurse] = useState<any>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [selectedNurseId, setSelectedNurseId] = useState<string | null>(null);

  useEffect(() => {
    getNurses();
  }, [nursesPage, nursesSearch, nursesDepartment, nursesSpecialization, nursesStatus]);

  const handleEdit = (nurse: any) => {
    setEditNurse(nurse);
    setShowForm(true);
  };

  const confirmDelete = (nurseId: string) => {
    setSelectedNurseId(nurseId);
    setConfirmMessage("Are you sure you want to delete this nurse?");
    setConfirmOpen(true);
  };

  const onConfirmDelete = async () => {
    if (!selectedNurseId) return;
    setConfirmLoading(true);
    try {
      await AdminApi.deleteNurse(selectedNurseId);
      showToast("Nurse deleted successfully", "success");
      getNurses();
    } catch (error) {
      console.error("Delete error:", error);
      showToast("Failed to delete nurse", "error");
    } finally {
      setConfirmOpen(false);
      setConfirmLoading(false);
      setSelectedNurseId(null);
    }
  };

  const columns: Column<any>[] = [
    {
      key: "name",
      label: "Name",
      render: (nurse) => (
        <span>
          {nurse?.user?.firstName && nurse?.user?.lastName
            ? `${nurse?.user?.firstName} ${nurse?.user?.lastName}`
            : "N/A"}
        </span>
      ),
    },
    {
      key: "email",
      label: "Email",
      render: (nurse) => <span>{nurse?.user?.email || "N/A"}</span>,
    },

    {
      key: "licenseNumber",
      label: "License No",
      render: (nurse) => <span>{nurse?.licenseNumber || "N/A"}</span>,
    },
    {
      key: "department",
      label: "Department",
      render: (nurse) => <span>{nurse?.department || "N/A"}</span>,
    },
        {
      key: "specialization",
      label: "Specialization",
      render: (nurse) => <span>{nurse?.specialization || "N/A"}</span>,
    },
    {
        key:'isProfileVerified',
        label: 'Profile Verified',
        render: (nurse) => (    
            <span className={nurse?.isProfileVerified === true ? "text-green-600" : "text-red-600"}>
                {nurse?.isProfileVerified === true ? "Yes" : nurse?.isProfileVerified === false ? "No" : "N/A"}
            </span>
        ),
    },
    {
      key: "isActive",
      label: "Is Active",
      render: (nurse) => (
        <span className={nurse?.isActive  ? "text-green-600" : "text-red-600"}>
          {nurse?.isActive === true ? "Yes" : nurse?.isActive === false ? "No" : "N/A"}
        </span>
      ),
    },
    {
        key: "isMatron",
        label: "Is Matron",
        render: (nurse) => (
          <span className={nurse?.isMatron === true ? "text-green-600" : "text-red-600"}>
            {nurse?.isMatron === true ? "Yes" : nurse?.isMatron === false ? "No" : "N/A"}
          </span>
        ),
    },
    {
        key: "hireDate",
        label: "Hire Date",
        render: (nurse) => <span>{nurse?.hireDate ? new Date(nurse.hireDate).toLocaleDateString() : "N/A"}</span>,
    },
    {
      key: "actions",
      label: "Actions",
      render: (nurse) => (
        <Dropdown showArrow={false} triggerLabel="" triggerIcon={<HiOutlineDotsVertical />}>
          <ul className="space-y-2 text-sm">
            <AdminNavigate role={"nurse"} id={nurse?.id} type="true">
              <FiEye /> View
            </AdminNavigate>
            <li
              onClick={() => handleEdit(nurse)}
              className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2"
            >
              <FiEdit /> Edit
            </li>
            <li
              onClick={() => confirmDelete(nurse?.id)}
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
      <AdminNursesCreate
        nurse={editNurse}
        onClose={() => {
          setShowForm(false);
          setEditNurse(null);
          getNurses();
        }}
        onBack={() => {
          setShowForm(false);
          setEditNurse(null);
        }}
      />
    );
  }
  console.log(nurses);
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Nurses</h1>
        <button
          className="bg-primary text-white px-6 py-2 text-sm rounded-md flex items-center gap-2"
          onClick={() => setShowForm(true)}
        >
          Add Nurse
        </button>
      </div>

      <HeaderTab
        title=""
        showSearch={true}
        searchPlaceholder="Search by Name or Email"
        onSearchChange={(val) => setNursesSearch(val)}
        dropdowns={[
          {
            label: "Department",
            options: labDepartmentOptions,
            value: nursesDepartment,
            onChange: (val) => setNursesDepartment(val),
          },
          {
            label: "Specialization",
            options: adminDoctorSpecialties,
            value: nursesSpecialization,
            onChange: (val) => setNursesSpecialization(val),
          },
          {
            label: "Status",
            options: ["active", "inactive"],
            value: nursesStatus,
            onChange: (val) => setNursesStatus(val),
          },
        ]}
      />

      <ConfirmModal
        open={confirmOpen}
        description={confirmMessage}
        onConfirm={onConfirmDelete}
        onClose={() => {
          setConfirmOpen(false);
          setConfirmLoading(false);
          setSelectedNurseId(null);
        }}
        loading={confirmLoading}
      />

      <div>
        {nursesLoading ? (
          <p>Loading...</p>
        ) : nursesError ? (
          <p className="text-red-500">Error loading nurses</p>
        ) : (
          <Table
            data={nurses}
            columns={columns}
            page={nursesPage}
            total={nursesTotal}
            limit={nursesLimit}
            setPage={setNursesPage}
          />
        )}
      </div>
    </div>
  );
}

export default AdminNurses;
