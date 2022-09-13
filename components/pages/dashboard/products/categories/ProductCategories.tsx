import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useCategoryService } from '../../../../../services/categoryService'
import styles from '../../../../../styles/pages/dashboard/products/categories/ProductCategories.module.scss'
import { Button } from '../../../../atoms/shared/Button';
import { CategoryList } from '../../../../organisms/dashboard/products/categories/CategoryList';

export const ProductCategories = () => {

    const { getCategories } = useCategoryService();

    useEffect(() => {
        const init = async () => {
            await getCategories()
        }

        init()
    }, [])

    const router = useRouter();

    return (
        <div className={styles['categories']}>
            <h2>
                Categorias
            </h2>
            
            <CategoryList />

            <Button onClick={() => router.push("/dashboard/products/categories/create")} text="Crear Categoria" className={styles['categories__btn']} />
        </div>
    )
}
