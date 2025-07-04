import { useState, useEffect } from "react";
import useMedications from "../../../hooks/useMedications";
import useInventory from "../../../hooks/useInventory";
import { IMedication, IInventoryItem } from "../../../types/Interfaces";
import HeaderTab from "../../../components/common/HeaderTab";
import MedicationCard from "../../../components/common/MedicationCard";
import PaginationComponent from "../../../components/common/PaginationComponent";
import InventoryForm from "./AdminInventoryForm";
import AdminApi from "../../../api/adminApi";
import {
  inventoryLocationOptions,
  inventoryStatusOptions,
  inventorySupplierOptions,
  inventoryExpiryOptions,
  inventoryLowStockOptions,
  inventoryExpiringInOptions,
} from "../../../utils/dashboardUtils";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FiEye } from "react-icons/fi";
import Dropdown from "../../../components/dropdown/dropdown";
import Table, { Column } from "../../../components/common/Table";
import routeLinks from "../../../utils/routes";
import { format } from "date-fns";
import Modal from "../../../components/modal/modal";

const AdminInventory = () => {
  const [activeTab, setActiveTab] = useState<"inventory" | "medications">("inventory");
  const [selectedMedication, setSelectedMedication] = useState<IMedication | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingInventory, setEditingInventory] = useState<IInventoryItem | null>(null);
  const [viewItem, setViewItem] = useState<IInventoryItem | null>(null);

  const {
    inventory: {
      data: inventoryData,
      page,
      limit,
      total,
      totalPages,
      search,
      status,
      location,
      supplier,
      lowStockThreshold,
      showExpired,
      expiringInDays,
    },
    inventoryLoading,
    getInventory,
    setInventoryPage,
    setInventorySearch,
    setInventoryStatus,
    setInventoryLocation,
    setInventorySupplier,
    setInventoryLowStockThreshold,
    setInventoryShowExpired,
    setInventoryExpiringInDays,
  } = useInventory(AdminApi);

  const {
    medications,
    medicationsPage,
    medicationsLimit,
    medicationsTotal,
    medicationsTotalPages,
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

  const navigate = useNavigate();

  useEffect(() => {
    if (activeTab === "inventory") getInventory();
  }, [
    activeTab,
    page,
    search,
    status,
    location,
    supplier,
    lowStockThreshold,
    showExpired,
    expiringInDays,
  ]);

  useEffect(() => {
    if (activeTab === "medications") getMedications();
  }, [activeTab, medicationsPage, medicationSearch]);

  const handleSelectMedication = (med: IMedication) => {
    setSelectedMedication(med);
    setEditingInventory(null);
    setShowForm(true);
    setActiveTab("inventory");
  };

  const handleEditInventory = (inventory: IInventoryItem) => {
    const medication = {
      id: inventory.medicationId,
      name: inventory.medicationName,
      genericName: inventory.medicationGenericName,
    } as IMedication;
    setEditingInventory(inventory);
    setSelectedMedication(medication);
    setShowForm(true);
    setActiveTab("inventory");
  };

  const handleBack = () => {
    setSelectedMedication(null);
    setEditingInventory(null);
    setShowForm(false);
  };

  const columns: Column<IInventoryItem>[] = [
    { key: "medicationName", label: "Medication" },
    { key: "batchNumber", label: "Batch" },
    { key: "location", label: "Location" },
    {
      key: "quantity",
      label: "Quantity",
      render: (item) => item.quantity,
    },
    {
      key: "expiryDate",
      label: "Expiry Date",
      render: (item) =>
        item.expiryDate ? format(new Date(item.expiryDate), "dd MMM yyyy") : "-",
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
              onClick={() => navigate(routeLinks?.superAdmin?.adminInventory+'/'+item?.id)}
              className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2"
            >
              <FiEye /> View Details
            </li>

            <li
              onClick={() => handleEditInventory(item)}
              className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2"
            >
              <FiEye /> Edit Details
            </li>
          </ul>
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="container-bd">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Inventory Management</h2>
        <div className="flex gap-2">
          <button
            className={`px-4 py-2 rounded-md text-sm ${
              activeTab === "inventory" ? "bg-primary text-white" : "bg-gray-100"
            }`}
            onClick={() => {
              setActiveTab("inventory");
              setSelectedMedication(null);
              setEditingInventory(null);
              setShowForm(false);
            }}
          >
            Inventory
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm ${
              activeTab === "medications" ? "bg-primary text-white" : "bg-gray-100"
            }`}
            onClick={() => {
              setActiveTab("medications");
              setShowForm(false);
              setEditingInventory(null);
            }}
          >
            Add From Medications
          </button>
        </div>
      </div>

      {activeTab === "inventory" && !showForm && (
        <HeaderTab
          title=""
          showSearch={true}
          onSearchChange={setInventorySearch}
          dropdowns={[
            { label: "Status", options: inventoryStatusOptions, value: status, onChange: setInventoryStatus },
            { label: "Location", options: inventoryLocationOptions, value: location, onChange: setInventoryLocation },
            { label: "Supplier", options: inventorySupplierOptions, value: supplier, onChange: setInventorySupplier },
            { label: "Low Stock", options: inventoryLowStockOptions.map(opt => typeof opt === "string" ? opt : opt.value), value: lowStockThreshold, onChange: setInventoryLowStockThreshold },
            { label: "Expired", options: inventoryExpiryOptions.map(opt => typeof opt === "string" ? opt : opt.value), value: showExpired, onChange: setInventoryShowExpired },
            { label: "Expiring In", options: inventoryExpiringInOptions.map(opt => typeof opt === "string" ? opt : opt.value), value: expiringInDays, onChange: setInventoryExpiringInDays },
          ]}
        />
      )}

      {showForm && (selectedMedication || editingInventory) ? (
        <div>
          <button onClick={handleBack} className="mb-4 flex items-center gap-2">
            <FaArrowLeftLong /> back to list
          </button>
          <InventoryForm
            medication={selectedMedication || editingInventory?.medication!}
            inventory={editingInventory || undefined}
            onSuccess={() => {
              setSelectedMedication(null);
              setEditingInventory(null);
              setShowForm(false);
              getInventory();
            }}
            onCancel={handleBack}
          />
        </div>
      ) : activeTab === "inventory" ? (
        <>
          {inventoryLoading ? (
            <p className="text-center mt-20 text-gray-600">Loading inventory...</p>
          ) : inventoryData.length === 0 ? (
            <p className="text-center mt-20 text-gray-600">No inventory found.</p>
          ) : (
            <Table
              data={inventoryData}
              columns={columns}
              page={page}
              total={total}
              limit={limit}
              totalPages={totalPages ?? 1}
              setPage={setInventoryPage}
            />
          )}
        </>
      ) : (
        <>
          <HeaderTab
            title=""
            showSearch={true}
            onSearchChange={setMedicationSearch}
            dropdowns={[
              { label: "Status", options: ["active", "inactive"], value: medicationStatus, onChange: setMedicationStatus },
              { label: "Category", options: [], value: medicationCategory, onChange: setMedicationCategory },
              { label: "Dosage Form", options: [], value: medicationDosageForm, onChange: setMedicationDosageForm },
              { label:  "Requires Prescription", options: ["true", "false"], value: medicationRequiresPrescription, onChange: setMedicationRequiresPrescription },
              { label: "Manufacturer", options: [], value: medicationManufacturer, onChange: setMedicationManufacturer },
            ]}
          />
          {medicationsLoading ? (
            <p className="text-center mt-20 text-gray-600">Loading medications...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-6">
              {medications.map((med: IMedication) => (
                <MedicationCard
                  key={med.id}
                  medication={med}
                  buttonText="Add To Inventory"
                  onAddPrescription={() => handleSelectMedication(med)}
                />
              ))}
            </div>
          )}
          <PaginationComponent
            page={medicationsPage}
            total={medicationsTotal}
            limit={medicationsLimit}
            totalPages={medicationsTotalPages ?? 1}
            onPageChange={setMedicationsPage}
          />
        </>
      )}

      <Modal open={!!viewItem} onClose={() => setViewItem(null)} title="Inventory Details">
        {viewItem && (
          <div className="space-y-2 text-sm text-gray-700">
            <p><strong>Medication:</strong> {viewItem.medicationName}</p>
            <p><strong>Batch Number:</strong> {viewItem.batchNumber}</p>
            <p><strong>Location:</strong> {viewItem.location}</p>
            <p><strong>Quantity:</strong> {viewItem.quantity}</p>
            <p><strong>Expiry Date:</strong> {viewItem.expiryDate ? format(new Date(viewItem.expiryDate), "dd MMM yyyy") : "-"}</p>
            <p><strong>Supplier:</strong> {viewItem.supplier}</p>
            <p><strong>Barcode:</strong> {viewItem.barcode}</p>
            <p><strong>Reference:</strong> {viewItem.reference}</p>
            <p><strong>Notes:</strong> {viewItem.notes}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminInventory;
