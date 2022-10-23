import api from "../interceptors/axios"
import { Brand, Model } from "../models/models"

export const searchBrands = async (ids: Array<any>) => {
    return (await api.post<Brand[]>("/models/brands/search", ids)).data
}

export const getBrands = async () => {
    return (await api.get<Brand[]>("/models/brands/")).data
}

export const getBrand = async (id: any) => {
    return (await api.get<Brand>("/models/brands/" + id)).data
}

export const createBrand = async (data: any) => {
    return (await api.post<Brand>("/models/brands/", data)).data
}

export const updateBrand = async (brand: Brand) => {
    return (await api.put<Brand>("/models/brands/", brand)).data
}

export const deleteBrand = async (id: number) => {
    return (await api.delete("/models/brands/" + id))
}

export const searchModels = async (ids: Array<any>) => {
    return (await api.post<Model[]>("/models/search", ids)).data
}

export const getModels = async (brand: number) => {
    return (await api.get<Model[]>("/models/get/" + brand)).data
}

export const getModel = async (id: any) => {
    return (await api.get<Model>("/models/getOne/" + id)).data
}

export const deleteModel = async (id: number) => {
    return (await api.delete("/models/" + id)).data
}

export const createModel = async (model: any) => {
    return (await api.post<Model>("/models/", model))
}

export const updateModel = async (model: Model) => {
    return (await api.put<Model>("/models/", model))
}