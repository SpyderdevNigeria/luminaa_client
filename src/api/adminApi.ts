import api from "./apiConfig";

const AdminApi = {
  getProfile: async () => {
    const response = await api.get("/users/profile");
    return response.data;
  },

  
  updateProfilePicture: async (body: any) => {
    const response = await api.post("/users/update-profile-picture", body);
    return response.data;
  },

    getPatients: async (query:any) => {
    const response = await api.get(`/admin/patient${query}`);
    return response.data;
  },

    getDoctors: async (query:any) => {
    const response = await api.get(`/admin/doctors${query}`);
    return response.data;
  },
    createDoctors: async (body:any) => {
    const response = await api.post(`/admin/doctors`, body);
    return response.data;
  },
    updateDoctors: async (body:any) => {
    const response = await api.patch(`/admin/doctors`, body);
    return response.data;
  },

    getLabs: async (query:any) => {
    const response = await api.get(`/admin/lab-techs${query}`);
    return response.data;
  },

    createLabs: async (body:any) => {
    const response = await api.post(`/admin/lab-techs`, body);
    return response.data;
  },
     updateLabs: async (body:any) => {
    const response = await api.patch(`/admin/lab-techs`, body);
    return response.data;
  },
    deleteLabs: async (id:string) => {
    const response = await api.delete(`/admin/lab-techs/${id}`,);
    return response.data;
  },

      getPharmacists: async (query:any) => {
    const response = await api.get(`/admin/pharmacists${query}`);
    return response.data;
  },

    createPharmacist: async (body:any) => {
    const response = await api.post(`/admin/pharmacists`, body);
    return response.data;
  },
     updatePharmacist: async (body:any) => {
    const response = await api.patch(`/admin/pharmacists`, body);
    return response.data;
  },
    deletePharmacist: async (id:string) => {
    const response = await api.delete(`/admin/pharmacists/${id}`,);
    return response.data;
  },

    getMedications: async (query:any) => {
    const response = await api.get(`/admin/medications${query}`);
    return response.data;
  },

    createMedication: async (body:any) => {
    const response = await api.post(`/admin/medications`, body);
    return response.data;
  },
     updateMedication: async (id:string, body:any) => {
    const response = await api.put(`/admin/medications/${id}`, body);
    return response.data;
  },
  updateMedicationVisibility: async (id:string) => {
    const response = await api.patch(`/admin/medications/${id}/toggle-visibility`);
    return response.data;
  },
    updateMedicationStatus: async (id:string, body:string) => {
    const response = await api.patch(`/admin/medications/${id}/status`, body);
    return response.data;
  },
    deleteMedication: async (id:string) => {
    const response = await api.delete(`/admin/medications/${id}`);
    return response.data;
  },
}

export default AdminApi;