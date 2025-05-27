/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./apiConfig";

const DoctorApi = {
  getProfile: async () => {
    const response = await api.get("/users/profile");
    return response.data;
  },

  
  updateProfilePicture: async (body: any) => {
    const response = await api.post("/users/update-profile-picture", body);
    return response.data;
  },
}

export default DoctorApi;