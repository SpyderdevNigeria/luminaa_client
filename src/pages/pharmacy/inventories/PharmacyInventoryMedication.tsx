import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PharmacyApi from "../../../api/pharmacistApi";
import useInventory from "../../../hooks/useInventory";
import HeaderTab from "../../../components/common/HeaderTab";
import Table, { Column } from "../../../components/common/Table";
import Modal from "../../../components/modal/modal";

const PharmacyInventoryMedication = () => {
  const { id: medicationId } = useParams();
  const {
    inventoryMedication,
    inventoryMedicationLoading,
    getInventoryByMedicationId,
    setInventoryMedicationPage,
    setInventoryMedicationSearch,
    setInventoryMedicationStatus,
    setInventoryMedicationLocation,
    setInventoryMedicationSupplier,
  } = useInventory(PharmacyApi);

  const [selectedRow, setSelectedRow] = useState<any | null>(null);

  useEffect(() => {
    if (medicationId) {
      getInventoryByMedicationId(medicationId, {
        page: inventoryMedication.page,
        search: inventoryMedication.search,
        status: inventoryMedication.status,
        location: inventoryMedication.location,
        supplier: inventoryMedication.supplier,
      });
    }
  }, [
    medicationId,
    inventoryMedication.page,
    inventoryMedication.search,
    inventoryMedication.status,
    inventoryMedication.location,
    inventoryMedication.supplier,
  ]);

  const handleView = (row: any) => {
    setSelectedRow(row);
  };

  const columns: Column<any>[] = [
    { key: "batchNumber", label: "Batch", render: row => row.batchNumber || "-" },
    { key: "quantity", label: "Quantity", render: row => row.quantity ?? "-" },
    {
      key: "expiryDate",
      label: "Expiry Date",
      render: row => new Date(row.expiryDate).toLocaleDateString(),
    },
    { key: "status", label: "Status", render: row => row.status || "-" },
    { key: "location", label: "Location", render: row => row.location || "-" },
    { key: "reference", label: "Reference", render: row => row.reference || "-" },
    { key: "supplier", label: "Supplier", render: row => row.supplier || "-" },
    {
      key: "isExpired",
      label: "Expired",
      render: row => (row.isExpired ? "Yes" : "No"),
    },
    {
      key: "isLowStock",
      label: "Low Stock",
      render: row => (row.isLowStock ? "Yes" : "No"),
    },
    {
      key: "action",
      label: "Action",
      render: row => (
        <button
          onClick={() => handleView(row)}
          className="text-primary hover:underline text-xs"
        >
          View
        </button>
      ),
    },
  ];

  return (
    <div className="container-bd">
      <HeaderTab
        title="Medication Inventory"
        searchPlaceholder="Search batches"
        onSearchChange={setInventoryMedicationSearch}
        showSearch={true}
        dropdowns={[
          {
            label: "Status",
            options: ["active", "inactive", "expired"],
            value: inventoryMedication.status || "",
            onChange: setInventoryMedicationStatus,
          },
          {
            label: "Location",
            options: ["Shelf A-1", "Shelf B-2", "Warehouse", "Fridge"],
            value: inventoryMedication.location || "",
            onChange: setInventoryMedicationLocation,
          },
          {
            label: "Supplier",
            options: ["ABC Pharmaceuticals", "XYZ Ltd", "MediCorp"],
            value: inventoryMedication.supplier || "",
            onChange: setInventoryMedicationSupplier,
          },
        ]}
      />
      {inventoryMedicationLoading ?  <p>Loading Inventories by Medication</p> : inventoryMedication?.data.length === 0 ? (
        <p className="text-center mt-10 text-gray-500">No Inventories by Medication found.</p>
      ) :    <Table
        columns={columns}
        data={inventoryMedication?.data || []}
        page={inventoryMedication?.page}
        total={inventoryMedication?.total}
        limit={inventoryMedication?.limit}
        setPage={setInventoryMedicationPage}
      />  }
  

      {/* Modal to view full inventory detail */}
      <Modal open={!!selectedRow} onClose={() => setSelectedRow(null)}>
        {selectedRow && (
          <div className="text-sm space-y-2">
            <h2 className="text-lg font-semibold mb-2">
              Medication Batch Detail
            </h2>
            <p><strong>Medication:</strong> {selectedRow?.medicationName}</p>
            <p><strong>Generic Name:</strong> {selectedRow?.medicationGenericName}</p>
            <p><strong>Batch Number:</strong> {selectedRow?.batchNumber}</p>
            <p><strong>Quantity:</strong> {selectedRow?.quantity}</p>
            <p><strong>Expiry Date:</strong> {new Date(selectedRow?.expiryDate).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {selectedRow?.status}</p>
            <p><strong>Location:</strong> {selectedRow?.location}</p>
            <p><strong>Reference:</strong> {selectedRow?.reference}</p>
            <p><strong>Supplier:</strong> {selectedRow?.supplier}</p>
            <p><strong>Barcode:</strong> {selectedRow?.barcode}</p>
            <p><strong>Expired:</strong> {selectedRow?.isExpired ? "Yes" : "No"}</p>
            <p><strong>Low Stock:</strong> {selectedRow?.isLowStock ? "Yes" : "No"}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PharmacyInventoryMedication;
