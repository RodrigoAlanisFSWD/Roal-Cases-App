import { Product } from "./product";
import { User } from "./user";

export interface OrderReview {
    id: number;
    shipping: boolean;
    condition: boolean;
    order: boolean;
    app: boolean;
    extra: string;
}

export interface Review {
    id: number;
    stars: number;
    count: number;
    product: Product;
    user: User;
    created_at: string;
}