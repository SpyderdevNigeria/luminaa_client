import { useEffect, useState } from "react";
import moment from "moment";
import LabOrdersForm from "./medical/LabOrdersForm"; 
import doctorApi from "../../../../api/doctorApi"; 
import StatusBadge from "../../../../components/common/StatusBadge";
import LabOrderDetailModal from "../../../../components/modal/LabOrderDetailModal"; 
import { ILabOrder } from "../../../../types/Interfaces"; 

interface LabOrdersProps {
  appointmentId: string;
  handleBack: () => void;
  patientId: string;
}

const LabOrders = ({ appointmentId, patientId, handleBack }: LabOrdersProps) => {
  const [labOrders, setLabOrders] = useState<ILabOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingLabOrder, setEditingLabOrder] = useState<ILabOrder | null>(null);
  const [selectedLabOrder, setSelectedLabOrder] = useState<ILabOrder | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const fetchLabOrders = async () => {
    setLoading(true);
    try {
      const response = await doctorApi.getLabOrdersAppointmentbyId(appointmentId);
      setLabOrders(response?.data || []);
    } catch (error) {
      console.error("Error fetching lab orders:", error);
      setLabOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!id) return;
    if (window.confirm("Are you sure you want to delete this lab order?")) {
      try {
        await doctorApi.deleteLabOrder(id);
        await fetchLabOrders();
        setModalOpen(false);
        setSelectedLabOrder(null);
      } catch (error) {
        console.error("Error deleting lab order:", error);
      }
    }
  };

  useEffect(() => {
    if (appointmentId) fetchLabOrders();
    else setLoading(false);
  }, [appointmentId]);

  // Normalize editingLabOrder to ensure patientId and appointmentId are strings (not undefined)
  const normalizedEditingLabOrder = editingLabOrder
    ? {
        ...editingLabOrder,
        patientId: editingLabOrder.patientId ?? patientId,
        appointmentId: editingLabOrder.appointmentId ?? appointmentId,
      }
    : undefined;

  return (
    <div className="bg-white p-6">
      {showForm ? (
        <>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            {editingLabOrder ? "Edit Lab Order" : "Add Lab Order"}
          </h2>
          <LabOrdersForm
            appointmentId={appointmentId}
            patientId={patientId}
            initialData={normalizedEditingLabOrder}
            onSuccess={() => {
              fetchLabOrders();
              setShowForm(false);
              setEditingLabOrder(null);
            }}
            setShowForm={() => {
              setShowForm(false);
              setEditingLabOrder(null);
            }}
          />
        </>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={handleBack}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              ← Back
            </button>
            <button
              onClick={() => {
                setShowForm(true);
                setEditingLabOrder(null);
              }}
              className="px-4 py-2 bg-primary text-white rounded-md text-sm"
            >
              Add Lab Order
            </button>
          </div>
          <h4 className="text-xl my-2">Lab Orders</h4>

          {loading ? (
            <p className="text-gray-600 text-center mt-20">Loading lab orders...</p>
          ) : null}
          {!loading && labOrders.length === 0 ? (
            <p className="text-gray-600 text-center mt-20">
              No lab orders found for this appointment.
            </p>
          ) : (
            labOrders.map((order) => (
              <div
                className="bg-white border rounded-lg flex flex-col md:flex-row md:items-center justify-between py-4 px-4 md:px-8 mb-4"
                key={order.id}
              >
                <div className="space-y-1 mb-2 md:mb-0 md:w-[300px] line-clamp-1">
                  <h3 className="text-sm md:text-base">{order.testName}</h3>
                  <h4 className="text-xs font-light">
                    {moment(order.createdAt).format("MMMM D, YYYY")}
                  </h4>
                </div>

                <div className="text-xs font-light mb-2 md:mb-0 md:w-[300px] line-clamp-1">
                  {order?.notes || "No notes"}
                </div>

                <div className="mb-2 md:mb-0">
                  <StatusBadge status={order.status || "pending"} />
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    className="text-xs text-primary underline"
                    onClick={() => {
                      setSelectedLabOrder(order);
                      setModalOpen(true);
                    }}
                  >
                    View
                  </button>
                  <button
                    className="text-xs text-yellow-600 underline"
                    onClick={() => {
                      setEditingLabOrder(order);
                      setShowForm(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-xs text-red-600 underline"
                    onClick={() => handleDelete(order.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}

          {selectedLabOrder && (
            <LabOrderDetailModal
              data={selectedLabOrder}
              isModalOpen={isModalOpen}
              setModalOpen={setModalOpen}
            />
          )}
        </>
      )}
    </div>
  );
};

export default LabOrders;
