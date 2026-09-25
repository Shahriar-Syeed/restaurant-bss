import axios from "axios";
// import { redirect } from "react-router-dom";
import apiUrl from "../apiUrl/ApiUrl.jsx";

export const api = axios.create({
  baseURL: apiUrl.baseApi,
});

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    console.log(config, 'config');
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await axios.post(
          `/Auth/refreshToken`,
          {
            refreshToken: sessionStorage.getItem("refreshToken"),
          }
        );

        if (refreshResponse.status === 200) {
          const newToken = "Bearer " + refreshResponse.data.accessToken;
          const newRefreshToken = refreshResponse.data.refreshToken;

          sessionStorage.setItem("token", newToken);
          sessionStorage.setItem("refreshToken", newRefreshToken);

          originalRequest.headers.Authorization = newToken;

          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error("Token refresh failed", refreshError);
        window.location.href = '/login'; 
        throw refreshError;
      }
    }

    return Promise.reject(error);
  }
);
