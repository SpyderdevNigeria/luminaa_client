import { useEffect } from "react";
import HeaderTab from "../../../components/common/HeaderTab";
import useOrder from "../../../hooks/useOrder";
import LabApi from "../../../api/labApi";
import { labRequestStatus, labRequestPriority } from "../../../utils/dashboardUtils";
import { Link } from "react-router-dom";
import Table, { Column } from "../../../components/common/Table";
import routeLinks from "../../../utils/routes";
import StatusBadge from "../../../components/common/StatusBadge";
function LabTestRequests() {
  const {
    orders,
    ordersPage,
    search,
    ordersLimit,
    ordersTotal,
    ordersLoading,
    setOrdersFilters,
    getOrders,
    status,
    priority,
  } = useOrder(LabApi);


 useEffect(() => {
   getOrders();
   window.scrollTo({ top: 0, behavior: "smooth" });
}, [ordersPage, search, status, priority]);

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
    <div className="flex flex-col gap-4 bg-white ">
      <div className="p-2 lg:p-4 rounded-lg">
        <HeaderTab
          title="laboratory "
            showSearch={true}
            searchPlaceholder="Test Name"
            onSearchChange={(value) => setOrdersFilters({
              search: value
            })}
          dropdowns={[
                 {
              label: "Status",
              options: ["All", ...labRequestStatus],
              value: status || "",
              onChange: (value) =>  setOrdersFilters({
              status: value === "All" ? null : value.toLowerCase(),
            })
            },
            {
              label: "priority",
              options: ["all", ...labRequestPriority],
              value: priority || "",
              onChange: (value) => setOrdersFilters({ priority: value === "All" ? undefined : value.toLowerCase()}),
            },
          ]}
        />

        <section className="min-h-[300px]">
           {ordersLoading ? (
                <div className="py-8 text-center">Loading...</div>
              ) : (
                <Table
                  data={orders} 
                  columns={columns}
                  page={ordersPage}
                  limit={ordersLimit}
                  total={ordersTotal}
                  setPage={(page) => setOrdersFilters({ page })} 
                />
              )}

              {ordersLoading !== true && orders?.length === 0 ? (
                <p className="col-span-full text-center">
                  No lab test requests found.
                </p>
              ) : null}
        </section>


      </div>
    </div>
  );
}

export default LabTestRequests;
