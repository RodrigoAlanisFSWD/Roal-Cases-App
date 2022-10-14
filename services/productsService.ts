import api from "../interceptors/axios"
import { Category } from "../models/category"
import { Product, ProductImage } from "../models/product"

export const getProducts = async () => {
    return (await api.get<Product[]>("/products/")).data
}

export const getProduct = async (slug: string) => {
    return (await api.get<Product>("/products/" + slug)).data
}

export const createProduct = async (product: Product) => {
    return (await api.post<Product>("/products/", product)).data
}

export const uploadProductImage = async (formData: FormData, id: number, type: string) => {
    return (await api.post<Product>(`/products/upload-image/${id}/${type}`, formData)).data
}

export const updateProductImage = async (formData: FormData, id: number) => {
    return (await api.put<ProductImage>(`/products/update-image/${id}`, formData)).data
}

export const deleteProductImage = async (id: number) => {
    return (await api.delete("/products/delete-image/" + id)).data
}

export const updateProduct = async (product: Product) => {
    return (await api.put<Product>("/products", product)).data
}

export const deleteProduct = async (id: number) => {
    return (await api.delete("/products/" + id)).data
}