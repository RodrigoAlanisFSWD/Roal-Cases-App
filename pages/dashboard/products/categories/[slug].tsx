import { GetServerSideProps, NextPage } from 'next'
import React from 'react'
import { Dashboard } from '../../../../components/layouts/Dashboard'
import { CategoryForm } from '../../../../components/pages/dashboard/products/categories/CategoryForm'
import { Category } from '../../../../models/category'
import { getCategory } from '../../../../services/categoriesService'

interface EditProps {
  category: Category
}

const EditCategoryPage: NextPage<EditProps> = ({ category }) => {

  return (
    <Dashboard>
      <CategoryForm edit={true} category={category} />
    </Dashboard>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const category = await getCategory(context.query.slug as string)

    return {
      props: {
        category
      }
    }
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/dashboard/products/categories"
      }
    }
  }
}

export default EditCategoryPage
