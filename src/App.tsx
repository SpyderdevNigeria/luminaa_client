import "./app.css";
import routeLinks from "./utils/routes";
import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

// Layouts (keep as direct imports since they’re always used)
import PatientAuthLayout from "./components/layouts/PatientAuthLayout";
import PatientLayout from "./components/layouts/PatientLayout";
import DoctorLayout from "./components/layouts/DoctorLayout";
import PartnerAuthLayout from "./components/layouts/PartnerAuthLayout";
import LabLayout from "./components/layouts/LabLayout";
import AdminAuthLayout from "./components/layouts/AdminAuthLayout";
import AdminLayout from "./components/layouts/AdminLayout";
import PharmacyLayout from "./components/layouts/PharmacistLayout";
import SuperAdminLayout from "./components/layouts/SuperAdminLayout";
import ErrorPage from "./components/error/ErrorPage";
import PartnerEmailVerification from "./pages/auth/PartnerEmailVerification";
import PartnerLogin from "./pages/auth/PartnerLogin";
import AdminUser from "./pages/admin/users/AdminUser";
import website from "./utils/website";
import BusinessLayout from "./components/layouts/business/BusinessLayout";
import NurseLayout from "./components/layouts/NurseLayout";
import Appointment from "./pages/patient/appointment/Appointment";
import MatronLayout from "./components/layouts/MatronLayout";
import NurseHelpCenter from "./pages/nurse/HelpCenter/NurseHelpCenter";

// Public / Business
const Second = lazy(() => import("./pages/business/second"));
const AboutUs = lazy(() => import("./pages/business/AboutUs"));
const Team = lazy(() => import("./pages/business/Team"));
const Services = lazy(() => import("./pages/business/Services"));
const Faq = lazy(() => import("./pages/business/Faq"));
const Contact = lazy(() => import("./pages/business/ContactUs"));
// Patient
const Login = lazy(() => import("./pages/patient/auth/Login"));
const Register = lazy(() => import("./pages/patient/auth/Register"));
const EmailVerification = lazy(() => import("./pages/patient/auth/EmailVerification"));
const Onboarding = lazy(() => import("./pages/patient/onboarding/Onboarding"));

// const Appointment = lazy(() => import("./pages/patient/appointment/Appointment"));
const DashboardHome = lazy(() => import("./pages/patient/dashboard/DashboardHome"));
const Consultaion = lazy(() => import("./pages/patient/consultation/Consultaion"));
const ConsultationView = lazy(() => import("./pages/patient/consultation/ConsultationView"));
const Prescriptions = lazy(() => import("./pages/patient/prescriptions/Prescriptions"));
const Lab = lazy(() => import("./pages/patient/lab/Lab"));
const LabDetails = lazy(() => import("./pages/patient/lab/LabDetails"));
const Profile = lazy(() => import("./pages/patient/profile/Profile"));
const Order = lazy(() => import("./pages/patient/order/PatientOrder"));
const PrescriptionOrderDetails = lazy(() => import("./pages/patient/order/PatientOrderDetails"));
const MedicalHistory = lazy(() => import("./pages/patient/medical/MedicalHistory"));
const PatientMedications = lazy(() => import("./pages/patient/pharmacy/PatientMedications"));
const PatientCheckout = lazy(() => import("./pages/patient/checkout/PatientCheckout"));
const PatientHelpCenter = lazy(() => import("./pages/patient/HelpCenter/PatientHelpCenter"));

