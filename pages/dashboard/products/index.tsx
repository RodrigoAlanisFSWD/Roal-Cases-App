import { GetServerSideProps, NextPage } from 'next'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Dashboard } from '../../../components/layouts/Dashboard'
import { DashboardProducts } from '../../../components/pages/dashboard/products/DashboardProducts'
import { Product } from '../../../models/product'
import { setProducts } from '../../../redux/states/products'
import { getProducts } from '../../../services/productsService'

interface ProductProps {
  products: Product[]
}

const ProductsPage: NextPage<ProductProps> = ({ products }) => {

  const dispatch = useDispatch()

  dispatch(setProducts(products))

  return (
    <Dashboard>
        <DashboardProducts />
    </Dashboard>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const products = await getProducts()

  return {
    props: {
      products
    }
  }
}

export default ProductsPage;
