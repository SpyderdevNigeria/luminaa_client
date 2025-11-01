import { useEffect,  } from "react";
import {  FiEye,  } from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Dropdown from "../../../components/dropdown/dropdown";
import HeaderTab from "../../../components/common/HeaderTab";
import Table, { Column } from "../../../components/common/Table";
import AdminApi from "../../../api/adminApi";
import usePaymentVouchers from "../../../hooks/usePaymentVouchers";
import AdminNavigate from "../../../components/common/AdminNavigate";

function AdminPaymentVoucher() {
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
  } = usePaymentVouchers(AdminApi);



  useEffect(() => {
    refetch();
  }, [page, status]);



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
                <AdminNavigate role={"voucher"} id={voucher.id} type="true">
                <FiEye /> View
                </AdminNavigate>
            </li>

          </ul>
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="space-y-4 bg-white p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Payment Vouchers</h1>

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

export default AdminPaymentVoucher;