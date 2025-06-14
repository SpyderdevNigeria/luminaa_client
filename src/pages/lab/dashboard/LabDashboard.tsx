import { useEffect, useMemo } from "react";
import DashboardCard from "../../../components/common/DashboardCard";
import LabApi from "../../../api/labApi";
import LabCard from "../../../components/common/LabOrderCard";
import { Link } from "react-router-dom";
import routeLinks from "../../../utils/routes";
import useOrder from "../../../hooks/useOrder";
import { LabCardSkeleton } from "../../../components/skeleton/SkeletonCards";
function LabDashboard() {
  const { orders, ordersPage, ordersLoading, getOrders } = useOrder(LabApi);

  useEffect(() => {
    getOrders();
  }, [ordersPage]);

  // Calculate counts
  const { totalOrders, lowCount, mediumCount, highCount } = useMemo(() => {
    const priorityCounts = {
      totalOrders: orders.length,
      lowCount: 0,
      mediumCount: 0,
      highCount: 0,
    };

    for (const order of orders) {
      const priority = order.priority?.toLowerCase();
      if (priority === "low") priorityCounts.lowCount++;
      else if (priority === "medium") priorityCounts.mediumCount++;
      else if (priority === "high") priorityCounts.highCount++;
    }

    return priorityCounts;
  }, [orders]);

  return (
    <div className="flex flex-col gap-4">
      <section className="flex flex-col gap-4">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardCard title="Test Requests" count={totalOrders} />
          <DashboardCard title="Low" count={lowCount} />
          <DashboardCard title="Medium" count={mediumCount} />
          <DashboardCard title="High" count={highCount} />
        </div>
      </section>

      <section>
        <div className="gap-4">
          <main className="bg-white p-2 lg:p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <h4 className="text-sm 2xl:text-xl">Pending Test Requests</h4>
              <Link to={routeLinks?.lab?.labRequests} className="text-sm">
                See all
              </Link>
            </div>
            <div className="my-4">
              {ordersLoading ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                  {[...Array(4)].map((_, idx) => (
                    <LabCardSkeleton key={idx} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <LabCard key={order.id} order={order} type="lab" />
                    ))
                  ) : (
                    <p className="col-span-full text-center">
                      No lab test requests found.
                    </p>
                  )}
                </div>
              )}
            </div>
          </main>
        </div>
      </section>
    </div>
  );
}

export default LabDashboard;
