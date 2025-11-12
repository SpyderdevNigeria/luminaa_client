
import { useEffect, useState } from "react";
import api from "../../api/apiConfig";
import Modal from "./modal";


type OfflinePaymentModalProps = {
  open: boolean;
  onClose: () => void;
  entityType: string;
  entityId: string;
  patientId: string;
  amount: number;
  onSuccess?: () => void
};

const OfflinePaymentModal = ({
  open,
  onClose,
  entityType,
  entityId,
  patientId,
  amount,
  onSuccess
}: OfflinePaymentModalProps) => {
  const [offlinePaymentMethod, setOfflinePaymentMethod] = useState("CASH");
  const [offlineReference, setOfflineReference] = useState("");
  const [offlineNotes, setOfflineNotes] = useState("");
  const [amountNumber, setAmountNumber] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setAmountNumber(amount);
    setOfflinePaymentMethod("CASH");
  }, [amount]);
  const handleSubmit = async () => {
    if (!offlineReference) {
      setMessage("Offline reference is required");
      return;
    }

    setLoading(true);
    setMessage(null);
    
    try {
      const payload = {
        entityType,
        entityId,
        patientId,
        amount : amountNumber,
        offlinePaymentMethod,
        offlineReference: `${offlineReference}.${Math.floor(Math.random() * 900000) + 100000}`,
        offlineNotes,
      };

      await api.post("/admin/payments/record-offline", payload);
      setMessage("Offline payment recorded successfully!");
      // Optionally close modal after success
      setTimeout(() => {
        onClose();
        setOfflineReference("");
        setOfflineNotes("");
        onSuccess?.();
      }, 1500);
    } catch (err: any) {
      console.error(err);
      setMessage(
        err.response?.data?.message || "Failed to record offline payment"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Record Offline Payment"
      handleSubmit={handleSubmit}
      buttonText={loading ? "Processing..." : `Record Payment`}
      loading={loading}
    >
      <div className="space-y-4">
        {message && (
          <div className="bg-blue-50 border border-blue-100 text-blue-700 text-sm p-3 rounded-lg">
            {message}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-1">Payment Method</label>
          <select
            value={offlinePaymentMethod}
            onChange={(e) => setOfflinePaymentMethod(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="CASH">Cash</option>
            <option value="BANK_TRANSFER">Bank Transfer</option>
            <option value="POS">POS</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Reference</label>
          <input
            type="text"
            value={offlineReference}
            onChange={(e) => setOfflineReference(e.target.value)}
            placeholder="Enter offline payment reference"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
            <label className="block text-sm font-medium mb-1">Amount</label>
          <input
            type="number"
            value={amountNumber}
            onChange={(e) => setAmountNumber(Number(e.target.value))}
            placeholder="Enter amount"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Notes</label>
          <textarea
            value={offlineNotes}
            onChange={(e) => setOfflineNotes(e.target.value)}
            placeholder="Any additional notes"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={3}
          />
        </div>
      </div>
    </Modal>
  );
};

export default OfflinePaymentModal;
