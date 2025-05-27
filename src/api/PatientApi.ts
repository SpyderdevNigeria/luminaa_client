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
  
  getDoctors: async () => {
    const response = await api.get("/admin/doctors");
    return response.data;
  },


  uploadPhoto: async (file: any) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/profile/photo", formData);
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

    getAppointments: async () => {
    const response = await api.get("/patient/appointments");
    return response.data;
  },

      getAppointmentsById: async (id: any) => {
    const response = await api.get(`/patient/appointments/${id}`);
    return response.data;
  },
}

export default PatientApi;