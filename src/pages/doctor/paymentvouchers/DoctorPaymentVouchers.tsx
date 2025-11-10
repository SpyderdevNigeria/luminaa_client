import { useEffect, useState } from "react";
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Dropdown from "../../../components/dropdown/dropdown";
import HeaderTab from "../../../components/common/HeaderTab";
import ConfirmModal from "../../../components/modal/ConfirmModal";
import Table, { Column } from "../../../components/common/Table";
import DoctorApi from "../../../api/doctorApi";
import { useToaster } from "../../../components/common/ToasterContext";
import DoctorPaymentVoucherCreateEditModal from "../../../components/modal/DoctorPaymentVoucherCreateEditModal";
import routeLinks from "../../../utils/routes";
import { Link } from "react-router-dom";
import usePaymentVouchers from "../../../hooks/usePaymentVouchers";
import { useSelector } from "react-redux";
function DoctorPaymentVoucher() {
  const {
    vouchers,
    loading,
    error,
    page,
    limit,
    status,
    total,
    setPage,
    setStatus,
    refetch,
  } = usePaymentVouchers(DoctorApi);

  const { showToast } = useToaster();
  const [showForm, setShowForm] = useState(false);
  const [editVoucher, setEditVoucher] = useState<any>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedVoucherId, setSelectedVoucherId] = useState<string | null>(null);
    const {user} = useSelector((state:any) =>  state.auth);
    console.log(user);
  useEffect(() => {
    refetch();
  }, [page, status]);

  const handleEdit = (voucher: any) => {
      const parts = voucher?.patientName.trim().split(" ");
    setEditVoucher({ ...voucher, patient: {id: voucher?.patientId, firstName: parts[0], lastName: parts.length === 1 ? "" : parts[1] } });
    setShowForm(true);
  };

  const confirmDelete = (id: string) => {
    setSelectedVoucherId(id);
    setConfirmOpen(true);
  };

  const onConfirmDelete = async () => {
    if (!selectedVoucherId) return;
    setConfirmLoading(true);
    try {
      await DoctorApi.deletePaymentVoucher(selectedVoucherId);
      refetch();
      showToast("Payment voucher deleted successfully", "success");
    } catch (error) {
      console.error("Delete error:", error);
      showToast("Failed to delete payment voucher", "error");
    } finally {
      setConfirmOpen(false);
      setConfirmLoading(false);
      setSelectedVoucherId(null);
    }
  };

  const columns: Column<any>[] = [
    { key: "patientName", label: "Patient", render: (v) => <>{v?.patientName}</> },
    { key: "doctorName", label: "Doctor", render: (v) => <>{v?.doctorName}</> },
    { key: "description", label: "Description", render: (v) => <>{v?.description}</> },
    { key: "date", label: "Date", render: (v) => <>{v?.date}</> },
    { key: "amount", label: "Amount", render: (v) => <>₦{v?.amount}</> },
    { key: "status", label: "Status", render: (v) => <>{v?.status}</> },
    { key: "approvedDate", label: "Approved Date", render: (v) => <>{v?.approvedDate || "—"}</> },
    { key: "createdAt", label: "Created At", render: (v) => <>{new Date(v?.createdAt).toLocaleString()}</> },
    {
      key: "actions",
      label: "Actions",
      render: (voucher) => (
        <Dropdown showArrow={false} triggerLabel="" triggerIcon={<HiOutlineDotsVertical />}>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2"
                to={`${routeLinks.doctor.paymentVouchers}/${voucher.id}`}
              >
                <FiEye /> View
              </Link>
            </li>
            <li
              onClick={() => handleEdit(voucher)}
              className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2"
            >
              <FiEdit /> Edit
            </li>
            <li
              onClick={() => confirmDelete(voucher.id)}
              className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2 text-red-600"
            >
              <FiTrash2 /> Delete
            </li>
          </ul>
        </Dropdown>
      ),
    },
  ];
  if (user?.type === "internal") {
    return (
      <div className="space-y-4 bg-white p-4">
        <h1 className="text-2xl font-semibold">Payment Vouchers</h1>
        <p className="text-gray-600">You do not have permission to access this page</p>
      </div>
    )
  }
  return (
    <div className="space-y-4 bg-white p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Payment Vouchers</h1>
        <button
          className="bg-primary text-white px-6 py-2 text-sm rounded-md flex items-center gap-2"
          onClick={() => setShowForm(true)}
        >
          Add Voucher
        </button>
      </div>

      <HeaderTab
        title="Vouchers"
        showSearch={false}
        dropdowns={[
          {
            label: "Status",
            options: ["pending", "approved", "rejected", "completed"],
            value: status || "",
            onChange: (val) => {
              setStatus(val || "");
              setPage(1);
            },
          },
        ]}
      />

      <ConfirmModal
        open={confirmOpen}
        description="Are you sure you want to delete this payment voucher?"
        onConfirm={onConfirmDelete}
        onClose={() => {
          setConfirmOpen(false);
          setConfirmLoading(false);
          setSelectedVoucherId(null);
        }}
        loading={confirmLoading}
      />

      <DoctorPaymentVoucherCreateEditModal
        open={showForm}
        onClose={() => {
          setShowForm(false);
          setEditVoucher(null);
        }}
        onSuccess={() => {
          refetch();
          setShowForm(false);
          setEditVoucher(null);
        }}
        editVoucher={editVoucher}
      />

      <div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">Error loading vouchers</p>
        ) : (
          <Table
            data={vouchers}
            columns={columns}
            page={page}
            total={total}
            limit={limit}
            setPage={(p: number) => setPage(p)}
          />
        )}
      </div>
    </div>
  );
}

export default DoctorPaymentVoucher;
