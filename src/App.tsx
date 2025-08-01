import { createBrowserRouter, Navigate } from "react-router-dom";
import "./app.css";
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
import Order from "./pages/patient/order/PatientOrder";
import MedicalHistory from "./pages/patient/medical/MedicalHistory";
import DoctorLayout from "./components/layouts/DoctorLayout";
import DoctorDashboard from "./pages/doctor/dashboard/DoctorDashboard";
import DoctorAppointments from "./pages/doctor/appointments/DoctorAppointments";
import DoctorAppointmentsView from "./pages/doctor/appointments/DoctorAppointmentsDetails";
import DoctorPatients from "./pages/doctor/patients/DoctorPatients";
import DoctorProfile from "./pages/doctor/profile/DoctorProfile";
import DoctorSchedule from "./pages/doctor/Schedule/DoctorSchedule";
import DoctorPatientsDetails from "./pages/doctor/patients/DoctorPatientsDetails";
import EmailVerification from "./pages/patient/auth/EmailVerification";
import Home from "./pages/business/Home";
import PartnerAuthLayout from "./components/layouts/PartnerAuthLayout";
import PartnerLogin from "./pages/auth/PartnerLogin";
import PartnerEmailVerification from "./pages/auth/PartnerEmailVerification";
import ConsultationView from "./pages/patient/consultation/ConsultationView";
import LabLayout from "./components/layouts/LabLayout";
import LabDashboard from "./pages/lab/dashboard/LabDashboard";
import LabTestRequests from "./pages/lab/test/LabTestRequests";
import LabTestRequestsDetails from "./pages/lab/test/LabTestRequestsDetails";
import LabProfile from "./pages/lab/profile/LabProfile";
import DoctorPrescriptions from "./pages/doctor/prescriptions/DoctorPrescriptions";
import AdminAuthLayout from "./components/layouts/AdminAuthLayout";
import AdminLayout from "./components/layouts/AdminLayout";
import AdminLogin from "./pages/admin/auth/AdminLogin";
import AdminDashboard from "./pages/admin/dashboard/AdminDashboard";
import AdminLab from "./pages/admin/lab/AdminLab";
import AdminDoctors from "./pages/admin/doctors/AdminDoctors";
import DoctorOrder from "./pages/doctor/order/DoctorLabOrder";
import DoctorLabOrderDetails from "./pages/doctor/order/DoctorLabOrderDetails";
import LabDetails from "./pages/patient/lab/LabDetails";
import AdminPharmacists from "./pages/admin/pharmacists/AdminPharmacists";
import AdminMedications from "./pages/admin/medications/AdminMedications";
import PharmacyProfile from "./pages/pharmacy/profile/PharmacistProfile";
import PharmacyDashboard from "./pages/pharmacy/dashboard/PharmacistDashboard";
import PharmacyMedications from "./pages/pharmacy/medications/PharmacistMedications";
import PharmacyLayout from "./components/layouts/PharmacistLayout";
import SuperAdminLayout from "./components/layouts/SuperAdminLayout";
import SuperAdminAdmins from "./pages/admin/superadmin/admins/SuperAdminAdmins";
import AdminProfile from "./pages/admin/profile/AdminProfile";
import AdminLabDetails from "./pages/admin/lab/AdminLabDetails";

