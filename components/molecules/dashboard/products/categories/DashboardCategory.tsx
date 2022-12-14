import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { Category } from '../../../../../models/category'
import { removeCategory } from '../../../../../redux/states/categories'
import { deleteCategory } from '../../../../../services/categoriesService'
import { IconButton } from '../../../../atoms/shared/IconButton'

export const DashboardCategory: FC<Category> = ({ name, id, slug }) => {

  const router = useRouter()

  const dispatch = useDispatch()

  return (
    <div className="grid grid-cols-[1fr_100px] h-[50px] items-center sm:h-[60px] sm:grid-cols-[1fr_200px] border-b border-gray-200">
        <h4 className="ml-4 text-xl sm:text-2xl">
            { name }
        </h4>
        <div className="flex justify-end">
            <IconButton onClick={() => {
              router.push("/dashboard/products/categories/" + slug)
            }} icon={faPencil} color="primary" className="ml-[10px]"/>
            <IconButton onClick={async () => {
              await deleteCategory(id)
              dispatch(removeCategory(id))
            }} icon={faTrash} color="danger" className="ml-[10px]" />
        </div>
    </div>
  )
}
