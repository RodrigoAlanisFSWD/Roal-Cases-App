import { Category } from "../../models/category";
import * as productsTypes from '../types/products';

export const setCategories = (categories: Category[]) => ({
    type: productsTypes.SET_CATEGORIES,
    payload: categories
})

export const addCategory = (category: Category) => ({
    type: productsTypes.ADD_CATEGORY,
    payload: category
})

export const editCategory = (category: Category) => ({
    type: productsTypes.EDIT_CATEGORY,
    payload: category
})

export const removeCategory = (id: any) => ({
    type: productsTypes.REMOVE_CATEGORY,
    payload: id
})