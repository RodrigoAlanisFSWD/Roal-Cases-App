import { faHouse, faMobilePhone, faMoneyBill, faMoneyBillAlt, faShoppingBag } from "@fortawesome/free-solid-svg-icons"
import { NavItem } from "../models/navbar"

export const useDashboardMenu = () => {
    const menu: Array<NavItem> = [
        {
          links: [
    
          ],
          header: {
            text: "Dashboard",
            icon: faHouse,
            href: "/dashboard"
          },
          isGroup: false,
        },
        {
          isGroup: true,
          header: {
            text: "Sobre Productos",
            icon: faShoppingBag
          },
          links: [
            {
              text: "Categorias",
              href: "/dashboard/products/categories"
            },
            {
              text: "Grupos",
              href: "/dashboard/products/groups"
            },
            {
              text: "Productos",
              href: "/dashboard/products/"
            },
          ]
        },
        {
          isGroup: true,
          header: {
            text: "Modelos Y Marcas",
            icon: faMobilePhone
          },
          links: [
            {
              text: "Marcas",
              href: "/dashboard/models/brands"
            },
            {
              text: "Modelos",
              href: "/dashboard/models"
            },
          ]
        },
        {
          links: [
    
          ],
          header: {
            text: "Ordenes",
            icon: faMoneyBill,
            href: "/dashboard/orders/"
          },
          isGroup: false,
        },
        {
          links: [
            {
              text: "Envios",
              href: "/dashboard/shipments"
            },
            {
              text: "Descuentos",
              href: "/dashboard/discounts"
            }
          ],
          header: {
            text: "Precios",
            icon: faMoneyBillAlt,
          },
          isGroup: true,
        }
      ]

    return {
        menu
    }
}