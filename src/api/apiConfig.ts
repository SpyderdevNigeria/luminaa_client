import axios from "axios";

const API_URL_RAW =
  import.meta.env.VITE_APP_API_URL_RAW ??
  "";

const api = axios.create({
  baseURL: `${API_URL_RAW}/api`,
});

api.defaults.withCredentials = true;

export default api;
