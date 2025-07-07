import { useEffect, useState } from "react";
import { FiPlus, FiEye, FiEdit, FiUpload, } from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import useAdmin from "../../../hooks/useAdmin";
import AdminApi from "../../../api/adminApi";
import Table, { Column } from "../../../components/common/Table";
import HeaderTab from "../../../components/common/HeaderTab";
import Dropdown from "../../../components/dropdown/dropdown";
import StatusBadge from "../../../components/common/StatusBadge";
import AdminLabsCreate from "./component/AdminLabsCreate";
import AdminNavigate from "../../../components/common/AdminNavigate";
import UploadCsvModal from "../../../components/modal/UploadCsvModal";
import { useToaster } from "../../../components/common/ToasterContext";

function AdminLabs() {
  const {
    labs,
    labsPage,
    labsLimit,
    labsTotal,
    labsLoading,
    setLabsPage,
    getLabs,
    labsDepartment,
    labsSearch,
    setLabsSearch,
  } = useAdmin(AdminApi);
    const { showToast } = useToaster();
  const [showForm, setShowForm] = useState(false);
  const [editLab, setEditLab] = useState<any>(null);
   const [uploadModalOpen, setUploadModalOpen] = useState(false);
  useEffect(() => {
    getLabs();
  }, [labsPage, labsDepartment, labsSearch]);

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

    const handleUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("csv", file);
    } catch (error) {
      console.error("Upload failed", error);
      showToast("Upload Failed.", "error");
    }
  };

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
            <AdminNavigate role={'lab_tech'} id={lab?.id} type="true">
              <FiEye /> View
            </AdminNavigate>
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
        <div className="flex items-center gap-4">
          <button
            className="bg-primary text-white px-6 py-2 text-sm rounded-md flex items-center gap-2"
            onClick={() => setShowForm(true)}
          >
            <FiPlus />
            Add Lab
          </button>
          <button
            className="bg-primary text-white px-6 py-2 text-sm rounded-md flex items-center gap-2"
            onClick={() => setUploadModalOpen(true)}
          >
            <FiUpload /> Upload Scientists
          </button>
        </div>
      </div>

      <HeaderTab title="" searchPlaceholder="name, email, or department"
        onSearchChange={(value) => setLabsSearch(value)} dropdowns={[]} />

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
           <UploadCsvModal
              isOpen={uploadModalOpen}
              onClose={() => setUploadModalOpen(false)}
              onUpload={handleUpload}
            />
    </div>
  );
}

export default AdminLabs;
