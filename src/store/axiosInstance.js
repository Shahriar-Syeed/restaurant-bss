import axios from "axios";

export const api = axios.create({
  baseURL: "https://restaurantapi.bssoln.com/api/",
});

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    console.log(config);
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
          "https://restaurantapi.bssoln.com/api/Auth/refreshToken",
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
        throw refreshError;
      }
    }

    return Promise.reject(error);
  }
);
