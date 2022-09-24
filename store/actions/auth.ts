import { User } from '../../models/user'
import * as authTypes from '../types/auth'

export const authenticateUser = (access_token: string, refresh_token: string, profile: User) => {
    return {
        type: authTypes.AUTHENTICATE_USER,
        payload: {
            access_token,
            refresh_token,
            profile
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

export const setAuthInitial = (state: any = authTypes.UNAUNTHENTICATED) => ({
    type: authTypes.AUTH_INITIAL,
    payload: state
})

export const setAdmin= () => ({
    type: authTypes.SET_ADMIN,
})