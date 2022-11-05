import api from "../interceptors/axios"

export const createOrder = async () => {
    return (await api.post("/orders", {})).data
}