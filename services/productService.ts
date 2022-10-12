import { useDispatch } from "react-redux"
import { Product } from "../models/product";
import { ProductRepository } from "../repo/productRepository";
import { addProduct, editProduct, removeProduct, setProducts } from '../store/actions/products'

export const useProductService = () => {

    const dispatch = useDispatch();
    const productRepository = new ProductRepository();

    const getProducts = async () => {
        const products = await productRepository.getProducts()

        dispatch(setProducts(products))
    }

    const getProduct = async (slug: string) => {
        const product = await productRepository.getProduct(slug)

        return product;
    }

    const createProduct = async (product: Product) => {
        const created = await productRepository.createProduct(product);

        dispatch(addProduct(created))
    }

    const uploadProductImage = async (file: any, id: number, type: string) => {
        const formData = new FormData()
        formData.set("image", file);

        return await productRepository.uploadImage(formData, id, type)
    }

    const updateProductImage = async (file: any, id: number) => {
        const formData = new FormData()
        formData.set("image", file);

        return await productRepository.updateImage(formData, id)
    }

    const deleteProductImage = async (id: number) => {
        await productRepository.deleteImage(id)
    }

    const updateProduct = async (product: Product) => {
        const updated = await productRepository.updateProduct(product);

        dispatch(editProduct(updated))
    }

    const deleteProduct = async (id: number) => {
        await productRepository.deleteProduct(id)

        dispatch(removeProduct(id))
    }

    return {
        getProducts,
        getProduct,
        createProduct,
        updateProduct,
        deleteProduct,
        uploadProductImage,
        updateProductImage,
        deleteProductImage
    }
}