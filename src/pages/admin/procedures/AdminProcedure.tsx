import { useEffect } from "react";
import HeaderTab from "../../../components/common/HeaderTab";
import useProcedures from "../../../hooks/useProcedures";
import Table, { Column } from "../../../components/common/Table";
import StatusBadge from "../../../components/common/StatusBadge";
import { procedurePaymentStatus, procedureStatus, procedureType } from "../../../utils/dashboardUtils";
import AdminApi from "../../../api/adminApi";
import Dropdown from "../../../components/dropdown/dropdown";
import AdminNavigate from "../../../components/common/AdminNavigate";
import { FiEye } from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";

function AdminProcedures() {
  const {
    data: procedures,
    loading,
    error,
    total,
    filters,
    updateFilters,
    loadProcedures,
  } = useProcedures(AdminApi);

  useEffect(() => {
    loadProcedures(); 
  }, [filters.page, filters.search, filters.status, filters.type, filters.paymentStatus]);

  const columns: Column<(typeof procedures)[0]>[] = [
    {
       key: "patient",
       label: "Patient",
       render: (procedure: { patient?: { user?: { firstName?: string; lastName?: string } } }) => (
         <span>
           {procedure.patient?.user?.firstName} {procedure.patient?.user?.lastName}
         </span>
       ),
     },
     {
        key: "doctor",
        label: "Doctor",
        render: (procedure: { doctor?: { user?: { firstName?: string; lastName?: string } } }) => (
          <span>
            {procedure.doctor?.user?.firstName} {procedure.doctor?.user?.lastName}
          </span>       
        )
     },
     {
       key: "type",
       label: "Type",
       render: (procedure: { type: any }) => (
         <span className="capitalize">{procedure.type}</span>
       ),
     },
     {
       key: "status",
       label: "Status",
       render: (procedure: { status: string; }) => <StatusBadge status={procedure.status} />,
     },
     {
       key: "nurseMessage",
       label: "Nurse Message",
       render: (procedure: { nurseMessage: any }) => (
         <span className="truncate max-w-[200px] block">
           {procedure.nurseMessage}
         </span>
       ),
     },
     {
       key: "patientMessage",
       label: "Patient Message",
       render: (procedure: { patientMessage: any }) => (
         <span className="truncate max-w-[200px] block">
           {procedure.patientMessage}
         </span>
       ),
     },
     {
         key:"paymentStatus",
         label:"Payment Status",
         render: (procedure: { paymentStatus: string; }) => <StatusBadge status={procedure.paymentStatus} />,
     },
     {
         key:"createdAt",
         label:"Created At",
         render: (procedure: { createdAt: string; }) => <span>{new Date(procedure.createdAt).toLocaleDateString()}</span>,
     },
    {
      key: "Action",
      label: "Action",
      render: (procedure) => (
            <Dropdown showArrow={false} triggerLabel="" triggerIcon={<HiOutlineDotsVertical />}>
                  <ul className="space-y-2 text-sm">
                    <AdminNavigate role={"procedure"} id={procedure?.id} type="true">
                      <FiEye /> View
                    </AdminNavigate>
                  </ul>
                </Dropdown>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4 bg-white">
      <div className="p-2 lg:p-4 rounded-lg">
        <HeaderTab
          title="Procedures"
          showSearch={true}
          searchPlaceholder="Search procedure"
          onSearchChange={(value) =>
            updateFilters({
              search: value,
              page: 1,
            })
          }
          dropdowns={[
            {
              label: "Status",
              options: ["All", ...procedureStatus],
              value: filters.status || "",
              onChange: (value) =>
                updateFilters({
                  status: value === "All" ? null : value.toLowerCase(),
                  page: 1,
                }),
            },
            {
              label: "Type",
              options: ["All", ...procedureType],
              value: filters.type || "",
              onChange: (value) =>
                updateFilters({
                  type: value === "All" ? null : value.toLowerCase(),
                  page: 1,
                }),
            },
            {
              label: "Payment Status",
              options: ["All", ...procedurePaymentStatus],
              value: filters.paymentStatus || "",
              onChange: (value) =>
                updateFilters({
                  paymentStatus: value === "All" ? null : value.toLowerCase(),
                  page: 1,
                }),
            },
          ]}
        />

        <section className="min-h-[300px]">
          {loading ? (
            <div className="py-8 text-center">Loading...</div>
          ) : (
            <Table
              data={procedures}
              columns={columns}
              page={filters.page}
              limit={filters.limit}
              total={total}
              setPage={(page) => updateFilters({ page })}
            />
          )}

          {!loading && procedures?.length === 0 ? (
            <p className="col-span-full text-center">
              No procedures found.
            </p>
          ) : null}

          {error && (
            <p className="text-center text-red-500 py-2">{error}</p>
          )}
        </section>
      </div>
    </div>
  );
}

export default AdminProcedures;
