import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Address } from "../../models/address";

export interface PaymentState {
    clientSecret: string | null;
    status: string;
    selectedAddress: Address | null;
}

const initialState: PaymentState = {
    clientSecret: null,
    status: "NOT_INITIALIZED",
    selectedAddress: null
}

export const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
        setStatus(state, action: PayloadAction<string>) {
            return {
                ...state,
                status: action.payload
            }
        },
        setClientSecret(state, action: PayloadAction<string>) {
            return {
                ...state,
                clientSecret: action.payload
            }
        },
        setSelectedAddress(state, action: PayloadAction<Address>) {
            return {
                ...state,
                selectedAddress: action.payload
            }
        }
    }
})

export const { setStatus, setClientSecret, setSelectedAddress } = paymentSlice.actions

export default paymentSlice.reducer