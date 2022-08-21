import * as authTypes from '../types/auth'

export const authenticateUser = (access_token: string, refresh_token: string) => {
    return {
        type: authTypes.AUTHENTICATE_USER,
        payload: {
            access_token,
            refresh_token
        }
    }
}

export const logout = () => {
    return {
        type: authTypes.LOGOUT_USER
    }
}

export const setAuthError = () => {
    return {
        type: authTypes.AUTH_ERROR
    }
}