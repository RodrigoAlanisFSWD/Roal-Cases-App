import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart, CartProduct } from "../../models/cart";

const initialState: Cart = {
    id: 0,
    products: [],
    totalCost: 0
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
        }
    }
})

export const { setCart, editProductInCart } = cartSlice.actions

export default cartSlice.reducer