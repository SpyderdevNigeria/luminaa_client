import { useEffect, useState } from "react";
import PharmacyApi from "../../../api/pharmacistApi";
import useInventory from "../../../hooks/useInventory";
import HeaderTab from "../../../components/common/HeaderTab";
import Table, { Column } from "../../../components/common/Table";
import Modal from "../../../components/modal/modal";

const PharmacyInventorySummary = () => {
  const {
    inventorySummary,
    getInventorySummary,
    setInventorySummaryPage,
    setInventorySummarySearch,
    setInventorySummarySortBy,
    setInventorySummarySortOrder,
  } = useInventory(PharmacyApi);

  const [selectedRow, setSelectedRow] = useState<any | null>(null);

  useEffect(() => {
    getInventorySummary();
  }, [
    inventorySummary.page,
    inventorySummary.search,
    inventorySummary.sortBy,
    inventorySummary.sortOrder,
  ]);

  const { sortBy, sortOrder } = inventorySummary;

  const handleView = (row: any) => {
    setSelectedRow(row);
  };

  const columns: Column<any>[] = [
    {
      key: "medication",
      label: "Medication",
      render: (row) => row?.medication?.name || "-",
    },
    {
      key: "genericName",
      label: "Generic Name",
      render: (row) => row?.medication?.genericName || "-",
    },
    {
      key: "manufacturer",
      label: "Manufacturer",
      render: (row) => row?.medication?.manufacturer || "-",
    },
    {
      key: "dosage",
      label: "Dosage",
      render: (row) =>
        `${row?.medication?.strength || "-"} ${
          row?.medication?.dosageForm || ""
        }`,
    },
    {
      key: "category",
      label: "Category",
      render: (row) => row?.medication?.category || "-",
    },
    {
      key: "totalQuantity",
      label: "Total Quantity",
      render: (row) => row?.totalQuantity ?? "-",
    },
    {
      key: "isHidden",
      label: "Visibility",
      render: (row) => (row?.medication?.isHidden ? "Hidden" : "Visible"),
    },
    {
      key: "price",
      label: "Price",
      render: (row) => `₦${row?.medication?.price || "-"}`,
    },
    {
      key: "action",
      label: "Action",
      render: (row) => (
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
        title="Inventory Summary"
        searchPlaceholder="Search medications"
        onSearchChange={setInventorySummarySearch}
        showSearch={true}
        dropdowns={[
          {
            label: "Sort by",
            options: ["medicationName", "totalQuantity"],
            value: sortBy || "",
            onChange: (value) => setInventorySummarySortBy(value),
          },
          {
            label: "Sort order",
            options: ["ASC", "DESC"],
            value: sortOrder || "",
            onChange: (value) => {
              setInventorySummarySortOrder(value);
            },
          },
        ]}
      />

      <Table
        columns={columns}
        data={inventorySummary?.data || []}
        page={inventorySummary?.page}
        total={inventorySummary?.total}
        limit={inventorySummary?.limit}
        setPage={setInventorySummaryPage}
      />

      <Modal open={!!selectedRow} onClose={() => setSelectedRow(null)}>
        {selectedRow && (
          <div className="text-sm space-y-2">
            <h2 className="text-lg font-semibold mb-2">
              Inventory Summary Detail
            </h2>

            <p>
              <strong>Medication:</strong> {selectedRow?.medication?.name}
            </p>
            <p>
              <strong>Generic Name:</strong>{" "}
              {selectedRow?.medication?.genericName || "-"}
            </p>
            <p>
              <strong>Manufacturer:</strong>{" "}
              {selectedRow?.medication?.manufacturer || "-"}
            </p>
            <p>
              <strong>Dosage:</strong> {selectedRow?.medication?.strength}{" "}
              {selectedRow?.medication?.dosageForm}
            </p>
            <p>
              <strong>Category:</strong>{" "}
              {selectedRow?.medication?.category || "-"}
            </p>
            <p>
              <strong>Description:</strong>{" "}
              {selectedRow?.medication?.description || "-"}
            </p>
            <p>
              <strong>Price:</strong> ₦{selectedRow?.medication?.price || "-"}
            </p>
            <p>
              <strong>Requires Prescription:</strong>{" "}
              {selectedRow?.medication?.requiresPrescription ? "Yes" : "No"}
            </p>
            <p>
              <strong>Hidden:</strong>{" "}
              {selectedRow?.medication?.isHidden ? "Yes" : "No"}
            </p>
            <p>
              <strong>Status:</strong> {selectedRow?.medication?.status || "-"}
            </p>
            <p>
              <strong>Total Quantity:</strong>{" "}
              {selectedRow?.totalQuantity ?? "-"}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PharmacyInventorySummary;
