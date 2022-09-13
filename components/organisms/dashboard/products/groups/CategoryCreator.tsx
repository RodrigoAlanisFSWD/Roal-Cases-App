import { faTrash } from '@fortawesome/free-solid-svg-icons'
import React, { FC } from 'react'
import { SubCategory } from '../../../../../models/category'
import styles from '../../../../../styles/organisms/dashboard/products/groups/CategoryCreator.module.scss'
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
            <h3 className={styles['title']}>
                Categorias:
            </h3>
            <div className={styles['categoryCreator']}>
                <div className={styles['categoryCreator__categories']}>
                    {categories.map((category: SubCategory) => (
                        <div key={category.name} className={styles['categoryCreator__category']}>
                            <h4>
                                {category.name}
                            </h4>

                            <IconButton onClick={() => onDelete(category.name)} color='danger' icon={faTrash} />
                        </div>
                    ))}

                </div>
                <Button onClick={onAdd} text="Agregar" className={styles['categoryCreator__btn']} />
            </div>
        </>
    )
}
