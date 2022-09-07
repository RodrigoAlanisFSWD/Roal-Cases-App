import {combineReducers} from "redux";
import {authReducer} from "./auth";
import { productsReducer } from "./products";

export const rootReducer = combineReducers({
    auth: authReducer,
    products: productsReducer
})