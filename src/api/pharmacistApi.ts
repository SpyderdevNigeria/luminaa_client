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

  getMedications: async (query: any) => {
    const response = await api.get(`/pharmacist/medications${query}`);
    return response.data;
  },

  getInventory: async (query: any) => {
    const response = await api.get(`/pharmacist/inventory${query}`);
    return response.data;
  },

  getInventorySummary: async (query: any) => {
    const response = await api.get(`/pharmacist/inventory/summary${query}`);
    return response.data;
  },
  getInventoryByMedicationId: async (id: any, query: any) => {
    const response = await api.get(`/pharmacist/inventory/medication/${id}${query}`);
    return response.data;
  },
  getInventoryById: async (id: any) => {
    const response = await api.get(`/pharmacist/inventory/${id}`);
    return response.data;
  },


     getPrescriptionOrders: async (query:any) => {
    const response = await api.get(`/pharmacy/orders${query}`);
    return response.data;
  },
      getPrescriptionOrderById: async (id: any) => {
    const response = await api.get(`/pharmacy/orders/${id}`);
    return response.data;
  },
  updatePrescriptionOrderStatus: async (id: any, body:any) => {
    const response = await api.get(`/pharmacy/orders/${id}/status`, body);
    return response.data;
  },
};

export default PharmacistApi;
