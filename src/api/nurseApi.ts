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

 getReports: async (params: {
    page?: number;
    limit?: number;
    reportType?: string | null;
    nurseId?: string | null;
    month?: string | null;
    startDate?: string | null;
    endDate?: string | null;
    search?: string;
  }) => {
    const response = await api.get("/nurse/reports", { params });
    return response.data;
  },

   createReport: async (data: {
    reportType: string;
    content: string;
    month: string;
  }) => {
    const response = await api.post("/nurse/reports", data);
    return response.data;
  },

  updateReport: async (
    id: string,
    data: { reportType: string; content: string; month: string }
  ) => {
    const response = await api.put(`/nurse/reports/${id}`, data);
    return response.data;
  },

  deleteReport: async (id: string) => {
    const response = await api.delete(`/nurse/reports/${id}`);
    return response.data;
  },
  getReportById: async (id: string) => {
    const response = await api.get(`/nurse/reports/${id}`);
    return response.data;
  },
}

export default NurseApi;