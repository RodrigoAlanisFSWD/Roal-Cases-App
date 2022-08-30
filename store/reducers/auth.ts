import {Action} from "redux";
import { User } from "../../models/user";
import * as authTypes from '../types/auth'

export interface AuthState {
    state: string;
    access_token: string;
    refresh_token: string;
    loading: boolean;
    errorMsg: string;
    profile: User | null;
}

const initialState: AuthState = {
    state: authTypes.NOT_INITIALIZED,
    access_token: '',
    refresh_token: '',
    loading: false,
    errorMsg: '',
    profile: null
}

export function authReducer(state = initialState, action: any): AuthState {
    switch (action.type) {
        case authTypes.AUTHENTICATE_USER:
            return {
                ...action.payload,
                state: authTypes.AUTHENTICATED,
                loading: false,
            };

        case authTypes.LOGOUT_USER:
            return {
                ...initialState,
                state: authTypes.UNAUNTHENTICATED
            }

        case authTypes.AUTH_ERROR:
            return {
                ...initialState,
                state: authTypes.AUTH_ERROR,
                errorMsg: action.payload
            }

        case authTypes.AUTH_LOADING:
            return {
                ...state,
                loading: action.payload
            }
            
        case authTypes.AUTH_INITIAL:
            return {
                ...initialState,
                state: action.payload
            }

        default:
            return state
    }
}