import { useEffect, useMemo } from "react";
import DashboardCard from "../../../components/common/DashboardCard";
import { Link, useNavigate } from "react-router-dom";
import routeLinks from "../../../utils/routes";
import useMedications from "../../../hooks/useMedications";
import PharmacistApi from "../../../api/pharmacistApi";
import Table, { Column } from "../../../components/common/Table";
import StatusBadge from "../../../components/common/StatusBadge";
import Dropdown from "../../../components/dropdown/dropdown";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdInventory } from "react-icons/md";

function PharmacistDashboard() {
  const {
    medications,
    medicationsLoading,
    medicationsPage,
    setMedicationsPage,
    medicationsLimit,
    medicationsTotal,
    medicationsTotalPages,
    getMedications,
  } = useMedications(PharmacistApi);

  useEffect(() => {
    getMedications();
  }, [medicationsPage]);
  const navigate = useNavigate();
  const columns: Column<any>[] = [
    { key: "name", label: "Name" },
    { key: "genericName", label: "Generic Name" },
    { key: "manufacturer", label: "Manufacturer" },
    { key: "dosageForm", label: "Dosage Form" },
    { key: "strength", label: "Strength" },
    { key: "category", label: "Category" },
    { key: "price", label: "Price", render: (m) => `₦${m.price}` },
    {
      key: "requiresPrescription",
      label: "Requires Prescription",
      render: (m) => (m.requiresPrescription ? "Yes" : "No"),
    },
    {
      key: "status",
      label: "Status",
      render: (m) => <StatusBadge status={m.status} />,
    },
    {
      key: "isHidden",
      label: "Hidden",
      render: (m) => <p>{m.isHidden ? "Hidden" : "Visible"}</p>,
    },
    {
      key: "actions",
      label: "Actions",
      render: (m) => (
        <Dropdown
          showArrow={false}
          triggerLabel=""
          triggerIcon={<HiOutlineDotsVertical />}
        >
          <ul className="space-y-2 text-sm">
            <li
              onClick={() =>
                navigate(
                  routeLinks?.pharmacist?.pharmacistInventory +
                    "/medication/" +
                    m.id
                )
              }
              className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2"
            >
              <MdInventory /> Inventory
            </li>
          </ul>
        </Dropdown>
      ),
    },
  ];

  const { totalMedications, activeCount, inactiveCount, discontinuedCount } =
    useMemo(() => {
      const counts = {
        totalMedications: medications.length,
        activeCount: 0,
        inactiveCount: 0,
        discontinuedCount: 0,
      };

      for (const med of medications) {
        const status = med?.status?.toLowerCase();
        if (status === "active") counts.activeCount++;
        else if (status === "inactive") counts.inactiveCount++;
        else if (status === "discontinued") counts.discontinuedCount++;
      }

      return counts;
    }, [medications]);

  return (
    <div className="flex flex-col gap-4">
      {/* Top Stats Section */}
      <section className="flex flex-col gap-4">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardCard title="Medications" count={totalMedications} />
          <DashboardCard title="Active" count={activeCount} />
          <DashboardCard title="Inactive" count={inactiveCount} />
          <DashboardCard title="Expired" count={discontinuedCount} />
        </div>
      </section>

      {/* Recent Medications Section */}
      <section>
        <main className="bg-white p-2 lg:p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <h4 className="text-sm 2xl:text-xl">Recent Medications</h4>
            <Link
              to={routeLinks?.pharmacist?.medications}
              className="text-sm text-primary hover:underline"
            >
              See all
            </Link>
          </div>

          <div className="my-4">
            {medicationsLoading ? (
              <p className="text-center mt-10 text-gray-500">
                Loading medications...
              </p>
            ) : medications.length === 0 ? (
              <p className="text-center mt-10 text-gray-500">
                No medications found.
              </p>
            ) : (
              <Table
                data={medications.slice(0, 6)}
                columns={columns}
                page={medicationsPage}
                total={medicationsTotal}
                limit={medicationsLimit}
                totalPages={medicationsTotalPages}
                setPage={setMedicationsPage}
              />
            )}
          </div>
        </main>
      </section>
    </div>
  );
}

export default PharmacistDashboard;
