import { useEffect, useState } from "react";
import { FiPlus, FiEye, FiEdit, } from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import useAdmin from "../../../hooks/useAdmin";
import AdminApi from "../../../api/adminApi";
import Table, { Column } from "../../../components/common/Table";
import HeaderTab from "../../../components/common/HeaderTab";
import Dropdown from "../../../components/dropdown/dropdown";
import StatusBadge from "../../../components/common/StatusBadge";
import AdminLabsCreate from "./component/AdminLabsCreate";

function AdminLabs() {
  const {
    labs,
    labsPage,
    labsLimit,
    labsTotal,
    labsLoading,
    setLabsPage,
    getLabs,
    labDepartment,
  } = useAdmin(AdminApi);

  const [showForm, setShowForm] = useState(false);
  const [editLab, setEditLab] = useState<any>(null);

  useEffect(() => {
    getLabs();
  }, [labsPage, labDepartment]);

  const handleEdit = (lab: any) => {
    setEditLab(lab);
    setShowForm(true);
  };

  // const handleDelete = async (labId: string) => {
  //   try {
  //       await AdminApi.deleteLabs(labId); 
  //       alert(`Lab ${labId} deleted successfully`)  
  //         getLabs();  
  //   } catch (error) {
  //       console.error("Deleting lab with ID:", labId);   
  //       alert(`Deleting lab with ID: ${labId} failed")`)    
  //   }
  // };

  const columns: Column<any>[] = [
    {
      key: "name",
      label: "Name",
      render: (lab) => (
        <span>{lab?.user?.firstName} {lab?.user?.lastName}</span>
      ),
    },
    {
      key: "email",
      label: "Email",
      render: (lab) => <span>{lab?.user?.email}</span>,
    },
    {
      key: "department",
      label: "Department",
      render: (lab) => <span>{lab?.department}</span>,
    },
    {
      key: "licenseNumber",
      label: "License",
      render: (lab) => <span>{lab?.licenseNumber}</span>,
    },
    {
      key: "status",
      label: "Status",
      render: (lab) => (
        <StatusBadge status={lab?.isActive ? 'active' : 'inactive'} />
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (lab) => (
        <Dropdown showArrow={false} triggerLabel="" triggerIcon={<HiOutlineDotsVertical />}>
          <ul className="space-y-2 text-sm">
            <li
              onClick={() => console.log("Viewing", lab)}
              className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2"
            >
              <FiEye /> View
            </li>
            <li
              onClick={() => handleEdit(lab)}
              className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2"
            >
              <FiEdit /> Edit
            </li>
            {/* <li
              onClick={() => handleDelete(lab.id)}
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
        {/* Replace below with actual form */}
        
        <AdminLabsCreate
          lab={editLab}
          onClose={() => {
            setShowForm(false);
            setEditLab(null);
            getLabs();
          }}
          onBack={() => {
            setShowForm(false);
            setEditLab(null);
          }}
        /> 
       
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Lab Technicians</h1>
        <button
          className="bg-primary text-white px-6 py-2 text-sm rounded-md flex items-center gap-2"
          onClick={() => setShowForm(true)}
        >
          <FiPlus />
          Add Lab
        </button>
      </div>

      <HeaderTab title="" showSearch={false} dropdowns={[]} />

      <div>
        {labsLoading ? (
          <p>Loading...</p>
        ) : (
          <Table
            data={labs}
            columns={columns}
            page={labsPage}
            total={labsTotal}
            limit={labsLimit}
            setPage={setLabsPage}
          />
        )}
      </div>
    </div>
  );
}

export default AdminLabs;
