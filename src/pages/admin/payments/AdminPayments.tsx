import { useEffect, useState } from "react";
import { FiEye } from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Dropdown from "../../../components/dropdown/dropdown";
import HeaderTab from "../../../components/common/HeaderTab";
import Table, { Column } from "../../../components/common/Table";
import { usePayments } from "../../../hooks/usePayments";
import AdminNavigate from "../../../components/common/AdminNavigate";
import AdminApi from "../../../api/adminApi";
import VerifyOfflinePaymentModal from "../../../components/modal/VerifyOfflinePaymentModal";

export default function AdminPayments() {
  const { payments, loading, error, getPayments } = usePayments(AdminApi);
  const [status, setStatus] = useState<string>("");
  const [entityType, setEntityType] = useState<string>("");
  
  // Modal state
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState<string | null>(null);

  useEffect(() => {
    getPayments({ status, entityType });
  }, [status, entityType, getPayments]);

  const columns: Column<any>[] = [
    { key: "id", label: "Payment ID", render: (p) => <>{p.id}</> },
    { key: "entityType", label: "Entity Type", render: (p) => <>{p.entityType}</> },
    { key: "amount", label: "Amount", render: (p) => <>₦{p.amount.toLocaleString()}</> },
    { key: "currency", label: "Currency", render: (p) => <>{p.currency}</> },
    { key: "paymentMethod", label: "Method", render: (p) => <>{p.paymentMethod}</> },
    { key: "status", label: "Status", render: (p) => <>{p.status}</> },
    { key: "createdAt", label: "Created", render: (p) => <>{new Date(p.createdAt).toLocaleString()}</> },
    {
      key: "actions",
      label: "Actions",
      render: (payment) => (
        <Dropdown showArrow={false} triggerLabel="" triggerIcon={<HiOutlineDotsVertical />}>
          <ul className="space-y-2 text-sm">
            <li>
              <AdminNavigate role={"payment"} id={payment.id} type="true">
                <FiEye /> View
              </AdminNavigate>
            </li>

            {payment.paymentMethod === "offline" && !payment.offlineVerified && (
              <li>
                <button
                  className="flex items-center gap-2 text-primary"
                  onClick={() => {
                    setSelectedPaymentId(payment.id);
                    setShowVerifyModal(true);
                  }}
                >
                  Verify Offline
                </button>
              </li>
            )}
          </ul>
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="space-y-4 bg-white p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Payments</h1>
      </div>

      <HeaderTab
        title="Payments"
        showSearch={false}
        dropdowns={[
          {
            label: "Status",
            options: ["pending", "completed", "failed", "refunded"],
            value: status,
            onChange: (val) => setStatus(val || ""),
          },
          {
            label: "Entity Type",
            options: ["patient_registration", "appointment", "procedure", "medication_order"],
            value: entityType,
            onChange: (val) => setEntityType(val || ""),
          },
        ]}
      />

      <div>
        {loading ? (
          <p>Loading payments...</p>
        ) : error ? (
          <p className="text-red-500">Error loading payments</p>
        ) : (
          <Table data={payments} columns={columns} page={1} total={payments.length} limit={10} setPage={() => {}} />
        )}
      </div>

      {selectedPaymentId && (
        <VerifyOfflinePaymentModal
          open={showVerifyModal}
          onClose={() => setShowVerifyModal(false)}
          paymentId={selectedPaymentId}
          defaultNotes="Confirmed with bank statement"
        />
      )}
    </div>
  );
}
