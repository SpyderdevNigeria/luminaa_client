import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PharmacistApi from "../../../api/pharmacistApi";
import { PiPillDuotone } from "react-icons/pi";
import StatusBadge from "../../../components/common/StatusBadge";
import { useToaster } from "../../../components/common/ToasterContext";

const PharmacyOrderDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [newStatus, setNewStatus] = useState<string>("");
  const {showToast} = useToaster()
  useEffect(() => {
    if (id) {
      fetchOrder(id);
    }
  }, [id]);

  const fetchOrder = async (orderId: string) => {
    try {
      setLoading(true);
      const res = await PharmacistApi.getPrescriptionOrderById(orderId);
      setOrder(res?.data);
      setNewStatus(res?.data.status || "");
    } catch (error) {
      console.error("Failed to fetch order:", error);
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewStatus(e.target.value);
  };

  const handleUpdateStatus = async () => {
    if (!order || !newStatus) return;

    setUpdating(true);
    try {
      await PharmacistApi.updatePrescriptionOrderStatus(order.id, { status: newStatus });
      // Refresh order details after update
      await fetchOrder(order.id);
      showToast("Order status updated successfully", "error");
    } catch (error) {
      console.error("Failed to update status:", error);
      showToast("Failed to update order status", "error");
    } finally {
      setUpdating(false);
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
      <div className="bg-white p-4 rounded-xl border border-gray-300 grid md:grid-cols-2 gap-4 text-sm">
        <div><span className="font-semibold">Order No:</span> {order.orderNo}</div>
        <div><span className="font-semibold">Order Type:</span> {order.orderType}</div>
        <div><span className="font-semibold">Payment Method:</span> {order.paymentMethod}</div>
        <div><span className="font-semibold">Payment Status:</span> {order.paymentStatus}</div>
        <div><span className="font-semibold">Status:</span> <StatusBadge status={order.status} /></div>
        <div><span className="font-semibold">Total Amount:</span> ₦{Number(order.totalAmount).toLocaleString()}</div>
        <div><span className="font-semibold">Reference:</span> {order.reference || "N/A"}</div>
        <div><span className="font-semibold">Created At:</span> {new Date(order.createdAt).toLocaleString()}</div>
        {order.notes && <div className="md:col-span-2"><span className="font-semibold">Notes:</span> {order.notes}</div>}

        {/* Delivery Address */}
        <div className="md:col-span-2">
          <span className="font-semibold">Delivery Address:</span> {order.deliveryAddress || "N/A"}
        </div>
      </div>

      {/* Patient Details */}
      <div className="bg-white p-4 rounded-xl border border-gray-300 text-sm">
        <h3 className="font-semibold mb-2">Patient Details</h3>
        <div><span className="font-semibold">Name:</span> {order.patient.firstName} {order.patient.lastName}</div>
        <div><span className="font-semibold">Email:</span> {order.patient.email}</div>
      </div>
          {/* Update Status */}
      <div className="bg-white p-4 rounded-xl border border-gray-300">
        <h3 className="font-semibold mb-2">Update Order Status</h3>
      <div className="flex flex-col md:flex-row items-center gap-y-4 justify-between">
             <select
            value={newStatus}
            onChange={handleStatusChange}
            className=" form-input focus:outline-primary text-sm w-full md:max-w-[200px]"
            disabled={updating}
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button
            onClick={handleUpdateStatus}
            disabled={updating || newStatus === order.status}
            className="w-full md:max-w-[200px] text-sm bg-primary text-white p-2 rounded disabled:bg-gray-400"
          >
            {updating ? "Updating..." : "Update Status"}
          </button>
      </div>
      </div>
      {/* Items */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Items</h3>
        <div className="grid gap-4">
          {order.items.map((item: any, index: number) => (
            <div key={index} className="border border-gray-300 rounded-xl p-4 flex items-center justify-between gap-4 bg-white">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 text-primary rounded-full p-2">
                  <PiPillDuotone className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-medium">{item.medication?.name || "Unnamed Medication"}</div>
                  <div className="text-xs text-gray-500">
                    Quantity: {item.quantity} × ₦{Number(item.price).toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    Strength: {item.medication?.strength || "N/A"} | Dosage Form: {item.medication?.dosageForm || "N/A"}
                  </div>
                </div>
              </div>
              <div className="text-sm font-semibold">
                ₦{Number(item.totalPrice).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>


    </div>
  );
};

export default PharmacyOrderDetails;
