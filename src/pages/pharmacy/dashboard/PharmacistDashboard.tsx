import { useEffect, useMemo } from "react";
import DashboardCard from "../../../components/common/DashboardCard";
import MedicationCard from "../../../components/common/MedicationCard";
import { Link } from "react-router-dom";
import routeLinks from "../../../utils/routes";
import useMedications from "../../../hooks/useMedications";
import { MedicationCardSkeleton } from "../../../components/skeleton/SkeletonCards";
import PharmacistApi from "../../../api/pharmacistApi";

function PharmacistDashboard() {
  const {
    medications,
    medicationsLoading,
    medicationsPage,
    getMedications,
  } = useMedications(PharmacistApi);

  useEffect(() => {
    getMedications();
  }, [medicationsPage]);

  const { totalMedications, activeCount, inactiveCount, discontinuedCount } = useMemo(() => {
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
            <Link to={routeLinks?.pharmacist?.medications} className="text-sm text-primary hover:underline">
              See all
            </Link>
          </div>

          <div className="my-4">
            {medicationsLoading ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                {[...Array(4)].map((_, idx) => (
                  <MedicationCardSkeleton key={idx} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                {medications.length > 0 ? (
                  medications.slice(0, 4).map((med) => (
                    <MedicationCard key={med.id} medication={med} />
                  ))
                ) : (
                  <p className="col-span-full text-center">No medications found.</p>
                )}
              </div>
            )}
          </div>
        </main>
      </section>
    </div>
  );
}

export default PharmacistDashboard;
