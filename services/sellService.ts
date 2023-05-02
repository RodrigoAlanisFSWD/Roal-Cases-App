import { Order } from "@stripe/stripe-js";
import api from "../interceptors/axios";
import { OrderReview, Review } from "../models/review";


export const createSell = async (data: any) => {
    return (await api.post("/sells", data)).data
}

export const getSells = async () => {
    return (await api.get("/sells")).data
}

export const getSell = async (id: any) => {
    return (await api.get("/sells/" + id)).data
}