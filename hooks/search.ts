import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import { AppStore } from "../redux/store"

export const useSearch = () => {

    const router = useRouter()

    const searchParams = useSelector((state: AppStore) => state.search)

    const search = () => {
        router.push(`/products?${searchParams.category ? "category=" + searchParams.category.slug : ""}${searchParams.subCategories.length > 0 ? "&subCategories=" + searchParams.subCategories.join(",") : ""}${searchParams.query.length > 0 ? "&query=" + searchParams.query : ""}`)
    }

    return {
        search
    }
}