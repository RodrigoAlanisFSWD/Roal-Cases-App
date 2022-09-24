import { faTrash } from '@fortawesome/free-solid-svg-icons'
import React, { FC } from 'react'
import { SubCategory } from '../../../../../models/category'
import { Button } from '../../../../atoms/shared/Button'
import { IconButton } from '../../../../atoms/shared/IconButton'

interface CategoryCreatorProps {
    onAdd: () => void;
    categories: SubCategory[];
    onDelete: (name: string) => void;
}

export const CategoryCreator: FC<CategoryCreatorProps> = ({ onAdd, categories, onDelete }) => {
    return (
        <>
            <h3 className="my-4 text-2xl">
                Categorias:
            </h3>
            <div className="p-4 border border-gray-200">
                <div className="min-h-[150px] max-h-[250px] mb-[10px] overflow-y-scroll">
                    {categories.map((category: SubCategory) => (
                        <div key={category.name} className="w-full flex h-[60px] border-b border-gray-200 items-center justify-between px-4">
                            <h4 className="text-2xl">
                                {category.name}
                            </h4>

                            <IconButton onClick={() => onDelete(category.name)} color='danger' icon={faTrash} />
                        </div>
                    ))}

                </div>
                <Button onClick={onAdd} text="Agregar" />
            </div>
        </>
    )
}
