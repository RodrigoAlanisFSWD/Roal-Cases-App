import api from "../interceptors/axios"
import { Group } from "../models/category"

export const getGroups = async () => {
    return (await api.get<Group[]>("/groups/")).data
}

export const createGroup = async (group: any) => {
    return (await api.post<Group>("/groups/", group)).data
}

export const uploadGroupImage = async (formData: FormData, id: number) => {
    return (await api.post<Group>("/groups/upload-image/" + id, formData)).data
}

export const getGroup = async (slug: string) => {
    return (await api.get<Group>("/groups/" + slug)).data
}

export const updateGroup = async (group: Group) => {
    return (await api.put<Group>("/groups", group)).data
}

export const deleteGroup = async (id: number) => {
    return (await api.delete("/groups/" + id)).data
}