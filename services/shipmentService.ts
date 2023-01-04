import api from "../interceptors/axios"

export const getShipments = async () => {
    return (await api.get("/shipping/")).data
}