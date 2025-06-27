import { useEffect, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FiEye } from "react-icons/fi";
import Table, { Column } from "../../../components/common/Table";
import HeaderTab from "../../../components/common/HeaderTab";
import Dropdown from "../../../components/dropdown/dropdown";
import AdminApi from "../../../api/adminApi";
import useInventory from "../../../hooks/useInventory";
import { format } from "date-fns";
import Modal from "../../../components/modal/modal";

const AdminInventoryLogs = () => {
  const {
    inventoryLogsList,
    logsPage,
    logsLimit,
    logsTotal,
    logsTotalPages,
    logSearch,
    logAction,
    logPerformedBy,
    logMedicationId,
    logFromDate,
    logToDate,
    inventoryLogLoading,
    getInventoryLogs,
    setLogsPage,
    setLogSearch,
    setLogAction,
    setLogPerformedBy,
    setLogMedicationId,
    setLogFromDate,
    setLogToDate,
  } = useInventory(AdminApi);

  const [viewLog, setViewLog] = useState<any>(null);

  useEffect(() => {
    getInventoryLogs();
  }, [
    logsPage,
    logSearch,
    logAction,
    logPerformedBy,
    logMedicationId,
    logFromDate,
    logToDate,
  ]);

  const columns: Column<any>[] = [
    { key: "medicationName", label: "Medication" },
    { key: "batchNumber", label: "Batch" },
    { key: "action", label: "Action" },
    {
      key: "quantity",
      label: "Quantity",
      render: (log) => (
        <span>
          {log.action === "ADD"
            ? `+${log.quantity}`
            : `-${log.quantity}`}
        </span>
      ),
    },
    {
      key: "performedByName",
      label: "Performed By",
    },
    {
      key: "timestamp",
      label: "Timestamp",
      render: (log) => format(new Date(log.timestamp), "dd MMM yyyy, hh:mm a"),
    },
    {
      key: "actions",
      label: "Actions",
      render: (log) => (
        <Dropdown
          showArrow={false}
          triggerLabel=""
          triggerIcon={<HiOutlineDotsVertical />}
        >
          <ul className="space-y-2 text-sm">
            <li
              onClick={() => setViewLog(log)}
              className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2"
            >
              <FiEye /> View Details
            </li>
          </ul>
        </Dropdown>
      ),
    },
  ];
// console.log(logsLoading)
  return (
    <div className="space-y-4 container-bd">
      <h1 className="text-2xl font-semibold">Inventory Logs</h1>

      <HeaderTab
        title=""
        showSearch={true}
        onSearchChange={setLogSearch}
          dateFrom={logFromDate}
        onDateFromChange={setLogFromDate}
        dateTo={logToDate}
        onDateToChange={setLogToDate}
        dropdowns={[
          {
            label: "Action",
            options: ["ADD", "DISPENSE", "UPDATE", "RESTOCK", "RETURN", "EXPIRE", "DAMAGED", "RECEIVE", "ADJUST"],
            value: logAction,
            onChange: setLogAction,
          },
          {
            label: "Performed By",
            options: [], // optionally populate with users
            value: logPerformedBy,
            onChange: setLogPerformedBy,
          },
          {
            label: "Medication",
            options: [], // optionally populate with medication IDs/names
            value: logMedicationId,
            onChange: setLogMedicationId,
          },
        ]}
      />

      {inventoryLogLoading ? (
        <p>Loading...</p>
      ) : inventoryLogsList.length === 0 ? (
        <p className="text-center mt-10 text-gray-500">No Inventory found.</p>
      ) :(
        <Table
          data={inventoryLogsList}
          columns={columns}
          page={logsPage}
          total={logsTotal}
          limit={logsLimit}
          totalPages={logsTotalPages}
          setPage={setLogsPage}
        />
      )}

      <Modal open={!!viewLog} onClose={() => setViewLog(null)} title="Inventory Log Details">
        {viewLog && (
          <div className="space-y-2 text-sm text-gray-700">
            <p><strong>Medication:</strong> {viewLog.medicationName}</p>
            {/* <p><strong>Generic Name:</strong> {viewLog.medicationGenericName || "-"}</p> */}
            <p><strong>Batch Number:</strong> {viewLog.batchNumber}</p>
            <p><strong>Action:</strong> {viewLog.action}</p>
            <p><strong>Quantity:</strong> {viewLog.quantity}</p>
            <p><strong>Previous Quantity:</strong> {viewLog.previousQuantity}</p>
            <p><strong>New Quantity:</strong> {viewLog.newQuantity}</p>
            <p><strong>Performed By:</strong> {viewLog.performedByName}</p>
            <p><strong>Reference:</strong> {viewLog.reference}</p>
            <p><strong>Notes:</strong> {viewLog.notes}</p>
            <p><strong>Timestamp:</strong> {format(new Date(viewLog.timestamp), "dd MMM yyyy, hh:mm a")}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminInventoryLogs;
