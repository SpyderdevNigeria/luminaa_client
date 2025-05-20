/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./apiConfig";

const ProfileApi = {
  getProfile: async () => {
    const response = await api.get("/users/profile");
    return response.data;
  },

  completeMemberProfile: async (body: any) => {
    const response = await api.post("/profile/complete-member", body);
    return response.data;
  },

  updateProfile: async (body: any) => {
    const response = await api.put("/profile", body);
    return response.data;
  },

  updateBio: async (body: any) => {
    const response = await api.put("/patients/biodata", body);
    return response.data;
  },

  getPartner: async () => {
    const response = await api.get("/profile/partner");
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
}

export default ProfileApi;