// Doctor
const DoctorDashboard = lazy(() => import("./pages/doctor/dashboard/DoctorDashboard"));
const DoctorAppointments = lazy(() => import("./pages/doctor/appointments/DoctorAppointments"));
const DoctorAppointmentsView = lazy(() => import("./pages/doctor/appointments/DoctorAppointmentsDetails"));
const DoctorPatients = lazy(() => import("./pages/doctor/patients/DoctorPatients"));
const DoctorPatientsDetails = lazy(() => import("./pages/doctor/patients/DoctorPatientsDetails"));
const DoctorSchedule = lazy(() => import("./pages/doctor/Schedule/DoctorSchedule"));
const DoctorProfile = lazy(() => import("./pages/doctor/profile/DoctorProfile"));
const DoctorPrescriptions = lazy(() => import("./pages/doctor/prescriptions/DoctorPrescriptions"));
const DoctorOrder = lazy(() => import("./pages/doctor/order/DoctorLabOrder"));
const DoctorLabOrderDetails = lazy(() => import("./pages/doctor/order/DoctorLabOrderDetails"));
const DoctorAllPatients = lazy(() => import("./pages/doctor/allpatients/DoctorAllPatients"));
const DoctorAllPatientsDetails = lazy(() => import("./pages/doctor/allpatients/DoctorAllPatientsDetails"));
const DoctorHelpCenter = lazy(() => import("./pages/admin/HelpCenter/AdminHelpCenter")); // double-check this path
const DoctorProcedures = lazy(() => import("./pages/doctor/procedures/DoctorProcedures"));
const DoctorProcedureDetails = lazy(() => import("./pages/doctor/procedures/DoctorProcedureDetails"));
// Lab
const LabDashboard = lazy(() => import("./pages/lab/dashboard/LabDashboard"));
const LabTestRequests = lazy(() => import("./pages/lab/test/LabTestRequests"));
const LabTestRequestsDetails = lazy(() => import("./pages/lab/test/LabTestRequestsDetails"));
const LabProfile = lazy(() => import("./pages/lab/profile/LabProfile"));
const LabHelpCenter = lazy(() => import("./pages/lab/HelpCenter/LabHelpCenter"));

// Pharmacy
const PharmacyDashboard = lazy(() => import("./pages/pharmacy/dashboard/PharmacistDashboard"));
const PharmacyProfile = lazy(() => import("./pages/pharmacy/profile/PharmacistProfile"));
const PharmacyMedications = lazy(() => import("./pages/pharmacy/medications/PharmacistMedications"));
const PharmacyInventory = lazy(() => import("./pages/pharmacy/inventories/PharmacyInventory"));
const PharmacyInventorySummary = lazy(() => import("./pages/pharmacy/inventories/PharmacyInventorySummary"));
const PharmacyInventoryDetails = lazy(() => import("./pages/pharmacy/inventories/PharmacyInventoryDetails"));
const PharmacyInventoryMedication = lazy(() => import("./pages/pharmacy/inventories/PharmacyInventoryMedication"));
const PharmacyOrder = lazy(() => import("./pages/pharmacy/order/PharmacyOrder"));
const PharmacyOrderDetails = lazy(() => import("./pages/pharmacy/order/PharmacyOrderDetails"));
const PharmacyHelpCenter = lazy(() => import("./pages/pharmacy/HelpCenter/PharmacyHelpCenter"));

