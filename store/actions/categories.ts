import { Category } from "../../models/category";
import * as categoriesTypes from '../types/categories';

export const setCategories = (categories: Category[]) => ({
    type: categoriesTypes.SET_CATEGORIES,
    payload: categories
})

export const addCategory = (category: Category) => ({
    type: categoriesTypes.ADD_CATEGORY,
    payload: category
})

export const editCategory = (category: Category) => ({
    type: categoriesTypes.EDIT_CATEGORY,
    payload: category
})

export const removeCategory = (id: any) => ({
    type: categoriesTypes.REMOVE_CATEGORY,
    payload: id
})