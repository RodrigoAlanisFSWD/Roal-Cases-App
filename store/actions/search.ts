import { Category, SubCategory } from "../../models/category";
import * as types from '../types/search'

export const setCategory = (category: Category) => ({
    type: types.SET_CATEGORY,
    payload: category
})

export const setQuery = (query: string) => ({
    type: types.SET_QUERY,
    payload: query
})

export const addSubCategory = (subCategory: string) => ({
    type: types.ADD_SUBCATEGORY,
    payload: subCategory
})

export const setSubCategories = (subCategories: string[]) => ({
    type: types.SET_SUBCATEGORIES,
    payload: subCategories
})

export const removeSubCategory = (subCategory: string) => ({
    type: types.REMOVE_SUBCATEGORY,
    payload: subCategory
})