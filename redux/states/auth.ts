import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "../../models/user";
import * as authTypes from '../types/auth'

export interface AuthState {
    state: string;
    access_token: string;
    refresh_token: string;
    loading: boolean;
    errorMsg: string;
    profile: User | null;
    role: string;
}

const initialState: AuthState = {
    state: authTypes.NOT_INITIALIZED,
    access_token: '',
    refresh_token: '',
    loading: false,
    errorMsg: '',
    profile: null,
    role: "USER"
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authenticateUser: (state: AuthState, action: PayloadAction<any>) => {
            return {
                ...action.payload,
                state: authTypes.AUTHENTICATED,
                loading: false,
            }
        },
        logoutUser: (state: AuthState) => {
            return {
                ...initialState,
                state: authTypes.UNAUNTHENTICATED
            }
        },
        authError: (state: AuthState, action: PayloadAction<string>) => {
            return {
                ...initialState,
                state: authTypes.AUTH_ERROR,
                errorMsg: action.payload
            }
        },
        authLoading: (state: AuthState, action: PayloadAction<boolean>) => {
            return {
                ...state,
                loading: action.payload
            }
        },
        authInitial: (state: AuthState, action: PayloadAction<string>) => {
            return {
                ...initialState,
                state: action.payload
            }
        },
        setAdmin: (state: AuthState) => {
            return {
                ...state,
                role: "ADMIN"
            }
        }
    }
})

export const { setAdmin, authInitial, authLoading, authError, logoutUser, authenticateUser } = authSlice.actions

export default authSlice.reducer