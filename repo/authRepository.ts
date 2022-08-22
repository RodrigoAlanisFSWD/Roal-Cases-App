import {Tokens, User} from "../models/user";
import Cookie from 'universal-cookie'
import api from "../plugins/axios";

export class AuthRepository {

    private cookie = new Cookie();

    async signUp(user: User): Promise<Tokens> {
        const {data: {access_token, refresh_token}} = await api.post<Tokens>("/auth/sign-up", user)

        this.cookie.set("roal_cases/access_token", access_token);
        this.cookie.set("roal_cases/refresh_token", refresh_token);

        return {
            access_token,
            refresh_token
        }
    }

    async signIn(user: User): Promise<Tokens> {
        const {data: {access_token, refresh_token}} = await api.post<Tokens>("/auth/sign-in", user)

        this.cookie.set("roal_cases/access_token", access_token);
        this.cookie.set("roal_cases/refresh_token", refresh_token);

        return {
            access_token,
            refresh_token
        }
    }

    async logout() {
        const res = await api.post("/auth/logout");

        this.cookie.remove("roal_cases/access_token");
        this.cookie.remove("roal_cases/refresh_token");
    }

    async refreshToken(): Promise<Tokens> {
        const refresh = this.cookie.get("roal_cases/refresh_token")

        const {data: {access_token, refresh_token}} = await api.post<Tokens>("/auth/refresh", {}, {
            headers: {
                Authorization: `Bearer ${refresh}`
            }
        })

        this.cookie.set("roal_cases/access_token", access_token);
        this.cookie.set("roal_cases/refresh_token", refresh_token);

        return {
            access_token,
            refresh_token
        }
    }

    getTokens(): Tokens {
        const refresh_token = this.cookie.get("roal_cases/refresh_token")
        const access_token = this.cookie.get("roal_cases/access_token")

        return {
            access_token,
            refresh_token
        }
    }
}