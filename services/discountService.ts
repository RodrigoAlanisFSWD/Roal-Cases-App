import api from "../interceptors/axios"
import { Discount } from "../models/discount"

export const getDiscountFromCode = async (code: string) => {
    return (await api.get("/discounts/code/" + code)).data
}

export const getDiscounts = async () => {
    return (await api.get("/discounts/")).data
}

export const createDiscount = async (discount: Discount) => {
    return (await api.post("/discounts/", discount)).data
}

export const updateDiscount = async (discount: Discount) => {
    return (await api.put("/discounts/", discount)).data
}

export const deleteDiscount = async (id: any) => {
    return (await api.delete("/discounts/" + id)).data
}