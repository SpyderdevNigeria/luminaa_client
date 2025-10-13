/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./apiConfig";

const NurseApi = {
  getProfile: async () => {
    const response = await api.get("/nurse/profile");
    return response.data;
  },

  
  updateProfilePicture: async (body: any) => {
    const response = await api.post("/users/update-profile-picture", body);
    return response.data;
  },

    updateProfile: async (body: any) => {
    const response = await api.put("/nurse/profile", body);
    return response.data;
  },
    uploadDocument: async (body: any) => {
    const response = await api.post("/nurse/upload-document", body);
    return response.data;
  },


}

export default NurseApi;