import { useState, useEffect } from "react";
import { FiEdit, FiEye, FiTrash2, FiRotateCcw } from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useServices } from "../../../hooks/useServices";
import AdminApi from "../../../api/adminApi";
import { useToaster } from "../../../components/common/ToasterContext";
import Table, { Column } from "../../../components/common/Table";
import Dropdown from "../../../components/dropdown/dropdown";
import HeaderTab from "../../../components/common/HeaderTab";
import ConfirmModal from "../../../components/modal/ConfirmModal";
import AdminServicesCreate from "./components/AdminServicesCreate";
import AdminNavigate from "../../../components/common/AdminNavigate";

export default function AdminServices() {
const {
  data: services,
  loading,
  error,
  total,
  filters,
  fetchServices,
  updateFilters,
} = useServices();


  const { showToast } = useToaster();
  const [showForm, setShowForm] = useState(false);
  const [editService, setEditService] = useState<any>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);

  useEffect(() => {
    fetchServices();
  }, [filters.page, filters.search, filters.category, filters.name, filters.includeDeleted]);

  const handleEdit = (svc: any) => {
    setEditService(svc);
    setShowForm(true);
  };

  const confirmDelete = (service: any) => {
    setSelectedService(service);
    setConfirmOpen(true);
  };

  const handleDeleteOrRestore = async () => {
    if (!selectedService) return;
    setConfirmLoading(true);
    try {
      if (selectedService.deletedAt) {
        await AdminApi.restoreService(selectedService.id);
        showToast("Service restored successfully", "success");
      } else {
        await AdminApi.deleteService(selectedService.id);
        showToast("Service deleted successfully", "success");
      }
      fetchServices();
    } catch (error) {
      console.error("Error:", error);
      showToast("Failed to process request", "error");
    } finally {
      setConfirmLoading(false);
      setConfirmOpen(false);
      setSelectedService(null);
    }
  };

  const columns: Column<any>[] = [
    { key: "name", label: "Name", render: (s) => s.name },
    { key: "category", label: "Category", render: (s) => s.category },
    { key: "price", label: "Price", render: (s) => `₦${s.price}` },
    { key: "description", label: "Description", render: (s) => s.description || "—" },
    { key: "createdAt", label: "Created At", render: (s) => new Date(s.createdAt).toLocaleString() },
    { key: "deleted", label: "Status", render: (s) => (<span className={`${!s.deletedAt ? "text-green-600" : "text-red-600"}`}>
        {s.deletedAt ? "Deleted" : "Active"}
    </span>) },
    {
      key: "actions",
      label: "Actions",
      render: (service) => (
        <Dropdown
        showArrow={false}
          triggerLabel=""
          triggerIcon={<HiOutlineDotsVertical />}>
          <ul className="space-y-2 text-sm">
                        <AdminNavigate role={"services"} id={service?.id} type="true">
                          <FiEye /> View
                        </AdminNavigate>
            <li
              onClick={() => handleEdit(service)}
              className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2"
            >
              <FiEdit /> Edit
            </li>
            <li
              onClick={() => confirmDelete(service)}
              className={`cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2 ${
                service.deletedAt ? "text-green-600" : "text-red-600"
              }`}
            >
              {service.deletedAt ? <><FiRotateCcw /> Restore</> : <><FiTrash2 /> Delete</>}
            </li>
          </ul>
        </Dropdown>
      ),
    },
  ];

  if (showForm)
    return (
      <AdminServicesCreate
        service={editService}
        onClose={() => {
          setShowForm(false);
          setEditService(null);
          fetchServices();
        }}
        onBack={() => {
          setShowForm(false);
          setEditService(null);
        }}
      />
    );

  return (
    <div className="space-y-4 bg-white p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Services</h1>
        <button
          className="bg-primary text-white px-6 py-2 text-sm rounded-md flex items-center gap-2"
          onClick={() => setShowForm(true)}
        >
          Add Service
        </button>
      </div>

      <HeaderTab
        title="Services All"
        showSearch
        searches={[
          {
            label: "",
            placeholder: "Search name...",
            value: filters.name,
            onChange: (val) => updateFilters({ name: val, page: 1 }),
          },
          {
            label: "",
            placeholder: "Search category...",
            value: filters.category,
            onChange: (val) => updateFilters({ category: val, page: 1 }),
          },
        ]}
        dropdowns={[
          {
            label: "Show Deleted",
            options: ['No', 'Yes'],
            value: String(filters.includeDeleted),
            onChange: (val) =>
              updateFilters({ includeDeleted: val , page: 1 }),
          },
        ]}
      />

      <ConfirmModal
        open={confirmOpen}
        description={
          selectedService?.deleted
            ? "Restore this service?"
            : "Are you sure you want to delete this service?"
        }
        onConfirm={handleDeleteOrRestore}
        onClose={() => setConfirmOpen(false)}
        loading={confirmLoading}
      />

      <div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <Table
            data={services}
            columns={columns}
            page={filters.page}
            total={total}
            limit={filters.limit}
            setPage={(p) => updateFilters({ page: p })}
          />
        )}
      </div>
    </div>
  );
}
