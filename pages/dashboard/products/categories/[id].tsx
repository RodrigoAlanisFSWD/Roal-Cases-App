import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Dashboard } from '../../../../components/layouts/Dashboard'
import { CategoryForm } from '../../../../components/pages/dashboard/products/categories/CategoryForm'
import { Category } from '../../../../models/category'
import { useCategoryService } from '../../../../services/categoryService'

const EditCategoryPage = () => {
    const router = useRouter();

    const { id } = router.query

    const { getCategory } = useCategoryService()

    const [category, setCategory] = useState<Category | null>(null)

    useEffect(() => {
        const init = async () => {
            setCategory(await getCategory(id))
        }

        if (id) {
            init()
        }

    }, [id])


  return category && (
    <Dashboard>
        <CategoryForm edit={true} category={category} />
    </Dashboard>
  )
}

export default EditCategoryPage
