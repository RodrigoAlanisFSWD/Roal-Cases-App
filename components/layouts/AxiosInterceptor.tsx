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

    useEffect(() => {

        const reqInterceptor = async (config: AxiosRequestConfig) => {
            const tokens = getTokens();
        
            config.headers = {
              Authorization: `Bearer ${tokens.access_token}`,
              ...config.headers,
            };
            return config;
          }

          const reqErrorInterceptor = (error: any) => {
            Promise.reject(error);
          }

          const resInterceptor = (response: any) => {
            return response
          }

          const resErrorInterceptor =  async (error: any) => {
            const originalRequest = error.config;
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
              error.response.states === 403
            ) {
                router.push("/verify_email")
            }
            return Promise.reject(error);
          }

          const resInterceptors = api.interceptors.response.use(resInterceptor, resErrorInterceptor)
          const reqInterceptors = api.interceptors.request.use(reqInterceptor, reqErrorInterceptor)

          return () => {
            api.interceptors.response.eject(resInterceptors)
            api.interceptors.request.eject(reqInterceptors)
          }

    }, [router])

    return children
}