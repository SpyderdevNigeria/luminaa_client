/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosRequestConfig } from "axios";
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


  // Avaliablility Endpoints 

    createAvailability: async (body: any) => {
    const response = await api.post("/doctors/availability", body);
    return response.data;
//       request body
//       {
//   "date": "2024-12-25",
//   "startTime": "09:00",
//   "endTime": "17:00",
//   "allDay": false,
//   "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
// }

  },

   getAvailability: async () => {
    const response = await api.get("/doctors/availability");
    return response.data;
//     response BiBody[
//   {
//     "dayOfWeek": "Monday",
//     "startTime": "09:00",
//     "endTime": "17:00",
//     "allDay": false
//   }
// ]
  },

     getAvailabilityException: async () => {
    const response = await api.get("/doctors/availability-expection");
    return response.data;
//     response BiBody[
//   {
//     "dayOfWeek": "Monday",
//     "startTime": "09:00",
//     "endTime": "17:00",
//     "allDay": false
//   }
// ]
  },
  updateAvailability: async (data: AxiosRequestConfig<any> | undefined) => {
    const response = await api.put("/doctors/availability", data);
    return response.data;
//     request BiBody
//     [
//   {
//     "dayOfWeek": "Monday",
//     "startTime": "09:00",
//     "endTime": "17:00",
//     "allDay": false
//   }
// ]

  },

  updateAvailabilityException: async (data: AxiosRequestConfig<any> | undefined) => {
    const response = await api.put("/doctors/availability-expection", data);
    return response.data;
//     request BiBody[
//   {
//     "date": "2024-12-25",
//     "startTime": "09:00",
//     "endTime": "17:00",
//     "allDay": false,
//     "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
//   }
// ]
  },

  deleteAvailability: async (id: any) => {
    const response = await api.post(`/doctors/availability/${id}`);
    return response.data;
  },

    getAppointments: async () => {
    const response = await api.get("/doctor/appointments");
    return response.data;
  },

      getAppointmentsById: async (id: any) => {
    const response = await api.get(`/doctor/appointments/${id}`);
    return response.data;
  },

}

export default DoctorApi;