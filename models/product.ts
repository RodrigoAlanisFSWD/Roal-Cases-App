import { Category, SubCategory } from "./category";

export interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    imageUrl: string;
    price: number;
    category?: Category;
    subCategories?: SubCategory[];
    images: ProductImage[]
}

export interface ProductImage {
    id: number;
    type: string;
    imageUrl: string;
    product: Product;
}