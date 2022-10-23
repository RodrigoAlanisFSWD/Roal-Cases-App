import { configureStore } from "@reduxjs/toolkit";
import { Category, Group } from "../models/category";
import { Product } from "../models/product";
import authReducer, { AuthState } from './states/auth';
import productsReducer from './states/products';
import categoriesReducer from './states/categories';
import groupsReducer from './states/groups';
import searchReducer from './states/search';
import cartReducer from './states/cart';
import { createWrapper } from "next-redux-wrapper";
import { SearchParams } from "../models/search";
import { Cart } from "../models/cart";

export interface AppStore {
    auth: AuthState;
    products: Product[];
    categories: Category[];
    groups: Group[];
    search: SearchParams;
    cart: Cart;
}

export const store = configureStore<AppStore>({
    reducer: {
        auth: authReducer,
        products: productsReducer,
        categories: categoriesReducer,
        groups: groupsReducer,
        search: searchReducer,
        cart: cartReducer
    }
})

export const wrapper = createWrapper(() => store, { debug: true })