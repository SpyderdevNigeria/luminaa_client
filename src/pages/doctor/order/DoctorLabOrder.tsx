import { useEffect, useState } from "react";
import HeaderTab from "../../../components/common/HeaderTab";
import LabCard from "../../../components/common/LabOrderCard";
import PaginationComponent from "../../../components/common/PaginationComponent";
import { labRequestStatus } from "../../../utils/dashboardUtils";
import useOrder from "../../../hooks/useOrder";
import DoctorApi from "../../../api/doctorApi";

function LabTestRequests() {
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
  const totalPages = Math.ceil((ordersTotal ?? 0) / ordersLimit);

  useEffect(() => {
    getOrders();
  }, [ordersPage, statusFilter]);

  useEffect(() => {
    setOrdersFilters({
      page: 1,
      status: statusFilter === "All" ? undefined : statusFilter.toLowerCase(),
    });
  }, [statusFilter]);

  return (
    <div className="flex flex-col gap-4 bg-white">
      <div className="p-2 lg:p-4 rounded-lg">
        <HeaderTab
          title="orders"
          showSearch={false}
          dropdowns={[
            {
              label: "Status",
             options: ["All", ...labRequestStatus],
              value: statusFilter,
              onChange: (value) => setStatusFilter(value),
            },
          ]}
        />

        <section className="min-h-[300px]">
          {ordersLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {orders.length > 0 ? (
                orders.map((order) => <LabCard key={order.id} order={order} type="doctor" />)
              ) : (
                <p className="col-span-full text-center">No lab test requests found.</p>
              )}
            </div>
          )}
        </section>

        <div className="mt-4">
          <PaginationComponent
            page={ordersPage}
            total={ordersTotal ?? 0}
            limit={ordersLimit}
            totalPages={totalPages ?? 1}
            onPageChange={(page) => setOrdersFilters({ page })}
          />
        </div>
      </div>
    </div>
  );
}

export default LabTestRequests;
