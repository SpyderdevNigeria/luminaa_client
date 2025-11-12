import { useEffect } from "react";
import { usePayments } from "../../hooks/usePayments";
import AdminApi from "../../api/adminApi";

interface EntityPaymentsProps {
  entityType: string;
  entityId: string;
  recallFunc?: boolean;
}

export default function EntityPayments({ entityType, entityId, recallFunc }: EntityPaymentsProps) {
  const { getPaymentsByEntity, payments, loading, error } = usePayments(AdminApi);

  useEffect(() => {
    if (entityType && entityId) {
      getPaymentsByEntity(entityType, entityId);
    }
  }, [entityType, entityId, recallFunc]);

  if (loading) {
    return (
      <div className="bg-white p-4 rounded-lg  text-center">
        <p className="text-gray-500">Loading payments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-4 rounded-lg  text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (!payments || payments.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg  text-center text-gray-500">
        <p>No payments found for this record.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg space-y-4">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm ">
          <thead className="bg-primary text-white text-left">
            <tr>
              <th className="p-2 border-b">Payment ID</th>
              <th className="p-2 border-b">Amount</th>
              <th className="p-2 border-b">Method</th>
              <th className="p-2 border-b">Status</th>
              <th className="p-2 border-b">Reference</th>
              <th className="p-2 border-b">Paid At</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="p-2">{payment.id}</td>
                <td className="p-2">
                  {payment.currency} {payment.amount.toLocaleString()}
                </td>
                <td className="p-2 capitalize">
                  {payment.paymentMethod || "N/A"}
                </td>
                <td
                  className={`p-2 font-medium ${
                    payment.status === "completed"
                      ? "text-green-600"
                      : payment.status === "pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {payment.status}
                </td>
                <td className="p-2">{payment.paystackReference || "N/A"}</td>
                <td className="p-2">
                  {payment.paystackPaidAt
                    ? new Date(payment.paystackPaidAt).toLocaleString()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
