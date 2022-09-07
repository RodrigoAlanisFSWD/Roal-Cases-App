import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FC } from 'react'
import { Category } from '../../../../../models/category'
import styles from '../../../../../styles/molecules/dashboard/products/categories/DashboardCategory.module.scss'
import { IconButton } from '../../../../atoms/shared/IconButton'

export const DashboardCategory: FC<Category> = ({  name }) => {
  return (
    <div className={styles['category']}>
        <h4>
            { name }
        </h4>
        <div className={styles['category__actions']}>
            <IconButton icon={faPencil} color="primary" />
            <IconButton icon={faTrash} color="danger" />
        </div>
    </div>
  )
}
