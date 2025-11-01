import { useState, useEffect } from "react";
import { FiPlus, FiEdit, FiEye,  } from "react-icons/fi";
import useAdmin from "../../../hooks/useAdmin";
import AdminApi from "../../../api/adminApi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Table, { Column } from "../../../components/common/Table";
import HeaderTab from "../../../components/common/HeaderTab";
import AdminDoctorsCreate from "./component/AdminDoctorsCreate";
import Dropdown from "../../../components/dropdown/dropdown";
import StatusBadge from "../../../components/common/StatusBadge";
import { adminDoctorSpecialties } from "../../../utils/dashboardUtils"
import AdminNavigate from "../../../components/common/AdminNavigate";
import UploadCsvModal from "../../../components/modal/UploadCsvModal";
import { useToaster } from "../../../components/common/ToasterContext";
function AdminDoctors() {
  const {
    doctors,
    doctorsPage,
    doctorsLimit,
    doctorsTotal,
    doctorsLoading,
    setDoctorsPage,
    getDoctors,
    setDoctorsSpecialty,
    setDoctorsStatus,
    doctorsStatus,
    doctorsSpecialty,
    doctorsSearch,
    setDoctorsSearch,
  } = useAdmin(AdminApi);

  const [showForm, setShowForm] = useState(false);
  const [editDoctor, setEditDoctor] = useState<any>(null);
  useEffect(() => {
    getDoctors();
  }, [doctorsPage, doctorsSpecialty, , doctorsSearch]);
  const { showToast } = useToaster();
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const handleEdit = (doctor: any) => {
    setEditDoctor(doctor);
    setShowForm(true);
  };

  // const handleDelete = (doctorId: string) => {

  //   console.log("Deleting doctor with ID:", doctorId);
  // };

  const columns: Column<any>[] = [
    {
      key: "name",
      label: "Name",
      render: (doctor) => (
        <span>{doctor?.user?.firstName} {doctor?.user?.lastName}</span>
      ),
    },
    {
      key: "email",
      label: "Email",
      render: (doctor) => <span>{doctor?.user?.email}</span>,
    },
    {
      key: "specialty",
      label: "Specialty",
      render: (doctor) => <span>{doctor?.specialty}</span>,
    },
    {
      key: "licenseNumber",
      label: "License",
      render: (doctor) => <span>{doctor?.licenseNumber}</span>,
    },
    {
      key:"type",
      label: "Type",
      render: (doctor) => <span>{doctor?.type}</span>,
    },
    {
      key: "status",
      label: "Status",
      render: (doctor) => (
        <StatusBadge status={doctor?.isActive ? 'active' : 'inactive'} />
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (doctor) => (
        <Dropdown showArrow={false} triggerLabel="" triggerIcon={<HiOutlineDotsVertical />}>
          <ul className="space-y-2 text-sm">
            <AdminNavigate role={'doctor'} id={doctor?.id} type="true">
              <FiEye /> View
            </AdminNavigate>
            <li
              onClick={() => handleEdit(doctor)}
              className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2"
            >
              <FiEdit /> Edit
            </li>
            {/* <li
            onClick={() => handleDelete(doctor.id)}
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
      <AdminDoctorsCreate
        doctor={editDoctor}
        onClose={() => {
          setShowForm(false);
          setEditDoctor(null);
          getDoctors();
        }}
        onBack={() => {
          setShowForm(false);
          setEditDoctor(null);
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
        <h1 className="text-2xl font-semibold">Doctors</h1>
        <div className="flex items-center gap-4">
          <button
            className="bg-primary text-white px-6 py-2 text-sm rounded-md flex items-center gap-2"
            onClick={() => setShowForm(true)}
          >
            <FiPlus />
            Add Doctor
          </button>
          {/* <button
            className="bg-primary text-white px-6 py-2 text-sm rounded-md flex items-center gap-2"
            onClick={() => setUploadModalOpen(true)}
          >
            <FiUpload /> Upload Doctors
          </button> */}
        </div>
      </div>

      <HeaderTab
        title=""
        searchPlaceholder="name, email, or specialty"
        onSearchChange={(value) => setDoctorsSearch(value)}
        dropdowns={[
          {
            label: "Status",
            options: ["Active", "Inactive"],
            value: doctorsStatus,
            onChange: (value) => {
              setDoctorsStatus(value);
            },
          },
          {
            label: "Specialty",
            options: adminDoctorSpecialties,
            value: doctorsSpecialty,
            onChange: (value) => {
              setDoctorsSpecialty(value);
            },
          },
        ]}
      />

      <div>
        {doctorsLoading ? (
          <p>Loading...</p>
        ) : (
          <Table
            data={doctors}
            columns={columns}
            page={doctorsPage}
            total={doctorsTotal}
            limit={doctorsLimit}
            setPage={setDoctorsPage}
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

export default AdminDoctors;
