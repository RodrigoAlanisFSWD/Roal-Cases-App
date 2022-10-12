import { Category } from "../models/category";
import api from "../plugins/axios";

export class CategoryRepository {
    async getCategories(): Promise<Category[]> {
        const { data } = await api.get<Category[]>("/categories/")

        return data;
    }

    async createCategory(values: string, formData: FormData): Promise<Category> {
        const { data: { id } } = await api.post<Category>("/categories/", values)

        return this.uploadCategoryImage(formData, id)
    }

    async uploadCategoryImage(formData: FormData, id: number): Promise<Category> {
        const { data } = await api.post<Category>("/categories/upload-image/" + id, formData)

        return data;
    }

    async getCategory(slug: string): Promise<Category> {
        const { data } = await api.get<Category>("/categories/" + slug)

        return data;
    }

    async editCategory(category: Category): Promise<Category> {
        const { data } = await api.put<Category>("/categories/", category)

        return data
    }

    async deleteCategory(id: any) {
        await api.delete("/categories/" + id)
    }
}