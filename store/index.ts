import thunkMiddleware from 'redux-thunk';
import {createWrapper} from "next-redux-wrapper";
import {rootReducer} from "./reducers";
import {configureStore} from "@reduxjs/toolkit";
import {AuthState} from "./reducers/auth";

export interface StoreState {
    auth: AuthState
}

export const store = configureStore(
    {
        reducer: rootReducer,
        middleware: [thunkMiddleware]
    }
)

export const wrapper = createWrapper(() => store);