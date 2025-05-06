const routeLinks = {
  auth: {
    path:'/auth',
    login: '/auth/login',
    register: '/auth/register',
  },
  patient: {
    path:'/patient',
    lab:'/patient/lab',
    orders:'/patient/orders',
    profile: '/patient/profile',
    pharmacy:'/patient/pharmacy',
    dashboard: '/patient/dashboard',
    onboarding:'/patient/onboarding',
    appointment:'/patient/appointment-booking',
    consultations: '/patient/consultations',
    prescription:'/patient/prescription',
    medicalHistory:'/patient/medical-history'

  },
  doctor: {
    path:'/doctor',
    patients:'/doctor/patients',
    profile:'/doctor/profile-management',
    dashboard:'/doctor/dashboard',
    schedule:'/doctor/schedule',
    appointment:'/doctor/appointment',
    appointmentView : '/doctor/appointment/:id',
    patientView : '/doctor/patient/:id',
}

}

export default routeLinks