import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import DoctorApi from "../../../api/doctorApi";
import routeLinks from "../../../utils/routes";

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

export default function DoctorPaymentVoucherDetails() {
  const { id } = useParams<{ id: string }>();
  const [voucher, setVoucher] = useState<PaymentVoucher | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchVoucher = async () => {
      try {
        setLoading(true);
        const res = await DoctorApi.getPaymentVoucherById(id);
        setVoucher(res.data.data || res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load voucher details");
      } finally {
        setLoading(false);
      }
    };
    fetchVoucher();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60 text-gray-600">
        Loading voucher details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 font-medium mt-8">{error}</div>
    );
  }

  if (!voucher) {
    return (
      <div className="text-center text-gray-500 mt-8">Voucher not found.</div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Payment Voucher Details
      </h2>

      <div className="space-y-4 text-gray-700">
        {/* <div className="flex justify-between">
          <span className="font-medium">Voucher ID:</span>
          <span>{voucher.id}</span>
        </div> */}

        {/* <div className="flex justify-between">
          <span className="font-medium">Doctor:</span>
          <Link
            to={`/doctor/${voucher.doctorId}`}
            className="text-primary hover:underline"
          >
            {voucher.doctorName}
          </Link>
        </div> */}

        <div className="flex justify-between">
          <span className="font-medium">Patient:</span>
          <Link
            to={routeLinks?.doctor?.patients + `/${voucher.patientId}`}
            className="text-primary hover:underline"
          >
            {voucher.patientName}
          </Link>
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

        <div className="flex justify-between items-center">
          <span className="font-medium">Status:</span>
          <span
            className={`px-3 py-1 rounded-full text-sm capitalize ${
              voucher.status === "approved"
                ? "bg-green-100 text-green-700"
                : voucher.status === "pending"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {voucher.status}
          </span>
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

        {/* <div className="flex justify-between">
          <span className="font-medium">Updated At:</span>
          <span>{new Date(voucher.updatedAt).toLocaleString()}</span>
        </div> */}
      </div>
    </div>
  );
}
