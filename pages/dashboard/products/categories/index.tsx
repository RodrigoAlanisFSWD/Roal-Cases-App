import { GetServerSideProps, NextPage } from 'next'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Dashboard } from '../../../../components/layouts/Dashboard'
import { ProductCategories } from '../../../../components/pages/dashboard/products/categories/ProductCategories'
import { Category } from '../../../../models/category'
import { setCategories } from '../../../../redux/states/categories'
import { getCategories } from '../../../../services/categoriesService'

interface CategoriesProps {
  categories: Category[]
}

const CategoriesPage: NextPage<CategoriesProps> = ({ categories }) => {

  const dispatch = useDispatch()

  dispatch(setCategories(categories))

  return (
    <Dashboard>
        <ProductCategories />
    </Dashboard>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const categories = await getCategories()

  return {
    props: {
      categories
    }
  }
}

export default CategoriesPage