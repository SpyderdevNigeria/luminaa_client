import { useEffect, useState } from "react";
import { FiPlus, FiEye, FiEdit } from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import useAdmin from "../../../hooks/useAdmin";
import AdminApi from "../../../api/adminApi";
import Table, { Column } from "../../../components/common/Table";
import HeaderTab from "../../../components/common/HeaderTab";
import Dropdown from "../../../components/dropdown/dropdown";
import StatusBadge from "../../../components/common/StatusBadge";
import AdminPharmacistsCreate from "./component/AdminPharmacistsCreate";
import AdminNavigate from "../../../components/common/AdminNavigate";

function AdminPharmacists() {
  const {
    pharmacists,
    pharmacistsPage,
    pharmacistsLimit,
    pharmacistsTotal,
    pharmacistsLoading,
    setPharmacistsPage,
    getPharmacists,
  } = useAdmin(AdminApi);

  const [showForm, setShowForm] = useState(false);
  const [editPharmacist, setEditPharmacist] = useState<any>(null);

  useEffect(() => {
    getPharmacists();
  }, [pharmacistsPage]);

  const handleEdit = (pharmacist: any) => {
    setEditPharmacist(pharmacist);
    setShowForm(true);
  };

  // const handleDelete = async (pharmacistId: string) => {
  //   try {
  //     await AdminApi.deletePharmacist(pharmacistId);
  //     alert(`Pharmacist ${pharmacistId} deleted successfully`);
  //     getPharmacists();
  //   } catch (error) {
  //     console.error("Deleting pharmacist with ID:", pharmacistId);
  //     alert(`Deleting pharmacist with ID: ${pharmacistId} failed`);
  //   }
  // };

  const columns: Column<any>[] = [
    {
      key: "name",
      label: "Name",
      render: (pharmacist) => (
        <span>
          {pharmacist?.user?.firstName} {pharmacist?.user?.lastName}
        </span>
      ),
    },
    {
      key: "email",
      label: "Email",
      render: (pharmacist) => <span>{pharmacist?.user?.email}</span>,
    },
    {
      key: "licenseNumber",
      label: "License",
      render: (pharmacist) => <span>{pharmacist?.licenseNumber}</span>,
    },
    {
      key: "hireDate",
      label: "Hire Date",
      render: (pharmacist) => (
        <span>{new Date(pharmacist?.hireDate).toLocaleDateString()}</span>
      ),
    },
    {
      key: "licenseExpiryDate",
      label: "License Expiry",
      render: (pharmacist) => (
        <span>
          {new Date(pharmacist?.licenseExpiryDate).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (pharmacist) => (
        <StatusBadge status={pharmacist?.isActive ? "active" : "inactive"} />
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (pharmacist) => (
        <Dropdown
          showArrow={false}
          triggerLabel=""
          triggerIcon={<HiOutlineDotsVertical />}
        >
          <ul className="space-y-2 text-sm">
             <AdminNavigate role={'pharmacist'} id={pharmacist?.user?.id}> 
                 <FiEye /> View
              </AdminNavigate>
            <li
              onClick={() => handleEdit(pharmacist)}
              className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2"
            >
              <FiEdit /> Edit
            </li>
            {/* <li
              onClick={() => handleDelete(pharmacist.id)}
              className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2 text-red-600"
            >
              <FiTrash2 /> Delete
            </li> */}
          </ul>
        </Dropdown>
      ),
    },
  ];

  if (showForm) {
    return (
      <div>
        <AdminPharmacistsCreate
          pharmacist={editPharmacist}
          onClose={() => {
            setShowForm(false);
            setEditPharmacist(null);
            getPharmacists();
          }}
          onBack={() => {
            setShowForm(false);
            setEditPharmacist(null);
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Pharmacists</h1>
        <button
          className="bg-primary text-white px-6 py-2 text-sm rounded-md flex items-center gap-2"
          onClick={() => setShowForm(true)}
        >
          <FiPlus />
          Add Pharmacist
        </button>
      </div>

      <HeaderTab title="" showSearch={false} dropdowns={[]} />

      <div>
        {pharmacistsLoading ? (
          <p>Loading...</p>
        ) : (
          <Table
            data={pharmacists}
            columns={columns}
            page={pharmacistsPage}
            total={pharmacistsTotal}
            limit={pharmacistsLimit}
            setPage={setPharmacistsPage}
          />
        )}
      </div>
    </div>
  );
}

export default AdminPharmacists;
