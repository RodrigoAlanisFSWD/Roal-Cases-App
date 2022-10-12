import { Product, ProductImage } from "../models/product";
import api from "../plugins/axios";

export class ProductRepository {
    async getProducts(): Promise<Product[]> {
        const { data } = await api.get<Product[]>("/products/")

        return data;
    }

    async getProduct(slug: string): Promise<Product> {
        const { data } = await api.get<Product>("/products/" + slug)

        return data
    }
 
    async createProduct(product: Product): Promise<Product> {
        const { data } = await api.post<Product>("/products/" + product.category?.id, product)

        return data
    }

    async uploadImage(formData: FormData, id: number, type: string): Promise<Product> {
        const { data } = await api.post<Product>(`/products/upload-image/${id}/${type}`, formData)

        return data;
    }

    async updateImage(formData: FormData, id: number): Promise<ProductImage> {
        const { data } = await api.put<ProductImage>("/products/update-image/" + id, formData)

        return data
    }

    async deleteImage(id: number) {
        await api.delete("/products/delete-image/" + id)
    }

    async updateProduct(product: Product): Promise<Product> {
        const { data } = await api.put<Product>("/products/", product)

        return data;
    }

    async deleteProduct(id: number): Promise<any> {
        await api.delete("/products/" + id)
    }
}