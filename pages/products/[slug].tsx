import { NextPage } from 'next';
import React from 'react'
import { ProductDetail } from '../../components/pages/products/ProductDetail'
import { Product } from '../../models/product'
import api from '../../interceptors/axios';

interface ProductDetailPageProps {
    product: Product;
}

const ProductDetailPage: NextPage<ProductDetailPageProps> = ({ product }) => {
  return (
    <ProductDetail product={product} />
  )
}

export async function getServerSideProps({ query }: any) {

    const { data } = await api.get<Product>("/products/" + query.slug)

    return {
        props: {
            product: data,
        }
    }
}

export default ProductDetailPage
