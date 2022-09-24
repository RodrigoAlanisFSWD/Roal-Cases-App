import { Product } from "../../models/product";
import * as productsTypes from '../types/products';

const initialState: Product[] = [];

export function productsReducer(state = initialState, action: any) {
    switch (action.type) {
        case productsTypes.SET_PRODUCTS:
            return action.payload

        case productsTypes.ADD_PRODUCT:
            return [
                ...state,
                action.payload
            ]

        case productsTypes.EDIT_PRODUCT:
            const index = state.findIndex((product: Product) => product.id === action.payload.id)

            state[index] = action.payload;

            return state

        case productsTypes.REMOVE_PRODUCT:
            return state.filter((cat: Product) => cat.id !== action.payload)

        default:
            return state
    }
}