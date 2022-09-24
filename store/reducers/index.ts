import {combineReducers} from "redux";
import {authReducer} from "./auth";
import { categoriesReducer } from "./categories";
import { groupsReducer } from "./groups";
import { productsReducer } from "./products";

export const rootReducer = combineReducers({
    auth: authReducer,
    categories: categoriesReducer,
    groups: groupsReducer,
    products: productsReducer
})