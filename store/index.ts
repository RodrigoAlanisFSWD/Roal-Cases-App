import thunkMiddleware from 'redux-thunk';
import {createWrapper} from "next-redux-wrapper";
import {rootReducer} from "./reducers";
import {configureStore} from "@reduxjs/toolkit";
import {AuthState} from "./reducers/auth";
import { Category, Group } from '../models/category';

export interface StoreState {
    auth: AuthState,
    categories: Category[],
    groups: Group[]
}

export const store = configureStore(
    {
        reducer: rootReducer,
        middleware: [thunkMiddleware]
    }
)

export const wrapper = createWrapper(() => store);