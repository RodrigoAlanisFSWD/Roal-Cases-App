import api from "../interceptors/axios"
import { Address } from "../models/address"

export const getAddresses = async () => {
    return (await api.get("/addresses")).data
}

export const getAddress = async (id: number) => {
    return (await api.get("/addresses/" + id)).data
}

export const createAddress = async (address: any) => {
    return (await api.post("/addresses", address)).data
}

export const updateAddress = async (address: Address) => {
    return (await api.put("/addresses", address)).data
} 

export const deleteAddress = async (id: number) => {
    return await api.delete("/address" + id)
} 