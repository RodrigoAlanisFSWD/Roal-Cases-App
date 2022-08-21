import thunkMiddleware from 'redux-thunk';
import {createWrapper} from "next-redux-wrapper";
import {rootReducer} from "./reducers";
import {configureStore} from "@reduxjs/toolkit";

export const store = configureStore(
    {
        reducer: rootReducer,
        middleware: [thunkMiddleware]
    }
)

export const wrapper = createWrapper(() => store);