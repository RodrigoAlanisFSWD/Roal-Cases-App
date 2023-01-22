import { Address } from "./address";
import { Discount } from "./discount";
import { OrderReview, Review } from "./review";
import { Shipment } from "./shipment";

export interface Sell {
    id: number;
    total: number;
    address: Address;
    shipment: Shipment;
    discount?: Discount;
    productReviews: Review[];
    review: OrderReview;
    created_at: string;
}