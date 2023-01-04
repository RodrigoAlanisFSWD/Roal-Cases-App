import { NextPage } from 'next';
import React from 'react'
import { ProductDetail } from '../../components/pages/products/ProductDetail'
import { Product } from '../../models/product'
import api from '../../interceptors/axios';
import { getProduct } from '../../services/productsService';

interface ProductDetailPageProps {
    product: Product;
}

const ProductDetailPage: NextPage<ProductDetailPageProps> = ({ product }) => {
  return (
    <ProductDetail product={product} />
  )
}

export async function getServerSideProps({ query }: any) {

    const product = await getProduct(query) 

    return {
        props: {
            product,
        }
    }
}

export default ProductDetailPage
