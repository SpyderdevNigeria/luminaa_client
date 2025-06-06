/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./apiConfig";

const LabApi = {
  getProfile: async () => {
    const response = await api.get("/lab-techs");
    return response.data;
  },
    updateProfile: async (data: any | undefined) => {
    const response = await api.put("/lab-techs/profile", data);
    return response.data;

  },
}

export default LabApi;