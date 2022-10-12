import { Product } from "./product";

export interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
    imageUrl: string;
    price: number;
    products: Product[];
}

export interface SubCategory {
    id: number;
    name: string;
    group?: Group;
}

export interface Group {
    id: number;
    name: string;
    subCategories?: SubCategory[]
}