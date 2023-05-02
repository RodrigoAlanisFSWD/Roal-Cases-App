import { Product } from "./product";

export enum DiscountType {
    FOR_FINAL_PRICE = 'FOR_FINAL_PRICE',
    FOR_PRODUCTS = 'FOR_PRODUCTS',
  }

  export interface Discount {
    id: number;
    code: string;
    type: DiscountType;
    expirationDate: Date;
    products: Product[];
    percent: number;
  }