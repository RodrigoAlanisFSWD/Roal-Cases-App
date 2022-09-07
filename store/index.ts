import thunkMiddleware from 'redux-thunk';
import {createWrapper} from "next-redux-wrapper";
import {rootReducer} from "./reducers";
import {configureStore} from "@reduxjs/toolkit";
import {AuthState} from "./reducers/auth";
import { ProductsState } from './reducers/products';

export interface StoreState {
    auth: AuthState,
    products: ProductsState
}

export const store = configureStore(
    {
        reducer: rootReducer,
        middleware: [thunkMiddleware]
    }
)

export const wrapper = createWrapper(() => store);