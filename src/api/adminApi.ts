import api from "./apiConfig";

const AdminApi = {
  getProfile: async () => {
    const response = await api.get("/admin/profile");
    return response.data;
  },

  updateProfile: async (data: any | undefined) => {
    const response = await api.put("/admin/profile", data);
    return response.data;
  },

  updateProfilePicture: async (body: any) => {
    const response = await api.post("/users/update-profile-picture", body);
    return response.data;
  },

  getUserById: async (id: any) => {
    const response = await api.get(`/admin/users/${id}`);
    return response.data;
  },

  getDoctorById: async (id: any) => {
    const response = await api.get(`/admin/doctors/${id}`);
    return response.data;
  },
  getLabById: async (id: any) => {
    const response = await api.get(`/admin/lab-techs/${id}`);
    return response.data;
  },
  getPharmacistById: async (id: any) => {
    const response = await api.get(`/admin/pharmacists/${id}`);
    return response.data;
  },

  toggleUserStatus: async (id: any, body: any) => {
    const response = await api.patch(`/admin/users/${id}/toggle-status`, body);
    return response.data;
  },
  getUsers:async (query: any) => {
    const response = await api.get(`/admin/users${query}`);
    return response.data;
  },
  getPatientById: async (id: any) => {
    const response = await api.get(`/admin/patients/${id}`);
    return response.data;
  },

  getPatientStats: async () => {
  const response = await api.get("/admin/patients/stats");
  return response.data.data;
},

  getPatients: async (query: any) => {
    const response = await api.get(`/admin/patients${query}`);
    return response.data;
  },
  createPatient: async (payload: any) => {
    const response = await api.post("/admin/patients", payload);
    return response.data;
  },
  uploadPatientsCSV: async (payload: any) => {
    const response = await api.post("/admin/patients/upload-csv", payload);
    return response.data;
  },
  updatePatient: async (id: string, payload: any) => {
    const response = await api.put(`/admin/patients/${id}`, payload);
    return response.data;
  },

  deletePatient: async (id: string) => {
    const response = await api.delete(`/admin/patients/${id}`);
    return response.data;
  },
  getDoctors: async (query: any) => {
    const response = await api.get(`/admin/doctors${query}`);
    return response.data;
  },
  createDoctors: async (body: any) => {
    const response = await api.post(`/admin/doctors`, body);
    return response.data;
  },
  updateDoctors: async (body: any) => {
    const response = await api.patch(`/admin/doctors`, body);
    return response.data;
  },
  getDoctorsStats: async () => {
  const response = await api.get("/admin/doctors/stats");
  return response.data.data;
},
  getDoctorsSpecialties: async () => {
  const response = await api.get("/admin/doctors/specialties/available");
  return response.data.data;
},

  getLabs: async (query: any) => {
    const response = await api.get(`/admin/lab-techs${query}`);
    return response.data;
  },

  createLabs: async (body: any) => {
    const response = await api.post(`/admin/lab-techs`, body);
    return response.data;
  },
  updateLabs: async (body: any) => {
    const response = await api.patch(`/admin/lab-techs`, body);
    return response.data;
  },
  deleteLabs: async (id: string) => {
    const response = await api.delete(`/admin/lab-techs/${id}`);
    return response.data;
  },

  getPharmacists: async (query: any) => {
    const response = await api.get(`/admin/pharmacists${query}`);
    return response.data;
  },

  createPharmacist: async (body: any) => {
    const response = await api.post(`/admin/pharmacists`, body);
    return response.data;
  },
  updatePharmacist: async (body: any) => {
    const response = await api.patch(`/admin/pharmacists`, body);
    return response.data;
  },
  deletePharmacist: async (id: string) => {
    const response = await api.delete(`/admin/pharmacists/${id}`);
    return response.data;
  },

  getMedications: async (query: any) => {
    const response = await api.get(`/admin/medications${query}`);
    return response.data;
  },

  createMedication: async (body: any) => {
    const response = await api.post(`/admin/medications`, body);
    return response.data;
  },
    uploadMedicationCSV: async (payload: any) => {
    const response = await api.post("/admin/medications/upload-csv", payload);
    return response.data;
  },
   createMedicationImage: async (id:string, body: any) => {
    const response = await api.post(`/admin/medications/${id}/upload-image`, body);
    return response.data;
  },
  updateMedication: async (id: string, body: any) => {
    const response = await api.put(`/admin/medications/${id}`, body);
    return response.data;
  },
  updateMedicationVisibility: async (id: string) => {
    const response = await api.patch(
      `/admin/medications/${id}/toggle-visibility`
    );
    return response.data;
  },
  updateMedicationStatus: async (id: string, body: string) => {
    const response = await api.patch(`/admin/medications/${id}/status`, body);
    return response.data;
  },
  deleteMedication: async (id: string) => {
    const response = await api.delete(`/admin/medications/${id}`);
    return response.data;
  },

  // Inventory

  getInventory: async (query: any) => {
    const response = await api.get(`/admin/inventory${query}`);
    return response.data;
  },

  getInventoryLogs: async (query: any) => {
    const response = await api.get(`/admin/inventory/logs${query}`);
    return response.data;
  },

  getInventorySummary: async (query: any) => {
    const response = await api.get(`/admin/inventory/summary${query}`);
    return response.data;
  },
  getInventoryByMedicationId: async (id: any, query: any) => {
    const response = await api.get(`/admin/inventory/medication/${id}${query}`);
    return response.data;
  },
  createInventory: async (body: any) => {
    const response = await api.post(`/admin/inventory`, body);
    return response.data;
  },

  getInventoryById: async (id: any) => {
    const response = await api.get(`/admin/inventory/${id}`);
    return response.data;
  },

  updateInventory: async (id: string, body: any) => {
    const response = await api.put(`/admin/inventory/${id}`, body);
    return response.data;
  },

  
   getPrescriptionOrders: async (query:any) => {
    const response = await api.get(`/admin/orders${query}`);
    return response.data;
  },
      getPrescriptionOrderById: async (id: any) => {
    const response = await api.get(`/admin/orders/${id}`);
    return response.data;
  },
  updatePrescriptionOrderStatus: async (id: any, body:any) => {
    const response = await api.patch(`/admin/orders/${id}/status`, body);
    return response.data;
  },

  //Nurses Enpoints 

  getNurses: async (query: any) => {
    const response = await api.get(`/admin/nurses${query}`);
    return response.data;
  },
  getNurseById: async (id: any) => {
    const response = await api.get(`/admin/nurses/${id}`);
    return response.data;
  }, 
  createNurses: async (body: any) => {
    const response = await api.post(`/admin/nurses`, body);
    return response.data;
  },
  updateNurses: async (id: string, body: any) => {
    const response = await api.put(`/admin/nurses/${id}`, body);
    return response.data;
  },
  deleteNurse: async (id: string) => {
    const response = await api.delete(`/admin/nurses/${id}`);
    return response.data;
  },
  updateNursesStatus: async (id: string, body: any) => {
    const response = await api.put(`/admin/nurses/${id}/status`, body );
    return response.data;
  },
  updateNursesMatronStatus: async (id: string, body: any) => {
    const response = await api.put(`/admin/nurses/${id}/matron-status`, body);
    return response.data;
  },


  // Procedures Endpoints 
   scheduleProcedure: async (id: string, scheduledDate: string) => {
    const response = await api.patch(`/admin/procedures/${id}/schedule`, {
      scheduledDate,
    });
    return response.data;
  },

  updateProcedurePayment: async (id: string, paymentStatus: string) => {
    const response = await api.patch(`/admin/procedures/${id}/payment-status`, {
      paymentStatus,
    });
    return response.data;
  },

  updateProcedureStatus: async (
    id: string,
    status: string,
    note?: string
  ) => {
    const response = await api.patch(`/admin/procedures/${id}/status`, {
      status,
      note,
    });
    return response.data;
  },

  uploadConsentForm: async (id: string, files: FileList, note?: string) => {
    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });
    if (note) formData.append("note", note);

    const response = await api.post(
      `/admin/procedures/${id}/consent-form`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  },

  //vitals 
  getVitals: async (filters: any) => {
  const response = await api.get("/admin/vitals/list", { params: filters });
  return response.data;
},

