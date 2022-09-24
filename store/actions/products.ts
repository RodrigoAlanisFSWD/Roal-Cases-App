import { Product } from "../../models/product";
import * as productsTypes from '../types/products';

export const setProducts = (products: Product[]) => ({
    type: productsTypes.SET_PRODUCTS,
    payload: products
})

export const addProduct = (product: Product) => ({
    type: productsTypes.ADD_PRODUCT,
    payload: product
})

export const editProduct = (product: Product) => ({
    type: productsTypes.EDIT_PRODUCT,
    payload: product
})

export const removeProduct = (id: any) => ({
    type: productsTypes.REMOVE_PRODUCT,
    payload: id
})