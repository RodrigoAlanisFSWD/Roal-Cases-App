import api from "../interceptors/axios"
import { Category } from "../models/category"

export const getCategories = async () => {
    return (await api.get<Category[]>("/categories/")).data
}

export const createCategory = async (category: any) => {
    return (await api.post<Category>("/categories/", category)).data
}

export const uploadCategoryImage = async (formData: FormData, id: number) => {
    return (await api.post<Category>("/categories/upload-image/" + id, formData)).data
}

export const getCategory = async (slug: string) => {
    return (await api.get<Category>("/categories/" + slug)).data
}

export const updateCategory = async (category: any) => {
    return (await api.put<Category>("/categories", category)).data
}

export const deleteCategory = async (id: number) => {
    return (await api.delete("/categories/" + id)).data
}