import { Product } from "../models/product";
import api from "../plugins/axios";

export class ProductRepository {
    async getProducts(): Promise<Product[]> {
        const { data } = await api.get<Product[]>("/products/")

        return data;
    }

    async getProduct(id: number): Promise<Product> {
        const { data } = await api.get<Product>("/products/" + id)

        return data
    }

    async createProduct(product: Product, formData: FormData): Promise<Product> {
        const { data: { id } } = await api.post<Product>("/products/" + product.category?.id, product)

        return this.uploadImage(formData, id)
    }

    async uploadImage(formData: FormData, id: number): Promise<Product> {
        const { data } = await api.post<Product>("/products/upload-image/" + id, formData)

        return data;
    }

    async updateProduct(product: Product): Promise<Product> {
        const { data } = await api.put<Product>("/products/", product)

        return data;
    }

    async deleteProduct(id: number): Promise<any> {
        await api.delete("/products/" + id)
    }
}