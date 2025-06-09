import { useState, useEffect } from "react";
import { FiEye, FiTrash2 } from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";

import useOrder from "../../../hooks/useOrder";
import DoctorApi from "../../../api/doctorApi";

import Table, { Column } from "../../../components/common/Table";
import HeaderTab from "../../../components/common/HeaderTab";
import Dropdown from "../../../components/dropdown/dropdown";
import StatusBadge from "../../../components/common/StatusBadge";

function DoctorLabOrders() {
  const {
    orders,
    ordersPage,
    ordersLimit,
    ordersTotal,
    ordersLoading,
    setOrdersFilters,
    getOrders,
  } = useOrder(DoctorApi);

  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    getOrders();
  }, [ordersPage, statusFilter]);

  useEffect(() => {
    setOrdersFilters({
      page: 1,
      status: statusFilter === "All" ? undefined : statusFilter.toLowerCase(),
    });
  }, [statusFilter]);

  const handleView = (order: any) => {
    console.log("Viewing order:", order);
  };

  const handleDelete = (orderId: string) => {
    console.log("Deleting order with ID:", orderId);
  };

  const columns: Column<any>[] = [
    {
      key: "test",
      label: "Test",
      render: (order) => <span>{order?.testName || "—"}</span>,
    },
    {
      key: "patient",
      label: "Patient",
      render: (order) => (
        <span>
          {order?.patient?.firstName} {order?.patient?.lastName}
        </span>
      ),
    },
    {
      key: "priority",
      label: "Priority",
      render: (order) => <span>{order?.priority || "—"}</span>,
    },
    {
      key: "status",
      label: "Status",
      render: (order) => <StatusBadge status={order?.status} />,
    },
    {
      key: "actions",
      label: "Actions",
      render: (order) => (
        <Dropdown showArrow={false} triggerLabel="" triggerIcon={<HiOutlineDotsVertical />}>
          <ul className="space-y-2 text-sm">
            <li
              onClick={() => handleView(order)}
              className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2"
            >
              <FiEye /> View
            </li>
            <li
              onClick={() => handleDelete(order.id)}
              className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2 text-red-600"
            >
              <FiTrash2 /> Delete
            </li>
          </ul>
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Lab Orders</h1>
      </div>

      <HeaderTab
        title=""
        showSearch={false}
        dropdowns={[
          {
            label: "Status",
            options: ["All", "Pending", "In Progress", "Completed", "Cancelled"],
            value: statusFilter,
            onChange: (value) => setStatusFilter(value),
          },
        ]}
      />

      <div>
        {ordersLoading ? (
          <p>Loading...</p>
        ) : (
          <Table
            data={orders}
            columns={columns}
            page={ordersPage}
            total={ordersTotal}
            limit={ordersLimit}
            setPage={(page) => setOrdersFilters({ page })}
          />
        )}
      </div>
    </div>
  );
}

export default DoctorLabOrders;
