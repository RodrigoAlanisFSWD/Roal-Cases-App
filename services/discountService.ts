import api from "../interceptors/axios"

export const getDiscountFromCode = async (code: string) => {
    return (await api.get("/discounts/code/" + code)).data
}