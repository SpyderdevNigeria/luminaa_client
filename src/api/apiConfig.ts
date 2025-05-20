import axios from "axios";

const API_URL_RAW =
  import.meta.env.VITE_APP_API_URL_RAW ??
  "";

const api = axios.create({
  baseURL: `${API_URL_RAW}/`,
});

api.defaults.withCredentials = true;

// add token to request header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
