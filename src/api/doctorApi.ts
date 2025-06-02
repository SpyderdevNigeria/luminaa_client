/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosRequestConfig } from "axios";
import api from "./apiConfig";

const DoctorApi = {
  getProfile: async () => {
    const response = await api.get("/doctors");
    return response.data;
  },

  
  updateProfilePicture: async (body: any) => {
    const response = await api.post("/users/update-profile-picture", body);
    return response.data;
  },


  // Avaliablility Endpoints 

    createAvailability: async (body: any) => {
    const response = await api.post("/doctors/availability", body);
    return response.data;
  },

   getAvailability: async () => {
    const response = await api.get("/doctors/availability");
    return response.data;
  },

     getAvailabilityException: async () => {
    const response = await api.get("/doctors/availability-expection");
    return response.data;
  },
  updateAvailability: async (data: AxiosRequestConfig<any> | undefined) => {
    const response = await api.put("/doctors/availability", data);
    return response.data;

  },

  updateAvailabilityException: async (data: AxiosRequestConfig<any> | undefined) => {
    const response = await api.put("/doctors/availability-expection", data);
    return response.data;
  },

  deleteAvailability: async (id: any) => {
    const response = await api.post(`/doctors/availability/${id}`);
    return response.data;
  },


  // Appointment endpoints
    getAppointments: async (query:any) => {
    const response = await api.get(`/doctor/appointments${query}`);
    return response.data;
  },

      getAppointmentsById: async (id: any) => {
    const response = await api.get(`/doctor/appointments/${id}`);
    return response.data;
  },

  //Appointment endpoints end 


  // Diagnoses endpoints 
  getDiagnoses: async () => {
    const response = await api.get("/doctor/diagnoses");
    return response.data;
  },
   getDiagnosesById: async (id: any) => {
    const response = await api.get(`/doctor/diagnoses${id}}`);
    return response.data;
  },

  getDiagnosesAppointmentbyId: async (id: any) => {
    const response = await api.get(`/doctor/diagnoses/appointment/${id}`);  
    return response.data;
  },

  createDiagnosis: async (body: any) => {
    const response = await api.post("/doctor/diagnoses", body);
    return response.data;
  },

  updateDiagnosis: async (id: string, body: any) => {
    const response = await api.patch(`/doctor/diagnoses/${id}`, body);
    return response.data;
  },

  deleteDiagnosis: async (id: string) => {
    const response = await api.delete(`/doctor/diagnoses/${id}`);
    return response.data;
  },

  // Diagnoses endpoints end

}

export default DoctorApi;