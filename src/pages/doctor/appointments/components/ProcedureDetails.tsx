import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DoctorApi from "../../../../api/doctorApi";
import HeaderTab from "../../../../components/common/HeaderTab";
import StatusBadge from "../../../../components/common/StatusBadge";
import DoctorProcedureModal from "../../../../components/modal/DoctorProcedureModal";
import useProcedures from "../../../../hooks/useProcedures";
import Table, { Column } from "../../../../components/common/Table";
import routeLinks from "../../../../utils/routes";
import { procedurePaymentStatus, procedureStatus, procedureType } from "../../../../utils/dashboardUtils";

interface ProcedureDetailsProps {
  appointment: any; // Contains appointmentId & patientId
  handleBack: () => void;
}

const ProcedureDetails = ({ appointment, handleBack }: ProcedureDetailsProps) => {
  const appointmentId = appointment?.id;
  const patientId = appointment?.patient?.id;

  const {
    data: procedures,
    loading,
    error,
    total,
    filters,
    updateFilters,
    loadProcedures,
  } = useProcedures(DoctorApi);

  const [procedureOpen, setProcedureOpen] = useState(false);

  // Fetch procedures whenever filters change
  useEffect(() => {
    loadProcedures();
  }, [
    filters.page,
    filters.search,
    filters.status,
    filters.type,
    filters.paymentStatus,
    filters.patientId,
  ]);
  useEffect(() => {
    updateFilters({ patientId });
  }, [])

  // Table columns
  const columns: Column<(typeof procedures)[0]>[] = [
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
      render: (procedure: { id: any; }) => (
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
    <div className="flex flex-col gap-4 ">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handleBack}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Back
        </button>
        <button
          onClick={() => setProcedureOpen(true)}
          className="px-4 py-2 bg-primary text-white rounded-md text-sm"
        >
          Add Procedure
        </button>
      </div>

      {/* Filters and Table */}
      <div className="  ">
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
                  paymentStatus:
                    value === "All" ? null : value.toLowerCase(),
                  page: 1,
                }),
            },
          ]}
        />

        {/* Table Section */}
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
              setPage={(page: any) => updateFilters({ page })}
            />
          )}

          {!loading && procedures?.length === 0 ? (
            <p className="col-span-full text-center py-6 text-gray-500">
              No procedures found.
            </p>
          ) : null}

          {error && (
            <p className="text-center text-red-500 py-2">{error}</p>
          )}
        </section>
      </div>

      {/* Add Procedure Modal */}
      <DoctorProcedureModal
        open={procedureOpen}
        onClose={() => setProcedureOpen(false)}
        patientId={patientId}
        appointmentId={appointmentId}
        onSuccess={() => {
          // reload table after new procedure is added
          loadProcedures();
          setProcedureOpen(false);
        }}
      />
    </div>
  );
};

export default ProcedureDetails;
