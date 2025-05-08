import { createBrowserRouter,Navigate } from "react-router-dom";
import './app.css'
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
import MedicalHistory from "./pages/patient/medical/MedicalHistory";
import DoctorLayout from "./components/layouts/DoctorLayout";
import DoctorDashboard from "./pages/doctor/dashboard/DoctorDashboard";
import DoctorAppointments from "./pages/doctor/appointments/DoctorAppointments";
import DoctorAppointmentsView from "./pages/doctor/appointments/DoctorAppointmentsView";
import DoctorPatients from "./pages/doctor/patients/DoctorPatients";
import DoctorProfile from "./pages/doctor/profile/DoctorProfile";
import DoctorSchedule from "./pages/doctor/Schedule/DoctorSchedule";
import DoctorPatientsDetails from "./pages/doctor/patients/DoctorPatientsDetails";
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
      {
        path:routeLinks?.patient?.medicalHistory,
        element: <MedicalHistory/>
      }
    ]
  },
  

  // Doctor Routes
  {
    path:routeLinks?.doctor?.path,
    element: <DoctorLayout/>,  
    children:[
      {
        path: routeLinks?.doctor?.path,
        element: <Navigate to={routeLinks?.doctor?.dashboard}/>
      },
      {
        path: routeLinks?.doctor?.dashboard,
        element: <DoctorDashboard/>,
      },
      // Doctor Appointment Link start
      {
        path:routeLinks?.doctor?.appointment,
        element: <DoctorAppointments/>,
      },
      {
        path:routeLinks?.doctor?.appointmentView,
        element: <DoctorAppointmentsView/>
      },
      // Doctor Appointment Link End

        // Doctor Patient Link start
        {
          path:routeLinks?.doctor?.patients,
          element: <DoctorPatients/>,
        },
        {
          path:routeLinks?.doctor?.patientView,
          element: <DoctorPatientsDetails/>
        },
        // Doctor Patient Link End
        {
          path:routeLinks?.doctor?.profile,
          element: <DoctorProfile/>
        },
        {
          path:routeLinks?.doctor?.schedule,
          element:<DoctorSchedule/>
        }
    ]
  }
])

export default App