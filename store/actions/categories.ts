import { Category } from "../../models/category";
import * as productsTypes from '../types/products';

export const setCategories = (categories: Category[]) => ({
    type: productsTypes.SET_CATEGORIES,
    payload: categories
})