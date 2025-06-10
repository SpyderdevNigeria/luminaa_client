import axios from "axios";

const API_URL_RAW =
  import.meta.env.VITE_APP_API_URL_RAW ?? "";

const api = axios.create({
  baseURL: `${API_URL_RAW}/`,
  withCredentials: true,
});

// Request Interceptor: Add token
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

// Response Interceptor: Handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // || error.response.status === 403
    if (error.response && error.response.status === 401 ) {
      // Remove token
      localStorage.removeItem("token");
      localStorage.removeItem("hms_user");
      // Redirect to home
      // window.location.href = "/unauthorized-access";
    }
    return Promise.reject(error);
  }
);

export default api;
