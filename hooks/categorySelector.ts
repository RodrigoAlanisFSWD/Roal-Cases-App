import { useState } from "react"
import { Category, SubCategory } from "../models/category"

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

export const useCategoriesSelector = () => {

    const [categories, setCategories] = useState<Category[]>([])

    const handleAdd = (category: Category) => {
        setCategories([
            ...categories,
            category
        ])
    }

    const handleRemove = (category: Category) => {
        setCategories(
            categories.filter((sub: Category) => sub.id !== category.id)
        )
    }

    return {
        handleAdd,
        handleRemove,
        categories,
        setCategories
    }
}