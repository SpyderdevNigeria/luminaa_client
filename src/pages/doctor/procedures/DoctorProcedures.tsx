import {  useEffect } from "react";
import HeaderTab from "../../../components/common/HeaderTab";
import useProcedures from "../../../hooks/useProcedures";
import DoctorApi from "../../../api/doctorApi";
import Table, { Column } from "../../../components/common/Table";
import StatusBadge from "../../../components/common/StatusBadge";
import { Link } from "react-router-dom";
import routeLinks from "../../../utils/routes";
import { procedurePaymentStatus, procedureStatus, procedureType } from "../../../utils/dashboardUtils";

function DoctorProcedures() {
  const {
    data: procedures,
    loading,
    error,
    total,
    filters,
    updateFilters,
    loadProcedures,
  } = useProcedures(DoctorApi);

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
      key:"services",
      label:"Services",
      render: (procedure: { service: any; }) => <span>{procedure.service?.name || "N/A"}</span>,
     },
          {
      key:"services price",
      label:"Services Price",
      render: (procedure: { service: any; }) => <span>{procedure.service?.price || "N/A"}</span>,
     },
     {
       key: "nurseMessage",
       label: "Nurse Message",
       render: (procedure: { nurseMessage: any }) => (
         <span className="truncate max-w-[200px] block">
           {procedure.nurseMessage || "N/A"}
         </span>
       ),
     },
     {
       key: "patientMessage",
       label: "Patient Message",
       render: (procedure: { patientMessage: any }) => (
         <span className="truncate max-w-[200px] block">
           {procedure.patientMessage || "N/A"}
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
        <Link
          to={`${routeLinks.doctor.procedures}/${procedure.id}`}
          className="underline text-primary"
        >
          View
        </Link>
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

export default DoctorProcedures;
