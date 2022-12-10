import { OrderStatus } from "../models/order";

export const traduceOrderState = (state: string) => {
    switch(state) {
        case OrderStatus.NEW:
            return "Nueva"
        case OrderStatus.CONFIRMED:
            return "Confirmada"
        case OrderStatus.DELIVERED:
            return "Enviada"
        case OrderStatus.FINISHED:
            return "Finalisada"
        case OrderStatus.FAILED:
            return "Fallida"
    }
}