import React, { FC, useEffect, useState } from 'react'
import { Category } from '../../../models/category';
import { getCategories } from '../../../services/categoriesService';
import { Switch } from '../../atoms/shared/Switch';

interface CategorySelectorProps {
  selected: Category[],
  onAdd: (category: Category) => void;
  onRemove: (category: Category) => void;
  className?: string; 
}

export const CategorySelector: FC<CategorySelectorProps> = ({ className, selected, onAdd, onRemove }) => {

  const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const init = async () => {
            setCategories(await getCategories())
        }

        init()
    }, [])

  return (
    <div className={`w-full min-h-[200px] rounded-sm border border-gray-200 flex flex-col overflow-y-scroll ${className}`}>
      {
        categories.map((category: Category) => <CategorySelectorItem onAdd={onAdd} onRemove={onRemove} selected={selected} key={category.id} {...category} />)
      }
    </div>
  )
}

interface CategorySelectorItemProps extends Category {
  selected: Category[],
  onAdd: (category: any) => void;
  onRemove: (category: any) => void;
}

const CategorySelectorItem: FC<CategorySelectorItemProps> = (props) => {
  const { name, onAdd, onRemove, selected } = props;

    const [isActive, setIsActive] = useState(false)

    const handleSwitchChange = () => {

        if (isActive) {
            onRemove({
                id: props?.id,
                name: props.name,
            })
        } else {
            onAdd({
                id: props?.id,
                name: props.name,
            })
        }

        setIsActive(!isActive)
    }

    useEffect(() => {
        const exists = selected.find((i: Category) => i.id === props.id)

        if (exists) {
            setIsActive(true)
        }
    }, [selected])

  return (
    <div className='flex justify-between items-center h-[50px] px-5'>
          <h2 className='text-xl'>
                {name}
            </h2>

            <Switch isActive={isActive} onChange={() => handleSwitchChange()} />
    </div>
  )
}