// Admin
const AdminLogin = lazy(() => import("./pages/admin/auth/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/dashboard/AdminDashboard"));
const AdminProfile = lazy(() => import("./pages/admin/profile/AdminProfile"));
const AdminLab = lazy(() => import("./pages/admin/lab/AdminLab"));
const AdminLabDetails = lazy(() => import("./pages/admin/lab/AdminLabDetails"));
const AdminDoctors = lazy(() => import("./pages/admin/doctors/AdminDoctors"));
const AdminDoctorsDetails = lazy(() => import("./pages/admin/doctors/AdminDoctorsDetails"));
const AdminDoctorsStats = lazy(() => import("./pages/admin/doctors/AdminDoctorsStats"));
const AdminDoctorsSpecialties = lazy(() => import("./pages/admin/doctors/AdminDoctorsSpecialties"));
const AdminPharmacists = lazy(() => import("./pages/admin/pharmacists/AdminPharmacists"));
const AdminPharmacistsDetails = lazy(() => import("./pages/admin/pharmacists/AdminPharmacistsDetails"));
const AdminMedications = lazy(() => import("./pages/admin/medications/AdminMedications"));
const AdminInventory = lazy(() => import("./pages/admin/inventories/AdminInventory"));
const AdminInventoryLogs = lazy(() => import("./pages/admin/inventories/AdminInventoryLogs"));
const AdminInventorySummary = lazy(() => import("./pages/admin/inventories/AdminInventorySummary"));
const AdminInventoryDetails = lazy(() => import("./pages/admin/inventories/AdminInventoryDetails"));
const AdminInventoryMedication = lazy(() => import("./pages/admin/inventories/AdminInventoryMedication"));
const AdminOrder = lazy(() => import("./pages/admin/order/AdminOrder"));
const AdminOrderDetails = lazy(() => import("./pages/admin/order/AdminOrderDetails"));
// const AdminUsers = lazy(() => import("./pages/admin/users/AdminUser"));
const AdminUserDetails = lazy(() => import("./pages/admin/users/AdminUserDetails"));
const AdminPatients = lazy(() => import("./pages/admin/patients/AdminPatients"));
const AdminPatientDetails = lazy(() => import("./pages/admin/patients/AdminPatientsDetails"));
const AdminPatientStats = lazy(() => import("./pages/admin/patients/AdminPatientStats"));
const AdminHelpCenter = lazy(() => import("./pages/admin/HelpCenter/AdminHelpCenter"));
const AdminNurses = lazy(() => import("./pages/admin/nurses/AdminNurses"));
const AdminNursesDetails = lazy(() => import("./pages/admin/nurses/AdminNurseDetails"));
const NurseVitals = lazy(() => import("./pages/nurse/vitals/NurseVitals")); 
const NurseVitalsDetails = lazy(() => import("./pages/nurse/vitals/NurseVitalsDetails")); 
const AdminProcedures = lazy(() => import("./pages/admin/procedures/AdminProcedure"));
const AdminProceduresDetails = lazy(() => import("./pages/admin/procedures/AdminProcedureDetails"));
const NurseProcedures = lazy(() => import("./pages/nurse/procedures/NursesProcedure"));
const NurseProceduresDetails = lazy(() => import("./pages/nurse/procedures/NursesProcedureDetails"));

// Super Admin
const SuperAdminAdmins = lazy(() => import("./pages/admin/superadmin/admins/SuperAdminAdmins"));
const SuperAdminAdminsDetails = lazy(() => import("./pages/admin/superadmin/admins/SuperAdminAdminsDetails"));

// Nurse
const NurseDashboard = lazy(() => import("./pages/nurse/dashboard/NurseDashboard"));
const NurseProfile = lazy(() => import("./pages/nurse/profile/NurseProfile"));
const NurseReports = lazy(() => import("./pages/nurse/reports/NurseReport"));
const NurseReportsDetails = lazy(() => import("./pages/nurse/reports/NurseReportDetails"));
const NurseReportsCreateEdit = lazy(() => import("./pages/nurse/reports/NurseReportCreateEdit"));
const NursePatient = lazy(() => import("./pages/nurse/patients/NursesPatients"));
const NursePatientDetails = lazy(() => import("./pages/nurse/patients/NursesPatientsDetails"));
// Business
const Home = lazy(() => import("./pages/business/Home"));

