import { useEffect, useState } from "react";
import DashboardCard from "../../../components/common/DashboardCard";
import AdminApi from "../../../api/adminApi";
import useAdmin from "../../../hooks/useAdmin";
// import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

function AdminDashboard() {
  const {
    getPatients,
    getDoctors,
    getLabs,
    getPharmacists,
    patientsTotal,
    doctorsTotal,
    labsTotal,
    pharmacistsTotal,
    patientsLoading,
    doctorsLoading,
    labsLoading,
    pharmacistsLoading,
  } = useAdmin(AdminApi);

  const [doctorSpecialties, setDoctorSpecialties] = useState<any[]>([]);
  // const [patientStats, setPatientStats] = useState<any>(null);
  const [medicationsTotal, setMedicationsTotal] = useState(0);

  useEffect(() => {
    getPatients();
    getDoctors();
    getLabs();
    getPharmacists();

    AdminApi.getDoctorsStats().then(setDoctorSpecialties).catch(console.error);
    // AdminApi.getPatientStats().then(setPatientStats).catch(console.error);
    AdminApi.getMedications("")
      .then((res) => setMedicationsTotal(res?.data?.total))
      .catch(console.error);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {/* 👇 Original Section (Don’t touch) */}
      <section className="flex flex-col gap-4">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardCard
            title="Patients"
            count={patientsLoading ? 0 : patientsTotal}
          />
          <DashboardCard
            title="Doctors"
            count={doctorsLoading ? 0 : doctorsTotal}
          />
          <DashboardCard
            title="Laboratory"
            count={labsLoading ? 0 : labsTotal}
          />
          <DashboardCard
            title="Pharmacists"
            count={pharmacistsLoading ? 0 : pharmacistsTotal}
          />
        </div>
      </section>

      {/* 👇 Additional Stats Section (New Design) */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {/* Medication Count */}

        {/* Inventory Summary */}
        {/* {inventorySummary && (
          <div className="bg-white rounded-xl p-5 shadow-md space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">Inventory Summary</h3>
            <div className="text-sm text-gray-700">
              <p>Total Items: <span className="font-bold">{inventorySummary.totalItems}</span></p>
              <p>In Stock: <span className="font-bold">{inventorySummary.inStockCount}</span></p>
              <p>Out of Stock: <span className="font-bold">{inventorySummary.outOfStockCount}</span></p>
              <p>Total Value (₦): <span className="font-bold">{Math.round(inventorySummary.totalValue)}</span></p>
            </div>
          </div>
        )} */}

        {/* Patient Stats */}
        {/* {patientStats && (
          <div className="bg-white rounded-xl p-5 shadow-md space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Patient Stats
            </h3>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={[
                    {
                      name: "Active",
                      fullName: "Active Patients",
                      value: patientStats.activePatients,
                    },
                    {
                      name: "Bio Data",
                      fullName: "Bio Data Completed",
                      value: patientStats.bioDataCompleted,
                    },
                    {
                      name: "Medical History",
                      fullName: "Medical History Completed",
                      value: patientStats.medicalHistoryCompleted,
                    },
                  ]}
                  cx="50%"
                  cy="45%"
                  innerRadius={40}
                  outerRadius={110}
                  dataKey="value"
                  label={({ value, x, y }) => (
                    <text
                      x={x}
                      y={y}
                      fill="#000"
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize={12}
                    >
                      {`${value}`}
                    </text>
                  )}
                  labelLine={false}
                >
                  <Cell fill="#3B82F6" />
                  <Cell fill="#10B981" />
                  <Cell fill="#F59E0B" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <div className="text-sm text-gray-700 space-y-1">
              <p>
                <span className="inline-block w-3 h-3 mr-2 rounded-sm bg-[#3B82F6]"></span>{" "}
                Active Patients
              </p>
              <p>
                <span className="inline-block w-3 h-3 mr-2 rounded-sm bg-[#10B981]"></span>{" "}
                Bio Data Completed
              </p>
              <p>
                <span className="inline-block w-3 h-3 mr-2 rounded-sm bg-[#F59E0B]"></span>{" "}
                Medical History Completed
              </p>
            </div>
          </div>
        )} */}

        <div className="bg-white rounded-xl p-5 shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Total Medications
          </h3>
          <p className="text-3xl font-bold text-primary">{medicationsTotal}</p>
        </div>
      </section>

      {/* 👇 Doctors by Specialty Section */}
      {doctorSpecialties?.length > 0 && (
        <section className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Doctors by Specialty
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {doctorSpecialties.map((spec) => (
              <div
                key={spec.specialty}
                className="p-4 border rounded-lg bg-gray-50 text-center shadow-sm"
              >
                <p className="text-sm font-medium text-gray-600">
                  {spec.specialty}
                </p>
                <p className="text-xl font-bold text-primary">
                  {spec.doctorCount}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default AdminDashboard;
