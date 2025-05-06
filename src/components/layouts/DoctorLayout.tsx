import { Outlet } from "react-router-dom"
import DashboardLayout from "./DashboardLayout"
import { navItemsDoctor } from "../../utils/dashboardUtils"
function DoctorLayout() {
  return (
    <div>
        <DashboardLayout links={navItemsDoctor} bg={'bg-white'}>
            <Outlet/>
        </DashboardLayout>
    </div>
  )
}

export default DoctorLayout