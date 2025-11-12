
import { useState } from "react";
import api from "../../api/apiConfig";
import Modal from "./modal";

type VerifyOfflinePaymentModalProps = {
  open: boolean;
  onClose: () => void;
  paymentId: string;
  defaultNotes?: string;
};

const VerifyOfflinePaymentModal = ({
  open,
  onClose,
  paymentId,
  defaultNotes = "",
}: VerifyOfflinePaymentModalProps) => {
  const [verified, setVerified] = useState(true);
  const [notes, setNotes] = useState(defaultNotes);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setMessage(null);

    try {
      await api.patch(`/admin/payments/${paymentId}/verify-offline`, {
        verified,
        notes,
      });
      setMessage("Offline payment verified successfully!");
      setTimeout(() => {
        onClose();
        setNotes(defaultNotes);
      }, 1500);
    } catch (err: any) {
      console.error(err);
      setMessage(
        err.response?.data?.message || "Failed to verify offline payment"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Verify Offline Payment"
      handleSubmit={handleSubmit}
      buttonText="Verify Payment"
      loading={loading}
    >
      <div className="space-y-4">
        {message && (
          <div className="bg-blue-50 border border-blue-100 text-blue-700 text-sm p-3 rounded-lg">
            {message}
          </div>
        )}

        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={verified}
              onChange={(e) => setVerified(e.target.checked)}
              className="accent-primary"
            />
            Mark as Verified
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any verification notes"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={3}
          />
        </div>
      </div>
    </Modal>
  );
};

export default VerifyOfflinePaymentModal;
