import { Product } from "./product";

export interface Category {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    products: Product[];
}