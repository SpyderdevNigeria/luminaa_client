import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PharmacistApi from "../../../api/pharmacistApi";
import useInventory from "../../../hooks/useInventory";
import HeaderTab from "../../../components/common/HeaderTab";
import Table, { Column } from "../../../components/common/Table";
import {
  inventoryLocationOptions,
  inventorySupplierOptions,
  inventoryLowStockOptions,
  inventoryExpiryOptions,
  inventoryExpiringInOptions,
} from "../../../utils/dashboardUtils";
import routeLinks from "../../../utils/routes";

const PharmacyInventory = () => {
  const navigate = useNavigate();

  const {
    inventory,
    getInventory,
    setInventoryPage,
    setInventorySearch,
    setInventoryStatus,
    setInventoryLocation,
    setInventorySupplier,
    setInventoryLowStockThreshold,
    setInventoryShowExpired,
    setInventoryExpiringInDays,
  } = useInventory(PharmacistApi);

  const {
    data,
    page,
    limit,
    total,
    loading,
    search,
    status,
    location,
    supplier,
    lowStockThreshold,
    showExpired,
    expiringInDays,
  } = inventory;

  useEffect(() => {
    getInventory();
  }, [
    page,
    search,
    status,
    location,
    supplier,
    lowStockThreshold,
    showExpired,
    expiringInDays,
  ]);

  const columns: Column<any>[] = [
    {
      key: "medName",
      label: "Medication",
      render: (row) => row.medicationName,
    },
    { key: "batchNumber", label: "Batch", render: (row) => row.batchNumber },
    { key: "quantity", label: "Qty", render: (row) => row.quantity },
    { key: "location", label: "Location", render: (row) => row.location },
    {
      key: "expiry",
      label: "Expiry",
      render: (row) => new Date(row.expiryDate).toLocaleDateString(),
    },
    {
      key: "action",
      label: "Action",
      render: (row) => (
        <button
          onClick={() =>
            navigate(`${routeLinks?.pharmacist?.pharmacistInventory}/${row.id}`)
          }
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
        title=""
        searchPlaceholder="Search inventory..."
        onSearchChange={setInventorySearch}
        showSearch={true}
        dropdowns={[
          {
            label: "Status",
            options: ["active", "inactive"],
            value: status,
            onChange: setInventoryStatus,
          },
          {
            label: "Location",
            options: inventoryLocationOptions,
            value: location,
            onChange: setInventoryLocation,
          },
          {
            label: "Supplier",
            options: inventorySupplierOptions,
            value: supplier,
            onChange: setInventorySupplier,
          },
          {
            label: "Low Stock",
            options: inventoryLowStockOptions.map((opt) =>
              typeof opt === "string" ? opt : opt.value
            ),
            value: lowStockThreshold,
            onChange: setInventoryLowStockThreshold,
          },
          {
            label: "Expired",
            options: inventoryExpiryOptions.map((opt) =>
              typeof opt === "string" ? opt : opt.value
            ),
            value: showExpired,
            onChange: setInventoryShowExpired,
          },
          {
            label: "Expiring In",
            options: inventoryExpiringInOptions.map((opt) =>
              typeof opt === "string" ? opt : opt.value
            ),
            value: expiringInDays,
            onChange: setInventoryExpiringInDays,
          },
        ]}
      />

      {loading ? (
        "Loading Inventories"
      ) : (
        <Table
          columns={columns}
          data={data || []}
          page={page}
          total={total}
          limit={limit}
          setPage={setInventoryPage}
        />
      )}

    </div>
  );
};

export default PharmacyInventory;
