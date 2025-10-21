import { useEffect, useState } from "react";

const ActionPayment = ({
  paymentStatus,
  setPaymentStatus,
  handlePaymentStatus,
  loading,
  procedure,
  type
}: any) => {
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (procedure?.paymentStatus) {
      setPaymentStatus(procedure.paymentStatus);
      setEdit(false);
    } else {
      setEdit(true);
    }
  }, [procedure?.paymentStatus]);

  return (
    <div className="flex flex-col gap-2">
      {procedure?.paymentStatus && !edit && (
        <div className="flex justify-between items-center">
          <div>
            <h1>Payment Status</h1>
            <span className="text-gray-600 capitalize">
              {procedure.paymentStatus}
            </span>
          </div>
       {type === "admin" &&  (
           <button
            onClick={() => setEdit(true)}
            className="text-blue-600 hover:underline"
          >
            Edit
          </button>
       )}
        </div>
      )}

      {edit && type === "admin" ? (
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-600">Payment Status</label>
          <select
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
            className="w-full form-input rounded p-2 mt-1"
          >
            <option value="">Select</option>
            <option value="pending">Pending</option>
            <option value="complete">Complete</option>
            <option value="failed">Failed</option>
          </select>
          <button
            onClick={handlePaymentStatus}
            className="mt-3 px-4 py-2 bg-primary text-white rounded w-full"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Payment"}
          </button>
        </div>
      ) : ""}
    </div>
  );
};

export default ActionPayment;