createVital: async (data: any) => {
  const response = await api.post("/admin/vitals/add", data);
  return response.data;
},

getVitalById: async (id: any) => {
  const response = await api.get(`/admin/vitals/${id}`);
  return response.data; 
},
updateVital: async (id: string, data: any) => {
  const response = await api.patch(`/admin/vitals/${id}`, data);
  return response.data;
},

deleteVital: async (id: string) => {
  const response = await api.delete(`/admin/vitals/${id}`);
  return response.data;
},
   getProcedures: async (options?: { params?: Record<string, any> }) => {
    const response = await  api.get("/admin/procedures", {
      params: options?.params || {}, 
    }); 
    return response.data;
  },
  getProcedureById: async (id: string) => {
  const response = await api.get(`/admin/procedures/${id}`);
  return response.data;
},

  verifyPaitentHmo: async (id: string, body: any) => {
    const response = await api.put(`/admin/patients/${id}/verify-hmo`, body);
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
    const response = await api.get("/admin/nurse-reports", { params });
    return response.data;
  },

  createProcedureReport: async (id: string, data: { procedureReport: string }) => {
  const response = await api.post(`/admin/procedures/${id}/procedure-report`, data);
  return response.data;
},


createProcedureResults: async (id: string, data: { procedureResults: {
  findings: string;
  recommendations: string;
  biopsyTaken: boolean;
  complications: string;
} }) => {
  const response = await api.post(`/admin/procedures/${id}/procedure-results`, data);
  return response.data;
},


uploadProcedureDocument: async (id: string, formData: FormData) => {
  const response = await api.post(`/admin/procedures/${id}/documents`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
},

getInputOutputById: async (id: string) => {
  const response = await api.get(`/admin/input-output/${id}`);
  return response.data;
},

deleteProcedureDocument: async (id: string, documentId: string) => {
  const response = await api.delete(`/admin/procedures/${id}/documents/${documentId}`);
  return response.data;
},

updateInputOutput: async (id: string, data: any) => {
  const response = await api.patch(`/admin/input-output/${id}`, data);
  return response.data;
},
getTotalInputOutput: async (filters: any) => {
  const response = await api.get("/admin/input-output/total", {
    params: filters,
  });
  return response.data;
},
createInputOutput: async (data: any) => {
  const response = await api.post("/admin/input-output/add", data);
  return response.data;
},
getInputOutputs: async (filters: any) => {
  const response = await api.get("/admin/input-output/list", { params: filters });
  return response.data;
},
  deleteInputOutput: async (id: string) => {
    const response = await api.delete(`/admin/input-output/${id}`);
    return response.data;
  },
};

export default AdminApi;
