import { useEffect } from "react";
import DashboardCard from "../../../components/common/DashboardCard";
import useAdmin from "../../../hooks/useAdmin"; 
import AdminApi from "../../../api/adminApi";

function AdminDashboard() {
  const {
    getPatients,
    getDoctors,
    getLabs,
    patientsTotal,
    doctorsTotal,
    labsTotal,
    patientsLoading,
    doctorsLoading,
    labsLoading,
  } = useAdmin(AdminApi);

  useEffect(() => {
    getPatients();
    getDoctors();
    getLabs();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <section className="flex flex-col gap-4">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardCard title="Patients" count={patientsLoading ? 0 : patientsTotal} />
          <DashboardCard title="Doctors" count={doctorsLoading ? 0 : doctorsTotal} />
          <DashboardCard title="Laboratory" count={labsLoading ? 0 : labsTotal} />
          <DashboardCard title="Pharmacy" count={0} />
        </div>
      </section>
    </div>
  );
}

export default AdminDashboard;
