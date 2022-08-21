import {Action} from "redux";
import * as authTypes from '../types/auth'

interface AuthState {
    state: string;
    access_token: string;
    refresh_token: string;
}

const initialState: AuthState = {
    state: authTypes.NOT_INITIALIZED,
    access_token: '',
    refresh_token: ''
}

export function authReducer(state = initialState, action: any) {
    switch (action.type) {
        case authTypes.AUTHENTICATE_USER:
            return {
                ...action.payload,
                state: authTypes.AUTHENTICATED
            };

        case authTypes.LOGOUT_USER:
            return {
                ...initialState,
                state: authTypes.UNAUNTHENTICATED
            }

        case authTypes.AUTH_ERROR:
            return {
                ...initialState,
                state: authTypes.AUTH_ERROR
            }

        default:
            return state
    }
}