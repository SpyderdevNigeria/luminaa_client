import { useState } from "react";
import Table, { Column } from "../../../../components/common/Table";
import { Hmo } from "../../../../hooks/useHmos";

interface Props {
  patients: any[];
  hmo: Hmo;
}

const HmoPatientsTable = ({ patients, hmo }: Props) => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const startIndex = (page - 1) * limit;
  const paginatedData = patients.slice(startIndex, startIndex + limit);
console.log(patients);
  const columns: Column<any>[] = [
    {
      key: "name",
      label: "Name",
      render: (p) => `${p?.user?.firstName || ""} ${p?.user?.lastName || ""}`,
    },
    { key: "email", label: "Email", render: (p) => p?.user?.email || "N/A" },
    { key: "gender", label: "Gender", render: (p) => p?.gender || "N/A" },
    { key: "city", label: "City", render: (p) => p?.city || "N/A" },
    { key: "hmoNumber", label: "HMO Number", render: (p) => p?.hmoNumber || "N/A" },
  ];

  return (
    <div className="mt-4">
        <div>
      <div className="mb-4 space-y-1">
        <h2 className="text-lg font-semibold text-primary">HMO Details</h2>
        <p><strong>Name:</strong> {hmo.name}</p>
        <p><strong>Description:</strong> {hmo.description || "N/A"}</p>
        <p><strong>Email:</strong> {hmo.contactEmail || "N/A"}</p>
        <p><strong>Phone:</strong> {hmo.contactPhone || "N/A"}</p>
        <p><strong>Patients:</strong> {hmo.patientCount || 0}</p>
        <p><strong>Active:</strong> {hmo.isActive ? "YES" : "NO"}</p>
      </div>

        </div>
      <h2 className="text-lg font-semibold mb-2">Patients for HMO: {hmo.name}</h2>
      {patients.length === 0 ? (
        <p>No patients found for this HMO.</p>
      ) : (
        <Table
          data={paginatedData}
          columns={columns}
          page={page}
          total={patients.length}
          limit={limit}
          setPage={setPage}
        />
      )}
    </div>
  );
};

export default HmoPatientsTable;
