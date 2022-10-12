import { Category, SubCategory } from "./category";

export interface SearchParams {
    query: string;
    category: Category | null;
    subCategories: string[];
}