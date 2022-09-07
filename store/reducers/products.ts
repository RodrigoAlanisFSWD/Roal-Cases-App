import { Category } from "../../models/category";
import { Product } from "../../models/product";
import * as productsTypes from '../types/products';

export interface ProductsState {
    products: Product[],
    categories: Category[]
}

const initialState: ProductsState = {
    products: [],
    categories: []
}

export function productsReducer(state = initialState, action: any): ProductsState {
    switch(action.type) {
        case productsTypes.SET_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            }
        default:
            return state
    }
}