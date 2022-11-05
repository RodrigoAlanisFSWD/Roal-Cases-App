import { User } from "./user";

export interface Address {
    id: number;
    name: string;
    street: string;
    aparment: string;
    postalCode: number;
    state: string;
    user: User;
}