function App() {
  return (
    <Suspense fallback={<div className="flex flex-col items-center justify-center min-h-screen bg-white ">
      <p className="text-primary text-lg md:text-2xl font-medium tracking-wide animate-pulse">
        {website?.name}
      </p>
    </div>}>
    <Routes>
      <Route path="/" element={<BusinessLayout />} >
      <Route path="/" element={<Home />} />
      <Route  path="/about" element={<AboutUs />} />
      <Route path="/team/:memberName" element={<Team />} />
      <Route path="/services/:category" element={<Services />} />
       <Route path="/second" element={<Second />} />
       <Route path="/faq" element={<Faq />} />
       <Route path="/Contact" element={<Contact />} />
       </Route>
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
        <Route path={routeLinks?.doctor?.procedures} element={<DoctorProcedures />} />
        <Route path={routeLinks?.doctor?.proceduresDetails} element={<DoctorProcedureDetails />} />
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
      
      {/* Nurse Routes */}
      <Route path={routeLinks.nurse.path} element={<NurseLayout />}>
        <Route index element={<Navigate to={routeLinks.nurse.dashboard} replace />} />
        <Route path={routeLinks.nurse.dashboard} element={<NurseDashboard />} />
        <Route path={routeLinks.nurse.profile} element={<NurseProfile />} />
        <Route path={routeLinks?.nurse?.reports} element={<NurseReports />} />
        <Route path={routeLinks?.nurse?.reportsDetails} element={<NurseReportsDetails />} />
        <Route path={routeLinks.nurse.vitals} element={<NurseVitals />} />
        <Route path={routeLinks.nurse.vitalsDetails} element={<NurseVitalsDetails />} />
        <Route path={routeLinks.nurse.procedures} element={<NurseProcedures />} />
        <Route path={routeLinks.nurse.proceduresDetails} element={<NurseProceduresDetails />} />
        <Route path={routeLinks.nurse.reportsAdd} element={<NurseReportsCreateEdit />}/>
         <Route path={routeLinks.nurse.reportsEdit} element={<NurseReportsCreateEdit />}/>
         <Route path={routeLinks.nurse.patient} element={<NursePatient />} />
          <Route path={routeLinks.nurse.patientDetails} element={<NursePatientDetails />} />
        <Route path={routeLinks.nurse.helpCenter} element={<NurseHelpCenter />} />
      </Route>

            {/* Matron Routes */}
      <Route path={routeLinks.matron.path} element={<MatronLayout />}>
        <Route index element={<Navigate to={routeLinks.matron.dashboard} replace />} />
        <Route path={routeLinks.matron.dashboard} element={<NurseDashboard />} />
        <Route path={routeLinks.matron.profile} element={<NurseProfile />} />
        <Route path={routeLinks?.matron?.reports} element={<NurseReports />} />
        <Route path={routeLinks?.matron?.reportsDetails} element={<NurseReportsDetails />} />
        <Route path={routeLinks.matron.vitals} element={<NurseVitals />} />
        <Route path={routeLinks.matron.vitalsDetails} element={<NurseVitalsDetails />} />
        <Route path={routeLinks.matron.procedures} element={<NurseProcedures />} />
        <Route path={routeLinks.matron.proceduresDetails} element={<NurseProceduresDetails />} />
                <Route path={routeLinks.matron.reportsAdd} element={<NurseReportsCreateEdit />}/>
         <Route path={routeLinks.matron.reportsEdit} element={<NurseReportsCreateEdit />}/>
          <Route path={routeLinks.matron.patient} element={<NursePatient />} />
          <Route path={routeLinks.matron.patientDetails} element={<NursePatientDetails />} />
            <Route path={routeLinks.matron.helpCenter} element={<NurseHelpCenter />} />
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
        <Route path={routeLinks.admin.nurses} element={<AdminNurses />} />
        <Route path={routeLinks.admin.nurseDetails} element={<AdminNursesDetails />} />
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
        {/* <Route path={routeLinks.admin.vitals} element={<AdminVitals />} />
        <Route path={routeLinks.admin.vitalDetails} element={<AdminVitalsDetails />} /> */}
        <Route path={routeLinks?.admin?.procedures} element={<AdminProcedures />} />
        <Route path={routeLinks?.admin?.proceduresDetails} element={<AdminProceduresDetails />} />
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
        <Route path={routeLinks.superAdmin.nurses} element={<AdminNurses />} />
        <Route path={routeLinks.superAdmin.nurseDetails} element={<AdminNursesDetails />} />
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
        {/* <Route path={routeLinks.superAdmin.vitals} element={<AdminVitals />} />
        <Route path={routeLinks.superAdmin.vitalDetails} element={<AdminVitalsDetails />} /> */}
        <Route path={routeLinks?.superAdmin?.procedures} element={<AdminProcedures />} />
        <Route path={routeLinks?.superAdmin?.proceduresDetails} element={<AdminProceduresDetails />} />
      </Route>

      {/* Catch all unmatched routes */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
    </Suspense>

  );
}

export default App;
