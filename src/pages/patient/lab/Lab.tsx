import { useEffect, useState } from "react";
import HeaderTab from "../../../components/common/HeaderTab";
import LabCard from "../../../components/common/LabOrderCard";
import PaginationComponent from "../../../components/common/PaginationComponent";

import useOrder from "../../../hooks/useOrder";
import PatientApi from "../../../api/PatientApi";
import { labRequestStatus } from "../../../utils/dashboardUtils";
import { LabCardSkeleton } from "../../../components/skeleton/SkeletonCards";
function Lab() {
  const {
    orders,
    ordersPage,
    ordersLimit,
    ordersTotal,
    ordersLoading,
    setOrdersFilters,
    getOrders,
  } = useOrder(PatientApi);

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
          title="Lab Test"
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
               <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                          {[...Array(4)].map((_, idx) => (
                            <LabCardSkeleton key={idx} />
                          ))}
                        </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
              {orders.length > 0 ? (
                orders.map((order) => <LabCard key={order.id} order={order} type="patient" />)
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

export default Lab;
