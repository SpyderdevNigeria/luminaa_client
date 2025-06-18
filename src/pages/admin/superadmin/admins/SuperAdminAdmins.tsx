import { useEffect, useState } from "react";
import { FiPlus, FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import useSuperAdmin from "../../../../hooks/useSuperAdmin";
import SuperAdminApi from "../../../../api/superAdminApi";
import HeaderTab from "../../../../components/common/HeaderTab";
import Dropdown from "../../../../components/dropdown/dropdown";
import StatusBadge from "../../../../components/common/StatusBadge";
import Table, { Column }  from "../../../../components/common/Table";
import SuperAdminAdminsCreate from "./component/SuperAdminAdminsCreate";
import AdminNavigate from "../../../../components/common/AdminNavigate";
function SuperAdminAdmins() {
  const {
    admins,
    adminsPage,
    adminsLimit,
    adminsTotal,
    adminsLoading,
    setAdminsPage,
    getAdmins,
    setAdminsSearch,
    adminsSearch,
  } = useSuperAdmin(SuperAdminApi);

  const [editAdmin, setEditAdmin] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getAdmins();
  }, [adminsPage, adminsSearch]);

  const handleEdit = (admin: any) => {
    setEditAdmin(admin);
    setShowForm(true);
  };

const handleDelete = async (adminId: string) => {
  const confirmed = window.confirm(
    "Are you sure you want to deactivate this admin?\n\nThis action is permanent and cannot be undone. You won't be able to reactivate this admin again."
  );

  if (!confirmed) return;

  try {
    await SuperAdminApi.deleteAdmin(adminId);
    alert(`Admin ${adminId} has been permanently deactivated.`);
    getAdmins();
  } catch (error) {
    console.error("Error deleting admin with ID:", adminId);
    alert(`Failed to deactivate admin with ID: ${adminId}`);
  }
};

  const columns: Column<any>[] = [
    {
      key: "name",
      label: "Name",
      render: (admin) => (
        <span>{admin?.user?.firstName} {admin?.user?.lastName}</span>
      ),
    },
    {
      key: "email",
      label: "Email",
      render: (admin) => <span>{admin?.user?.email}</span>,
    },
        {
      key: "role",
      label: "Role",
      render: (admin) => (
        <p>{admin?.user?.role}</p>
      ),
    },
    {
      key: "contactNumber",
      label: "Contact",
      render: (admin) => <span>{admin?.contactNumber || "N/A"}</span>,
    },
    {
      key: "createdAt",
      label: "Created At",
      render: (admin) => <span>{new Date(admin?.createdAt).toLocaleDateString()}</span>,
    },
    {
      key: "status",
      label: "Status",
      render: (admin) => (
        <StatusBadge status={admin?.isActive ? 'active' : 'inactive'} />
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (admin) => (
        <Dropdown showArrow={false} triggerLabel="" triggerIcon={<HiOutlineDotsVertical />}>
          <ul className="space-y-2 text-sm">
              <AdminNavigate role={'admin'} id={admin?.user?.id}> 
                 <FiEye /> View
              </AdminNavigate>
            <li
              onClick={() => handleEdit(admin)}
              className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2"
            >
              <FiEdit /> Edit
            </li>
            <li
              onClick={() => handleDelete(admin.id)}
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
    <SuperAdminAdminsCreate
      admin={editAdmin}
      onBack={() => {
        setShowForm(false);
        setEditAdmin(null);
      }}
      onClose={() => {
        setShowForm(false);
        setEditAdmin(null);
        getAdmins();
      }}
    />
  );
}

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Admins</h1>
        <button
          className="bg-primary text-white px-6 py-2 text-sm rounded-md flex items-center gap-2"
          onClick={() => setShowForm(true)}
        >
          <FiPlus />
          Add Admin
        </button>
      </div>

      <HeaderTab title=""  showSearch={true}
        onSearchChange={setAdminsSearch} />

      <div>
        {adminsLoading ? (
          <p>Loading...</p>
        ) : (
          <Table
            data={admins}
            columns={columns}
            page={adminsPage}
            total={adminsTotal}
            limit={adminsLimit}
            setPage={setAdminsPage}
          />
        )}
      </div>
    </div>
  );
}

export default SuperAdminAdmins;
