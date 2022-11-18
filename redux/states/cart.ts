import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart, CartProduct } from "../../models/cart";

const initialState: Cart = {
    id: 0,
    products: [],
    totalCost: 0,
    confirmed: false,
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart: (state, action: PayloadAction<Cart>) => {
            return action.payload
        },
        editProductInCart: (state, action: PayloadAction<CartProduct>) => {
            return {
                ...state,
                products: state.products.map((i: any) => i.id === action.payload.id ? action.payload : i)
            }
        },
        confirmCart: (state) => {
            return {
                ...state,
                confirmed: true
            }
        }
    }
})

export const { setCart, editProductInCart, confirmCart } = cartSlice.actions

export default cartSlice.reducer