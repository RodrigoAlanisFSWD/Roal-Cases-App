import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PaymentState {
    clientSecret: string | null;
    status: string;
}

const initialState: PaymentState = {
    clientSecret: null,
    status: "NOT_INITIALIZED"
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
        }
    }
})

export const { setStatus, setClientSecret } = paymentSlice.actions

export default paymentSlice.reducer