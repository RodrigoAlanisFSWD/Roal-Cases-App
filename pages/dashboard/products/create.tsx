import { NextPage } from 'next'
import React from 'react'
import { Dashboard } from '../../../components/layouts/Dashboard'
import { ProductForm } from '../../../components/pages/dashboard/products/ProductForm'

const CreateProductPage: NextPage = () => {
  return (
    <Dashboard>
        <ProductForm />
    </Dashboard>
  )
}

export default CreateProductPage
