import { useEffect, useState } from "react";
import { FiEdit,  FiTrash2, FiRotateCcw } from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useServicePrices } from "../../../hooks/useServicePrices";
import { useServices } from "../../../hooks/useServices";
import AdminApi from "../../../api/adminApi";
import { useToaster } from "../../../components/common/ToasterContext";
import Table, { Column } from "../../../components/common/Table";
import Dropdown from "../../../components/dropdown/dropdown";
import HeaderTab from "../../../components/common/HeaderTab";
import ConfirmModal from "../../../components/modal/ConfirmModal";
import Modal from "../../../components/modal/modal";
import { FaCircleCheck } from "react-icons/fa6";

export default function AdminServicePrices({ partner }: any) {
  const {
    data: servicePrices,
    loading,
    error,
    total,
    filters,
    fetchServicePrices,
    updateFilters,
  } = useServicePrices();

  const {
    data: services,
    fetchServices,
    updateFilters: updateServiceFilters,
    filters: serviceFilters,
    loading: serviceLoading,
  } = useServices();

  const { showToast } = useToaster();

  const [showForm, setShowForm] = useState(false);
  const [editPrice, setEditPrice] = useState<any>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState<any>(null);

  const [selectedService, setSelectedService] = useState<any>(null);
  const [price, setPrice] = useState("");

  useEffect(() => {
    fetchServicePrices();
    fetchServices();
  }, [filters.page, filters.partnerId, filters.serviceId, filters.includeDeleted]);

  const handleEdit = (priceItem: any) => {
    setEditPrice(priceItem);
    setPrice(priceItem.price);
    setSelectedService({ id: priceItem.serviceId, name: priceItem.serviceName });
    setShowForm(true);
  };

  const confirmDelete = (item: any) => {
    setSelectedPrice(item);
    setConfirmOpen(true);
  };

  const handleDeleteOrRestore = async () => {
    if (!selectedPrice) return;
    setConfirmLoading(true);
    try {
      if (selectedPrice.deletedAt) {
        await AdminApi.restorePartnerServicePrice(selectedPrice.id);
        showToast("Price restored successfully", "success");
      } else {
        await AdminApi.deletePartnerServicePrice(selectedPrice.id);
        showToast("Price deleted successfully", "success");
      }
      fetchServicePrices();
    } catch (error) {
      console.error("Error:", error);
      showToast("Failed to process request", "error");
    } finally {
      setConfirmLoading(false);
      setConfirmOpen(false);
      setSelectedPrice(null);
    }
  };

  const handleCreateOrEdit = async () => {
    if (!selectedService?.id || !price) {
      showToast("Please select a service and enter a price", "error");
      return;
    }
    try {
      const payload = {
        partnerId: partner?.id,
        serviceId: selectedService.id,
        price: Number(price),
      };

      if (editPrice) {
        await AdminApi.updatePartnerServicePrice(editPrice.id, payload);
        showToast("Service price updated successfully", "success");
      } else {
        await AdminApi.createPartnerServicePrice(payload);
        showToast("Service price created successfully", "success");
      }

      fetchServicePrices();
      setShowForm(false);
      setEditPrice(null);
      setPrice("");
      setSelectedService(null);
    } catch (error) {
      console.error(error);
      showToast("Failed to save service price", "error");
    }
  };

  const columns: Column<any>[] = [
    { key: "serviceName", label: "Service", render: (s) => s.serviceName || "—" },
    { key: "partnerName", label: "Partner", render: (s) => s.partnerName || "—" },
    { key: "price", label: "Price", render: (s) => `₦${s.price}` },
    {
      key: "createdAt",
      label: "Created At",
      render: (s) => new Date(s.createdAt).toLocaleString(),
    },
    {
      key: "status",
      label: "Status",
      render: (s) => (
        <span className={`${!s.deletedAt ? "text-green-600" : "text-red-600"}`}>
          {s.deletedAt ? "Deleted" : "Active"}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (item) => (
        <Dropdown
          showArrow={false}
          triggerLabel=""
          triggerIcon={<HiOutlineDotsVertical />}
        >
          <ul className="space-y-2 text-sm">
            <li
              onClick={() => handleEdit(item)}
              className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2"
            >
              <FiEdit /> Edit
            </li>
            <li
              onClick={() => confirmDelete(item)}
              className={`cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2 ${
                item.deletedAt ? "text-green-600" : "text-red-600"
              }`}
            >
              {item.deletedAt ? (
                <>
                  <FiRotateCcw /> Restore
                </>
              ) : (
                <>
                  <FiTrash2 /> Delete
                </>
              )}
            </li>
          </ul>
        </Dropdown>
      ),
    },
  ];

  // --- FORM MODAL ---
  if (showForm) {
    return (
      <Modal
        open={showForm}
        onClose={() => {
          setShowForm(false);
          setEditPrice(null);
          setPrice("");
          setSelectedService(null);
        }}
        title={editPrice ? "Edit Service Price" : "Add Service Price"}
        handleSubmit={handleCreateOrEdit}
        buttonText={editPrice ? "Update Price" : "Save Price"}
        loading={loading}
      >
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Search Service</label>
            <input
              type="text"
              value={serviceFilters.search || ""}
              onChange={(e) =>
                updateServiceFilters({ search: e.target.value, page: 1 })
              }
              placeholder="Search services..."
              className="w-full form-input px-3 py-2 text-sm outline-none mt-1"
            />
          </div>

          <div className="border border-gray-200 rounded-md max-h-[250px] space-y-1 overflow-y-auto ">
            {serviceLoading ? (
              <p className="p-3 text-sm text-gray-500">Loading services...</p>
            ) : services.length === 0 ? (
              <p className="p-3 text-sm text-gray-500">No services found.</p>
            ) : (
              services.map((svc: any) => (
                <div
                  key={svc.id}
                  onClick={() => setSelectedService(svc)}
                  className={`p-3 flex justify-between items-center  cursor-pointer hover:bg-primary/10 ${
                    selectedService?.id === svc.id
                      ? "bg-primary/10 border-l-4 border-primary"
                      : ""
                  }`}
                >
                  <div>
                    <p className="font-medium text-gray-800">{svc.name}</p>
                    <p className="text-xs text-gray-500">{svc.category}</p>
                  </div>
                  {selectedService?.id === svc.id && (
                    <FaCircleCheck className="text-primary text-lg" />
                  )}
                </div>
              ))
            )}
          </div>

          <div>
            <label className="text-sm text-gray-600">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price..."
              className="w-full form-input px-3 py-2 text-sm outline-none mt-1"
            />
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <div className="space-y-4 bg-white p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Partner Service Prices</h1>
        <button
          className="bg-primary text-white px-6 py-2 text-sm rounded-md flex items-center gap-2"
          onClick={() => setShowForm(true)}
        >
          Add Service Price
        </button>
      </div>

      <HeaderTab
        title="Service Prices"
        showSearch
        searches={[
          {
            label: "",
            placeholder: "Search by Service ID...",
            value: filters.serviceId,
            onChange: (val) => updateFilters({ serviceId: val, page: 1 }),
          },
        ]}
        dropdowns={[
          {
            label: "Show Deleted",
            options: ["No", "Yes"],
            value: filters.includeDeleted ? "Yes" : "No",
            onChange: (val) =>
              updateFilters({ includeDeleted: val === "Yes", page: 1 }),
          },
        ]}
      />

      <ConfirmModal
        open={confirmOpen}
        description={
          selectedPrice?.deleted
            ? "Restore this service price?"
            : "Are you sure you want to delete this service price?"
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
            data={servicePrices}
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
