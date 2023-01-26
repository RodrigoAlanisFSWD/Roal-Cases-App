import { AxiosError, AxiosRequestConfig } from "axios";
import { useRouter } from "next/router"
import { FC, useEffect } from "react"
import { useDispatch } from "react-redux";
import api from "../../interceptors/axios";
import { logoutUser } from "../../redux/states/auth";
import { getTokens, refreshToken, setTokens } from "../../services/authService";

export const AxiosInterceptor: FC<any> = ({ children }) => {
  const router = useRouter()

  const dispatch = useDispatch()

  api.interceptors.request.use(async (config: AxiosRequestConfig) => {
    const tokens = getTokens();

    config.headers = {
      Authorization: `Bearer ${tokens.access_token}`,
      ...config.headers,
    };
    return config;
  }, (error: any) => {
    Promise.reject(error);
  })

  api.interceptors.response.use((res) => {
    return res
  }, async (error: any) => {
    console.log(error);
    const originalRequest = error.config;
    console.log(error, "asdas");
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      error.config.url != "/auth/refresh"
    ) {
      try {
        originalRequest._retry = true;

        const newTokens = await refreshToken();
        console.log(newTokens)
        setTokens(newTokens)
        originalRequest.headers["Authorization"] =
          "Bearer " + newTokens.access_token;
        return api(originalRequest);
      } catch (error) {
        dispatch(logoutUser())
        router.push("/sign-in")
      }

    }

    if (
      error.response.status === 403 &&
      error.response.msg === 'Email Not Confirmed'
    ) {
      router.push("/verify_email")
    }
    return Promise.reject(error);
  })

  return children
}