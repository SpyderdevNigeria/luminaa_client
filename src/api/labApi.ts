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
 
    // Lab Orders
    getLabOrders: async (query:any) => {
    const response = await api.get(`/lab-tech/lab-tests/orders${query}`);
    return response.data;
  },
   getLabOrderById: async (id: any) => {
    const response = await api.get(`/lab-tech/lab-tests/orders/${id}`);
    return response.data;
  },
     updateLabOrderStatus: async (id: any) => {
    const response = await api.patch(`/lab-tech/lab-tests/orders/${id}/status`);
    return response.data;
  },

  createLabOrderResult: async (id: any, body:any) => {
    const response = await api.post(`/lab-tech/lab-tests/orders/${id}/results`, body);
    return response.data;
  },

    getLabOrderResultById: async (id: any) => {
    const response = await api.get(`/lab-tech/lab-tests/results/${id}`);
    return response.data;
  },

  updateLabOrderResultById: async (id: any, body:any) => {
    const response = await api.patch(`/lab-tech/lab-tests/result/${id}`, body);
    return response.data;
  },

  getLabOrderResultByOrderId: async (id: any) => {
    const response = await api.get(`/lab-tech/lab-tests/results/order/${id}`);
    return response.data;
  },

  createLabOrderDocuments: async (id: any, body:any) => {
    const response = await api.post(`/lab-tech/lab-tests/results/${id}/documents`, body);
    return response.data;
  },

    deleteLabOrderDocumentById: async (resultId: string, documentId:string) => {
    const response = await api.delete(`/lab-tech/lab-tests/results/${resultId}/documents/${documentId}`);
    return response.data;
  },

   updateSampleCollection: async (id: any, body:any) => {
    const response = await api.patch(`/lab-tech/lab-tests/orders/${id}/sample-info`, body);
    return response.data;
  },
   // Lab Order endpoint end
}

export default LabApi;