import AdminDoctorsDetails from "./pages/admin/doctors/AdminDoctorsDetails";
import AdminPharmacistsDetails from "./pages/admin/pharmacists/AdminPharmacistsDetails";
import SuperAdminAdminsDetails from "./pages/admin/superadmin/admins/SuperAdminAdminsDetails";
import AdminInventory from "./pages/admin/inventories/AdminInventory";
import AdminInventoryLogs from "./pages/admin/inventories/AdminInventoryLogs";
import AdminInventorySummary from "./pages/admin/inventories/AdminInventorySummary";
import AdminInventoryDetails from "./pages/admin/inventories/AdminInventoryDetails";
import AdminInventoryMedication from "./pages/admin/inventories/AdminInventoryMedication";
import PharmacyInventory from "./pages/pharmacy/inventories/PharmacyInventory";
import PharmacyInventorySummary from "./pages/pharmacy/inventories/PharmacyInventorySummary";
import PharmacyInventoryDetails from "./pages/pharmacy/inventories/PharmacyInventoryDetails";
import PharmacyInventoryMedication from "./pages/pharmacy/inventories/PharmacyInventoryMedication";
import PatientMedications from "./pages/patient/pharmacy/PatientMedications";
import PatientCheckout from "./pages/patient/checkout/PatientCheckout";
import PrescriptionOrderDetails from "./pages/patient/order/PatientOrderDetails";
import AdminOrder from "./pages/admin/order/AdminOrder";
import AdminOrderDetails from "./pages/admin/order/AdminOrderDetails";
import PharmacyOrder from "./pages/pharmacy/order/PharmacyOrder";
import PharmacyOrderDetails from "./pages/pharmacy/order/PharmacyOrderDetails";
import AdminUser from "./pages/admin/users/AdminUser";
import AdminUserDetails from "./pages/admin/users/AdminUserDetails";
import AdminPatientStats from "./pages/admin/patients/AdminPatientStats";
import AdminPatients from "./pages/admin/patients/AdminPatients";
import AdminPatientDetails from "./pages/admin/patients/AdminPatientsDetails";
import DoctorAllPatients from "./pages/doctor/allpatients/DoctorAllPatients";
import DoctorAllPatientsDetails from "./pages/doctor/allpatients/DoctorAllPatientsDetails";
import AdminDoctorsStats from "./pages/admin/doctors/AdminDoctorsStats";
import AdminDoctorsSpecialties from "./pages/admin/doctors/AdminDoctorsSpecialties";
import PatientHelpCenter from "./pages/patient/HelpCenter/PatientHelpCenter";
import DoctorHelpCenter from "./pages/admin/HelpCenter/AdminHelpCenter";
import LabHelpCenter from "./pages/lab/HelpCenter/LabHelpCenter";
import PharmacyHelpCenter from "./pages/pharmacy/HelpCenter/PharmacyHelpCenter";
import AdminHelpCenter from "./pages/admin/HelpCenter/AdminHelpCenter";
// import AdminMedicationsDetails from "./pages/admin/medications/AdminMedicationsDetails";
// Route
const App = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: routeLinks?.auth?.path,
    element: <PatientAuthLayout />,
    children: [
      {
        path: routeLinks?.auth?.path,
        element: <Navigate to={routeLinks?.auth?.login} />,
      },
      {
        path: routeLinks?.auth?.login,
        element: <Login />,
      },
      {
        path: routeLinks?.auth?.register,
        element: <Register />,
      },
    ],
  },

  // partner Authentication routers
  {
    path: routeLinks?.auth?.partnerAuth,
    element: <PartnerAuthLayout />,
    children: [
      {
        path: routeLinks?.auth?.partnerAuth,
        element: <Navigate to={routeLinks?.auth?.partnerLogin} />,
      },
      {
        path: routeLinks?.auth?.partnerLogin,
        element: <PartnerLogin />,
      },
    ],
  },
  // VerifyEmail route
  {
    path: routeLinks?.auth?.emailVerification,
    element: <EmailVerification />,
  },

  {
    path: routeLinks?.auth?.partnerEmailVerification,
    element: <PartnerEmailVerification />,
  },

  // Patient route for Onboarding
  {
    path: routeLinks?.patient?.onboarding,
    element: <Onboarding />,
  },
  {
    path: routeLinks?.patient?.appointment,
    element: <Appointment />,
  },

  // Patient Routes for Dashboard
  {
    path: routeLinks?.patient?.path,
    element: <PatientLayout />,
    children: [
      {
        path: routeLinks?.patient?.path,
        element: <Navigate to={routeLinks?.patient?.dashboard} />,
      },
      {
        path:routeLinks?.patient?.helpCenter,
        element:<PatientHelpCenter/>
      },
      {
        path: routeLinks?.patient?.dashboard,
        element: <DashboardHome />,
      },
      {
        path: routeLinks?.patient?.consultations,
        element: <Consultaion />,
      },
      {
        path: routeLinks?.patient?.consultationsid,
        element: <ConsultationView />,
      },
      {
        path: routeLinks?.patient?.prescription,
        element: <Prescriptions />,
      },
      {
        path: routeLinks?.patient?.lab,
        element: <Lab />,
      },
      {
        path: routeLinks?.patient?.labDetails,
        element: <LabDetails />,
      },
      {
        path: routeLinks?.patient?.profile,
        element: <Profile />,
      },
      {
        path: routeLinks?.patient?.orders,
        element: <Order />,
      },
            {
        path: routeLinks?.patient?.orderDetails,
        element: <PrescriptionOrderDetails />,
      },
      {
        path:routeLinks?.patient?.checkout,
        element:<PatientCheckout/>
      },
      {
        path: routeLinks?.patient?.pharmacy,
        element: <PatientMedications />,
      },
      {
        path: routeLinks?.patient?.medicalHistory,
        element: <MedicalHistory />,
      },
    ],
  },

  // Doctor Routes
  {
    path: routeLinks?.doctor?.path,
    element: <DoctorLayout />,
    children: [
      {
        path: routeLinks?.doctor?.path,
        element: <Navigate to={routeLinks?.doctor?.dashboard} />,
      },
      {
        path: routeLinks?.doctor?.dashboard,
        element: <DoctorDashboard />,
      },
      // Doctor Appointment Link start
      {
        path: routeLinks?.doctor?.appointment,
        element: <DoctorAppointments />,
      },
      {
        path: routeLinks?.doctor?.appointmentView,
        element: <DoctorAppointmentsView />,
      },
      // Doctor Appointment Link End

      // Doctor Patient Link start
      {
        path: routeLinks?.doctor?.patients,
        element: <DoctorPatients />,
      },
      {
        path: routeLinks?.doctor?.patientView,
        element: <DoctorPatientsDetails />,
      },

            {
        path: routeLinks?.doctor?.allPatients,
        element: <DoctorAllPatients />,
      },
      {
        path: routeLinks?.doctor?.allPatientsDetails,
        element: <DoctorAllPatientsDetails />,
      },
      // Doctor Patient Link End
      {
        path: routeLinks?.doctor?.profile,
        element: <DoctorProfile />,
      },
      {
        path: routeLinks?.doctor?.schedule,
        element: <DoctorSchedule />,
      },
      {
        path: routeLinks?.doctor?.labOrders,
        element: <DoctorOrder />,
      },
      {
        path: routeLinks?.doctor?.labOrdersDetails,
        element: <DoctorLabOrderDetails />,
      },
      
      {
        path: routeLinks?.doctor?.prescription,
        element: <DoctorPrescriptions />,
      },
       {
        path:routeLinks?.doctor?.helpCenter,
        element:<DoctorHelpCenter/>
      },
    ],
  },

  //lab Routes
  {
    path: routeLinks?.lab?.path,
    element: <LabLayout />,
    children: [
      {
        path: routeLinks?.lab?.path,
        element: <Navigate to={routeLinks?.lab?.dashboard} />,
      },
      {
        path: routeLinks?.lab?.dashboard,
        element: <LabDashboard />,
      },
      {
        path: routeLinks?.lab?.labRequests,
        element: <LabTestRequests />,
      },
      {
        path: routeLinks?.lab?.labRequestsDetails,
        element: <LabTestRequestsDetails />,
      },
            {
        path:routeLinks?.lab?.helpCenter,
        element:<LabHelpCenter/>
      },
      {
        path: routeLinks?.lab?.profile,
        element: <LabProfile />,
      },
    ],
  },

  // Pharmacy Routes
  {
    path: routeLinks?.pharmacist?.path,
    element: <PharmacyLayout />,
    children: [
      {
        path: routeLinks?.pharmacist?.path,
        element: <Navigate to={routeLinks?.pharmacist?.dashboard} />,
      },
      {
        path: routeLinks?.pharmacist?.dashboard,
        element: <PharmacyDashboard />,
      },
      {
        path: routeLinks?.pharmacist?.medications,
        element: <PharmacyMedications />,
      },
          {
        path: routeLinks?.pharmacist?.orders,
        element: <PharmacyOrder />,
      },
            {
        path: routeLinks?.pharmacist?.orderDetails,
        element: <PharmacyOrderDetails />,
      },

      {
        path: routeLinks?.pharmacist?.pharmacistInventory,
        element: <PharmacyInventory />,
      },
      {
        path: routeLinks?.pharmacist?.pharmacistInventorySummary,
        element: <PharmacyInventorySummary />,
      },

      {
        path: routeLinks?.pharmacist?.pharmacistInventoryDetails,
        element: <PharmacyInventoryDetails />,
      },
      {
        path: routeLinks?.pharmacist?.pharmacistInventoryMedication,
        element: <PharmacyInventoryMedication />,
      },
                  {
        path:routeLinks?.pharmacist?.helpCenter,
        element:<PharmacyHelpCenter/>
      },
      {
        path: routeLinks?.pharmacist?.profile,
        element: <PharmacyProfile />,
      },
    ],
  },
  // Admin Routes
  {
    path: routeLinks?.auth?.adminAuth,
    element: <AdminAuthLayout />,
    children: [
      {
        path: routeLinks?.auth?.adminAuth,
        element: <Navigate to={routeLinks?.auth?.adminLogin} />,
      },
      {
        path: routeLinks?.auth?.adminLogin,
        element: <AdminLogin />,
      },
    ],
  },
  {
    path: routeLinks?.admin?.path,
    element: <AdminLayout />,
    children: [
      {
        path: routeLinks?.admin?.path,
        element: <Navigate to={routeLinks?.admin?.dashboard} />,
      },
      {
        path: routeLinks?.admin?.dashboard,
        element: <AdminDashboard />,
      },
      {
        path: routeLinks?.admin?.lab,
        element: <AdminLab />,
      },
      {
        path: routeLinks?.admin?.labDetails,
        element: <AdminLabDetails />,
      },
         {
        path: routeLinks?.admin?.users,
        element: <AdminUser />,
      },
      {
        path: routeLinks?.admin?.usersDetails,
        element: <AdminUserDetails />,
      },
      {
        path: routeLinks?.admin?.patients,
        element: <AdminPatients />,
      },
      {
        path: routeLinks?.admin?.patientsDetails,
        element: <AdminPatientDetails />,
      },
         {
        path: routeLinks?.admin?.usersDetails,
        element: <AdminUserDetails />,
      },
         {
        path: routeLinks?.admin?.patientsStats,
        element: <AdminPatientStats />,
      },
      {
        path: routeLinks?.admin?.doctors,
        element: <AdminDoctors />,
      },
       {
        path: routeLinks?.admin?.doctorsStats,
        element: <AdminDoctorsStats />,
      },
          {
        path: routeLinks?.admin?.doctorsSpecialties,
        element: <AdminDoctorsSpecialties />,
      },
      {
        path: routeLinks?.admin?.doctorDetails,
        element: <AdminDoctorsDetails />,
      },
      {
        path: routeLinks?.admin?.pharmacists,
        element: <AdminPharmacists />,
      },
      {
        path: routeLinks?.admin?.pharmacistsDetails,
        element: <AdminPharmacistsDetails />,
      },
      {
        path: routeLinks?.admin?.medications,
        element: <AdminMedications />,
      },
      {
        path: routeLinks?.admin?.adminInventory,
        element: <AdminInventory />,
      },
      {
        path: routeLinks?.admin?.adminInventoryLogs,
        element: <AdminInventoryLogs />,
      },
      {
        path: routeLinks?.admin?.adminInventorySummary,
        element: <AdminInventorySummary />,
      },

      {
        path: routeLinks?.admin?.adminInventoryDetails,
        element: <AdminInventoryDetails />,
      },
      {
        path: routeLinks?.admin?.adminInventoryMedication,
        element: <AdminInventoryMedication />,
      },
         {
        path: routeLinks?.admin?.orders,
        element: <AdminOrder />,
      },
            {
        path: routeLinks?.admin?.orderDetails,
        element: <AdminOrderDetails />,
      },
      {
        path: routeLinks?.admin?.adminsDetails,
        element: <SuperAdminAdminsDetails />,
      },
                     {
        path:routeLinks?.admin?.helpCenter,
        element:<AdminHelpCenter/>
      },
      {
        path: routeLinks?.admin?.profile,
        element: <AdminProfile />,
      },
    ],
  },
  {
    path: routeLinks?.superAdmin?.path,
    element: <SuperAdminLayout />,
    children: [
      {
        path: routeLinks?.superAdmin?.path,
        element: <Navigate to={routeLinks?.superAdmin?.dashboard} />,
      },
      {
        path: routeLinks?.superAdmin?.dashboard,
        element: <AdminDashboard />,
      },
      {
        path: routeLinks?.superAdmin?.lab,
        element: <AdminLab />,
      },
      {
        path: routeLinks?.superAdmin?.labDetails,
        element: <AdminLabDetails />,
      },
      {
        path: routeLinks?.superAdmin?.users,
        element: <AdminUser />,
      },
      {
        path: routeLinks?.superAdmin?.usersDetails,
        element: <AdminUserDetails />,
      },
      {
        path: routeLinks?.superAdmin?.patients,
        element: <AdminPatients />,
      },
        {
        path: routeLinks?.superAdmin?.patientsDetails,
        element: <AdminPatientDetails />,
      },
         {
        path: routeLinks?.superAdmin?.usersDetails,
        element: <AdminUserDetails />,
      },
         {
        path: routeLinks?.superAdmin?.patientsStats,
        element: <AdminPatientStats />,
      },
      {
        path: routeLinks?.superAdmin?.doctors,
        element: <AdminDoctors />,
      },
         {
        path: routeLinks?.superAdmin?.doctorsStats,
        element: <AdminDoctorsStats />,
      },
          {
        path: routeLinks?.superAdmin?.doctorsSpecialties,
        element: <AdminDoctorsSpecialties />,
      },
      {
        path: routeLinks?.superAdmin?.doctorDetails,
        element: <AdminDoctorsDetails />,
      },
      {
        path: routeLinks?.superAdmin?.pharmacists,
        element: <AdminPharmacists />,
      },
      {
        path: routeLinks?.superAdmin?.pharmacistsDetails,
        element: <AdminPharmacistsDetails />,
      },
      {
        path: routeLinks?.superAdmin?.medications,
        element: <AdminMedications />,
      },
      {
        path: routeLinks?.superAdmin?.adminInventory,
        element: <AdminInventory />,
      },
      {
        path: routeLinks?.superAdmin?.adminInventoryLogs,
        element: <AdminInventoryLogs />,
      },
      {
        path: routeLinks?.superAdmin?.adminInventorySummary,
        element: <AdminInventorySummary />,
      },

      {
        path: routeLinks?.superAdmin?.adminInventoryDetails,
        element: <AdminInventoryDetails />,
      },
      {
        path: routeLinks?.superAdmin?.adminInventoryMedication,
        element: <AdminInventoryMedication />,
      },
        {
        path: routeLinks?.superAdmin?.orders,
        element: <AdminOrder />,
      },
            {
        path: routeLinks?.superAdmin?.orderDetails,
        element: <AdminOrderDetails />,
      },
      {
        path: routeLinks?.superAdmin?.admins,
        element: <SuperAdminAdmins />,
      },
      {
        path: routeLinks?.superAdmin?.adminsDetails,
        element: <SuperAdminAdminsDetails />,
      },
                         {
        path:routeLinks?.superAdmin?.helpCenter,
        element:<AdminHelpCenter/>
      },
      {
        path: routeLinks?.superAdmin?.profile,
        element: <AdminProfile />,
      },
    ],
  },
]);

export default App;
