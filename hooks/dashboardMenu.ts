import { faHouse, faMobilePhone, faShoppingBag } from "@fortawesome/free-solid-svg-icons"
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
      ]

    return {
        menu
    }
}