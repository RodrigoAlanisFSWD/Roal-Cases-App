import { Category } from "../models/category";
import api from "../plugins/axios";

export class CategoryRepository {
    async getCategories(): Promise<Category[]> {
        const { data } = await api.get<Category[]>("/categories/")

        return data;
    }

    async createCategory(values: string, formData: FormData): Promise<Category> {
        const { data: { id } } = await api.post<Category>("/categories/", values)

        const { data } = await api.post("/categories/upload-image/" + id, formData)

        return data;
    }

    async getCategory(id: any): Promise<Category> {
        const { data } = await api.get<Category>("/categories/" + id)

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