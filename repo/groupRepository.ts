import { Group, SubCategory } from "../models/category";
import api from "../plugins/axios";

export class GroupRepository {
    async getGroups(): Promise<Group[]> {
        const { data } = await api.get<Group[]>("/groups/")

        return data;
    }

    async createGroup(values: string): Promise<Group> {
        const { data } = await api.post<Group>("/groups/", values)

        return data;
    }

    async getGroup(id: any): Promise<Group> {
        const { data } = await api.get<Group>("/groups/" + id)

        return data;
    }

    async editGroup(group: Group): Promise<Group> {
        const { data } = await api.put<Group>("/groups/", group)

        return data
    }

    async deleteGroup(id: any) {
        await api.delete("/groups/" + id)
    }

    async createSubCategories(subCategories: SubCategory[], groupId: any): Promise<SubCategory[]> {
        const { data } = await api.post<SubCategory[]>("/subcategories/" + groupId, {
            subCategories,
        })

        return data
    }

    async deleteSubCategory(subCategory: SubCategory) {
        await api.delete("/subcategories/" + subCategory.id)
    }

    async updateSubCategory(subCategory: SubCategory) {
        return (await api.put<SubCategory>("/subcategories/", subCategory)).data
    }
}