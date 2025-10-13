import { useEffect, useState } from "react";

const ActionStatus = ({
  status,
  setStatus,
  note,
  setNote,
  handleStatusUpdate,
  loading,
  procedure,
}: any) => {
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (procedure?.status) {
      setStatus(procedure.status);
      setNote(procedure?.note || "");
      setEdit(false);
    } else {
      setEdit(true);
    }
  }, [procedure?.status, procedure?.note]);

  return (
    <div className="flex flex-col gap-2">
      {procedure?.status && !edit && (
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-sm font-medium text-gray-700">Procedure Status</h1>
            <span className="text-gray-600 capitalize">{procedure.status.replaceAll("_", " ")}</span>
            {procedure?.note && (
              <p className="text-gray-500 text-sm mt-1">{procedure.note}</p>
            )}
          </div>
          <button
            onClick={() => setEdit(true)}
            className="text-blue-600 hover:underline"
          >
            Edit
          </button>
        </div>
      )}

      {edit && (
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-600">Procedure Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full form-input rounded p-2 mt-1"
          >
            <option value="">Select</option>
            <option value="initiated">Initiated</option>
            <option value="payment_pending">Payment Pending</option>
            <option value="payment_partial">Payment Partial</option>
            <option value="payment_complete">Payment Complete</option>
            <option value="scheduled">Scheduled</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <textarea
            placeholder="Add note (optional)"
            className="w-full form-input rounded p-2 mt-2"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <button
            onClick={handleStatusUpdate}
            className="mt-3 px-4 py-2 bg-primary text-white rounded w-full"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Status"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ActionStatus;
