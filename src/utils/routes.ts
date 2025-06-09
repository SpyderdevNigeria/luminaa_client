
const routeLinks = {
  auth: {
    path:'/auth',
    login: '/auth/login',
    register: '/auth/register',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
    emailVerification: '/auth/email-verification',
    updatePassword: '/auth/update-password',
    partnerAuth: '/auth/partner',
    partnerLogin: '/auth/partner/login',
    partnerEmailVerification: '/auth/partner/email-verification',
    adminAuth: '/auth/admin',
    adminLogin: '/auth/admin/login',
  },
  patient: {
    path:'/patient',
    lab:'/patient/lab',
    orders:'/patient/orders',
    orderDetails:'/patient/orders/:id',
    profile: '/patient/profile',
    pharmacy:'/patient/pharmacy',
    dashboard: '/patient/dashboard',
    onboarding:'/patient/onboarding',
    appointment:'/patient/appointment-booking',
    consultations: '/patient/consultations',
     consultationsid: '/patient/consultations/:id',
    prescription:'/patient/prescription',
    medicalHistory:'/patient/medical-history'

  },
  doctor: {
    path:'/doctor',
    patients:'/doctor/patients',
    profile:'/doctor/profile-management',
    dashboard:'/doctor/dashboard',
    schedule:'/doctor/schedule',
    appointment:'/doctor/appointments',
    prescription:'/doctor/prescriptions',
    labOrders:'/doctor/lab-orders',
    labOrdersDetails:'/doctor/lab-orders/:id',
    appointmentView : '/doctor/appointments/:id',
    patientView : '/doctor/patients/:id',
},

lab: { 
    path:'/lab',
    dashboard: '/lab/dashboard',
    labRequests: '/lab/requests',  
    labRequestsDetails: '/lab/requests/:id', 
    profile: '/lab/profile',
},

admin: {
  path:'/admin',
  dashboard: '/admin/dashboard',
  patients: '/admin/patients',
  userDetails: '/admin/patients/:id',
  appointments: '/admin/appointments',
  appointmentDetails: '/admin/appointments/:id',
  profile: '/admin/profile',
  settings: '/admin/settings',
  notifications: '/admin/notifications',
  reports: '/admin/reports',
  lab: '/admin/lab',
  labDetails: '/admin/lab/:id',
  pharmacyRequests: '/admin/pharmacy-requests',
  pharmacyRequestsDetails: '/admin/pharmacy-requests/:id',
  consultations: '/admin/consultations',
  consultationsDetails: '/admin/consultations/:id',
  doctors: '/admin/doctors',
  doctorDetails: '/admin/doctors/:id',
}
}

export default routeLinks