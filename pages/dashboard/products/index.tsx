import { NextPage } from 'next'
import React from 'react'
import { Dashboard } from '../../../components/layouts/Dashboard'
import { DashboardProducts } from '../../../components/pages/dashboard/products/DashboardProducts'

const ProductsPage: NextPage = () => {
  return (
    <Dashboard>
        <DashboardProducts />
    </Dashboard>
  )
}

export default ProductsPage;
