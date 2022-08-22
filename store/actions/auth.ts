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

export const setAuthError = (errorMsg: string) => {
    return {
        type: authTypes.AUTH_ERROR,
        payload: errorMsg
    }
}

export const setAuthLoading = (loading: boolean) => {
    return {
        type: authTypes.AUTH_LOADING,
        payload: loading
    }
}

export const setAuthInitial = () => ({
    type: authTypes.AUTH_INITIAL
})