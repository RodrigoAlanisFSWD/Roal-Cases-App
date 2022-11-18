import api from "../interceptors/axios"
import { Address } from "../models/address"

export const createOrder = async (address: any) => {
    return (await api.post("/orders", address)).data
}

export const getOrders = async () => {
    return (await api.get("/orders")).data
}

export const getOrder = async (id: number) => {
    return (await api.get("/orders/" + id)).data
}