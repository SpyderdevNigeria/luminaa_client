import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminApi from "../../../api/adminApi";
import AdminNavigate from "../../../components/common/AdminNavigate";
import { useToaster } from "../../../components/common/ToasterContext";

interface PaymentVoucher {
  id: string;
  doctorId: string;
  doctorName: string;
  patientId: string;
  patientName: string;
  description: string;
  date: string;
  amount: number;
  approvedByUserId: string | null;
  status: string;
  approvalDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function AdminPaymentVoucherDetails() {
  const { id } = useParams<{ id: string }>();
  const [voucher, setVoucher] = useState<PaymentVoucher | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [newStatus, setNewStatus] = useState<string>("");
  const {showToast} = useToaster();
  useEffect(() => {
    if (!id) return;
    const fetchVoucher = async () => {
      try {
        setLoading(true);
        const res = await AdminApi.getPaymentVoucherById(id);
        setVoucher(res.data.data || res.data);
        setNewStatus(res.data.data?.status || res.data?.status || "");
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load voucher details");
      } finally {
        setLoading(false);
      }
    };
    fetchVoucher();
  }, [id]);

  const handleStatusUpdate = async () => {
    if (!voucher) return;
    try {
      setUpdatingStatus(true);
      await AdminApi.updatePaymentVoucherStatus(voucher.id, { status: newStatus });
      setVoucher({ ...voucher, status: newStatus });
      showToast("Status updated successfully", "success");
    } catch (err: any) {
      console.error("Failed to update status:", err);
      showToast("Failed to update status", "error"); 
    } finally {
      setUpdatingStatus(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60 text-gray-600">
        Loading voucher details...
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 font-medium mt-8">{error}</div>;
  }

  if (!voucher) {
    return <div className="text-center text-gray-500 mt-8">Voucher not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg space-y-4">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Payment Voucher Details
      </h2>

      <div className="space-y-4 text-gray-700">
        <div className="flex justify-between">
          <span className="font-medium">Doctor:</span>
          <AdminNavigate role={"doctor"} id={voucher.doctorId} type="true">
            {voucher.doctorName}
          </AdminNavigate>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Patient:</span>
          <AdminNavigate role={"patient"} id={voucher.patientId} type="true">
            {voucher.patientName}
          </AdminNavigate>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Description:</span>
          <span>{voucher.description}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Date:</span>
          <span>{new Date(voucher.date).toLocaleDateString()}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Amount:</span>
          <span>₦{voucher.amount.toLocaleString()}</span>
        </div>

        {/* Status dropdown */}
        <div className="flex flex-row justify-between items-center gap-4">
          <div className="flex flex-col ">
           <span className="font-medium">Status:</span>
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="completed">Completed</option>
          </select>
          </div>
          <button
            disabled={updatingStatus || newStatus === voucher.status}
            onClick={handleStatusUpdate}
            className={`px-4 py-1 rounded text-white ${
              newStatus === voucher.status
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary hover:bg-primary-dark"
            }`}
          >
            {updatingStatus ? "Updating..." : "Update Status"}
          </button>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Approved By User ID:</span>
          <span>{voucher.approvedByUserId || "N/A"}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Approval Date:</span>
          <span>
            {voucher.approvalDate
              ? new Date(voucher.approvalDate).toLocaleString()
              : "N/A"}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Created At:</span>
          <span>{new Date(voucher.createdAt).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
