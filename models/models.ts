import { Category } from "./category";

export interface Brand {
    id: number;
    name: string;
    categories: Category[];
    models: Model[]
}

export interface Model {
    id: number;
    brand: Brand;
    name: string;
    categories: Category[];
}