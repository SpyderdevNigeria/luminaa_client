import { useEffect, useState } from "react";
import LabOrdersForm from "./medical/LabOrdersForm";
import doctorApi from "../../../../api/doctorApi";
import LabOrderDetailModal from "../../../../components/modal/LabOrderDetailModal";
import { ILabOrder } from "../../../../types/Interfaces";
import LabCard from "../../../../components/common/LabOrderCard";
import { LabCardSkeleton } from "../../../../components/skeleton/SkeletonCards";
import ConfirmModal from "../../../../components/modal/ConfirmModal";

interface LabOrdersProps {
  appointmentId: string;
  handleBack: () => void;
  patientId: string;
}

const LabOrders = ({
  appointmentId,
  patientId,
  handleBack,
}: LabOrdersProps) => {
  const [labOrders, setLabOrders] = useState<ILabOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingLabOrder, setEditingLabOrder] = useState<ILabOrder | null>(null);
  const [selectedLabOrder, setSelectedLabOrder] = useState<ILabOrder | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [onConfirm, setOnConfirm] = useState<() => void>(() => {});
  const [confirmLoading, setConfirmLoading] = useState(false);

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

  const handleDelete = (id: string) => {
    setConfirmMessage("Are you sure you want to delete this lab order?");
    setOnConfirm(() => async () => {
      setConfirmLoading(true);
      try {
        await doctorApi.deleteLabOrder(id);
        await fetchLabOrders();
        setModalOpen(false);
        setSelectedLabOrder(null);
      } catch (error) {
        console.error("Error deleting lab order:", error);
      } finally {
        setConfirmLoading(false);
        setConfirmOpen(false);
      }
    });
    setConfirmOpen(true);
  };

  useEffect(() => {
    if (appointmentId) fetchLabOrders();
    else setLoading(false);
  }, [appointmentId]);

  const normalizedEditingLabOrder = editingLabOrder
    ? {
        ...editingLabOrder,
        patientId: editingLabOrder.patientId ?? patientId,
        appointmentId: editingLabOrder.appointmentId ?? appointmentId,
      }
    : undefined;

  return (
    <div className="bg-white  p-6">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-4">
              {[...Array(4)].map((_, idx) => (
                <LabCardSkeleton key={idx} />
              ))}
            </div>
          ) : null}

          {!loading && labOrders.length === 0 ? (
            <p className="text-gray-600 text-center mt-20">
              No lab orders found for this appointment.
            </p>
          ) : (
            <div className="grid gird-col-1 lg:grid-cols-3 2xl:grid-cols-4 gap-4 my-4">
              {labOrders.map((order) => (
                <LabCard
                  key={order?.id}
                  order={order}
                  type=""
                  onView={() => {
                    setSelectedLabOrder(order);
                    setModalOpen(true);
                  }}
                  onEdit={() => {
                    setEditingLabOrder(order);
                    setShowForm(true);
                  }}
                  onDelete={() => handleDelete(order.id)}
                />
              ))}
            </div>
          )}

          {selectedLabOrder && (
            <LabOrderDetailModal
              data={selectedLabOrder}
              isModalOpen={isModalOpen}
              setModalOpen={setModalOpen}
            />
          )}

          <ConfirmModal
            open={confirmOpen}
            onClose={() => setConfirmOpen(false)}
            description={confirmMessage}
            onConfirm={onConfirm}
            loading={confirmLoading}
            confirmText="Yes, Delete"
          />
        </>
      )}
    </div>
  );
};

export default LabOrders;
