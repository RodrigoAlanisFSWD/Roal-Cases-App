import api from "../interceptors/axios"
import { Cart, CartProduct } from "../models/cart"

export const addProductToCart = async (product: any) => {
    return (await api.post<Cart>("/cart/add", product)).data
}

export const removeProductFromCart = async (id: number) => {
    return (await api.delete<Cart>("/cart/" + id)).data
}

export const getCart = async () => {
    return (await api.get<Cart>("/cart/")).data
}

export const editProductFromCart = async (newCount: number, product: CartProduct) => {
    return (await api.put<Cart>(`/cart/${newCount}`, product)).data
}