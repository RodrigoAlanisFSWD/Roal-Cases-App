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

        case productsTypes.ADD_CATEGORY:
            state.categories.push(action.payload)

            return state

        case productsTypes.EDIT_CATEGORY:
            const index = state.categories.findIndex((cat: Category) => cat.id === action.payload.id)

            state.categories[index] = action.payload;

            return state

        case productsTypes.REMOVE_CATEGORY:
            const categories = state.categories.filter((cat: Category) => cat.id !== action.payload)

            return {
                ...state,
                categories
            }

        default:
            return state
    }
}