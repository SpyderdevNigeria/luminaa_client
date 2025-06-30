import { useEffect, } from "react";
import HeaderTab from "../../../components/common/HeaderTab";
import { labRequestStatus } from "../../../utils/dashboardUtils";
import useOrder from "../../../hooks/useOrder";
import DoctorApi from "../../../api/doctorApi";
import Table, { Column } from "../../../components/common/Table";
import StatusBadge from "../../../components/common/StatusBadge";
import { Link } from "react-router-dom";
import routeLinks from "../../../utils/routes";

function LabTestRequests() {
  const {
    orders,
    status,
    ordersPage,
    ordersLimit,
    ordersTotal,
    ordersLoading,
    setOrdersFilters,
    getOrders,
  } = useOrder(DoctorApi);


useEffect(() => {
  getOrders();
}, [ordersPage, status]);

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
    // {
    //   key: "doctor",
    //   label: "Doctor",
    //   render: (order) => (
    //     <span>
    //       {order.doctor?.firstName && order.doctor?.lastName ? order.doctor?.firstName + " " + order.doctor?.lastName : "N/A"}
    //     </span>
    //   ),
    // },
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
         <Link to={routeLinks?.doctor?.labOrders+'/'+order.id} className="underline text-primary">
          View
        </Link>
      ),
    },
  ];
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
              value: status || "",
              onChange: (value) =>  setOrdersFilters({
              status: value === "All" ? null : value.toLowerCase(),
            })
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
