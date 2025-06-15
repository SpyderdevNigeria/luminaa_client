import api from "./apiConfig";

const SuperAdminApi = {
  getProfile: async () => {
    const response = await api.get("/users/profile");
    return response.data;
  },

  
  updateProfilePicture: async (body: any) => {
    const response = await api.post("/users/update-profile-picture", body);
    return response.data;
  },

    getAdmins: async (query:any) => {
    const response = await api.get(`/super-admin/admins${query}`);
    return response.data;
  },

     getAdminsStats: async () => {
    const response = await api.get(`/super-admin/admins/stats`);
    return response.data;
  },

    createAdmin: async (body:any) => {
    const response = await api.post(`/super-admin/admins`, body);
    return response.data;
  },
     updateAdmin: async (id:string, body:any) => {
    const response = await api.put(`/super-admin/admins/${id}`, body);
    return response.data;
  },
    getAdminById: async (id:string) => {
    const response = await api.get(`/super-admin/admins/${id}`);
    return response.data;
  },
  updateAdminRole: async (id:string, body:any) => {
    const response = await api.put(`/super-admin/admins/${id}/role`, body);
    return response.data;
  },
    deleteAdmin: async (id:string) => {
    const response = await api.delete(`/super-admin/admins/${id}`);
    return response.data;
  },
}

export default SuperAdminApi;