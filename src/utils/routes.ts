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
    partnerEmailVerification: '/auth/partner/email-verification'
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
    patientView : '/doctor/patients/:id',
}

}

export default routeLinks