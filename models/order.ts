import { Model } from "./models";
import { Product } from "./product";
import { User } from "./user";

export enum OrderStatus {
    NEW = "NEW",
    CONFIRMED = "CONFIRMED",
    FAILED = "FAILED",
    DELIVERED = "DELIVERED",
    FINISHED = "FINISHED"
}

export interface Order {
    id: number;
    total: number;
    status: OrderStatus;
    user: User;
    products: OrderProduct[];
    created_at: string;
}

export interface OrderProduct {
    id: number;
    count: number;
    model: Model
    product: Product;
    order: Order;
}