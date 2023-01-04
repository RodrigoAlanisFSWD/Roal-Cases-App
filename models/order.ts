import { Address } from "./address";
import { Discount } from "./discount";
import { Model } from "./models";
import { Product } from "./product";
import { Shipment } from "./shipment";
import { User } from "./user";

export enum OrderStatus {
    NEW = "NEW",
    CONFIRMED = "CONFIRMED",
    FAILED = "FAILED",
    DELIVERED = "DELIVERED",
    FINISHED = "FINISHED",
    PAID = "PAID"
}

export interface Order {
    id: number;
    total: number;
    status: OrderStatus;
    user: User;
    products: OrderProduct[];
    created_at: string;
    address: Address;
    shipment: Shipment;
    discount: Discount;
}

export interface OrderProduct {
    id: number;
    count: number;
    model: Model
    product: Product;
    order: Order;
}