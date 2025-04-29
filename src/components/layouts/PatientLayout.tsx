import { Outlet } from "react-router-dom"
import DashboardLayout from "./DashboardLayout"
import { navItemsPatient } from "../../utils/dashboardUtils"
function PatientLayout() {
  return (
    <div>
        <DashboardLayout links={navItemsPatient}>
            <Outlet/>
        </DashboardLayout>
    </div>
  )
}

export default PatientLayout