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
import ErrorPage from "./components/error/ErrorPage";
import { Routes, Route, Navigate } from "react-router-dom";
// import AdminMedicationsDetails from "./pages/admin/medications/AdminMedicationsDetails";
// Route
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Patient Auth */}
      <Route path={routeLinks.auth.path} element={<PatientAuthLayout />}>
        <Route index element={<Navigate to={routeLinks.auth.login} replace />} />
        <Route path={routeLinks.auth.login} element={<Login />} />
        <Route path={routeLinks.auth.register} element={<Register />} />
      </Route>

      {/* Partner Auth */}
      <Route path={routeLinks.auth.partnerAuth} element={<PartnerAuthLayout />}>
        <Route index element={<Navigate to={routeLinks.auth.partnerLogin} replace />} />
        <Route path={routeLinks.auth.partnerLogin} element={<PartnerLogin />} />
      </Route>

      {/* Email verification */}
      <Route path={routeLinks.auth.emailVerification} element={<EmailVerification />} />
      <Route path={routeLinks.auth.partnerEmailVerification} element={<PartnerEmailVerification />} />

      {/* Patient onboarding and appointment */}
      <Route path={routeLinks.patient.onboarding} element={<Onboarding />} />
      <Route path={routeLinks.patient.appointment} element={<Appointment />} />

      {/* Patient Dashboard */}
      <Route path={routeLinks.patient.path} element={<PatientLayout />}>
        <Route index element={<Navigate to={routeLinks.patient.dashboard} replace />} />
        <Route path={routeLinks.patient.helpCenter} element={<PatientHelpCenter />} />
        <Route path={routeLinks.patient.dashboard} element={<DashboardHome />} />
        <Route path={routeLinks.patient.consultations} element={<Consultaion />} />
        <Route path={routeLinks.patient.consultationsid} element={<ConsultationView />} />
        <Route path={routeLinks.patient.prescription} element={<Prescriptions />} />
        <Route path={routeLinks.patient.lab} element={<Lab />} />
        <Route path={routeLinks.patient.labDetails} element={<LabDetails />} />
        <Route path={routeLinks.patient.profile} element={<Profile />} />
        <Route path={routeLinks.patient.orders} element={<Order />} />
        <Route path={routeLinks.patient.orderDetails} element={<PrescriptionOrderDetails />} />
        <Route path={routeLinks.patient.checkout} element={<PatientCheckout />} />
        <Route path={routeLinks.patient.pharmacy} element={<PatientMedications />} />
        <Route path={routeLinks.patient.medicalHistory} element={<MedicalHistory />} />
      </Route>

      {/* Doctor Routes */}
      <Route path={routeLinks.doctor.path} element={<DoctorLayout />}>
        <Route index element={<Navigate to={routeLinks.doctor.dashboard} replace />} />
        <Route path={routeLinks.doctor.dashboard} element={<DoctorDashboard />} />
        <Route path={routeLinks.doctor.appointment} element={<DoctorAppointments />} />
        <Route path={routeLinks.doctor.appointmentView} element={<DoctorAppointmentsView />} />
        <Route path={routeLinks.doctor.patients} element={<DoctorPatients />} />
        <Route path={routeLinks.doctor.patientView} element={<DoctorPatientsDetails />} />
        <Route path={routeLinks.doctor.allPatients} element={<DoctorAllPatients />} />
        <Route path={routeLinks.doctor.allPatientsDetails} element={<DoctorAllPatientsDetails />} />
        <Route path={routeLinks.doctor.profile} element={<DoctorProfile />} />
        <Route path={routeLinks.doctor.schedule} element={<DoctorSchedule />} />
        <Route path={routeLinks.doctor.labOrders} element={<DoctorOrder />} />
        <Route path={routeLinks.doctor.labOrdersDetails} element={<DoctorLabOrderDetails />} />
        <Route path={routeLinks.doctor.prescription} element={<DoctorPrescriptions />} />
        <Route path={routeLinks.doctor.helpCenter} element={<DoctorHelpCenter />} />
      </Route>

      {/* Lab Routes */}
      <Route path={routeLinks.lab.path} element={<LabLayout />}>
        <Route index element={<Navigate to={routeLinks.lab.dashboard} replace />} />
        <Route path={routeLinks.lab.dashboard} element={<LabDashboard />} />
        <Route path={routeLinks.lab.labRequests} element={<LabTestRequests />} />
        <Route path={routeLinks.lab.labRequestsDetails} element={<LabTestRequestsDetails />} />
        <Route path={routeLinks.lab.helpCenter} element={<LabHelpCenter />} />
        <Route path={routeLinks.lab.profile} element={<LabProfile />} />
      </Route>

      {/* Pharmacist Routes */}
      <Route path={routeLinks.pharmacist.path} element={<PharmacyLayout />}>
        <Route index element={<Navigate to={routeLinks.pharmacist.dashboard} replace />} />
        <Route path={routeLinks.pharmacist.dashboard} element={<PharmacyDashboard />} />
        <Route path={routeLinks.pharmacist.medications} element={<PharmacyMedications />} />
        <Route path={routeLinks.pharmacist.orders} element={<PharmacyOrder />} />
        <Route path={routeLinks.pharmacist.orderDetails} element={<PharmacyOrderDetails />} />
        <Route path={routeLinks.pharmacist.pharmacistInventory} element={<PharmacyInventory />} />
        <Route path={routeLinks.pharmacist.pharmacistInventorySummary} element={<PharmacyInventorySummary />} />
        <Route path={routeLinks.pharmacist.pharmacistInventoryDetails} element={<PharmacyInventoryDetails />} />
        <Route path={routeLinks.pharmacist.pharmacistInventoryMedication} element={<PharmacyInventoryMedication />} />
        <Route path={routeLinks.pharmacist.helpCenter} element={<PharmacyHelpCenter />} />
        <Route path={routeLinks.pharmacist.profile} element={<PharmacyProfile />} />
      </Route>

      {/* Admin Auth */}
      <Route path={routeLinks.auth.adminAuth} element={<AdminAuthLayout />}>
        <Route index element={<Navigate to={routeLinks.auth.adminLogin} replace />} />
        <Route path={routeLinks.auth.adminLogin} element={<AdminLogin />} />
      </Route>

      {/* Admin Routes */}
      <Route path={routeLinks.admin.path} element={<AdminLayout />}>
        <Route index element={<Navigate to={routeLinks.admin.dashboard} replace />} />
        <Route path={routeLinks.admin.dashboard} element={<AdminDashboard />} />
        <Route path={routeLinks.admin.lab} element={<AdminLab />} />
        <Route path={routeLinks.admin.labDetails} element={<AdminLabDetails />} />
        <Route path={routeLinks.admin.users} element={<AdminUser />} />
        <Route path={routeLinks.admin.usersDetails} element={<AdminUserDetails />} />
        <Route path={routeLinks.admin.patients} element={<AdminPatients />} />
        <Route path={routeLinks.admin.patientsDetails} element={<AdminPatientDetails />} />
        <Route path={routeLinks.admin.patientsStats} element={<AdminPatientStats />} />
        <Route path={routeLinks.admin.doctors} element={<AdminDoctors />} />
        <Route path={routeLinks.admin.doctorsStats} element={<AdminDoctorsStats />} />
        <Route path={routeLinks.admin.doctorsSpecialties} element={<AdminDoctorsSpecialties />} />
        <Route path={routeLinks.admin.doctorDetails} element={<AdminDoctorsDetails />} />
        <Route path={routeLinks.admin.pharmacists} element={<AdminPharmacists />} />
        <Route path={routeLinks.admin.pharmacistsDetails} element={<AdminPharmacistsDetails />} />
        <Route path={routeLinks.admin.medications} element={<AdminMedications />} />
        <Route path={routeLinks.admin.adminInventory} element={<AdminInventory />} />
        <Route path={routeLinks.admin.adminInventoryLogs} element={<AdminInventoryLogs />} />
        <Route path={routeLinks.admin.adminInventorySummary} element={<AdminInventorySummary />} />
        <Route path={routeLinks.admin.adminInventoryDetails} element={<AdminInventoryDetails />} />
        <Route path={routeLinks.admin.adminInventoryMedication} element={<AdminInventoryMedication />} />
        <Route path={routeLinks.admin.orders} element={<AdminOrder />} />
        <Route path={routeLinks.admin.orderDetails} element={<AdminOrderDetails />} />
        <Route path={routeLinks.admin.adminsDetails} element={<SuperAdminAdminsDetails />} />
        <Route path={routeLinks.admin.helpCenter} element={<AdminHelpCenter />} />
        <Route path={routeLinks.admin.profile} element={<AdminProfile />} />
      </Route>

      {/* SuperAdmin Routes */}
      <Route path={routeLinks.superAdmin.path} element={<SuperAdminLayout />}>
        <Route index element={<Navigate to={routeLinks.superAdmin.dashboard} replace />} />
        <Route path={routeLinks.superAdmin.dashboard} element={<AdminDashboard />} />
        <Route path={routeLinks.superAdmin.lab} element={<AdminLab />} />
        <Route path={routeLinks.superAdmin.labDetails} element={<AdminLabDetails />} />
        <Route path={routeLinks.superAdmin.users} element={<AdminUser />} />
        <Route path={routeLinks.superAdmin.usersDetails} element={<AdminUserDetails />} />
        <Route path={routeLinks.superAdmin.patients} element={<AdminPatients />} />
        <Route path={routeLinks.superAdmin.patientsDetails} element={<AdminPatientDetails />} />
        <Route path={routeLinks.superAdmin.patientsStats} element={<AdminPatientStats />} />
        <Route path={routeLinks.superAdmin.doctors} element={<AdminDoctors />} />
        <Route path={routeLinks.superAdmin.doctorsStats} element={<AdminDoctorsStats />} />
        <Route path={routeLinks.superAdmin.doctorsSpecialties} element={<AdminDoctorsSpecialties />} />
        <Route path={routeLinks.superAdmin.doctorDetails} element={<AdminDoctorsDetails />} />
        <Route path={routeLinks.superAdmin.pharmacists} element={<AdminPharmacists />} />
        <Route path={routeLinks.superAdmin.pharmacistsDetails} element={<AdminPharmacistsDetails />} />
        <Route path={routeLinks.superAdmin.medications} element={<AdminMedications />} />
        <Route path={routeLinks.superAdmin.adminInventory} element={<AdminInventory />} />
        <Route path={routeLinks.superAdmin.adminInventoryLogs} element={<AdminInventoryLogs />} />
        <Route path={routeLinks.superAdmin.adminInventorySummary} element={<AdminInventorySummary />} />
        <Route path={routeLinks.superAdmin.adminInventoryDetails} element={<AdminInventoryDetails />} />
        <Route path={routeLinks.superAdmin.adminInventoryMedication} element={<AdminInventoryMedication />} />
        <Route path={routeLinks.superAdmin.orders} element={<AdminOrder />} />
        <Route path={routeLinks.superAdmin.orderDetails} element={<AdminOrderDetails />} />
        <Route path={routeLinks.superAdmin.admins} element={<SuperAdminAdmins />} />
        <Route path={routeLinks.superAdmin.adminsDetails} element={<SuperAdminAdminsDetails />} />
        <Route path={routeLinks.superAdmin.helpCenter} element={<AdminHelpCenter />} />
        <Route path={routeLinks.superAdmin.profile} element={<AdminProfile />} />
      </Route>

      {/* Catch all unmatched routes */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
