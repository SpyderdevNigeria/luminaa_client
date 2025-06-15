import api from "./apiConfig";

const PharmacistApi = {
getProfile: async () => {
    const response = await api.get("/pharmacists");
    return response.data;
  },

    updateProfile: async (data: any | undefined) => {
    const response = await api.put("/pharmacists/profile", data);
    return response.data;

  },

        getMedications: async (query:any) => {
    const response = await api.get(`/pharmacist/medications${query}`);
    return response.data;
  },
}

export default PharmacistApi;