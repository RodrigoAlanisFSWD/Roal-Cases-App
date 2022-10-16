import React, { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { SubCategory } from '../../../models/category'
import { addSubCategory, removeSubCategory } from '../../../redux/states/search'
import { CheckBox } from '../shared/CheckBox'

interface SubCategoryFilterItemProps extends SubCategory {
  subCategories: string[]
}

export const SubCategoryFilterItem: FC<SubCategoryFilterItemProps> = ({ id, name, subCategories }) => {

  const [isActive, setIsActive] = useState(!!subCategories.find((i: any) => i === id.toString()))

  const dispatch = useDispatch()

  const handleChange = () => {
    const newValue = !isActive;

    if (newValue) {
      dispatch(addSubCategory(id.toString()))
    } else {
      dispatch(removeSubCategory(id.toString()))
    }

    setIsActive(newValue)
  }

  return (
    <div className='flex mt-3'>
        <CheckBox isActive={isActive} onChange={handleChange} />
        <span className='ml-5'>
            { name }
        </span>
    </div>
  )
}
