import axios from "axios";

const API_URL_RAW = import.meta.env.VITE_APP_API_URL_RAW ?? "";

const api = axios.create({
  baseURL: `${API_URL_RAW}/`,
  withCredentials: true, // Needed if refreshToken is in HttpOnly cookie
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

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Response Interceptor: Handle 401 and refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["authorization"] = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch(Promise.reject);
      }

      isRefreshing = true;
      const refreshToken = localStorage.getItem("refreshToken");
      try {
        const response = await axios.post(
          `${API_URL_RAW}/auth/refresh-token`,
          {refreshToken},
          { withCredentials: true } // If refreshToken is in HttpOnly cookie
        );

        const { accessToken, refreshToken: newRefreshToken } = response.data?.data;
        localStorage.setItem("token", accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);
        processQueue(null, accessToken);

        originalRequest.headers["authorization"] = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        localStorage.removeItem("token");
        localStorage.removeItem("hms_user");
        // window.location.href = "/unauthorized-access";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
