import { useState } from "react"
import { SubCategory } from "../models/category"

export const useSubCategoriesSelector = () => {

    const [subCategories, setSubCategories] = useState<SubCategory[]>([])

    const handleAdd = (subCategory: SubCategory) => {
        setSubCategories([
            ...subCategories,
            subCategory
        ])
    }

    const handleRemove = (subCategory: SubCategory) => {
        setSubCategories(
            subCategories.filter((sub: SubCategory) => sub.id !== subCategory.id)
        )
    }

    return {
        handleAdd,
        handleRemove,
        subCategories,
        setSubCategories
    }
}