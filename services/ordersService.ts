import api from "../interceptors/axios";
import { Order } from "../models/order";

export const createOrder = async (order: any) => {
  return (await api.post("/orders", order)).data;
};

export const getOrders = async () => {
  return (await api.get("/orders")).data;
};

export const getOrder = async (id: number) => {
  return (await api.get("/orders/" + id)).data;
}

export const updateOrder = async (order: Order) => {
  return (await api.put("/orders/", order)).data
}