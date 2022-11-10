import axios from "axios";
import { getTokens, logout, refreshToken, setTokens } from "../services/authService";
import { store } from "../redux/store"
import { authError, logoutUser } from "../redux/states/auth";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

api.interceptors.request.use(
  async (config) => {
    const tokens = getTokens();

    config.headers = {
      Authorization: `Bearer ${tokens.access_token}`,
      ...config.headers,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    console.log(error)
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      error.config.url != "/auth/refresh"
    ) {
      try {
        originalRequest._retry = true;

        const newTokens = await refreshToken();
        setTokens(newTokens)
        originalRequest.headers["Authorization"] =
          "Bearer " + newTokens.access_token;
        return api(originalRequest);
      } catch (error) {
          store.dispatch(logoutUser())
      }

    }
    return Promise.reject(error);
  }
);

export default api;
