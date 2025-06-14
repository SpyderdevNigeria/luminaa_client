import { useEffect, useState } from "react";
import HeaderTab from "../../../components/common/HeaderTab";
import LabCard from "../../../components/common/LabOrderCard";
import PaginationComponent from "../../../components/common/PaginationComponent";
import { LabCardSkeleton } from "../../../components/skeleton/SkeletonCards";
import useOrder from "../../../hooks/useOrder";
import LabApi from "../../../api/labApi";
import { labRequestStatus, labRequestPriority } from "../../../utils/dashboardUtils";
function LabTestRequests() {
  const {
    orders,
    ordersPage,
    ordersLimit,
    ordersTotal,
    ordersLoading,
    setOrdersFilters,
    getOrders,
  } = useOrder(LabApi);

  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const totalPages = Math.ceil((ordersTotal ?? 0) / ordersLimit);

  useEffect(() => {
    getOrders();
  }, [ordersPage, statusFilter, priorityFilter]);

  useEffect(() => {
    setOrdersFilters({
      page: 1,
      status: statusFilter === "All" ? undefined : statusFilter.toLowerCase(),
       priority: priorityFilter === "All" ? undefined : priorityFilter.toLowerCase(),
    });
  }, [statusFilter, priorityFilter]);

  return (
    <div className="flex flex-col gap-4 bg-white">
      <div className="p-2 lg:p-4 rounded-lg">
        <HeaderTab
          title="lab "
          showSearch={false}
          dropdowns={[
            {
              label: "Status",
              options: [ ...labRequestStatus],
              value: statusFilter,
              onChange: (value) => setStatusFilter(value),
            },
            {
              label: "priority",
              options: [ ...labRequestPriority],
              value: priorityFilter,
              onChange: (value) => setPriorityFilter(value),
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
                orders.map((order) => <LabCard key={order.id} order={order} type="lab" />)
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
