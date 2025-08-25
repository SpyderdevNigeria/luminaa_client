import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PatientApi from "../../../api/PatientApi";
import { PiPillDuotone } from "react-icons/pi";
import StatusBadge from "../../../components/common/StatusBadge";

const PrescriptionOrderDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchOrder(id);
    }
  }, [id]);

  const fetchOrder = async (orderId: string) => {
    try {
      const res = await PatientApi.getPrescriptionOrderById(orderId);
      setOrder(res?.data);
    } catch (error) {
      console.error("Failed to fetch order:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (!order) {
    return <div className="p-6 text-center text-red-500">Order not found.</div>;
  }

  return (
    <div className="container-bd space-y-6">
      <h2 className="text-xl font-semibold mb-4">Prescription Order Details</h2>

      {/* Summary */}
      <div className="bg-white  p-4 rounded-xl border border-gray-300 grid md:grid-cols-2 gap-4 text-sm">
        <div><span className="font-semibold">Order No:</span> {order.orderNo}</div>
        <div><span className="font-semibold">Order Type:</span> {order.orderType}</div>
        <div><span className="font-semibold">Payment Method:</span> {order.paymentMethod}</div>
        <div><span className="font-semibold">Payment Status:</span> {order.paymentStatus}</div>
        <div><span className="font-semibold">Status:</span> <StatusBadge status={order.status} /></div>
        <div><span className="font-semibold">Total Amount:</span> ₦{Number(order.totalAmount).toLocaleString()}</div>
        <div><span className="font-semibold">Reference:</span> {order.reference}</div>
        <div><span className="font-semibold">Created At:</span> {new Date(order.createdAt).toLocaleString()}</div>
        {order.notes && <div className="md:col-span-2"><span className="font-semibold">Notes:</span> {order.notes}</div>}
      </div>

      {/* Items */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Items</h3>
        <div className="grid gap-4">
          {order.items.map((item: any, index: number) => (
            <div key={index} className="border  border-gray-300 rounded-xl p-4 flex items-center justify-between gap-4 bg-white ">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 text-primary rounded-full p-2">
                  <PiPillDuotone className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-medium">{item.medication?.name || "Unnamed Medication"}</div>
                  <div className="text-xs text-gray-500">
                    Quantity: {item.quantity} × ₦{item.price.toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="text-sm font-semibold">
                ₦{item.totalPrice.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrescriptionOrderDetails;
