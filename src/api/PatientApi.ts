/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./apiConfig";

const PatientApi = {
  getProfile: async () => {
    const response = await api.get("/patients/profile");
    return response.data;
  },


  // Update Profile Endpoints Start
  updateMedicalHistory: async (body: any) => {
    const response = await api.put("/patients/medical-history", body);
    return response.data;
  },


  updateBio: async (body: any) => {
    const response = await api.put("/patients/biodata", body);
    return response.data;
  },

  updateProfilePicture: async (body: any) => {
    const response = await api.post("/users/update-profile-picture", body);
    return response.data;
  },
    // Update Profile Endpoints End


  getPartner: async () => {
    const response = await api.get("/profile/partner");
    return response.data;
  },
  
  getDoctors: async (query:any) => {
    const response = await api.get(`/patient/doctors${query}`);
    return response.data;
  },

    getDoctorsSpecialties: async () => {
  const response = await api.get("/patient/doctors/specialties/available");
  return response.data.data;
},

      getDoctorById: async (id: any) => {
    const response = await api.get(`/patient/doctors/${id}`);
    return response.data;
  },

  uploadPhoto: async (file: any) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/profile/photo", formData);
    return response.data;
  },
  uploadAppointmentDocuments: async (id: any, body: any) => {
    const response = await api.post(`/patient/appointments/${id}/documents`, body);
    return response.data;
  },
  deleteUploadAppointmentDocumentById: async (id: any, documentId: any) => {
    const response = await api.delete(`/patient/appointments/${id}/documents/${documentId}`);
    return response.data;
  },
  updateAddressOnly: async (body: any) => {
    const response = await api.put("/profile/address", body);
    return response.data;
  },


  // Appointment Endpoint 
   createAppointment: async (body: any) => {
    const response = await api.post("/patient/appointments", body);
    return response.data;
  },

    getAppointments: async (query: any) => {
    const response = await api.get(`/patient/appointments${query}`);
    return response.data;
  },

      getAppointmentsById: async (id: any) => {
    const response = await api.get(`/patient/appointments/${id}`);
    return response.data;
  },


    // Diagnoses endpoints 
  getDiagnoses: async (query: any) => {
    const response = await api.get(`/patient/diagnoses${query}`);
    return response.data;
  },
   getDiagnosesById: async (id: any) => {
    const response = await api.get(`/patient/diagnoses${id}}`);
    return response.data;
  },

  getDiagnosesAppointmentbyId: async (id: any) => {
    const response = await api.get(`/patient/diagnoses/appointment/${id}`);  
    return response.data;
  },

  // Diagnoses endpoints end


     // Prescriptions endpoints 
  getPrescriptions: async (query:any) => {
    const response = await api.get(`/patient/prescriptions${query}`);
    return response.data;
  },
   getPrescriptionsById: async (id: any) => {
    const response = await api.get(`/patient/prescriptions${id}}`);
    return response.data;
  },

  getPrescriptionsAppointmentbyId: async (id: any) => {
    const response = await api.get(`/patient/prescriptions/appointment/${id}`);  
    return response.data;
  },

   // Prescriptions endpoints end

       // Lab Orders
    getLabOrders: async (query:any) => {
    const response = await api.get(`/patient/lab-tests/orders${query}`);
    return response.data;
  },

     createLabOrder: async (body: any) => {
    const response = await api.post("/patient/lab-tests/orders", body);
    return response.data;
  },

     getLabOrderById: async (id: any) => {
    const response = await api.get(`/patient/lab-tests/orders/${id}`);
    return response.data;
  },

       getLabOrderResultByOrderId: async (id: any) => {
    const response = await api.get(`/patient/lab-tests/results/order/${id}`);
    return response.data;
  },

    getMedications: async (query: any) => {
    const response = await api.get(`/patient/medications${query}`);
    return response.data;
  },
  getMedicationsCheck: async (id: any) => {
    const response = await api.get(`/patient/medications/${id}/prescription-check`);
    return response.data;
  },

   getPrescriptionOrders: async (query:any) => {
    const response = await api.get(`/patient/orders${query}`);
    return response.data;
  },

  
  createPrescriptionOrderValidate: async (body: any) => {
    const response = await api.post("/patient/orders/validate", body);
    return response.data;
  },

  createPrescriptionOrder: async (body: any) => {
    const response = await api.post("/patient/orders", body);
    return response.data;
  },

     getPrescriptionOrderById: async (id: any) => {
    const response = await api.get(`/patient/orders/${id}`);
    return response.data;
  },
}

export default PatientApi;