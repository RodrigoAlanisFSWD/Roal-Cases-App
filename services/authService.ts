import Cookies from "universal-cookie";
import api from "../interceptors/axios";
import { Tokens, User } from "../models/user";

const cookies = new Cookies();

export const signUp = async (user: any) => {
    return (await api.post<Tokens>("/auth/sign-up", user)).data;
}

export const signIn = async (user: any) => {
    return (await api.post<Tokens>("/auth/sign-in", user)).data;
}

export const setTokens = async (tokens: Tokens) => {
    cookies.set("roal_cases/access_token", tokens.access_token);
    cookies.set("roal_cases/refresh_token", tokens.refresh_token);
}

export const getTokens = (): Tokens => {
    return {
        access_token: cookies.get("roal_cases/access_token"),
        refresh_token: cookies.get("roal_cases/refresh_token"),
    }
}

export const removeTokens = () => {
    cookies.remove("roal_cases/access_token");
    cookies.remove("roal_cases/refresh_token");
}

export const getProfile = async () => {
    return (await api.get<User>("/auth/profile")).data
}

export const sendVerification = async (tokens: Tokens) => {
    return (await api.post<Tokens>("/auth/send_confirmation", {}, {
        headers: {
            Authorization: `Bearer ${tokens.access_token}`
        }
    })).data
}

export const logout = async () => {
    return (await api.post("/auth/logout")).data
}

export const refreshToken = async (refresh: string) => {
    return (await api.post<Tokens>("/auth/refresh", {}, {
        headers: {
            Authorization: `Bearer ${refresh}`
        }
    })).data
}

export const verifyEmail = async (code: string) => {
    return (await api.post<Tokens>("/auth/confirm_email/" + code)).data
}