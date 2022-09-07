import { Category } from "../models/category";
import api from "../plugins/axios";

export class CategoryRepository {
    async getCategories(): Promise<Category[]> {
        const { data } = await api.get<Category[]>("/categories/")

        return data;
    }
}