import api from "../interceptors/axios"

export const createOrder = async () => {
    return (await api.post("/orders", {})).data
}

export const getOrders = async () => {
    return (await api.get("/orders")).data
}

export const getOrder = async (id: number) => {
    return (await api.get("/orders/" + id)).data
}