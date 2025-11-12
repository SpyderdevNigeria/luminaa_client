import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePayments } from "../../../hooks/usePayments";
import PatientApi from "../../../api/PatientApi";
import { IoIosArrowRoundBack } from "react-icons/io";
export default function PatientPaymentDetails() {
  const { id } = useParams<{ id: string }>();
  const { payment, loading, error, getPaymentById } = usePayments(PatientApi);
      const  navigate = useNavigate();
  useEffect(() => {
    if (id) getPaymentById(id);
  }, [id, getPaymentById]);

  if (loading) {
    return <div className="flex justify-center items-center h-60 text-gray-600">Loading payment details...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 font-medium mt-8">{error}</div>;
  }

  if (!payment) {
    return <div className="text-center text-gray-500 mt-8">Payment not found.</div>;
  }

  return (
    <div>
      <button className="text-primary p-2 flex items-center gap-2"
      onClick={() => navigate(-1)}
      >
        <IoIosArrowRoundBack  />
        Back
      </button>
         <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg space-y-4">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Payment Details</h2>

      <div className="space-y-4 text-gray-700">
        <div className="flex justify-between">
          <span className="font-medium">Payment ID:</span>
          <span>{payment.id}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Entity Type:</span>
          <span>{payment.entityType}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Entity ID:</span>
          <span>{payment.entityId}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Amount:</span>
          <span>₦{payment.amount.toLocaleString()}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Currency:</span>
          <span>{payment.currency}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Payment Method:</span>
          <span>{payment.paymentMethod}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Status:</span>
          <span>{payment.status}</span>
        </div>

        {payment.paystackReference && (
          <div className="flex justify-between">
            <span className="font-medium">Paystack Reference:</span>
            <span>{payment.paystackReference}</span>
          </div>
        )}

        {payment.paystackPaidAt && (
          <div className="flex justify-between">
            <span className="font-medium">Paid At:</span>
            <span>{new Date(payment.paystackPaidAt).toLocaleString()}</span>
          </div>
        )}

      </div>
    </div>
    </div>
  );
}
