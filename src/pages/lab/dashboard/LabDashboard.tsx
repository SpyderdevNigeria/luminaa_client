import { useEffect, useMemo } from "react";
import DashboardCard from "../../../components/common/DashboardCard";
import LabApi from "../../../api/labApi";
import { Link } from "react-router-dom";
import routeLinks from "../../../utils/routes";
import useOrder from "../../../hooks/useOrder";
import Table, { Column } from "../../../components/common/Table";
import StatusBadge from "../../../components/common/StatusBadge";
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

  const columns: Column<(typeof orders)[0]>[] = [
    {
      key: "patient",
      label: "Patient",
      render: (order) => (
        <span>
          {order.patient?.firstName} {order.patient?.lastName}
        </span>
      ),
    },
    {
      key: "testName",
      label: "Test Name",
    },
    {
      key: "priority",
      label: "Priority",
    },
    {
      key: "doctor",
      label: "Doctor",
      render: (order) => (
        <span>
          {order.doctor?.firstName && order.doctor?.lastName ? order.doctor?.firstName + " " + order.doctor?.lastName : "N/A"}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (order) => (
        <StatusBadge status={order.status} />
      ),
    },

        {
      key: "Action",
      label: "Action",
      render: (order) => (
        <Link to={routeLinks?.lab?.labRequests+'/'+order.id} className="underline text-primary">
          View
        </Link>
      ),
    },
  ];

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
                <div className="py-8 text-center">Loading...</div>
              ) : (
                <Table
                  data={orders.slice(0, 8)} 
                  columns={columns}
                  page={ordersPage}
                  limit={8}
                  total={orders.length}
                  setPage={() => {}} 
                  showPaginate={false}
                />
              )}

              {ordersLoading !== true && orders?.length === 0 ? (
                <p className="col-span-full text-center">
                  No lab test requests found.
                </p>
              ) : null}
            </div>
          </main>
        </div>
      </section>
    </div>
  );
}

export default LabDashboard;
