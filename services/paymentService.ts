import api from "../interceptors/axios"

export const updatePayment = async (body: any) => {
  return (await api.put("/payments/update", body)).data
}
