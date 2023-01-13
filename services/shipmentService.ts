import api from "../interceptors/axios"
import { Shipment } from "../models/shipment"

export const getShipment = async (id: any) => {
    return (await api.get("/shipping/" + id)).data
}

export const getShipments = async () => {
    return (await api.get("/shipping/")).data
}

export const createShipment = async (shipment: Shipment) => {
    return (await api.post("/shipping/", shipment)).data
}

export const updateShipment = async (shipment: Shipment) => {
    return (await api.put("/shipping/", shipment)).data
}

export const deleteShipment = async (id: number) => {
    return (await api.delete("/shipping/" + id)).data
}