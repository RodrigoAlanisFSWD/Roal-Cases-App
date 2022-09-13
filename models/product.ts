import { Category, SubCategory } from "./category";

export interface Product {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    category?: Category;
    subCategories?: SubCategory[]
}