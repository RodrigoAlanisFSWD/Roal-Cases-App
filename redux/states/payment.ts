import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Address } from "../../models/address";
import { Discount } from "../../models/discount";
import { Shipment } from "../../models/shipment";

export interface PaymentState {
  clientSecret: string | null;
  status: string;
  selectedAddress: Address | null;
  selectedShipment: Shipment | null;
  selectedDiscount: Discount | null;
}

const initialState: PaymentState = {
  clientSecret: null,
  status: "NOT_INITIALIZED",
  selectedAddress: null,
  selectedShipment: null,
  selectedDiscount: null
};

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<string>) {
      return {
        ...state,
        status: action.payload,
      };
    },
    setClientSecret(state, action: PayloadAction<string>) {
      return {
        ...state,
        clientSecret: action.payload,
      };
    },
    setSelectedAddress(state, action: PayloadAction<Address>) {
      return {
        ...state,
        selectedAddress: action.payload,
      };
    },
    setSelectedShipment(state, action: PayloadAction<Shipment>) {
      return {
        ...state,
        selectedShipment: action.payload,
      };
    },
    setSelectedDiscount(state, action: PayloadAction<Discount>) {
      return {
        ...state,
        selectedDiscount: action.payload
      }
    }
  },
});

export const { setStatus, setClientSecret, setSelectedAddress, setSelectedShipment, setSelectedDiscount } =
  paymentSlice.actions;

export default paymentSlice.reducer;
