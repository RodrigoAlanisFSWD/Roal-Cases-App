import React from 'react'
import { useSelector } from 'react-redux'
import { Category } from '../../../../models/category'
import { StoreState } from '../../../../store'
import { DashboardCategory } from '../../../molecules/dashboard/products/categories/DashboardCategory'

export const CategoryList = () => {

  const categories = useSelector((store: StoreState) => store.products.categories)

  return (
    <div>
      {
        categories.map((category: Category) => <DashboardCategory key={category.id} {...category} />)
      }
    </div>
  )
}
