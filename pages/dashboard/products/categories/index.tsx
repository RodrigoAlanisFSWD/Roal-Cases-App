import { NextPage } from 'next'
import React from 'react'
import { Dashboard } from '../../../../components/layouts/Dashboard'
import { ProductCategories } from '../../../../components/pages/dashboard/products/categories/ProductCategories'

const CategoriesPage: NextPage = () => {
  return (
    <Dashboard>
        <ProductCategories />
    </Dashboard>
  )
}

export default CategoriesPage