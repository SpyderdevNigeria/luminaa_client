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

    updateProfile: async (body: any) => {
    const response = await api.put("/doctors/profile", body);
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

    finishConsultation: async (id: any) => {
    const response = await api.post(`/doctor/appointments/${id}/complete`);
    return response.data;
  },

  //Appointment endpoints end 


  // Diagnoses endpoints 
  getDiagnoses: async (query: any) => {
    const response = await api.get(`/doctor/diagnoses${query}`);
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


  // Prescriptions endpoints 
  getPrescriptions: async (query:any) => {
    const response = await api.get(`/doctor/prescriptions${query}`);
    return response.data;
  },
   getPrescriptionsById: async (id: any) => {
    const response = await api.get(`/doctor/prescriptions${id}}`);
    return response.data;
  },

  getPrescriptionsAppointmentbyId: async (id: any) => {
    const response = await api.get(`/doctor/prescriptions/appointment/${id}`);  
    return response.data;
  },

  createPrescriptions: async (body: any) => {
    const response = await api.post("/doctor/prescriptions", body);
    return response.data;
  },

  updatePrescriptions: async (id: string, body: any) => {
    const response = await api.patch(`/doctor/prescriptions/${id}`, body);
    return response.data;
  },

  deletePrescriptions: async (id: string) => {
    const response = await api.delete(`/doctor/prescriptions/${id}`);
    return response.data;
  },

  // Prescriptions endpoints end


  // Lab Orders
    getLabOrders: async (query:any) => {
    const response = await api.get(`/doctor/lab-orders${query}`);
    return response.data;
  },
   getLabOrderById: async (id: any) => {
    const response = await api.get(`/doctor/lab-orders/${id}`);
    return response.data;
  },

  getLabOrdersAppointmentbyId: async (id: any) => {
    const response = await api.get(`/doctor/lab-orders/appointment/${id}`);  
    return response.data;
  },

  createLabOrder: async (body: any) => {
    const response = await api.post("/doctor/lab-orders", body);
    return response.data;
  },

  updateLabOrder: async (id: string, body: any) => {
    const response = await api.patch(`/doctor/lab-orders/${id}`, body);
    return response.data;
  },

  deleteLabOrder: async (id: string) => {
    const response = await api.delete(`/doctor/lab-orders/${id}`);
    return response.data;
  },

  // Lab Order endpoint end


      getMedications: async (query:any) => {
    const response = await api.get(`/doctor/medications${query}`);
    return response.data;
  },

    getUsers: async (query: any) => {
    const response = await api.get(`/doctor/appointments/patients${query}`);
    return response.data;
  },
    getUserById: async (id: any) => {
    const response = await api.get(`/doctor/appointments/patients/${id}`);
    return response.data;
  },

      getPatients: async (query: any) => {
    const response = await api.get(`/doctor/patients${query}`);
    return response.data;
  },

    getPatientsCompleteProfileById: async (id: any) => {
    const response = await api.get(`/doctor/patients/${id}/complete-profile`);
    return response.data;
  },

      getPatientsAppointmentById: async (id: any) => {
    const response = await api.get(`/doctor/patients/${id}/appointments`);
    return response.data;
  },
      getPatientsPrescriptionById: async (id: any) => {
    const response = await api.get(`/doctor/patients/${id}/prescriptions`);
    return response.data;
  },

        getPatientsDiagnosesById: async (id: any) => {
    const response = await api.get(`/doctor/patients/${id}/diagnoses`);
    return response.data;
  },

          getPatientsAttendingDoctorById: async (id: any) => {
    const response = await api.get(`/doctor/patients/${id}/attending-doctors`);
    return response.data;
  },
}

export default DoctorApi;