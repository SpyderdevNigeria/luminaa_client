import { createBrowserRouter,Navigate } from "react-router-dom";
import routeLinks from "./utils/routes";
import PatientAuthLayout from "./components/layouts/PatientAuthLayout";
import Login from "./pages/patient/auth/Login";
import Register from "./pages/patient/auth/Register";
import Onboarding from "./pages/patient/onboarding/Onboarding";
import Appointment from "./pages/patient/appointment/Appointment";
import PatientLayout from "./components/layouts/PatientLayout";
import DashboardHome from "./pages/patient/dashboard/DashboardHome";
import Consultaion from "./pages/patient/consultation/Consultaion";
import Prescriptions from "./pages/patient/prescriptions/Prescriptions";
import Lab from "./pages/patient/lab/Lab";
import Profile from "./pages/patient/profile/Profile";
import Order from "./pages/patient/order/Order";
import Pharmacy from "./pages/patient/pharmacy/Pharmacy";
// Route
const App = createBrowserRouter([
  {
    path: routeLinks?.auth?.path,
    element: <PatientAuthLayout/>,
    children:[
      {
        path: routeLinks?.auth?.path,
        element : <Navigate to={routeLinks?.auth?.login}/>
    },
      {
        path: routeLinks?.auth?.login,
        element: <Login/>
    },
    {
      path: routeLinks?.auth?.register,
      element: <Register/>
  },
    ]
  },
  // Patient route for Onboarding 
  {
    path: routeLinks?.patient?.onboarding,
    element: <Onboarding/>,
  },
  {
    path:routeLinks?.patient?.appointment,
    element:<Appointment/>,
  },

  // Patient Routes for Dashboard 
  {
    path:routeLinks?.patient?.path,
    element: <PatientLayout/>,
    children:[
      {
        path: routeLinks?.patient?.path,
        element: <Navigate to={routeLinks?.patient?.dashboard}/>
      },
      {
        path: routeLinks?.patient?.dashboard,
        element: <DashboardHome />
      },
      {
        path: routeLinks?.patient?.consultations,
        element: <Consultaion/>
      },
      {
        path:routeLinks?.patient?.prescription,
        element: <Prescriptions/>
      },
      {
        path:routeLinks?.patient?.lab,
        element : <Lab/>
      },
      {
        path:routeLinks?.patient?.profile,
        element : <Profile/>
      },
      {
        path:routeLinks?.patient?.orders,
        element : <Order/>
      },
      {
        path:routeLinks?.patient?.pharmacy,
        element : <Pharmacy/>
      },
    ]
  }
  
])

export default App