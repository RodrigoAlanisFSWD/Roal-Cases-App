import api from "../interceptors/axios"
import { SubCategory } from "../models/category"

export const getSubCategories = async (ids: Array<number>) => {
    return (await api.post<SubCategory[]>("/subCategories/fromIds", ids)).data
}

export const createSubCategories = async (subCategories: SubCategory[], groupId: number) => {
    return (await api.post<SubCategory[]>("/subCategories/" + groupId, {
        subCategories
    })).data
}

export const uploadSubCategoryImage = async (formData: FormData, id: number) => {
    return (await api.post<SubCategory>("/subCategories/upload-image/" + id, formData)).data
}

export const getSubCategory = async (slug: string) => {
    return (await api.get<SubCategory>("/subCategories/" + slug)).data
}

export const editSubCategory = async (subCategory: SubCategory) => {
    return (await api.put<SubCategory>("/subCategories", subCategory)).data
}

export const deleteSubCategory = async (id: number) => {
    console.log('delete', id)
    return (await api.delete("/subCategories/" + id)).data
}