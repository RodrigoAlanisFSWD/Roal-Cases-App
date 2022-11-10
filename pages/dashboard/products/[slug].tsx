import { GetServerSideProps, NextPage } from 'next';
import React from 'react'
import { Dashboard } from '../../../components/layouts/Dashboard';
import { ProductForm } from '../../../components/pages/dashboard/products/ProductForm';
import { Product } from '../../../models/product';
import { getProduct } from '../../../services/productsService';

interface EditProps {
  product: Product
}

const EditProductPage: NextPage<EditProps> = ({ product }) => {
  return (
    <Dashboard>
        <ProductForm edit={true} product={product} />
    </Dashboard>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const product = await getProduct(context.query.slug as string)

    return {
        props: {
          product
        }
    }
}

export default EditProductPage;