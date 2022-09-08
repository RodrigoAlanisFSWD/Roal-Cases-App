import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { Category } from '../../../../../models/category'
import { useCategoryService } from '../../../../../services/categoryService'
import styles from '../../../../../styles/molecules/dashboard/products/categories/DashboardCategory.module.scss'
import { IconButton } from '../../../../atoms/shared/IconButton'

export const DashboardCategory: FC<Category> = ({ name, id }) => {

  const router = useRouter()

  const { deleteCategory } = useCategoryService()

  return (
    <div className={styles['category']}>
        <h4>
            { name }
        </h4>
        <div className={styles['category__actions']}>
            <IconButton onClick={() => {
              router.push("/dashboard/products/categories/" + id)
            }} icon={faPencil} color="primary" />
            <IconButton onClick={async () => {
              await deleteCategory(id)
            }} icon={faTrash} color="danger" />
        </div>
    </div>
  )
}
