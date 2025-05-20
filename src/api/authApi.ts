/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./apiConfig";

const AuthApi = {
  register: async (body: any) => {
    const response = await api.post("/auth/register", body);
    return response;
  },

  login: async (email: string, password: string) => {
    const response = await api.post("/auth/login", {
      email,
      password,
    });
    return response;
  },
  requestEmailOtp: async (email: string) => {
    const response = await api.post("/auth/email-verification/request-otp",{
        email,
    });
    return response;
  },
  verifyEmailOtp: async (email: string, otpCode: string) => {
    const response = await api.post("/auth/email-verification/verify", {
      email,
      otpCode,
    });
    return response;
  },
  initiateForgotPassword: async (email: string) => {
    const response = await api.post("/auth/forgot-password", {
      email,
    });
    return response;
  },
  resetPassword: async (body: any) => {
    const response = await api.post("/auth/reset-password", body);
    return response;
  },
  updatePassword: async (body: any) => {
    const response = await api.put("/auth/update-password", body);
    return response;
  },
};

export default AuthApi;
