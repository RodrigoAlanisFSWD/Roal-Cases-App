import { Model } from "./models";
import { Product } from "./product";
import { User } from "./user";

export interface Cart {
    id: number;
    user?: User;
    products: CartProduct[];
    totalCost: number;
    confirmed: boolean;
}

export interface CartProduct {
    id: number;
    localID: string;
    count: number;
    model: Model;
    product: Product;
}