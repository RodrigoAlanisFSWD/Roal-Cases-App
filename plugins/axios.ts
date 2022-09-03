import axios from "axios";
import { AuthRepository } from "../repo/authRepository";
import * as jwt from "jsonwebtoken";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

api.interceptors.request.use(
  async (config) => {
    const authRepo = new AuthRepository();

    const tokens = authRepo.getTokens();

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
    console.log(error);
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      error.config.url != "/auth/refresh"
    ) {
      originalRequest._retry = true;
      const authRepo = new AuthRepository();

      const newTokens = await authRepo.refreshToken();
      console.log(newTokens);
      originalRequest.headers["Authorization"] =
        "Bearer " + newTokens.access_token;
      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default api;
