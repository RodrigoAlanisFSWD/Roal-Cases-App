import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../models/product";

const initialState: Product[] = [];

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state: Product[], action: PayloadAction<Product[]>) => {
            return action.payload
        },
        addProduct: (state: Product[], action: PayloadAction<Product>) => {
            return [
                ...state,
                action.payload
            ]
        },
        editProduct: (state: Product[], action: PayloadAction<Product>) => {
            const index = state.findIndex((product: Product) => product.id === action.payload.id)

            const newState = state;

            newState[index] = action.payload;

            return newState
        },
        removeProduct: (state: Product[], action: PayloadAction<number>) => {
            return state.filter((product: Product) => product.id !== action.payload)
        },
    }
})

export const { setProducts, addProduct, editProduct, removeProduct } = productsSlice.actions

export default productsSlice.reducer